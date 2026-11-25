// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TextEncoder as NodeTextEncoder } from 'node:util';
import JSZip from 'jszip';
import { BlobReader, BlobWriter, ZipReader } from '@zip.js/zip.js';
import { writeBackupZip, type BackupEntry, type BackupProgress } from './backupZip';
import { openBackupArchive, backupEntryText, backupEntryBlob } from './backupArchive';
import type { BackupImportProgress } from './backupImportProgress';

beforeEach(() => { vi.stubGlobal('TextEncoder', NodeTextEncoder); });
afterEach(() => vi.unstubAllGlobals());

async function* entries(items: BackupEntry[]) { yield* items; }
const metadata: BackupEntry[] = [
  { name: 'manifest.json', data: JSON.stringify({ version: 1, app: 'EverythingEbooks', exportDate: '2026-11-24T12:00:00Z' }) },
  { name: 'localStorage.json', data: JSON.stringify({ theme: 'dark' }) },
];
async function zipBlob(items: BackupEntry[]) {
  const target = new BlobWriter('application/zip');
  const result = target.getData();
  await writeBackupZip(entries(items), target.writable, items.length);
  return result;
}

describe('streaming ZIP export and cross-browser import', () => {
  it('reports verification files and byte progress within a file, not just after it', async () => {
    const blob = await zipBlob([...metadata, { name: 'ereader/book.epub', data: new Uint8Array(2 * 1024 * 1024) }]);
    let time = 0;
    const clock = vi.spyOn(Date, 'now').mockImplementation(() => time += 101);
    const reports: BackupImportProgress[] = [];
    try {
      const archive = await openBackupArchive(blob, p => reports.push(p));
      const total = archive.files.reduce((sum, entry) => sum + entry.compressedSize, 0);
      expect(reports[0]!.phase).toBe('reading');
      expect(reports.at(-1)).toEqual({ phase: 'verifying', filesDone: 3, filesTotal: 3, bytesDone: total, bytesTotal: total });
      expect(reports.some(p => p.filesDone === 2 && p.bytesDone > 1024 && p.bytesDone < total)).toBe(true);
      await archive.close();
    } finally { clock.mockRestore(); }
  });

  it('uses ZIP byte totals for compressed backups and handles empty files', async () => {
    const old = new JSZip();
    for (const entry of metadata) old.file(entry.name, entry.data as string);
    old.file('authors/manuscript/chapter.xhtml', 'repeated words '.repeat(10000));
    old.file('authors/manuscript/empty.xhtml', '');
    const blob = new Blob([Uint8Array.from(await old.generateAsync({ type: 'uint8array', compression: 'DEFLATE' }))]);
    const reports: BackupImportProgress[] = [];
    const archive = await openBackupArchive(blob, p => reports.push(p));
    expect(reports.at(-1)!.filesDone).toBe(4);
    expect(reports.at(-1)!.bytesDone).toBe(reports.at(-1)!.bytesTotal);
    expect(reports.at(-1)!.bytesTotal).toBeLessThan(10000);
    expect(reports.every(p => p.bytesDone <= p.bytesTotal)).toBe(true);
    await archive.close();
  });

  it('round-trips Unicode writing, filenames and binary media using the standard Blob fallback', async () => {
    const text = '<p>Éléonore’s words: 日本語 🦉</p>';
    const media = Uint8Array.from([0, 255, 3, 128, 13, 10]);
    const blob = await zipBlob([...metadata,
      { name: 'authors/manuscript/日本語.xhtml', data: text },
      { name: 'authors/manuscript/voice.mp3', data: new Blob([media]) },
    ]);
    const archive = await openBackupArchive(blob);
    expect(await backupEntryText(archive.files.find(f => f.filename.endsWith('.xhtml'))!)).toBe(text);
    expect(new Uint8Array(await (await backupEntryBlob(archive.files.find(f => f.filename.endsWith('.mp3'))!)).arrayBuffer())).toEqual(media);
    await archive.close();
    // Existing EE versions/ordinary ZIP readers can still open the same ZIP64 archive.
    const oldReader = await JSZip.loadAsync(await blob.arrayBuffer(), { checkCRC32: true });
    expect(await oldReader.file('authors/manuscript/日本語.xhtml')!.async('string')).toBe(text);
  });

  it('uses STORE rather than recompressing EPUBs, images and audio', async () => {
    const blob = await zipBlob([{ name: 'book.epub', data: new Uint8Array(12345) }]);
    const reader = new ZipReader(new BlobReader(blob));
    const [entry] = await reader.getEntries();
    expect(entry!.compressedSize).toBe(12345);
    expect(entry!.uncompressedSize).toBe(12345);
    await reader.close();
  });

  it('reads a large source Blob in slices, never asking for its entire ArrayBuffer', async () => {
    const blob = new Blob([new Uint8Array(3 * 1024 * 1024)]);
    const wholeRead = vi.spyOn(blob, 'arrayBuffer').mockRejectedValue(new Error('whole-file read'));
    let largest = 0;
    await writeBackupZip(entries([{ name: 'large.epub', data: blob }]), new WritableStream({
      write(chunk) { largest = Math.max(largest, chunk.byteLength); },
    }), 1);
    expect(wholeRead).not.toHaveBeenCalled();
    expect(largest).toBeLessThan(blob.size);
  });

  it('honors slow destinations and reports completed files and byte progress', async () => {
    let pending = 0;
    let maxPending = 0;
    let bytes = 0;
    const reports: BackupProgress[] = [];
    await writeBackupZip(entries([{ name: 'a', data: 'one' }, { name: 'b', data: 'two' }]), new WritableStream({
      async write(chunk) {
        maxPending = Math.max(maxPending, ++pending);
        await new Promise(resolve => setTimeout(resolve, 1));
        bytes += chunk.byteLength;
        pending--;
      },
    }), 2, { onProgress: p => reports.push(p) });
    expect(maxPending).toBe(1);
    expect(reports.at(-1)).toEqual({ phase: 'finishing', filesDone: 2, filesTotal: 2, bytesWritten: bytes });
    expect(bytes).toBeGreaterThan(6);
  });

  it('cancels the destination without reporting a successful close', async () => {
    const controller = new AbortController();
    const close = vi.fn();
    const abort = vi.fn();
    await expect(writeBackupZip(entries([{ name: 'large', data: new Uint8Array(2 ** 20) }]), new WritableStream({
      write() { controller.abort(); }, close, abort,
    }), 1, { signal: controller.signal })).rejects.toBeDefined();
    expect(close).not.toHaveBeenCalled();
    expect(abort).toHaveBeenCalledOnce();
  });

  it.each(['write', 'close'] as const)('propagates a destination %s failure', async method => {
    const failure = new Error('Disk full');
    await expect(writeBackupZip(entries([{ name: 'x', data: 'words' }]), new WritableStream({
      [method]() { throw failure; },
    }), 1)).rejects.toThrow('Disk full');
  });

  it('imports existing compressed version-1 ZIPs', async () => {
    const old = new JSZip();
    for (const item of metadata) old.file(item.name, item.data as string);
    old.file('authors/manuscript/chapter.xhtml', '<p>Old writing, intact.</p>');
    const blob = new Blob([Uint8Array.from(await old.generateAsync({ type: 'uint8array', compression: 'DEFLATE' }))]);
    const archive = await openBackupArchive(blob);
    expect(await backupEntryText(archive.files.find(f => f.filename.endsWith('.xhtml'))!)).toBe('<p>Old writing, intact.</p>');
    await archive.close();
  });

  it('rejects corruption in an ordinary content entry, not just invalid metadata', async () => {
    const marker = 'WRITING-THAT-MUST-BE-VERIFIED';
    const blob = await zipBlob([...metadata, { name: 'authors/manuscript/chapter.xhtml', data: marker }]);
    const bytes = Buffer.from(await blob.arrayBuffer());
    const offset = bytes.indexOf(marker);
    expect(offset).toBeGreaterThan(0);
    bytes[offset] = bytes[offset]! ^ 1;
    await expect(openBackupArchive(new Blob([bytes]))).rejects.toThrow();
  });

  it('rejects unrelated ZIPs and malformed preferences before restoration', async () => {
    await expect(openBackupArchive(await zipBlob([{ name: 'x', data: 'y' }]))).rejects.toThrow();
    await expect(openBackupArchive(await zipBlob([metadata[0]!, { name: 'localStorage.json', data: '{"theme":42}' }]))).rejects.toThrow();
  });
});

// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TextEncoder as NodeTextEncoder } from 'node:util';
import { IDBFactory, IDBObjectStore } from 'fake-indexeddb';
import JSZip from 'jszip';
import { exportAllData, exportAndDownload, performImport, pickAndValidateBackup } from './dataExportService';
import { openBackupArchive, type BackupArchive } from './backupArchive';
import type { BackupImportProgress } from './backupImportProgress';
import { backupRevision, getBackupReminder, markBackupChanged, restoreZip } from './backupReminder';

class MemoryStorage {
  values = new Map<string, string>();
  get length() { return this.values.size; }
  key(i: number) { return [...this.values.keys()][i] ?? null; }
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, String(value)); }
  removeItem(key: string) { this.values.delete(key); }
  clear() { this.values.clear(); }
}
let browser: EventTarget & { setTimeout: ReturnType<typeof vi.fn>; showSaveFilePicker?: ReturnType<typeof vi.fn> };
let download: Blob | undefined;
const bytes = new Uint8Array([0, 4, 255, 128, 1]);
const words = '<p>Every word — 日本語 and 🦉 — survives.</p>';
beforeEach(() => {
  vi.stubGlobal('TextEncoder', NodeTextEncoder);
  vi.stubGlobal('indexedDB', new IDBFactory());
  vi.stubGlobal('localStorage', new MemoryStorage());
  vi.stubGlobal('sessionStorage', new MemoryStorage());
  browser = Object.assign(new EventTarget(), { setTimeout: vi.fn() });
  vi.stubGlobal('window', browser);
  vi.stubGlobal('document', {
    body: { appendChild: vi.fn() },
    createElement: vi.fn(() => ({ href: '', download: '', click: vi.fn(), remove: vi.fn() })),
  });
  download = undefined;
  vi.spyOn(URL, 'createObjectURL').mockImplementation(blob => { download = blob as Blob; return 'blob:backup'; });
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
  restoreZip(null);
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function open(name: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(name, name === 'AppFileSystem' ? 2 : 1);
    r.onupgradeneeded = () => {
      for (const s of name === 'AppFileSystem' ? ['files', 'manuscript'] : ['settings', 'manuscript', 'ai', 'publish']) {
        r.result.createObjectStore(s, { keyPath: s === 'files' ? 'path' : 'key' });
      }
    };
    r.onsuccess = () => { r.result.onversionchange = () => r.result.close(); resolve(r.result); };
    r.onerror = () => reject(r.error);
  });
}
async function put(dbName: string, store: string, record: object) {
  const db = await open(dbName);
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).put(record);
      tx.oncomplete = () => resolve(); tx.onabort = () => reject(tx.error);
    });
  } finally { db.close(); }
}
async function get(dbName: string, store: string, key: string): Promise<any> {
  const db = await open(dbName);
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(store);
      const req = tx.objectStore(store).get(key);
      tx.oncomplete = () => resolve(req.result); tx.onabort = () => reject(tx.error);
    });
  } finally { db.close(); }
}
async function seed() {
  localStorage.setItem('theme', 'dark');
  await put('AppFileSystem', 'files', { path: 'Books/book.epub', content: new Blob([bytes]) });
  await put('AppFileSystem', 'files', { path: 'Books/book.json', content: '{"title":"A book"}' });
  await put('AppFileSystem', 'manuscript', { key: 'chapter.xhtml', value: words });
  await put('AppFileSystem', 'manuscript', { key: 'audio/voice.mp3', value: new Blob([bytes], { type: 'audio/mpeg' }) });
  await put('ProselenosLocal', 'manuscript', { key: 'chapter.xhtml', value: words });
  await put('ProselenosLocal', 'manuscript', { key: 'metadata.json', value: { title: 'Été', author: 'Writer' } });
  await put('ProselenosLocal', 'manuscript', { key: 'images/cover.jpeg', value: new Blob([bytes], { type: 'image/jpeg' }) });
  await put('ProselenosLocal', 'manuscript', { key: 'audio/chapter.mp3', value: new Blob([bytes], { type: 'audio/mpeg' }) });
  await put('ProselenosLocal', 'publish', { key: 'manuscript.epub', value: bytes.buffer });
  await put('ProselenosLocal', 'settings', { key: 'settings.json', value: { fontSize: 18 } });
  await put('ProselenosLocal', 'ai', { key: 'notes.txt', value: 'Author notes' });
  markBackupChanged();
}
async function verifyRestored() {
  expect(localStorage.getItem('theme')).toBe('dark');
  expect((await get('ProselenosLocal', 'manuscript', 'chapter.xhtml')).value).toBe(words);
  expect((await get('AppFileSystem', 'manuscript', 'chapter.xhtml')).value).toBe(words);
  const narration = (await get('AppFileSystem', 'manuscript', 'audio/voice.mp3')).value as Blob;
  expect(narration.type).toBe('audio/mpeg');
  expect(new Uint8Array(await narration.arrayBuffer())).toEqual(bytes);
  expect((await get('ProselenosLocal', 'manuscript', 'metadata.json')).value).toEqual({ title: 'Été', author: 'Writer' });
  expect((await get('ProselenosLocal', 'settings', 'settings.json')).value).toEqual({ fontSize: 18 });
  expect((await get('ProselenosLocal', 'ai', 'notes.txt')).value).toBe('Author notes');
  const epub = (await get('ProselenosLocal', 'publish', 'manuscript.epub')).value;
  expect(epub).toBeInstanceOf(ArrayBuffer);
  expect(new Uint8Array(epub)).toEqual(bytes);
  for (const [key, type] of [['images/cover.jpeg', 'image/jpeg'], ['audio/chapter.mp3', 'audio/mpeg']]) {
    const value = (await get('ProselenosLocal', 'manuscript', key!)).value as Blob;
    expect(value.type).toBe(type);
    expect(new Uint8Array(await value.arrayBuffer())).toEqual(bytes);
  }
  expect(new Uint8Array(await (await get('AppFileSystem', 'files', 'Books/book.epub')).content.arrayBuffer())).toEqual(bytes);
  expect((await get('AppFileSystem', 'files', 'Books/book.json')).content).toBe('{"title":"A book"}');
}

function selectBackup(file: File | null) {
  const input = {
    files: file ? [file] : [],
    onchange: () => {},
    oncancel: () => {},
    click: vi.fn(() => { if (file) input.onchange(); else input.oncancel(); }),
  };
  vi.mocked(document.createElement).mockReturnValue(input as unknown as HTMLInputElement);
  return input;
}

describe('import confirmation order', () => {
  it('opens the picker immediately, waits for confirmation, then checks and restores once', async () => {
    await seed();
    const file = new File([await exportAllData()], 'backup.zip');
    const input = selectBackup(file);
    const reading = vi.spyOn(file, 'slice');
    const progress = vi.fn();
    const reset = vi.spyOn(indexedDB, 'deleteDatabase');
    let confirm!: (value: boolean) => void;
    const confirmation = vi.fn(() => new Promise<boolean>(resolve => { confirm = resolve; }));
    const pending = pickAndValidateBackup(confirmation, progress);
    expect(input.click).toHaveBeenCalledOnce();
    await Promise.resolve();
    expect(confirmation).toHaveBeenCalledOnce();
    expect(reading).not.toHaveBeenCalled();
    expect(progress).not.toHaveBeenCalled();
    expect(reset).not.toHaveBeenCalled();
    confirm(true);
    const result = await pending;
    expect(result && 'zip' in result).toBe(true);
    if (!result || !('zip' in result)) throw new Error('Expected a verified backup');
    expect(progress.mock.calls[0]![0].phase).toBe('reading');
    expect(progress.mock.calls.at(-1)![0].phase).toBe('verifying');
    expect(reset).not.toHaveBeenCalled();
    expect(await performImport(result.zip)).toEqual({ success: true });
    expect(confirmation).toHaveBeenCalledOnce();
    expect(reset.mock.calls.map(([name]) => name)).toEqual(['AppFileSystem', 'ProselenosLocal']);
    await verifyRestored();
  });

  it('does not read the ZIP or change writing when confirmation is cancelled', async () => {
    await seed();
    const file = new File(['not even a zip'], 'backup.zip');
    selectBackup(file);
    const reading = vi.spyOn(file, 'slice');
    const progress = vi.fn();
    expect(await pickAndValidateBackup(async () => false, progress)).toBeNull();
    expect(reading).not.toHaveBeenCalled();
    expect(progress).not.toHaveBeenCalled();
    await verifyRestored();
  });

  it('does not ask for confirmation when the file picker is cancelled', async () => {
    selectBackup(null);
    const confirmation = vi.fn(async () => true);
    const progress = vi.fn();
    expect(await pickAndValidateBackup(confirmation, progress)).toBeNull();
    expect(confirmation).not.toHaveBeenCalled();
    expect(progress).not.toHaveBeenCalled();
  });

  it('keeps writing intact when a confirmed ZIP fails verification', async () => {
    await seed();
    selectBackup(new File(['damaged zip'], 'backup.zip'));
    const reset = vi.spyOn(indexedDB, 'deleteDatabase');
    expect(await pickAndValidateBackup(async () => true)).toEqual({
      error: 'Could not verify this EverythingEbooks backup. No data has been reset.',
    });
    expect(reset).not.toHaveBeenCalled();
    await verifyRestored();
  });
});

describe('backup storage and browser paths', () => {
  it('reports restore progress for the actual restored files and finishes with exact byte totals', async () => {
    await seed();
    const archive = await openBackupArchive(await exportAllData());
    const reports: BackupImportProgress[] = [];
    const expectedEntries = archive.files.filter(e => e.filename !== 'manifest.json');
    const expectedBytes = expectedEntries.reduce((sum, entry) => sum + entry.compressedSize, 0);
    expect(await performImport(archive, undefined, p => reports.push(p))).toEqual({ success: true });
    expect(reports[0]!.phase).toBe('preparing');
    expect(reports.at(-1)).toEqual({ phase: 'restoring', filesDone: expectedEntries.length,
      filesTotal: expectedEntries.length, bytesDone: expectedBytes, bytesTotal: expectedBytes });
    expect(reports.some(p => p.phase === 'restoring' && p.filesDone > 0 && p.filesDone < p.filesTotal)).toBe(true);
    await verifyRestored();
  });

  it('exports and restores the complete workspace without loading all IDB values together', async () => {
    await seed();
    const all = vi.spyOn(IDBObjectStore.prototype, 'getAll').mockImplementation(() => { throw new Error('Must not read every value'); });
    const blob = await exportAllData();
    expect(all).not.toHaveBeenCalled();
    const archive = await openBackupArchive(blob);
    expect(archive.manifest.contents).toEqual({ hasLocalStorage: true, hasEreader: true, hasAuthors: true });
    expect(await performImport(archive)).toEqual({ success: true });
    await verifyRestored();
    expect(getBackupReminder().status).toBe('green');
  });

  it('supports Safari and browsers without showSaveFilePicker, with the same importable ZIP', async () => {
    await seed();
    expect(await exportAndDownload()).toBe('saved');
    expect(download).toBeInstanceOf(Blob);
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
    expect(browser.setTimeout).toHaveBeenCalledWith(expect.any(Function), 60_000);
    expect(await performImport(await openBackupArchive(download!))).toEqual({ success: true });
    await verifyRestored();
  });

  it('invokes the native picker before IDB reads and waits for the file to close before marking green', async () => {
    await seed();
    const chunks: Uint8Array[] = [];
    let release!: () => void;
    let reachedClose!: () => void;
    const closing = new Promise<void>(resolve => { reachedClose = resolve; });
    const closeGate = new Promise<void>(resolve => { release = resolve; });
    const dbOpen = vi.spyOn(indexedDB, 'open');
    browser.showSaveFilePicker = vi.fn(async () => {
      expect(dbOpen).not.toHaveBeenCalled();
      return { createWritable: async () => new WritableStream({
        write(chunk: Uint8Array) { chunks.push(chunk); },
        async close() { reachedClose(); await closeGate; },
      }) };
    });
    const exporting = exportAndDownload();
    await closing;
    expect(getBackupReminder().status).not.toBe('green');
    release();
    expect(await exporting).toBe('saved');
    expect(getBackupReminder().status).toBe('green');
    const archive = await openBackupArchive(new Blob(chunks as BlobPart[]));
    expect(await performImport(archive)).toEqual({ success: true });
    await verifyRestored();
  });

  it('uses ordinary ZIP export when a Chromium browser exposes an unavailable picker', async () => {
    await seed();
    browser.showSaveFilePicker = vi.fn().mockRejectedValue(new DOMException('Unavailable', 'NotSupportedError'));
    expect(await exportAndDownload()).toBe('saved');
    expect(download).toBeInstanceOf(Blob);
    expect(await performImport(await openBackupArchive(download!))).toEqual({ success: true });
    await verifyRestored();
  });

  it('does not mark newer writing as backed up by an already-running export', async () => {
    await seed();
    const before = backupRevision();
    browser.showSaveFilePicker = vi.fn(async () => ({ createWritable: async () => new WritableStream({
      close() { markBackupChanged(); },
    }) }));
    expect(await exportAndDownload()).toBe('saved');
    expect(backupRevision()).not.toBe(before);
    expect(getBackupReminder().status).toBe('yellow');
  });

  it('allows another export after cancelling the native picker, without changing the reminder', async () => {
    await seed();
    browser.showSaveFilePicker = vi.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError'));
    expect(await exportAndDownload()).toBe('cancelled');
    expect(localStorage.getItem('last_export_date')).toBeNull();
    delete browser.showSaveFilePicker;
    expect(await exportAndDownload()).toBe('saved');
  });

  it('aborts a running export without marking the backup green', async () => {
    await seed();
    const controller = new AbortController();
    const abort = vi.fn();
    browser.showSaveFilePicker = vi.fn(async () => ({ createWritable: async () => new WritableStream({
      write() { controller.abort(); }, abort,
    }) }));
    expect(await exportAndDownload({ signal: controller.signal })).toBe('cancelled');
    expect(abort).toHaveBeenCalled();
    expect(localStorage.getItem('last_export_date')).toBeNull();
  });

  it('leaves the reminder unchanged when the final file close fails', async () => {
    await seed();
    browser.showSaveFilePicker = vi.fn(async () => ({ createWritable: async () => new WritableStream({
      close() { throw new Error('Disk full'); },
    }) }));
    await expect(exportAndDownload()).rejects.toThrow('Disk full');
    expect(localStorage.getItem('last_export_date')).toBeNull();
  });

  it('honors cancellation while the destination is finishing its close', async () => {
    await seed();
    const controller = new AbortController();
    browser.showSaveFilePicker = vi.fn(async () => ({ createWritable: async () => new WritableStream({
      close() { controller.abort(); },
    }) }));
    expect(await exportAndDownload({ signal: controller.signal })).toBe('cancelled');
    expect(localStorage.getItem('last_export_date')).toBeNull();
  });

  it('handles first-time users without creating incomplete databases', async () => {
    const archive = await openBackupArchive(await exportAllData());
    expect(archive.files).toHaveLength(2);
    expect(await indexedDB.databases()).toEqual([]);
    await archive.close();
  });

  it('refuses an unverified archive without clearing existing writing', async () => {
    await seed();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const unverified = { files: [], manifest: {}, preferences: {}, close: async () => {} } as unknown as BackupArchive;
    expect((await performImport(unverified)).success).toBe(false);
    await verifyRestored();
  });

  it('preserves existing writing when verification finds a damaged ZIP', async () => {
    await seed();
    await expect(openBackupArchive(new Blob(['not a zip']))).rejects.toThrow();
    await verifyRestored();
  });

  it('restores Scenecraft media from old backups with erroneous .json suffixes', async () => {
    const old = new JSZip();
    old.file('manifest.json', JSON.stringify({ version: 1, app: 'EverythingEbooks', exportDate: '2026-11-24T12:00:00Z' }));
    old.file('localStorage.json', '{}');
    old.file('authors/manuscript/audio/chapter.mp3.json', bytes);
    old.file('authors/manuscript/chapter.xhtml.json', words);
    const archive = await openBackupArchive(new Blob([Uint8Array.from(await old.generateAsync({ type: 'uint8array', compression: 'DEFLATE' }))]));
    expect(await performImport(archive)).toEqual({ success: true });
    expect((await get('ProselenosLocal', 'manuscript', 'chapter.xhtml')).value).toBe(words);
    const audio = (await get('ProselenosLocal', 'manuscript', 'audio/chapter.mp3')).value as Blob;
    expect(audio.type).toBe('audio/mpeg');
    expect(new Uint8Array(await audio.arrayBuffer())).toEqual(bytes);
  });
});

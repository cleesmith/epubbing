import { BlobReader, BlobWriter, TextWriter, ZipReader, type FileEntry } from '@zip.js/zip.js';
import { importProgress, type ImportProgressCallback } from './backupImportProgress';

export type BackupManifest = {
  version: number; app: string; exportDate: string;
  contents?: { hasLocalStorage?: boolean; hasEreader?: boolean; hasAuthors?: boolean };
};
export type BackupArchive = {
  files: FileEntry[];
  manifest: BackupManifest;
  preferences: Record<string, string>;
  close: () => Promise<void>;
};
const verified = new WeakSet<BackupArchive>();
export const isVerifiedBackup = (archive: BackupArchive) => verified.has(archive);

export async function backupEntryText(entry: FileEntry, onprogress?: (bytes: number) => void): Promise<string> {
  return entry.getData(new TextWriter(), { checkSignature: true, useWebWorkers: false,
    onprogress: bytes => { onprogress?.(bytes); return undefined; } });
}
export async function backupEntryBlob(entry: FileEntry, type = 'application/octet-stream', onprogress?: (bytes: number) => void): Promise<Blob> {
  return entry.getData(new BlobWriter(type), { checkSignature: true, useWebWorkers: false,
    onprogress: bytes => { onprogress?.(bytes); return undefined; } });
}

/** Read the ZIP directory, then verify each entry's CRC with a discard stream.
 * No whole-archive ArrayBuffer, and no reset of the current writing until EVERY
 * archived file has passed verification. Works with old DEFLATE and new STORE.
 */
export async function openBackupArchive(file: Blob, onProgress?: ImportProgressCallback): Promise<BackupArchive> {
  onProgress?.({ phase: 'reading', filesDone: 0, filesTotal: 0, bytesDone: 0, bytesTotal: 0 });
  const reader = new ZipReader(new BlobReader(file), { useWebWorkers: false });
  try {
    const files = (await reader.getEntries()).filter((entry): entry is FileEntry => !entry.directory);
    const names = new Set<string>();
    for (const entry of files) {
      if (names.has(entry.filename) || entry.encrypted) throw new Error('The backup has duplicate or encrypted files.');
      names.add(entry.filename);
    }
    const manifestEntry = files.find(entry => entry.filename === 'manifest.json');
    const preferencesEntry = files.find(entry => entry.filename === 'localStorage.json');
    if (!manifestEntry || !preferencesEntry) throw new Error('This is not an EverythingEbooks backup.');
    const progress = importProgress('verifying', files, onProgress);
    const manifest = JSON.parse(await backupEntryText(manifestEntry, progress.reading)) as BackupManifest;
    progress.completed(manifestEntry);
    const preferences = JSON.parse(await backupEntryText(preferencesEntry, progress.reading)) as Record<string, string>;
    progress.completed(preferencesEntry);
    if (manifest?.app !== 'EverythingEbooks' || manifest.version !== 1 ||
        !preferences || typeof preferences !== 'object' || Array.isArray(preferences) ||
        Object.values(preferences).some(value => typeof value !== 'string') ||
        (manifest.contents?.hasEreader && !files.some(entry => entry.filename.startsWith('ereader/'))) ||
        (manifest.contents?.hasAuthors && !files.some(entry => entry.filename.startsWith('authors/')))) {
      throw new Error('The backup metadata is invalid.');
    }
    for (const entry of files) {
      if (entry === manifestEntry || entry === preferencesEntry) continue;
      await entry.getData(new WritableStream<Uint8Array>({ write() {} }), {
        checkSignature: true, useWebWorkers: false, onprogress: progress.reading,
      });
      progress.completed(entry);
    }
    const archive: BackupArchive = { files, manifest, preferences, close: () => reader.close() };
    verified.add(archive);
    return archive;
  } catch (error) {
    await reader.close();
    throw error;
  }
}

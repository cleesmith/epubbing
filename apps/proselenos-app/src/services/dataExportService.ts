// src/services/dataExportService.ts
// Exports and imports ALL browser storage for this app

import { openBackupArchive, isVerifiedBackup, backupEntryText, backupEntryBlob, type BackupArchive } from './backupArchive';
import { BlobWriter } from '@zip.js/zip.js';
import { importProgress, type ImportProgressCallback } from './backupImportProgress';
import { writeBackupZip, type BackupEntry, type BackupExportOptions } from './backupZip';
export type { BackupProgress, BackupExportOptions } from './backupZip';
import { backupRevision, backupStateForZip, isBackupKey, markBackupChanged, recordZip, restoreZip } from './backupReminder';

// ============================================
// Database constants (matching existing services)
// ============================================

const EREADER_DB_NAME = 'AppFileSystem';
const EREADER_DB_VERSION = 2;

const AUTHORS_DB_NAME = 'ProselenosLocal';
const AUTHORS_DB_VERSION = 1;
const AUTHORS_STORES = ['settings', 'manuscript', 'ai', 'publish'] as const;

// ============================================
// Helper: Open IndexedDB
// ============================================

async function openDB(dbName: string, version: number): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);
    request.onupgradeneeded = () => {
      const db = request.result;
      const stores = dbName === AUTHORS_DB_NAME ? AUTHORS_STORES : ['files', 'manuscript'];
      for (const name of stores) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: name === 'files' ? 'path' : 'key' });
        }
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => db.close();
      resolve(db);
    };
    request.onerror = () => reject(request.error);
  });
}

// ============================================
// Export localStorage
// ============================================

function exportLocalStorage(): Record<string, string> {
  const data: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && !isBackupKey(key)) {
      data[key] = localStorage.getItem(key) || '';
    }
  }
  return data;
}

// ============================================
// Export E-Reader Database (AppFileSystem)
// ============================================

// A first-time user may not have opened Authors or Library yet. Abort creation
// of a missing database instead of leaving an empty database without its stores.
function openForExport(name: string): Promise<IDBDatabase | null> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name);
    let missing = false;
    request.onupgradeneeded = () => {
      missing = true;
      request.transaction!.abort();
    };
    request.onerror = () => missing ? resolve(null) : reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => db.close();
      resolve(db);
    };
  });
}

// Authors consumes covers, inline images and Scenecraft audio as Blobs.
function authorsMediaType(filename: string): string | undefined {
  const types: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    avif: 'image/avif', bmp: 'image/bmp',
    mp3: 'audio/mpeg', m4a: 'audio/mp4', mp4: 'audio/mp4', wav: 'audio/wav',
    ogg: 'audio/ogg', opus: 'audio/ogg', flac: 'audio/flac', aac: 'audio/aac', webm: 'audio/webm',
  };
  return types[filename.split('.').pop()?.toLowerCase() || ''];
}

type BackupSource = { db: IDBDatabase; store: string; key: string; name: string };

async function backupKeys(db: IDBDatabase, store: string): Promise<string[]> {
  if (!db.objectStoreNames.contains(store)) return [];
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const request = tx.objectStore(store).getAllKeys();
    tx.oncomplete = () => {
      if (request.result.some(key => typeof key !== 'string')) reject(new Error('A backup record has an invalid name.'));
      else resolve(request.result as string[]);
    };
    tx.onabort = () => reject(tx.error || new Error('Could not list files for the backup.'));
  });
}

async function backupValue(source: BackupSource): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const tx = source.db.transaction(source.store, 'readonly');
    const request = tx.objectStore(source.store).get(source.key);
    tx.oncomplete = () => {
      if (!request.result) reject(new Error('A file changed or was removed during export. Please try exporting again.'));
      else resolve(source.store === 'files' ? request.result.content : request.result.value);
    };
    tx.onabort = () => reject(tx.error || new Error('Could not read a file for the backup.'));
  });
}

function zipData(value: unknown): BackupEntry['data'] {
  if (value instanceof Blob || typeof value === 'string') return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  const json = JSON.stringify(value, null, 2);
  if (json === undefined) throw new Error('A stored record could not be exported.');
  return json;
}

/** Enumerate only keys first, then read/write ONE record at a time. In
 * particular, never call getAll() on a store containing multi-GB EPUB data.
 */
export async function writeDataBackup(
  destination: WritableStream<Uint8Array>,
  revision = backupRevision(),
  exportedAt = new Date().toISOString(),
  options: BackupExportOptions = {},
): Promise<void> {
  const databases: IDBDatabase[] = [];
  try {
    options.signal?.throwIfAborted();
    options.onProgress?.({ phase: 'preparing', filesDone: 0, filesTotal: 0, bytesWritten: 0 });
    const preferences = { ...exportLocalStorage(), ...backupStateForZip(revision, exportedAt) };
    const sources: BackupSource[] = [];
    const manifest = {
      version: 1, app: 'EverythingEbooks', exportDate: exportedAt,
      contents: { hasLocalStorage: true, hasEreader: false, hasAuthors: false },
    };
    for (const name of [EREADER_DB_NAME, AUTHORS_DB_NAME]) {
      options.signal?.throwIfAborted();
      const db = await openForExport(name);
      if (!db) continue;
      databases.push(db);
      const stores = name === EREADER_DB_NAME ? ['files', 'manuscript'] : AUTHORS_STORES;
      for (const store of stores) {
        const keys = await backupKeys(db, store);
        for (const key of keys) {
          let filename: string;
          if (name === EREADER_DB_NAME && store === 'files') {
            manifest.contents.hasEreader = true;
            filename = 'ereader/' + key;
          } else if (name === EREADER_DB_NAME) {
            filename = 'ereader-manuscript/' + (/\.(json|xhtml)$/.test(key) || authorsMediaType(key) ? key : key + '.bin');
          } else {
            manifest.contents.hasAuthors = true;
            filename = 'authors/' + store + '/' + (/\.(json|txt|epub|docx|xhtml)$/.test(key) || authorsMediaType(key) ? key : key + '.json');
          }
          sources.push({ db, store, key, name: filename });
        }
      }
    }
    async function* entries(): AsyncGenerator<BackupEntry> {
      yield { name: 'localStorage.json', data: JSON.stringify(preferences, null, 2) };
      for (const source of sources) {
        options.signal?.throwIfAborted();
        yield { name: source.name, data: zipData(await backupValue(source)) };
      }
      yield { name: 'manifest.json', data: JSON.stringify(manifest, null, 2) };
    }
    await writeBackupZip(entries(), destination, sources.length + 2, options);
  } catch (error) {
    // Also handles failures before the ZIP writer acquired the stream.
    if (!destination.locked) {
      try { await destination.abort(error); } catch { /* Already aborted/closed. */ }
    }
    throw error;
  } finally {
    databases.forEach(db => db.close());
  }
}

// Compatibility fallback for browsers without a direct file-save picker.
// Response/BlobWriter receives chunks, avoiding JSZip's giant concatenation.
export async function exportAllData(
  revision = backupRevision(),
  exportedAt = new Date().toISOString(),
  options: BackupExportOptions = {},
): Promise<Blob> {
  const writer = new BlobWriter('application/zip');
  const result = writer.getData();
  // A canceled/failed stream also rejects its Blob promise.
  void result.catch(() => {});
  await writeDataBackup(writer.writable, revision, exportedAt, options);
  return result;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  try {
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  } finally {
    a.remove();
    // Do not revoke the URL before the browser has started reading a large ZIP.
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
}

type BackupSavePicker = {
  showSaveFilePicker?: (options: {
    suggestedName: string;
    types: { description: string; accept: Record<string, string[]> }[];
  }) => Promise<{ createWritable(): Promise<WritableStream<Uint8Array>> }>;
};
let exporting = false;

export async function exportAndDownload(options: BackupExportOptions = {}): Promise<'saved' | 'cancelled'> {
  if (exporting) throw new Error('A backup export is already running.');
  exporting = true;
  try {
    const revision = backupRevision();
    const exportedAt = new Date().toISOString();
    const filename = `everythingebooks_backup_${exportedAt.split('T')[0]}.zip`;
    options.signal?.throwIfAborted();
    const picker = (window as Window & BackupSavePicker).showSaveFilePicker;
    let handle: Awaited<ReturnType<NonNullable<BackupSavePicker['showSaveFilePicker']>>> | undefined;
    if (picker) {
      // Must be invoked during the click, BEFORE any asynchronous data reads.
      try {
        handle = await picker.call(window, {
          suggestedName: filename,
          types: [{ description: 'EverythingEbooks ZIP backup', accept: { 'application/zip': ['.zip'] } }],
        });
      } catch (error) {
        // Some Chromium configurations expose the API but do not support its
        // picker here. Use the ordinary browser export, as Safari does.
        if (!(error instanceof Error) || !['SecurityError', 'NotSupportedError'].includes(error.name)) throw error;
      }
    }
    if (handle) {
      options.signal?.throwIfAborted();
      const destination = await handle.createWritable();
      await writeDataBackup(destination, revision, exportedAt, options);
    } else {
      const blob = await exportAllData(revision, exportedAt, options);
      options.signal?.throwIfAborted();
      downloadBlob(blob, filename);
    }
    // A failed or canceled write must NEVER mark the backup reminder green.
    recordZip(revision, exportedAt);
    return 'saved';
  } catch (error) {
    if (options.signal?.aborted || (error instanceof Error && error.name === 'AbortError')) return 'cancelled';
    throw error;
  } finally {
    exporting = false;
  }
}

// ============================================
// IMPORT FUNCTIONS
// ============================================

// File picker helper
function selectZipFile(): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip';
    input.onchange = () => {
      const file = input.files?.[0] || null;
      resolve(file);
    };
    input.oncancel = () => resolve(null);
    input.click();
  });
}

// Shared by Import Data and the Library's Reset Library & Authors action.
export async function resetLibraryAndAuthors(onBlocked?: () => void): Promise<void> {
  localStorage.clear();
  sessionStorage.clear();
  for (const name of [EREADER_DB_NAME, AUTHORS_DB_NAME]) {
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase(name);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error || new Error('Could not reset ' + name + '.'));
      // Wait for actual deletion before importing the backup into a new database.
      request.onblocked = () => onBlocked?.();
    });
  }
}

// Keep the picker in the click gesture; confirm before reading the ZIP.
// Verification must still finish before performImport can reset any data.
export async function pickAndValidateBackup(
  confirmImport: () => Promise<boolean>,
  onProgress?: ImportProgressCallback
): Promise<{ zip: BackupArchive; file: File } | { error: string } | null> {
  const file = await selectZipFile();
  if (!file || !await confirmImport()) return null;
  try {
    return { zip: await openBackupArchive(file, onProgress), file };
  } catch {
    return { error: 'Could not verify this EverythingEbooks backup. No data has been reset.' };
  }
}

async function restoreEntry(db: IDBDatabase, storeName: string, record: object): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put(record);
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error || new Error('Could not restore a backup file.'));
  });
}

// Restore one entry at a time; keep the archive itself on disk/in the File.
export async function performImport(zip: BackupArchive, onBlocked?: () => void, onProgress?: ImportProgressCallback): Promise<{ success: boolean; error?: string }> {
  let resetStarted = false;
  const databases = new Map<string, IDBDatabase>();
  const database = async (name: string) => {
    let db = databases.get(name);
    if (!db) {
      db = await openDB(name, name === EREADER_DB_NAME ? EREADER_DB_VERSION : AUTHORS_DB_VERSION);
      databases.set(name, db);
    }
    return db;
  };
  try {
    if (!isVerifiedBackup(zip)) throw new Error('The backup has not been verified.');
    const files = zip.files.filter(entry => entry.filename === 'localStorage.json' ||
      entry.filename.startsWith('ereader/') || entry.filename.startsWith('ereader-manuscript/') ||
      AUTHORS_STORES.some(store => entry.filename.startsWith(`authors/${store}/`)));
    const progress = importProgress('preparing', files, onProgress);
    resetStarted = true;
    await resetLibraryAndAuthors(onBlocked);
    progress.restoring();
    markBackupChanged();
    for (const [key, value] of Object.entries(zip.preferences)) {
      if (!isBackupKey(key)) localStorage.setItem(key, value);
    }
    const preferencesEntry = files.find(entry => entry.filename === 'localStorage.json');
    if (preferencesEntry) progress.completed(preferencesEntry);
    for (const entry of files) {
      const name = entry.filename;
      if (name === 'localStorage.json') continue;
      if (name.startsWith('ereader/')) {
        const path = name.slice('ereader/'.length);
        const content = /\.(json|txt)$/.test(path) ? await backupEntryText(entry, progress.reading) : await backupEntryBlob(entry, undefined, progress.reading);
        await restoreEntry(await database(EREADER_DB_NAME), 'files', { path, content });
      } else if (name.startsWith('ereader-manuscript/')) {
        const relativePath = name.slice('ereader-manuscript/'.length);
        const originalName = relativePath.endsWith('.bin') ? relativePath.slice(0, -4) : relativePath;
        const key = authorsMediaType(originalName) ? originalName : relativePath;
        const value = /\.(xhtml|json)$/.test(key) ? await backupEntryText(entry, progress.reading) : await backupEntryBlob(entry, authorsMediaType(key), progress.reading);
        await restoreEntry(await database(EREADER_DB_NAME), 'manuscript', { key, value });
      } else if (name.startsWith('authors/')) {
        const path = name.slice('authors/'.length);
        const separator = path.indexOf('/');
        const store = path.slice(0, separator);
        if (!(AUTHORS_STORES as readonly string[]).includes(store)) continue;
        const relativePath = path.slice(separator + 1);
        // Older ZIPs appended .json even to media and XHTML; retain their real names.
        const originalName = relativePath.endsWith('.json') ? relativePath.slice(0, -5) : relativePath;
        const key = originalName.endsWith('.xhtml') || authorsMediaType(originalName) ? originalName : relativePath;
        const mediaType = authorsMediaType(key);
        let value: unknown;
        if (mediaType) value = await backupEntryBlob(entry, mediaType, progress.reading);
        // These two Authors APIs return ArrayBuffer, unlike image/audio APIs.
        else if (/\.(epub|docx)$/.test(key)) value = await (await backupEntryBlob(entry, undefined, progress.reading)).arrayBuffer();
        else {
          const text = await backupEntryText(entry, progress.reading);
          if (relativePath.endsWith('.txt')) value = text;
          else {
            try { value = JSON.parse(text); } catch { value = text; }
          }
        }
        await restoreEntry(await database(AUTHORS_DB_NAME), store, { key, value });
      }
      // Count the file only after its IndexedDB transaction has committed.
      progress.completed(entry);
    }
    restoreZip(zip.manifest.exportDate);
    return { success: true };
  } catch (error) {
    if (resetStarted) markBackupChanged();
    console.error('Import failed:', error);
    return { success: false, error: 'Import could not finish. Keep your backup ZIP and try again.' };
  } finally {
    databases.forEach(db => db.close());
    await zip.close();
  }
}

// src/services/dataExportService.ts
// Exports and imports ALL browser storage for this app

import JSZip from 'jszip';
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

async function readBackupStore<T>(name: string, store: string): Promise<T[]> {
  const db = await openForExport(name);
  if (!db) return [];
  try {
    if (!db.objectStoreNames.contains(store)) return [];
    return await new Promise<T[]>((resolve, reject) => {
      const tx = db.transaction(store, 'readonly');
      const request = tx.objectStore(store).getAll();
      tx.oncomplete = () => resolve(request.result);
      tx.onabort = () => reject(tx.error || new Error('Could not read ' + store + ' for the ZIP.'));
    });
  } finally {
    db.close();
  }
}

type FileContent = string | ArrayBuffer | Blob;

// Authors consumes its cover and inline images as Blobs, not text or buffers.
function authorsImageType(filename: string): string | undefined {
  const types: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    avif: 'image/avif', bmp: 'image/bmp',
  };
  return types[filename.split('.').pop()?.toLowerCase() || ''];
}

// ============================================
// Convert content to appropriate format for ZIP
// ============================================

async function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return blob.arrayBuffer();
}

// ============================================
// Main Export Function
// ============================================

export async function exportAllData(
  revision = backupRevision(),
  exportedAt = new Date().toISOString(),
): Promise<Blob> {
  const zip = new JSZip();

  // 1. Add manifest
  const manifest = {
    version: 1,
    app: 'EverythingEbooks',
    exportDate: exportedAt,
    contents: {
      hasLocalStorage: true,
      hasEreader: false,
      hasAuthors: false,
    },
  };

  // 2. Export localStorage
  const localStorageData = { ...exportLocalStorage(), ...backupStateForZip(revision, exportedAt) };
  zip.file('localStorage.json', JSON.stringify(localStorageData, null, 2));

  // 3. Export E-Reader data
  const ereaderFiles = await readBackupStore<{ path: string; content: FileContent }>(EREADER_DB_NAME, 'files');
  if (ereaderFiles.length > 0) {
    manifest.contents.hasEreader = true;
    const ereaderFolder = zip.folder('ereader');
    if (ereaderFolder) {
      for (const file of ereaderFiles) {
        const { path, content } = file;
        // Keep original path exactly as stored in IndexedDB
        const cleanPath = path;

        if (content instanceof Blob) {
          const arrayBuffer = await blobToArrayBuffer(content);
          ereaderFolder.file(cleanPath, new Uint8Array(arrayBuffer));
        } else if (content instanceof ArrayBuffer) {
          ereaderFolder.file(cleanPath, new Uint8Array(content));
        } else if (typeof content === 'string') {
          ereaderFolder.file(cleanPath, content);
        } else {
          // JSON serialize anything else
          ereaderFolder.file(cleanPath, JSON.stringify(content, null, 2));
        }
      }
    }
  }

  // 3b. Export E-Reader manuscript store
  const ereaderManuscript = await readBackupStore<{ key: string; value: FileContent }>(EREADER_DB_NAME, 'manuscript');
  if (ereaderManuscript.length > 0) {
    const manuscriptFolder = zip.folder('ereader-manuscript');
    if (manuscriptFolder) {
      for (const entry of ereaderManuscript) {
        const { key, value } = entry;
        const filename = key.endsWith('.json') || key.endsWith('.xhtml') ||
          key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg')
          ? key
          : `${key}.bin`;

        if (value instanceof Blob) {
          const arrayBuffer = await blobToArrayBuffer(value);
          manuscriptFolder.file(filename, new Uint8Array(arrayBuffer));
        } else if (value instanceof ArrayBuffer) {
          manuscriptFolder.file(filename, new Uint8Array(value));
        } else if (typeof value === 'string') {
          manuscriptFolder.file(filename, value);
        } else {
          manuscriptFolder.file(filename, JSON.stringify(value, null, 2));
        }
      }
    }
  }

  // 4. Export Authors data
  const authorsData = await Promise.all(AUTHORS_STORES.map(async storeName => ({
    storeName, entries: await readBackupStore<{ key: string; value: unknown }>(AUTHORS_DB_NAME, storeName),
  })));
  if (authorsData.some(s => s.entries.length > 0)) {
    manifest.contents.hasAuthors = true;
    const authorsFolder = zip.folder('authors');
    if (authorsFolder) {
      for (const storeData of authorsData) {
        const { storeName, entries } = storeData;
        if (entries.length === 0) continue;

        const storeFolder = authorsFolder.folder(storeName);
        if (!storeFolder) continue;

        for (const entry of entries) {
          const { key, value } = entry;
          // Keep image names identical to the references in Authors metadata/XHTML.
          const filename = key.endsWith('.json') || key.endsWith('.txt') || key.endsWith('.epub') || key.endsWith('.docx') || key.endsWith('.xhtml') || authorsImageType(key)
            ? key
            : `${key}.json`;

          if (value instanceof Blob) {
            const arrayBuffer = await blobToArrayBuffer(value);
            storeFolder.file(filename, new Uint8Array(arrayBuffer));
          } else if (value instanceof ArrayBuffer) {
            storeFolder.file(filename, new Uint8Array(value));
          } else if (typeof value === 'string') {
            storeFolder.file(filename, value);
          } else {
            // JSON serialize objects
            storeFolder.file(filename, JSON.stringify(value, null, 2));
          }
        }
      }
    }
  }

  // 5. Add manifest (now with accurate content flags)
  zip.file('manifest.json', JSON.stringify(manifest, null, 2));

  // 6. Generate ZIP
  return zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });
}

// ============================================
// Download Helper
// ============================================

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ============================================
// One-click Export & Download
// ============================================

export async function exportAndDownload(): Promise<void> {
  const revision = backupRevision();
  const exportedAt = new Date().toISOString();
  const blob = await exportAllData(revision, exportedAt);
  const date = exportedAt.split('T')[0]; // YYYY-MM-DD
  downloadBlob(blob, `everythingebooks_backup_${date}.zip`);
  recordZip(revision, exportedAt);
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

// Validate all archived bytes and required metadata before resetting storage.
const verifiedBackups = new WeakSet<JSZip>();

async function validateBackupZip(zip: JSZip): Promise<boolean> {
  if (verifiedBackups.has(zip)) return true;
  try {
    const manifestFile = zip.file('manifest.json');
    const preferencesFile = zip.file('localStorage.json');
    if (!manifestFile || !preferencesFile) return false;
    const manifest = JSON.parse(await manifestFile.async('string'));
    if (manifest?.app !== 'EverythingEbooks' || manifest.version !== 1) return false;
    const preferences = JSON.parse(await preferencesFile.async('string'));
    if (!preferences || typeof preferences !== 'object' || Array.isArray(preferences)) return false;
    if (Object.values(preferences).some(value => typeof value !== 'string')) return false;
    const files = Object.values(zip.files).filter(file => !file.dir);
    if (manifest.contents?.hasEreader && !files.some(file => file.name.startsWith('ereader/'))) return false;
    if (manifest.contents?.hasAuthors && !files.some(file => file.name.startsWith('authors/'))) return false;
    for (const file of files) {
      await file.async('uint8array');
    }
    verifiedBackups.add(zip);
    return true;
  } catch {
    return false;
  }
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

// Import localStorage from ZIP
async function importLocalStorage(zip: JSZip): Promise<void> {
  const file = zip.file('localStorage.json');
  if (!file) return;

  try {
    const content = await file.async('string');
    const data = JSON.parse(content) as Record<string, string>;
    for (const [key, value] of Object.entries(data)) {
      if (!isBackupKey(key)) localStorage.setItem(key, value);
    }
  } catch (err) {
    console.error('Failed to import localStorage:', err);
    throw err;
  }
}

// Import E-Reader data from ZIP
async function importEreaderData(zip: JSZip): Promise<void> {
  const ereaderFolder = zip.folder('ereader');
  if (!ereaderFolder) return;

  const db = await openDB(EREADER_DB_NAME, EREADER_DB_VERSION);
  try {
    // Import each file
    const files: Array<{ relativePath: string; file: JSZip.JSZipObject }> = [];
    ereaderFolder.forEach((relativePath, file) => {
      if (!file.dir) {
        files.push({ relativePath, file });
      }
    });

    for (const { relativePath, file } of files) {
      // Use path exactly as stored in ZIP (matches original IndexedDB path)
      const fullPath = relativePath;

      // Determine content type and read accordingly
      let content: string | ArrayBuffer;
      if (relativePath.endsWith('.json') || relativePath.endsWith('.txt')) {
        content = await file.async('string');
      } else {
        // Binary file (epub, png, etc.)
        content = await file.async('arraybuffer');
      }

      // Write to IndexedDB
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction('files', 'readwrite');
        const store = tx.objectStore('files');
        store.put({ path: fullPath, content });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error || new Error('Could not restore storage.'));
      });
    }
  } catch (err) {
    console.error('Failed to import E-Reader data:', err);
    throw err;
  } finally {
    db.close();
  }
}

// Import E-Reader manuscript store from ZIP
async function importEreaderManuscript(zip: JSZip): Promise<void> {
  const manuscriptFolder = zip.folder('ereader-manuscript');
  if (!manuscriptFolder) return;

  const db = await openDB(EREADER_DB_NAME, EREADER_DB_VERSION);
  try {
    if (!db.objectStoreNames.contains('manuscript')) throw new Error('Missing manuscript store.');

    const files: Array<{ relativePath: string; file: JSZip.JSZipObject }> = [];
    manuscriptFolder.forEach((relativePath, file) => {
      if (!file.dir) {
        files.push({ relativePath, file });
      }
    });

    for (const { relativePath, file } of files) {
      const key = relativePath;

      let value: string | ArrayBuffer;
      if (relativePath.endsWith('.xhtml') || relativePath.endsWith('.json')) {
        value = await file.async('string');
      } else {
        value = await file.async('arraybuffer');
      }

      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction('manuscript', 'readwrite');
        const store = tx.objectStore('manuscript');
        store.put({ key, value });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error || new Error('Could not restore storage.'));
      });
    }
  } catch (err) {
    console.error('Failed to import E-Reader manuscript data:', err);
    throw err;
  } finally {
    db.close();
  }
}

// Import Authors data from ZIP
async function importAuthorsData(zip: JSZip): Promise<void> {
  const authorsFolder = zip.folder('authors');
  if (!authorsFolder) return;

  const db = await openDB(AUTHORS_DB_NAME, AUTHORS_DB_VERSION);
  try {
    // Import each store
    for (const storeName of AUTHORS_STORES) {
      const storeFolder = authorsFolder.folder(storeName);
      if (!storeFolder) continue;

      const files: Array<{ relativePath: string; file: JSZip.JSZipObject }> = [];
      storeFolder.forEach((relativePath, file) => {
        if (!file.dir) {
          files.push({ relativePath, file });
        }
      });

      for (const { relativePath, file } of files) {
        // Older backups appended .json to chapters AND binary images. Read image
        // bytes directly from those ZIP entries before any text decoding can damage them.
        const originalName = relativePath.endsWith('.json') ? relativePath.slice(0, -5) : relativePath;
        const key = originalName.endsWith('.xhtml') || authorsImageType(originalName) ? originalName : relativePath;
        const imageType = authorsImageType(key);

        // Determine content type and read accordingly
        let value: unknown;
        if (imageType) {
          value = new Blob([await file.async('arraybuffer')], { type: imageType });
        } else if (key.endsWith('.epub') || key.endsWith('.docx')) {
          // Binary file
          value = await file.async('arraybuffer');
        } else if (relativePath.endsWith('.txt')) {
          // Plain text
          value = await file.async('string');
        } else {
          // JSON file - parse it
          const content = await file.async('string');
          try {
            value = JSON.parse(content);
          } catch {
            value = content; // If not valid JSON, store as string
          }
        }

        // Write to IndexedDB
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(storeName, 'readwrite');
          const store = tx.objectStore(storeName);
          store.put({ key, value });
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
          tx.onabort = () => reject(tx.error || new Error('Could not restore storage.'));
        });
      }
    }
  } catch (err) {
    console.error('Failed to import Authors data:', err);
    throw err;
  } finally {
    db.close();
  }
}

// Pick and validate a backup file (returns the zip if valid, null if cancelled/invalid)
export async function pickAndValidateBackup(): Promise<{ zip: JSZip; file: File } | { error: string } | null> {
  const file = await selectZipFile();
  if (!file) {
    return null; // User cancelled
  }

  try {
    const zip = await JSZip.loadAsync(file, { checkCRC32: true });
    const isValid = await validateBackupZip(zip);
    if (!isValid) {
      return { error: 'Invalid backup file. Please select a valid EverythingEbooks backup.' };
    }
    return { zip, file };
  } catch {
    return { error: 'Could not read the backup file. It may be corrupted.' };
  }
}

// Perform the actual import (call after user confirms)
export async function performImport(zip: JSZip, onBlocked?: () => void): Promise<{ success: boolean; error?: string }> {
  let resetStarted = false;
  try {
    if (!await validateBackupZip(zip)) throw new Error('Invalid backup file.');
    const manifest = JSON.parse(await zip.file('manifest.json')!.async('string'));
    resetStarted = true;
    await resetLibraryAndAuthors(onBlocked);
    // An interrupted import remains pending until every part has been restored.
    markBackupChanged();

    // Import from ZIP
    await importLocalStorage(zip);
    await importEreaderData(zip);
    await importEreaderManuscript(zip);
    await importAuthorsData(zip);

    restoreZip(manifest.exportDate);

    return { success: true };
  } catch (err) {
    if (resetStarted) markBackupChanged();
    console.error('Import failed:', err);
    return { success: false, error: 'Import failed. The backup file may be corrupted.' };
  }
}

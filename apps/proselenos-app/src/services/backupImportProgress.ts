export type BackupImportProgress = {
  phase: 'reading' | 'verifying' | 'preparing' | 'restoring';
  filesDone: number;
  filesTotal: number;
  bytesDone: number;
  bytesTotal: number;
};
export type ImportProgressCallback = (progress: BackupImportProgress) => void;

// zip.js reports compressed bytes read. Keep both the current count and total
// in those same units, including for older compressed backups.
export function importProgress(
  phase: BackupImportProgress['phase'],
  entries: { compressedSize: number }[],
  onProgress?: ImportProgressCallback,
) {
  const progress: BackupImportProgress = {
    phase, filesDone: 0, filesTotal: entries.length, bytesDone: 0,
    bytesTotal: entries.reduce((sum, entry) => sum + entry.compressedSize, 0),
  };
  let completedBytes = 0;
  let lastReport = -Infinity;
  const report = (force = false) => {
    const now = Date.now();
    if (force || now - lastReport >= 100) {
      lastReport = now;
      onProgress?.({ ...progress });
    }
  };
  report(true);
  return {
    reading: (bytes: number) => {
      progress.bytesDone = completedBytes + bytes;
      report();
      return undefined;
    },
    completed: (entry: { compressedSize: number }) => {
      progress.filesDone++;
      progress.bytesDone = completedBytes += entry.compressedSize;
      report(true);
    },
    restoring: () => { progress.phase = 'restoring'; report(true); },
  };
}

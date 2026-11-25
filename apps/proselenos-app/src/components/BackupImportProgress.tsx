'use client';

import type { BackupImportProgress as Progress } from '@/services/backupImportProgress';

function size(bytes: number): string {
  return bytes >= 1024 ** 3 ? (bytes / 1024 ** 3).toFixed(2) + ' GB'
    : bytes >= 1024 ** 2 ? (bytes / 1024 ** 2).toFixed(1) + ' MB'
    : (bytes / 1024).toFixed(1) + ' KB';
}

export default function BackupImportProgress({ progress }: { progress: Progress | null }) {
  if (!progress) return null;
  const counting = progress.phase === 'verifying' || progress.phase === 'restoring';
  return <div role="status" aria-live="polite" style={{ marginTop: 16, display: 'grid', gap: 10, lineHeight: 1.5 }}>
    <p style={{ margin: 0 }}>{progress.phase === 'reading' || progress.phase === 'verifying'
      ? 'Step 1 of 2: Checking backup'
      : 'Step 2 of 2: Restoring backup'}</p>
    <p style={{ margin: 0 }}>{progress.phase === 'reading' ? 'Reading your backup…'
      : progress.phase === 'preparing' ? 'Preparing to restore your backup…'
      : `${progress.filesDone} of ${progress.filesTotal} files`}</p>
    {counting && <p style={{ margin: 0 }}>{size(progress.bytesDone)} of {size(progress.bytesTotal)} from ZIP</p>}
    <p style={{ margin: 0 }}>Keep this tab open until the import finishes.</p>
  </div>;
}

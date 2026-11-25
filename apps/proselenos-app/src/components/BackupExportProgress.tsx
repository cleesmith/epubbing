'use client';

import type { BackupProgress } from '@/services/dataExportService';

export default function BackupExportProgress({ progress, onCancel }: {
  progress: BackupProgress | null;
  onCancel: () => void;
}) {
  if (!progress) return null;
  const size = progress.bytesWritten >= 1024 ** 3
    ? (progress.bytesWritten / 1024 ** 3).toFixed(2) + ' GB'
    : (progress.bytesWritten / 1024 ** 2).toFixed(1) + ' MB';
  return <div style={{ marginTop: 16, display: 'grid', gap: 10, lineHeight: 1.5 }}>
    <div role="status" aria-live="polite" style={{ display: 'grid', gap: 8 }}>
      <p style={{ margin: 0 }}>{progress.phase === 'preparing' ? 'Preparing your backup…'
        : progress.phase === 'finishing' ? 'Finishing your ZIP…'
        : `Exporting ${progress.filesDone} of ${progress.filesTotal} files`}</p>
      {progress.phase !== 'preparing' && <p style={{ margin: 0 }}>{size} written</p>}
      <p style={{ margin: 0 }}>Keep this tab open until the export finishes.</p>
    </div>
    <button type="button" onClick={onCancel} style={{ padding: '6px 12px', border: '1px solid currentColor', borderRadius: 6 }}>Cancel export</button>
  </div>;
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { exportAndDownload, type BackupProgress } from '@/services/dataExportService';

export function useBackupExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<BackupProgress | null>(null);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!controller.current) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
      controller.current?.abort();
    };
  }, []);
  const startExport = async () => {
    if (controller.current) return 'cancelled' as const;
    const current = new AbortController();
    controller.current = current;
    setIsExporting(true);
    setProgress({ phase: 'preparing', filesDone: 0, filesTotal: 0, bytesWritten: 0 });
    try {
      return await exportAndDownload({ signal: current.signal, onProgress: setProgress });
    } finally {
      controller.current = null;
      setIsExporting(false);
      setProgress(null);
    }
  };
  return { isExporting, progress, startExport, cancelExport: () => controller.current?.abort() };
}

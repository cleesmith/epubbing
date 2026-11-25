'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Dialog from './Dialog';
import { pickAndValidateBackup, performImport } from '@/services/dataExportService';
import BackupExportProgress from './BackupExportProgress';
import BackupImportProgress from './BackupImportProgress';
import { showImportComplete } from './showImportComplete';
import type { BackupImportProgress as ImportProgress } from '@/services/backupImportProgress';
import { useBackupExport } from '@/hooks/useBackupExport';
import { showAlert, showConfirm } from '@/app/shared/alerts';

export const setStorageDialogVisible = (visible: boolean) => {
  const dialog = document.getElementById('storage_window');
  if (dialog) {
    const event = new CustomEvent('setDialogVisibility', {
      detail: { visible },
    });
    dialog.dispatchEvent(event);
  }
};

interface StorageEstimate {
  usage: number;
  quota: number;
  available: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const StorageWindow = () => {
  const _ = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [storage, setStorage] = useState<StorageEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPersisted, setIsPersisted] = useState<boolean | null>(null);
  const { isExporting, progress, startExport, cancelExport } = useBackupExport();
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState<ImportProgress | null>(null);

  useEffect(() => {
    const handleCustomEvent = (event: CustomEvent) => {
      setIsOpen(event.detail.visible);
    };

    const el = document.getElementById('storage_window');
    if (el) {
      el.addEventListener('setDialogVisibility', handleCustomEvent as EventListener);
    }

    return () => {
      if (el) {
        el.removeEventListener('setDialogVisibility', handleCustomEvent as EventListener);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && navigator.storage) {
      if (navigator.storage.estimate) {
        navigator.storage.estimate()
          .then((estimate) => {
            const usage = estimate.usage || 0;
            const quota = estimate.quota || 0;
            setStorage({
              usage,
              quota,
              available: quota - usage
            });
            setError(null);
          })
          .catch((err) => {
            console.error('Failed to get storage estimate:', err);
            setError(_('Unable to retrieve storage information'));
          });
      }
      if (navigator.storage.persisted) {
        navigator.storage.persisted().then(setIsPersisted);
      }
    }
  }, [isOpen, _]);

  const handleClose = () => {
    cancelExport();
    // Blur any focused element before closing to avoid aria-hidden warning
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsOpen(false);
  };

  const handleExport = async () => {
    try {
      if (await startExport() === 'cancelled') return;
      showAlert(_('Your backup has been exported.'), 'success', _('Export Complete'));
    } catch (err) {
      console.error('Export failed:', err);
      showAlert(err instanceof Error ? err.message : _('The backup could not be exported. Please try again.'), 'error', _('Export incomplete'));
    }
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      // Pick the file, confirm replacement, then verify before resetting any data.
      const result = await pickAndValidateBackup(
        () => showConfirm(
          _('This will reset Library & Authors, then restore your backup. Export your current data first if you want to keep it.'),
          true,
          _('Import Backup?'),
          _('Yes, Import'),
          _('Cancel')
        ),
        setImportProgress
      );
      if (!result) {
        // User cancelled the file picker or replacement confirmation.
        setIsImporting(false);
        return;
      }
      if ('error' in result) {
        showAlert(_(result.error), 'error');
        setIsImporting(false);
        return;
      }

      // Restore the verified backup without another confirmation.
      const importResult = await performImport(result.zip, () => {
        showAlert('Close the other EverythingEbooks tabs so the reset can finish.', 'info');
      }, setImportProgress);
      if (!importResult.success) {
        showAlert(_(importResult.error || 'Import failed'), 'error');
        setIsImporting(false);
        return;
      }

      // Leave success visible until the user chooses OK, then refresh.
      await showImportComplete();
    } catch (err) {
      console.error('Import failed:', err);
      showAlert(_('Import failed. Please try again.'), 'error');
      setIsImporting(false);
    } finally {
      setImportProgress(null);
    }
  };

  return (
    <Dialog
      id='storage_window'
      isOpen={isOpen}
      title={_('Storage: Export & Import')}
      onClose={handleClose}
      boxClassName='sm:!w-[400px] sm:!max-w-screen-sm sm:h-auto'
    >
      {isOpen && (
        <div className='storage-content flex h-full flex-col gap-4 p-4'>
          {error ? (
            <p className='text-red-500'>{error}</p>
          ) : storage ? (
            <>
              <div className='flex flex-col gap-3'>
                <div className='flex justify-between'>
                  <span className='text-neutral-content'>{_('Used')}</span>
                  <span className='font-semibold'>{formatBytes(storage.usage)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-neutral-content'>{_('Available')}</span>
                  <span className='font-semibold'>{formatBytes(storage.available)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-neutral-content'>{_('Protected')}</span>
                  <span className='font-semibold'>
                    {isPersisted === null ? '...' : isPersisted ? _('Yes') : _('No')}
                  </span>
                </div>
              </div>
              <p className='text-xs text-neutral-content mt-2'>
                {isPersisted
                  ? _('Your data is protected from automatic browser cleanup.')
                  : _('Your data may be cleared if the browser runs low on storage. Consider exporting important work.')}
              </p>
              <button
                onClick={handleExport}
                disabled={isExporting || isImporting}
                className='btn btn-primary btn-sm mt-4 w-full'
              >
                {isExporting ? _('Exporting...') : _('Export All Data')}
              </button>
              <BackupExportProgress progress={progress} onCancel={cancelExport} />
              <BackupImportProgress progress={importProgress} />
              <button
                onClick={handleImport}
                disabled={isExporting || isImporting}
                className='btn btn-outline btn-sm mt-2 w-full'
              >
                {isImporting ? _('Importing...') : _('Import Data')}
              </button>
            </>
          ) : (
            <p className='text-neutral-content'>{_('Loading storage information...')}</p>
          )}
        </div>
      )}
    </Dialog>
  );
};

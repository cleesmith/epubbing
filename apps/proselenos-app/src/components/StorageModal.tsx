'use client';

import { useEffect, useState } from 'react';
import StyledSmallButton from '@/components/StyledSmallButton';
import { ThemeConfig } from '../app/shared/theme';
import { pickAndValidateBackup, performImport } from '@/services/dataExportService';
import BackupExportProgress from './BackupExportProgress';
import BackupImportProgress from './BackupImportProgress';
import { showImportComplete } from './showImportComplete';
import type { BackupImportProgress as ImportProgress } from '@/services/backupImportProgress';
import { useBackupExport } from '@/hooks/useBackupExport';
import { showAlert, showConfirm } from '@/app/shared/alerts';

interface StorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  theme: ThemeConfig;
}

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

export default function StorageModal({
  isOpen,
  onClose,
  isDarkMode,
  theme
}: StorageModalProps) {
  const [storage, setStorage] = useState<StorageEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPersisted, setIsPersisted] = useState<boolean | null>(null);
  const { isExporting, progress, startExport, cancelExport } = useBackupExport();
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState<ImportProgress | null>(null);

  const handleExport = async () => {
    try {
      if (await startExport() === 'cancelled') return;
      showAlert('Your backup has been exported.', 'success', 'Export Complete', isDarkMode);
    } catch (err) {
      console.error('Export failed:', err);
      showAlert(err instanceof Error ? err.message : 'The backup could not be exported. Please try again.', 'error', 'Export incomplete', isDarkMode);
    }
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      // Pick the file, confirm replacement, then verify before resetting any data.
      const result = await pickAndValidateBackup(
        () => showConfirm(
          'This will reset Library & Authors, then restore your backup. Export your current data first if you want to keep it.',
          isDarkMode,
          'Import Backup?',
          'Yes, Import',
          'Cancel'
        ),
        setImportProgress
      );
      if (!result) {
        // User cancelled the file picker or replacement confirmation.
        setIsImporting(false);
        return;
      }
      if ('error' in result) {
        showAlert(result.error, 'error', undefined, isDarkMode);
        setIsImporting(false);
        return;
      }

      // Restore the verified backup without another confirmation.
      const importResult = await performImport(result.zip, () => {
        showAlert('Close the other EverythingEbooks tabs so the reset can finish.', 'info');
      }, setImportProgress);
      if (!importResult.success) {
        showAlert(importResult.error || 'Import failed', 'error', undefined, isDarkMode);
        setIsImporting(false);
        return;
      }

      // Leave success visible until the user chooses OK, then refresh.
      await showImportComplete(isDarkMode);
    } catch (err) {
      console.error('Import failed:', err);
      showAlert('Import failed. Please try again.', 'error', undefined, isDarkMode);
      setIsImporting(false);
    } finally {
      setImportProgress(null);
    }
  };

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
            setError('Unable to retrieve storage information');
          });
      }
      if (navigator.storage.persisted) {
        navigator.storage.persisted().then(setIsPersisted);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: isDarkMode ? '#222' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
        borderRadius: '12px',
        maxWidth: '400px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${isDarkMode ? '#333' : '#e5e7eb'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Storage: Export & Import
          </h2>
          <StyledSmallButton onClick={onClose} theme={theme} disabled={isExporting}>
            Close
          </StyledSmallButton>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {error ? (
            <p style={{ color: '#ef4444', margin: 0 }}>{error}</p>
          ) : storage ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Used</span>
                  <span style={{ fontWeight: '600' }}>{formatBytes(storage.usage)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Available</span>
                  <span style={{ fontWeight: '600' }}>{formatBytes(storage.available)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Protected</span>
                  <span style={{ fontWeight: '600' }}>
                    {isPersisted === null ? '...' : isPersisted ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              <p style={{
                marginTop: '20px',
                fontSize: '12px',
                color: isDarkMode ? '#6b7280' : '#9ca3af',
                lineHeight: '1.5'
              }}>
                {isPersisted
                  ? 'Your data is protected from automatic browser cleanup.'
                  : 'Your data may be cleared if the browser runs low on storage. Consider exporting important work.'}
              </p>
              <button
                onClick={handleExport}
                disabled={isExporting || isImporting}
                style={{
                  marginTop: '20px',
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: (isExporting || isImporting) ? 'not-allowed' : 'pointer',
                  opacity: (isExporting || isImporting) ? 0.7 : 1,
                }}
              >
                {isExporting ? 'Exporting...' : 'Export All Data'}
              </button>
              <BackupExportProgress progress={progress} onCancel={cancelExport} />
              <BackupImportProgress progress={importProgress} />
              <button
                onClick={handleImport}
                disabled={isExporting || isImporting}
                style={{
                  marginTop: '10px',
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: 'transparent',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: (isExporting || isImporting) ? 'not-allowed' : 'pointer',
                  opacity: (isExporting || isImporting) ? 0.7 : 1,
                }}
              >
                {isImporting ? 'Importing...' : 'Import Data'}
              </button>
            </div>
          ) : (
            <p style={{ margin: 0, color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
              Loading storage information...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

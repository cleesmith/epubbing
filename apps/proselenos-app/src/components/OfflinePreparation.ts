import Swal from 'sweetalert2';
import type { OfflineProgress } from '@/services/offlinePreparation';

let running = false;
type PrepareUpdate = (onProgress: (progress: OfflineProgress) => void, signal: AbortSignal) => Promise<void>;

export async function showOfflinePreparation(isDark: boolean, prepare: PrepareUpdate): Promise<boolean> {
  if (running) return false;
  running = true;
  const operation = new AbortController();
  const dialog = Swal.fire({
    background: isDark ? '#222' : '#fff',
    color: isDark ? '#fff' : '#333',
    confirmButtonColor: '#3085d6',
    title: 'Update App',
    text: 'Loading the latest app version…',
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      const container = Swal.getContainer();
      if (container) container.style.zIndex = '10200';
    },
    willClose: () => operation.abort(),
  });
  try {
    await prepare(({ phase, completed, total }) => {
      if (operation.signal.aborted) return;
      const message = phase === 'checking'
        ? 'Checking the updated application files…'
        : `${phase === 'saving' ? 'Saving' : 'Verifying'} application files for offline use: ${completed} of ${total}`;
      Swal.update({ text: `${message}\nStay online and keep this tab open until the update finishes.` });
    }, operation.signal);
    if (operation.signal.aborted) return false;
    Swal.update({
      title: 'Updated and ready for offline use',
      text: 'The app and its offline files are ready. Reopening the updated app…',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
    });
    // Keep the completion visible briefly, then continue without another click.
    const timer = setTimeout(() => Swal.close(), 1500);
    await dialog;
    clearTimeout(timer);
    return true;
  } catch (error) {
    if (operation.signal.aborted) return false;
    Swal.update({
      title: 'Update incomplete',
      text: error instanceof Error ? error.message : 'Check your connection and available browser storage, then try again.',
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'Close',
      showCancelButton: false,
      allowOutsideClick: true,
    });
    await dialog;
    return false;
  } finally {
    running = false;
  }
}

import Swal from 'sweetalert2';
import type { OfflineProgress } from '@/services/offlinePreparation';

let running = false;
type PrepareUpdate = (onProgress: (progress: OfflineProgress) => void, signal: AbortSignal) => Promise<void>;

export async function showOfflinePreparation(
  isDark: boolean,
  prepare: PrepareUpdate,
  mode: 'update' | 'setup' = 'update',
): Promise<boolean> {
  if (running) return false;
  running = true;
  const setup = mode === 'setup';
  let fileTotal = 0;
  const operation = new AbortController();
  const dialog = Swal.fire({
    background: isDark ? '#222' : '#fff',
    color: isDark ? '#fff' : '#333',
    confirmButtonColor: '#3085d6',
    width: 'min(48rem, calc(100vw - 2rem))',
    title: setup ? 'Preparing EverythingEbooks' : 'Update App',
    text: setup ? 'Getting the complete app ready in this browser…' : 'Loading the latest app version…',
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
      fileTotal = total;
      const message = phase === 'checking'
        ? 'Checking the application files…'
        : `${phase === 'saving' ? 'Saving' : 'Verifying'} application files for offline use: ${completed} of ${total}`;
      Swal.update({ text: `${message}\nStay online and keep this tab open until ${setup ? 'setup' : 'the update'} finishes.` });
    }, operation.signal);
    if (operation.signal.aborted) return false;
    Swal.update({
      title: setup ? 'Ready to write and read offline' : 'Updated and ready for offline use',
      html: `<div style="display:grid;gap:0.8rem;line-height:1.5">
        ${fileTotal > 0 ? `<p style="margin:0">${fileTotal} application files saved and verified.</p>` : ''}
        <p style="margin:0">${setup ? 'EverythingEbooks is ready in this browser.' : 'The app and its offline files are ready.'}</p>
        <p style="margin:0">${setup ? 'Bookmark everythingebooks.org to return to it, even offline.' : 'Choose OK to reopen the updated app.'}</p>
      </div>`,
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });
    // Leave the verified total visible until the author acknowledges it.
    const result = await dialog;
    return result.isConfirmed;
  } catch (error) {
    if (operation.signal.aborted) return false;
    Swal.update({
      title: setup ? 'Setup incomplete' : 'Update incomplete',
      text: (error instanceof Error ? error.message : 'Check your connection and available browser storage, then try again.')
        + (setup ? '\nSetup will try again the next time you open EE online. You can also choose Update App.' : ''),
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

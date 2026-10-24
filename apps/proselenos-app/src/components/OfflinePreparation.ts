import Swal from 'sweetalert2';
import { prepareForOffline } from '@/services/offlinePreparation';

let running = false;

export async function showOfflinePreparation(isDark: boolean): Promise<void> {
  if (running) return;
  running = true;
  const operation = new AbortController();
  const theme = {
    background: isDark ? '#222' : '#fff',
    color: isDark ? '#fff' : '#333',
    confirmButtonColor: '#3085d6',
    didOpen: () => {
      const container = Swal.getContainer();
      if (container) container.style.zIndex = '10200';
    },
  };
  try {
    const introduction = await Swal.fire({
      ...theme,
      title: 'Write and read without internet',
      html: [
        '<p>This saves what Everything Ebooks needs on this device, so you can write, read, and create books without an internet connection. Your books and writing will stay as they are.</p>',
        '<p style="margin-top: 1em"><strong>First, bookmark everythingebooks.org in this browser.</strong> Use that bookmark in this same browser to return when you are offline. To bookmark this page, press <strong>⌘D on a Mac</strong> or <strong>Ctrl+D on Windows</strong>.</p>',
        '<p style="margin-top: 1em">Choose <strong>Prepare now</strong>, stay connected to the internet, and keep this tab open until you see <strong>Ready for offline use</strong>. This may take a few minutes.</p>',
      ].join(''),
      showCancelButton: true,
      confirmButtonText: 'Prepare now',
      cancelButtonText: 'Not now',
    });
    if (!introduction.isConfirmed) return;

    void Swal.fire({
      ...theme,
      title: 'Prep for offline use',
      text: 'Checking application files…',
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
      willClose: () => operation.abort(),
    });
    await prepareForOffline(({ phase, completed, total }) => {
      if (operation.signal.aborted) return;
      const message = phase === 'checking'
        ? 'Checking application files…'
        : `${phase === 'saving' ? 'Saving' : 'Verifying'} application files: ${completed} of ${total}`;
      Swal.update({ text: `${message}\nKeep this tab open until preparation finishes.` });
    }, operation.signal);
    if (operation.signal.aborted) return;
    // Reuse the dialog so closing the progress view cannot cancel a new one.
    Swal.update({
      title: 'Ready for offline use',
      text: 'Everything Ebooks is ready to use without internet in this browser. Use your everythingebooks.org bookmark to return. Run preparation again after an app update.',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Done',
      showCancelButton: false,
      allowOutsideClick: true,
    });
  } catch (error) {
    if (operation.signal.aborted) return;
    Swal.update({
      title: 'Preparation incomplete',
      text: error instanceof Error ? error.message : 'Check your connection and available browser storage, then try again.',
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'Close',
      showCancelButton: false,
      allowOutsideClick: true,
    });
  } finally {
    running = false;
  }
}

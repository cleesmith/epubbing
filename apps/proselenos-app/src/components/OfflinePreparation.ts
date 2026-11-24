import Swal from 'sweetalert2';
import type { OfflineProgress } from '@/services/offlinePreparation';

let running = false;
type PrepareUpdate = (onProgress: (progress: OfflineProgress) => void, signal: AbortSignal) => Promise<void>;

// Real paragraphs keep each step readable; newlines in SweetAlert's text
// option are collapsed by the browser. textContent also keeps errors as text.
function messageLines(lines: string[], countLine = -1): string {
  const content = document.createElement('div');
  Object.assign(content.style, { display: 'grid', gap: '1rem', lineHeight: '1.5' });
  lines.forEach((line, index) => {
    const paragraph = document.createElement('p');
    paragraph.style.margin = '0';
    paragraph.textContent = line;
    if (index === countLine) {
      Object.assign(paragraph.style, { fontSize: '1.3em', fontWeight: '600', fontVariantNumeric: 'tabular-nums' });
    }
    content.appendChild(paragraph);
  });
  // SweetAlert replaces a string's markup on update; an HTMLElement is appended.
  return content.outerHTML;
}

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
    html: messageLines([
      setup ? 'Getting the complete app ready in this browser…' : 'Loading the latest app version…',
      'Stay online and keep this tab open.',
    ]),
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
      const instruction = `Stay online and keep this tab open until ${setup ? 'setup' : 'the update'} finishes.`;
      Swal.update({ html: phase === 'checking'
        ? messageLines(['Checking the application files…', instruction])
        : messageLines([
          `${phase === 'saving' ? 'Saving' : 'Verifying'} application files for offline use`,
          `${completed} of ${total} files`,
          instruction,
        ], 1),
      });
    }, operation.signal);
    if (operation.signal.aborted) return false;
    Swal.update({
      title: setup ? 'Ready to write and read offline' : 'Updated and ready for offline use',
      html: messageLines([
        ...(fileTotal > 0 ? [`${fileTotal} application files saved and verified.`] : []),
        setup ? 'EverythingEbooks is ready in this browser.' : 'The app and its offline files are ready.',
        setup ? 'Bookmark everythingebooks.org to return to it, even offline.' : 'Choose OK to reopen the updated app.',
      ]),
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
      html: messageLines([
        ...(error instanceof Error ? error.message : 'Check your connection and available browser storage, then try again.').split(/\r?\n/).filter(Boolean),
        ...(setup ? ['Setup will try again the next time you open EE online.', 'You can also choose Update App.'] : []),
      ]),
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

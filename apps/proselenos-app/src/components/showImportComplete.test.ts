// @vitest-environment node
import { afterEach, expect, it, vi } from 'vitest';
import Swal from 'sweetalert2';
import { showImportComplete } from './showImportComplete';

vi.mock('sweetalert2', () => ({ default: { fire: vi.fn(), getContainer: vi.fn() } }));
afterEach(() => { vi.useRealTimers(); vi.resetAllMocks(); vi.unstubAllGlobals(); });

it('keeps success open without a timer or dismissal shortcuts and reloads only after OK', async () => {
  vi.useFakeTimers();
  const reload = vi.fn();
  vi.stubGlobal('window', { location: { reload } });
  let respond!: (result: { isConfirmed: boolean; isDenied: boolean; isDismissed: boolean }) => void;
  vi.mocked(Swal.fire).mockImplementation(() => new Promise(resolve => { respond = resolve; }));
  const completion = showImportComplete(false);
  const options = vi.mocked(Swal.fire).mock.calls[0]![0];
  expect(options).toMatchObject({ confirmButtonText: 'OK', showConfirmButton: true,
    showCancelButton: false, showCloseButton: false, allowOutsideClick: false, allowEscapeKey: false,
    background: '#fff' });
  expect(options).not.toHaveProperty('timer');
  await vi.advanceTimersByTimeAsync(60_000);
  expect(reload).not.toHaveBeenCalled();
  respond({ isConfirmed: true, isDenied: false, isDismissed: false });
  await completion;
  expect(reload).toHaveBeenCalledOnce();
});

it('does not reload if another dialog replaces the success message', async () => {
  const reload = vi.fn();
  vi.stubGlobal('window', { location: { reload } });
  vi.mocked(Swal.fire).mockResolvedValue({ isConfirmed: false, isDenied: false, isDismissed: true });
  await showImportComplete();
  expect(reload).not.toHaveBeenCalled();
});

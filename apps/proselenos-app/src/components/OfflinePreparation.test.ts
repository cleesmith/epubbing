import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Swal from 'sweetalert2';
import { showOfflinePreparation } from './OfflinePreparation';

vi.mock('sweetalert2', () => ({ default: { fire: vi.fn(), update: vi.fn(), close: vi.fn(), getContainer: vi.fn() } }));
let dismiss: () => void;
let confirm: () => void;
let options: { willClose?: () => void };
beforeEach(() => {
  vi.clearAllMocks(); vi.useFakeTimers();
  vi.mocked(Swal.fire).mockImplementation((value: unknown) => {
    options = value as typeof options;
    return new Promise(resolve => {
      dismiss = () => { options.willClose?.(); resolve({ isConfirmed: false, isDenied: false, isDismissed: true }); };
      confirm = () => { options.willClose?.(); resolve({ isConfirmed: true, isDenied: false, isDismissed: false }); };
    });
  });
  vi.mocked(Swal.close).mockImplementation(() => dismiss());
});
afterEach(() => vi.useRealTimers());

it('starts immediately, displays counts, and waits for OK before completing the update', async () => {
  const prepare = vi.fn(async progress => {
    progress({ phase: 'saving', completed: 12, total: 270 });
    progress({ phase: 'verifying', completed: 270, total: 270 });
  });
  const result = showOfflinePreparation(true, prepare);
  const completed = vi.fn();
  void result.then(completed);
  expect(prepare).toHaveBeenCalledOnce();
  expect(Swal.fire).toHaveBeenCalledOnce();
  expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: 'Update App', showConfirmButton: false }));
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ text: expect.stringContaining('12 of 270') }));
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ text: expect.stringContaining('270 of 270') }));
  await vi.advanceTimersByTimeAsync(60_000);
  expect(completed).not.toHaveBeenCalled();
  expect(Swal.close).not.toHaveBeenCalled();
  expect(Swal.update).toHaveBeenLastCalledWith(expect.objectContaining({
    title: 'Updated and ready for offline use',
    html: expect.stringContaining('270 application files saved and verified.'),
    showConfirmButton: true, confirmButtonText: 'OK', showCancelButton: false,
  }));
  confirm();
  expect(await result).toBe(true);
});

it('does not report readiness on a failed preparation', async () => {
  const result = showOfflinePreparation(false, async () => { throw new Error('Storage is full'); });
  await Promise.resolve();
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ title: 'Update incomplete', text: 'Storage is full' }));
  dismiss();
  expect(await result).toBe(false);
});

it('cancels the operation without showing success', async () => {
  const result = showOfflinePreparation(false, async (_progress, signal) => {
    await new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason)));
  });
  dismiss();
  expect(await result).toBe(false);
  expect(Swal.update).not.toHaveBeenCalledWith(expect.objectContaining({ icon: 'success' }));
});

it('starts first setup without an Update click and keeps its completed total visible until OK', async () => {
  const result = showOfflinePreparation(false, async progress => {
    progress({ phase: 'saving', completed: 1, total: 270 });
    progress({ phase: 'verifying', completed: 270, total: 270 });
  }, 'setup');
  expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
    title: 'Preparing EverythingEbooks', showConfirmButton: false,
  }));
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ text: expect.stringContaining('1 of 270') }));
  await vi.advanceTimersByTimeAsync(60_000);
  expect(Swal.close).not.toHaveBeenCalled();
  expect(Swal.update).toHaveBeenLastCalledWith(expect.objectContaining({
    title: 'Ready to write and read offline',
    html: expect.stringContaining('270 application files saved and verified.'),
    showConfirmButton: true, confirmButtonText: 'OK',
  }));
  const content = document.createElement('div');
  content.innerHTML = String(vi.mocked(Swal.update).mock.lastCall?.[0].html);
  expect(Array.from(content.querySelectorAll('p'), line => line.textContent)).toEqual([
    '270 application files saved and verified.',
    'EverythingEbooks is ready in this browser.',
    'Bookmark everythingebooks.org to return to it, even offline.',
  ]);
  confirm();
  expect(await result).toBe(true);
});

it('does not continue to a reload if another dialog replaces the completion message', async () => {
  const result = showOfflinePreparation(false, async () => {});
  await Promise.resolve();
  dismiss();
  expect(await result).toBe(false);
});

it('explains that incomplete first setup will retry', async () => {
  const result = showOfflinePreparation(false, async () => { throw new Error('Connection lost'); }, 'setup');
  await Promise.resolve();
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({
    title: 'Setup incomplete', text: expect.stringContaining('next time you open EE online'),
  }));
  dismiss();
  expect(await result).toBe(false);
});

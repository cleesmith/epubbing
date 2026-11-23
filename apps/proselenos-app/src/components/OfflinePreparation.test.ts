import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Swal from 'sweetalert2';
import { showOfflinePreparation } from './OfflinePreparation';

vi.mock('sweetalert2', () => ({ default: { fire: vi.fn(), update: vi.fn(), close: vi.fn(), getContainer: vi.fn() } }));
let dismiss: () => void;
let options: { willClose?: () => void };
beforeEach(() => {
  vi.clearAllMocks(); vi.useFakeTimers();
  vi.mocked(Swal.fire).mockImplementation((value: unknown) => {
    options = value as typeof options;
    return new Promise(resolve => { dismiss = () => { options.willClose?.(); resolve({ isConfirmed: false, isDenied: false, isDismissed: true }); }; });
  });
  vi.mocked(Swal.close).mockImplementation(() => dismiss());
});
afterEach(() => vi.useRealTimers());

it('starts immediately, displays counts, then finishes without an introduction or a second click', async () => {
  const prepare = vi.fn(async progress => {
    progress({ phase: 'saving', completed: 12, total: 270 });
    progress({ phase: 'verifying', completed: 270, total: 270 });
  });
  const result = showOfflinePreparation(true, prepare);
  expect(prepare).toHaveBeenCalledOnce();
  expect(Swal.fire).toHaveBeenCalledOnce();
  expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: 'Update App', showConfirmButton: false }));
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ text: expect.stringContaining('12 of 270') }));
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ text: expect.stringContaining('270 of 270') }));
  await vi.advanceTimersByTimeAsync(1500);
  expect(await result).toBe(true);
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ title: 'Updated and ready for offline use' }));
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

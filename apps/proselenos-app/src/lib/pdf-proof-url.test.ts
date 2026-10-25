import { afterEach, expect, it, vi } from 'vitest';
import { createPdfProofUrl } from './pdf-proof-url';
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
it('retains a proof until its viewer closes, then releases it', () => {
  vi.useFakeTimers();
  const revoke = vi.fn();
  vi.stubGlobal('URL', Object.assign(URL, { createObjectURL: () => 'blob:proof', revokeObjectURL: revoke }));
  const viewer = { closed: false, opener: window };
  vi.spyOn(window, 'open').mockReturnValue(viewer as unknown as Window);
  const proof = createPdfProofUrl(new Blob(['pdf']));
  expect(proof.open()).toBe(true);
  proof.release();
  expect(revoke).not.toHaveBeenCalled();
  viewer.closed = true;
  vi.advanceTimersByTime(2000);
  expect(revoke).toHaveBeenCalledExactlyOnceWith('blob:proof');
});

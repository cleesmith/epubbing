import { afterEach, expect, it, vi } from 'vitest';
import { checkEpub, checkOutcome, formatCheckReport, type EpubCheckResult } from './epubCheck';
const clean: EpubCheckResult = { valid: true, exitCode: 0, version: '5.4.0', messages: [], summary: null, stdout: 'No errors or warnings detected.', stderr: '' };
class FakeWorker {
  static last: FakeWorker;
  onmessage?: (event: { data: unknown }) => void;
  onerror?: (event: { preventDefault: () => void }) => void;
  onmessageerror?: () => void;
  terminate = vi.fn(); postMessage = vi.fn();
  constructor(public url: string) { FakeWorker.last = this; }
}
afterEach(() => vi.unstubAllGlobals());
it('never calls an unsuccessful run a pass and distinguishes warnings', () => {
  expect(checkOutcome({ ...clean, valid: false, exitCode: 1 })).toContain('did not pass');
  expect(checkOutcome({ ...clean, messages: [{ id: 'RSC-005', severity: 'ERROR', message: 'Broken XML' }] })).toContain('errors found');
  expect(checkOutcome({ ...clean, messages: [{ id: 'OPF-003', severity: 'WARNING', message: 'Unlisted file' }] })).toContain('warnings found');
});
it('formats readable text identifying variant, version, and locations', () => {
  const text = formatCheckReport({ title: 'A book', variant: 'authors', filename: 'A-book.epub', checkedAt: '2026-10-30T12:00:00Z', elapsedMs: 1250,
    result: { ...clean, valid: false, exitCode: 1, messages: [{ id: 'RSC-007', severity: 'ERROR', message: 'Missing file.', path: 'OEBPS/chapter.xhtml', line: 4, column: 12, suggestion: 'Review the link.' }] } });
  for (const value of ['Checked: Authors EPUB', 'EPUBCheck: 5.4.0', '1.3 seconds', 'OEBPS/chapter.xhtml, line 4, column 12', 'Review the link.']) expect(text).toContain(value);
});
it('hard-stops the worker on cancellation', async () => {
  vi.stubGlobal('Worker', FakeWorker);
  const controller = new AbortController();
  const promise = checkEpub(new Blob(['book']), 'book.epub', { signal: controller.signal, onProgress: vi.fn() });
  expect(FakeWorker.last.url).toContain('/epubcheck/worker.js');
  controller.abort();
  await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
  expect(FakeWorker.last.terminate).toHaveBeenCalledOnce();
});
it('forwards progress, accepts completion, and frees the worker', async () => {
  vi.stubGlobal('Worker', FakeWorker);
  const onProgress = vi.fn();
  const promise = checkEpub(new Blob(['book']), 'book.epub', { signal: new AbortController().signal, onProgress });
  FakeWorker.last.onmessage?.({ data: { type: 'progress', message: 'Checking…', detail: 'A chapter' } });
  FakeWorker.last.onmessage?.({ data: { type: 'complete', result: clean } });
  await expect(promise).resolves.toEqual(clean);
  expect(onProgress).toHaveBeenCalledWith('Checking…', 'A chapter');
  expect(FakeWorker.last.terminate).toHaveBeenCalledOnce();
});
it('rejects an incomplete response', async () => {
  vi.stubGlobal('Worker', FakeWorker);
  const promise = checkEpub(new Blob(['book']), 'book.epub', { signal: new AbortController().signal, onProgress: vi.fn() });
  FakeWorker.last.onmessage?.({ data: { type: 'complete', result: { ...clean, exitCode: null } } });
  await expect(promise).rejects.toThrow('complete validation result');
});

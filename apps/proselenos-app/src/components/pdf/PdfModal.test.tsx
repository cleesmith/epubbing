import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Book } from '@/types/book';
import PdfModal from './PdfModal';
const mocks = vi.hoisted(() => ({ render: vi.fn(), open: vi.fn(), release: vi.fn(), proof: vi.fn(), env: { getAppService: async () => ({ openFile: async () => ({ arrayBuffer: async () => new ArrayBuffer(0) }) }) } }));
vi.mock('@/context/EnvContext', () => ({ useEnv: () => ({ envConfig: mocks.env }) }));
vi.mock('@/utils/book', () => ({ getLocalBookFilename: () => 'book.epub', formatPublisher: (v: string) => v }));
vi.mock('jszip', () => ({ default: { loadAsync: async () => ({}) } }));
vi.mock('book-pdf', () => ({ pdf: (element: any) => ({ toBlob: (options: any) => mocks.render(options, element.props.onRender) }) }));
vi.mock('@/lib/epub-to-pdf', () => ({
  getSpineItems: async () => ['one.xhtml'],
  extractChapters: async (_: any, __: any, checkpoint: any) => { await checkpoint(0, 1); return [{ title: 'One', html: '<p>Some text.</p>', id: 'one' }]; },
  extractCopyrightHtml: async () => null,
  resolveTitlePageText: async () => ({ title: 'Book' }),
  resetElementKeyCounter: () => {}, BookDocument: () => null,
}));
vi.mock('@/lib/pdf-proof-url', () => ({ createPdfProofUrl: mocks.proof }));
const book = { hash: 'proof', title: 'Book', author: 'Author', format: 'EPUB' } as Book;
const show = (close = vi.fn()) => render(<PdfModal book={book} bookMeta={null} isOpen onClose={close} includeToc={false} includeChapterHeadings={false} />);
beforeEach(() => {
  vi.clearAllMocks();
  mocks.open.mockReturnValue(true);
  mocks.proof.mockReturnValue({ url: 'blob:proof', open: mocks.open, release: mocks.release });
  mocks.render.mockImplementation(async (_options, onRender) => {
    onRender({ _INTERNAL__LAYOUT__DATA_: { children: [{}, {}, {}] } });
    return new Blob(['pdf']);
  });
});
afterEach(cleanup);
it('offers the finished proof on a deliberate click and never opens the print dialog', async () => {
  const print = vi.spyOn(window, 'print');
  const view = show();
  const link = await screen.findByRole('link', { name: 'Download a PDF proof' });
  expect(screen.getByText('3 pages · 6 × 9 inches')).toBeTruthy();
  expect(mocks.open).not.toHaveBeenCalled();
  fireEvent.click(link); expect(mocks.open).toHaveBeenCalledOnce();
  expect(print).not.toHaveBeenCalled();
  view.unmount(); expect(mocks.release).toHaveBeenCalledOnce(); print.mockRestore();
});
it('shows real page activity, elapsed time and remaining steps without a percentage bar', async () => {
  mocks.render.mockImplementation(async ({ onProgress }) => {
    onProgress({ stage: 'paginate', completed: 17 });
    return new Promise(() => {});
  });
  show();
  await screen.findByText('Arranging pages… 17 pages so far');
  expect(screen.getByText('Time elapsed: 0m 0s')).toBeTruthy();
  expect(screen.getByRole('list', { name: 'PDF preparation steps' })).toBeTruthy();
  expect(screen.queryByRole('progressbar')).toBeNull();
});
it('cancels the active render and ignores a late result', async () => {
  let finish: (blob: Blob) => void = () => {};
  mocks.render.mockImplementation(() => new Promise(resolve => { finish = resolve; }));
  const close = vi.fn(); show(close);
  await waitFor(() => expect(mocks.render).toHaveBeenCalledOnce());
  fireEvent.click(screen.getByText('Cancel'));
  expect(mocks.render.mock.calls[0]![0].signal.aborted).toBe(true);
  finish(new Blob(['pdf']));
  await waitFor(() => expect(close).toHaveBeenCalledOnce());
  expect(mocks.proof).not.toHaveBeenCalled();
});

import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Book } from '@/types/book';
import type { PaperbackCoverResult } from '@/lib/paperback-cover-browser';
import PaperbackCoverModal from './PaperbackCoverModal';
const mocked = vi.hoisted(() => {
  const service = { openFile: vi.fn(), writeFile: vi.fn(), deleteFile: vi.fn() };
  return { ...service, envConfig: { getAppService: async () => service }, files: new Map<string, string>(), generate: vi.fn(), prepare: vi.fn(), normalize: vi.fn(), createUrl: vi.fn(), revokeUrl: vi.fn() };
});
vi.mock('@/context/EnvContext', () => ({ useEnv: () => ({ envConfig: mocked.envConfig }) }));
vi.mock('@/utils/book', () => ({ getLocalBookFilename: () => 'book.epub', getPaperbackFrontFilename: (b: Book) => `${b.hash}/paperback-front.json` }));
vi.mock('jszip', () => ({ default: { loadAsync: async () => ({ loadedEpub: true }) } }));
vi.mock('@/lib/epub-to-pdf', () => ({ getSpineItems: async () => ['chapter.xhtml'], resolveTitlePageText: async () => ({ title: 'Book title' }) }));
vi.mock('@/lib/epub-cover', () => ({ extractEpubCover: async () => new Blob(['epub cover']) }));
vi.mock('@/lib/paperback-cover-browser', () => ({ generatePaperbackCover: mocked.generate, prepareFrontImage: mocked.prepare, normalizeFrontUpload: mocked.normalize }));
const book = { hash: 'one', format: 'EPUB', title: 'Book title', author: 'Clee Smith', createdAt: 1, updatedAt: 1 } as Book;
const result = () => ({ blob: new Blob(['PDF'], { type: 'application/pdf' }), warnings: ['The image may look blurry in print.'], dimensions: { pdfPages: 300, printPages: 300, spine: 0.75, width: 13, height: 9.25 } });
const open = (onClose = vi.fn()) => render(<PaperbackCoverModal book={book} bookMeta={null} isOpen onClose={onClose} />);
const calculate = (pages = '300') => { fireEvent.change(screen.getByLabelText('Page count'), { target: { value: pages } }); fireEvent.click(screen.getByText('Calculate dimensions')); };
beforeEach(() => {
  vi.clearAllMocks();
  mocked.files.clear();
  mocked.openFile.mockImplementation(async (path: string) => {
    if (path.endsWith('paperback-front.json')) {
      if (!mocked.files.has(path)) throw new Error(`File not found: ${path}`);
      return { text: async () => mocked.files.get(path) };
    }
    return { arrayBuffer: async () => new ArrayBuffer(0) };
  });
  mocked.writeFile.mockImplementation(async (path: string, _base: string, content: string) => { mocked.files.set(path, content); });
  mocked.deleteFile.mockImplementation(async (path: string) => { mocked.files.delete(path); });
  mocked.prepare.mockImplementation(async (_blob: Blob, fit: string) => ({ dataUrl: 'data:image/jpeg;base64,eA==', sourceWidth: 1838, sourceHeight: 2775, dpi: 300, fit, warnings: [] }));
  mocked.normalize.mockImplementation(async (file: File) => ({ name: file.name.replace(/\.[^.]*$/, '.jpg'), jpeg: 'data:image/jpeg;base64,eA==' }));
  mocked.generate.mockResolvedValue(result());
  mocked.createUrl.mockReturnValue('blob:cover');
  vi.stubGlobal('URL', Object.assign(URL, { createObjectURL: mocked.createUrl, revokeObjectURL: mocked.revokeUrl }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe('separate paperback-cover calculator', () => {
  it('requires the PDF page count and recalculation after changing paper', () => {
    open();
    expect((screen.getByText('Calculate dimensions') as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByLabelText('Binding type') as HTMLInputElement).value).toBe('Paperback');
    expect((screen.getByLabelText('Interior trim size') as HTMLInputElement).value).toBe('6 × 9 inches');
    expect(screen.getByRole('link', { name: /KDP’s cover calculator/ }).getAttribute('href')).toBe('https://kdp.amazon.com/cover-calculator');
    calculate('301');
    expect(screen.getByRole('table')).toBeTruthy(); expect(screen.getByText('302')).toBeTruthy();
    fireEvent.change(screen.getByLabelText('Interior type'), { target: { value: 'standard-color' } });
    expect(screen.queryByRole('table')).toBeNull();
    expect((screen.getByLabelText('Paper type') as HTMLSelectElement).disabled).toBe(true);
    fireEvent.change(screen.getByLabelText('Page count'), { target: { value: '40' } });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByText(/KDP lists 72–600/)).toBeTruthy();
    expect((screen.getByText('Calculate dimensions') as HTMLButtonElement).disabled).toBe(false);
  });
  it('accepts 830 for cover calculation and blocks 871 with the calculator range', () => {
    open();
    fireEvent.change(screen.getByLabelText('Interior type'), { target: { value: 'standard-color' } });
    calculate('830');
    expect(screen.getByRole('table')).toBeTruthy();
    expect(screen.queryByRole('alert')).toBeNull();
    const input = screen.getByLabelText('Page count');
    expect(input.getAttribute('min')).toBe('24');
    expect(input.getAttribute('max')).toBe('830');
    fireEvent.change(input, { target: { value: '871' } });
    expect(screen.getByRole('alert').textContent).toContain('Page count must be between 24–830. This PDF has 871 pages.');
    expect(screen.queryByRole('table')).toBeNull();
    expect((screen.getByText('Calculate dimensions') as HTMLButtonElement).disabled).toBe(true);
  });
  it('creates a cover using the EPUB and count, preserving the warnings', async () => {
    const close = vi.fn(); open(close);
    fireEvent.change(screen.getByLabelText('Paper type'), { target: { value: 'cream' } }); calculate();
    expect(screen.getByText('0.7500 inches')).toBeTruthy();
    fireEvent.change(screen.getByLabelText('Back-cover text'), { target: { value: 'A quiet valley.' } });
    await waitFor(() => expect((screen.getByText('Create cover PDF') as HTMLButtonElement).disabled).toBe(false), { timeout: 5000 });
    fireEvent.click(screen.getByText('Create cover PDF'));
    await screen.findByRole('link', { name: 'Download cover PDF' });
    expect(mocked.openFile).toHaveBeenCalledWith('book.epub', 'Books');
    expect(mocked.generate).toHaveBeenCalledWith({ loadedEpub: true }, 300, { paper: 'bw-cream', backText: 'A quiet valley.' }, 'Book title', 'Clee Smith', expect.any(Function), expect.objectContaining({ fit: 'fill' }));
    expect(screen.queryByText('Download interior PDF')).toBeNull();
    expect(screen.getByText('The image may look blurry in print.')).toBeTruthy();
    fireEvent.click(screen.getByText('Close')); expect(close).toHaveBeenCalledOnce(); expect(mocked.revokeUrl).toHaveBeenCalledWith('blob:cover');
  });
  it('limits back text and rejects text that does not fit', async () => {
    open(); calculate();
    fireEvent.change(screen.getByLabelText('Back-cover text'), { target: { value: 'a'.repeat(1600) } });
    expect((screen.getByLabelText('Back-cover text') as HTMLTextAreaElement).value.length).toBe(1500);
    fireEvent.change(screen.getByLabelText('Back-cover text'), { target: { value: 'A\n'.repeat(70) } });
    expect((await screen.findByRole('alert')).textContent).toContain('Shorten it');
    expect((screen.getByText('Create cover PDF') as HTMLButtonElement).disabled).toBe(true);
  });
  it('ignores a late cover after cancellation', async () => {
    let finish!: (value: PaperbackCoverResult) => void;
    mocked.generate.mockImplementationOnce(() => new Promise<PaperbackCoverResult>(resolve => { finish = resolve; }));
    const close = vi.fn(); open(close); calculate();
    await waitFor(() => expect((screen.getByText('Create cover PDF') as HTMLButtonElement).disabled).toBe(false), { timeout: 5000 });
    fireEvent.click(screen.getByText('Create cover PDF'));
    await waitFor(() => expect(mocked.generate).toHaveBeenCalledOnce());
    fireEvent.click(screen.getByText('Cancel')); finish(result());
    await waitFor(() => expect(close).toHaveBeenCalledOnce()); expect(mocked.createUrl).not.toHaveBeenCalled();
  });
  it('saves one uploaded image and its placement per ebook, reloads it, and replaces it', async () => {
    const view = open(); calculate();
    const input = await screen.findByLabelText('Choose front-cover image');
    fireEvent.change(input, { target: { files: [new File(['first'], 'print-cover.png', { type: 'image/png' })] } });
    await screen.findByText('print-cover.jpg · Saved with this ebook');
    fireEvent.change(screen.getByLabelText('Image placement'), { target: { value: 'border' } });
    await waitFor(() => expect(JSON.parse(mocked.files.get('one/paperback-front.json')!).fit).toBe('border'));
    view.unmount(); open(); calculate();
    await screen.findByText('print-cover.jpg · Saved with this ebook');
    expect((screen.getByLabelText('Image placement') as HTMLSelectElement).value).toBe('border');
    fireEvent.change(screen.getByLabelText('Choose front-cover image'), { target: { files: [new File(['next'], 'new-cover.jpg', { type: 'image/jpeg' })] } });
    await screen.findByText('new-cover.jpg · Saved with this ebook');
    expect(mocked.files.size).toBe(1);
    expect(JSON.parse(mocked.files.get('one/paperback-front.json')!).name).toBe('new-cover.jpg');
    fireEvent.click(screen.getByText('Use EPUB cover'));
    await screen.findByText('Using the EPUB cover');
    expect(mocked.files.size).toBe(0);
  });
  it('reports a failed save without replacing the saved image', async () => {
    const saved = JSON.stringify({ version: 1, name: 'saved.jpg', jpeg: 'data:image/jpeg;base64,eA==', fit: 'fill' });
    mocked.files.set('one/paperback-front.json', saved);
    open(); calculate(); await screen.findByText('saved.jpg · Saved with this ebook');
    mocked.writeFile.mockRejectedValueOnce(new Error('Storage is full.'));
    fireEvent.change(screen.getByLabelText('Choose front-cover image'), { target: { files: [new File(['next'], 'next.png', { type: 'image/png' })] } });
    expect((await screen.findByRole('alert')).textContent).toContain('was not saved');
    expect(mocked.files.get('one/paperback-front.json')).toBe(saved);
  });
});

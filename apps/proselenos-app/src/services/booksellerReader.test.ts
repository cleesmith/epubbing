import { afterEach, expect, it, vi } from 'vitest';
import JSZip from 'jszip';
import { EPUB } from 'foliate-js/epub.js';
import { generateEpubFromWorkingCopy } from '@/lib/epub-generator';
import { publishedReviewFragment, readPublishedReview } from '@/utils/published-review';
import { useBookDataStore } from '@/store/bookDataStore';
import { useLibraryStore } from '@/store/libraryStore';
import type { WorkingCopySection } from './manuscriptStorage';
import type { AppService } from '@/types/system';
import type { Book } from '@/types/book';
import { BOOKSELLER_TEMP_HASH, prepareBooksellerReader } from './booksellerReader';

const book = { hash: 'saved-book', title: 'The Book', format: 'EPUB', author: 'Writer' } as Book;
const sections: WorkingCopySection[] = [
  { id: 'title-page', title: 'Title Page', type: 'title-page', xhtml: '' },
  { id: 'copyright', title: 'Copyright', type: 'copyright', xhtml: '<p>My rights.</p>' },
  { id: 'old-074', title: 'Second title, now first', type: 'chapter', sourceHref: 'old/text/ch-2.xhtml', xhtml: '<p>Newly saved first chapter words.</p>' },
  { id: 'old-001', title: 'First title, now second', type: 'chapter', xhtml: '<p>Newly saved second chapter words.</p>' },
  { id: 'appendix', title: 'Afterword', type: 'section', xhtml: '<p>The final words.</p>' },
  { id: 'private', title: 'Author Notes', type: 'no-matter', xhtml: '<p>My private words.</p>' },
  { id: 'empty', title: 'Still to be written', type: 'chapter', xhtml: '' },
  { id: 'blank-paragraph', title: 'Empty section', type: 'section', xhtml: '<p></p>' },
];
const arrayBuffer = (blob: Blob) => new Promise<ArrayBuffer>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result as ArrayBuffer);
  reader.onerror = reject;
  reader.readAsArrayBuffer(blob);
});
afterEach(() => {
  useLibraryStore.setState({ library: [] });
  useBookDataStore.setState({ booksData: {} });
});

it.each([0, 1, 2, 3, 4, 5, 6, 7])('opens the selected published section using the real EPUB reader resolver (section %s)', async index => {
  const bytes = await generateEpubFromWorkingCopy({
    title: book.title, author: book.author, language: 'en', coverImageId: null,
    sectionIds: sections.map(s => s.id),
  }, sections);
  const originalBytes = bytes.slice();
  const request = readPublishedReview(publishedReviewFragment(book.hash, sections[index]))!;
  let preview: File | undefined;
  const previousConfig = { location: 'epubcfi(/6/12)', viewSettings: { fontSize: 22 } };
  const saveBookConfig = vi.fn();
  const service = {
    openFile: vi.fn(async () => ({ arrayBuffer: async () => bytes.buffer })),
    writeFile: vi.fn(async (_path: string, _base: string, file: File) => { preview = file; }),
    loadBookConfig: vi.fn(async () => previousConfig), saveBookConfig,
  } as unknown as AppService;
  useLibraryStore.setState({ library: [book] });
  useBookDataStore.setState({ booksData: { [BOOKSELLER_TEMP_HASH]: { id: 'stale' } as never } });
  expect(await prepareBooksellerReader(service, book, request.href)).toBe(BOOKSELLER_TEMP_HASH);
  expect(previousConfig.location).toBe('epubcfi(/6/12)');
  expect(saveBookConfig.mock.calls[0]![0].hash).toBe(BOOKSELLER_TEMP_HASH);
  expect(saveBookConfig.mock.calls[0]![1]).toMatchObject({ location: request.href, viewSettings: { fontSize: 22 } });
  expect(service.writeFile).toHaveBeenCalledWith(`${BOOKSELLER_TEMP_HASH}/bookseller.epub`, 'Books', expect.any(File));
  expect(useBookDataStore.getState().booksData[BOOKSELLER_TEMP_HASH]).toBeUndefined();
  expect(useLibraryStore.getState().library.find(b => b.hash === book.hash)).toBe(book);
  expect(bytes).toEqual(originalBytes);

  const zip = await JSZip.loadAsync(await arrayBuffer(preview!));
  const reader = new EPUB({
    entries: Object.keys(zip.files).map(filename => ({ filename })),
    loadText: async (path: string) => zip.file(path)?.async('string') ?? null,
    loadBlob: async (path: string) => zip.file(path)?.async('blob') ?? null,
    getSize: () => 1,
    sha1: vi.fn(),
  });
  await reader.init();
  const target = reader.resolveHref(saveBookConfig.mock.calls[0]![1].location);
  expect(target?.index).toBeGreaterThanOrEqual(0);
  expect(reader.sections?.[target!.index]?.id).toBe(request.href);
  expect(zip.file('OEBPS/nomatter/private.xhtml')).toBeNull();
  const authors = await JSZip.loadAsync(bytes);
  expect(await authors.file('OEBPS/nomatter/private.xhtml')!.async('string')).toContain('My private words.');
  for (const section of sections.slice(2, 5)) {
    const published = new DOMParser().parseFromString(await zip.file(`OEBPS/${section.id}.xhtml`)!.async('string'), 'application/xhtml+xml');
    const written = new DOMParser().parseFromString(section.xhtml, 'text/html').body.textContent;
    expect(published.querySelector('p')?.textContent).toBe(written);
  }
});

it('does not expose a temporary preview when preparing the EPUB fails', async () => {
  const service = { openFile: vi.fn(async () => { throw new Error('Read failed'); }), writeFile: vi.fn() } as unknown as AppService;
  useLibraryStore.setState({ library: [book] });
  await expect(prepareBooksellerReader(service, book)).rejects.toThrow('Read failed');
  expect(service.writeFile).not.toHaveBeenCalled();
  expect(useLibraryStore.getState().library).toEqual([book]);
});

it('does not treat ordinary Library fragments or external URLs as review requests', () => {
  expect(readPublishedReview('#chapter-3')).toBeNull();
  expect(readPublishedReview('#ee-review=book&section=https://elsewhere.test/chapter.xhtml')).toBeNull();
  expect(readPublishedReview('#ee-review=book&section=OEBPS/../chapter.xhtml')).toBeNull();
});

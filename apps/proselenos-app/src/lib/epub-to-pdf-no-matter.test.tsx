import type { ReactElement } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import JSZip from 'jszip';
import { pdf } from 'book-pdf';
import { generateEpubFromWorkingCopy } from './epub-generator';
import { extractChapters, getSpineItems, generatePdfFromEpub, type ChapterData } from './epub-to-pdf';
import { generatePdfFromEpubSquare } from './epub-to-pdf-square';
import { generatePdfFromEpub5x8 } from './epub-to-pdf-5x8';

vi.mock('book-pdf', () => ({
  Document: 'document', Page: 'page', Text: 'text', View: 'view', Image: 'image',
  StyleSheet: { create: (styles: unknown) => styles },
  pdf: vi.fn(() => ({ toBlob: async () => new Blob(['test PDF']) })),
}));

async function makeBook() {
  const bytes = await generateEpubFromWorkingCopy(
    { title: 'Test book', author: 'Writer', language: 'en', coverImageId: null, sectionIds: ['story', 'published-notes', 'private'] },
    [
      { id: 'story', title: 'Story', type: 'chapter', xhtml: '<p>Keep every story word.</p>' },
      { id: 'published-notes', title: "Author's Notes", type: 'afterword', xhtml: '<p>These notes are intended for readers.</p>' },
      { id: 'private', title: 'No matter', type: 'no-matter', xhtml: '<p>PRIVATE WORKING NOTES</p>' },
    ],
  );
  const zip = await JSZip.loadAsync(bytes);
  // Non-linear content outside EE's No Matter folder can be published content.
  const opf = await zip.file('OEBPS/content.opf')!.async('string');
  zip.file('OEBPS/content.opf', opf.replace('idref="published-notes"', 'idref="published-notes" linear="no"'));
  return zip;
}

beforeEach(() => {
  vi.mocked(pdf).mockClear();
  vi.stubGlobal('open', vi.fn());
  vi.stubGlobal('URL', class extends URL {
    static override createObjectURL() { return 'blob:pdf-proof'; }
  });
});
afterEach(() => vi.unstubAllGlobals());

it('excludes private notes from PDF content without changing the source EPUB', async () => {
  const zip = await makeBook();
  const before = await zip.file('OEBPS/nomatter/private.xhtml')!.async('string');
  const spine = await getSpineItems(zip);
  expect(spine).not.toContain('OEBPS/nomatter/private.xhtml');
  expect(spine).toContain('OEBPS/published-notes.xhtml');
  const chapters = await extractChapters(zip, spine);
  expect(chapters.map(chapter => chapter.title)).toEqual(['Story', "Author's Notes"]);
  expect(chapters[0]!.html).toContain('Keep every story word.');
  expect(chapters[1]!.html).toContain('These notes are intended for readers.');
  expect(await zip.file('OEBPS/nomatter/private.xhtml')!.async('string')).toBe(before);
});

it.each([
  ['6x9', generatePdfFromEpub],
  ['square', generatePdfFromEpubSquare],
  ['5x8', generatePdfFromEpub5x8],
] as const)('omits No Matter from the content sent to the %s PDF renderer', async (_size, generate) => {
  const zip = await makeBook();
  const bytes = await zip.generateAsync({ type: 'arraybuffer' });
  await generate(bytes, { title: 'Test book', author: 'Writer', includeToc: true });
  expect(pdf).toHaveBeenCalledOnce();
  const document = vi.mocked(pdf).mock.calls[0]![0] as ReactElement<{ chapters: ChapterData[] }>;
  expect(document.props.chapters.map(chapter => chapter.title)).toEqual(['Story', "Author's Notes"]);
  expect(JSON.stringify(document.props.chapters)).not.toContain('PRIVATE WORKING NOTES');
});

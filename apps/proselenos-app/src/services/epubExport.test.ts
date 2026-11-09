import { expect, it, vi } from 'vitest';
import JSZip from 'jszip';
import type { Book } from '@/types/book';
import type { AppService } from '@/types/system';
import { prepareEpubExport } from './epubExport';
import { generateEpubFromWorkingCopy } from '@/lib/epub-generator';
import type { WorkingCopySection } from './manuscriptStorage';
vi.mock('@/utils/book', () => ({ getLocalBookFilename: () => 'book/book.epub', getPaperbackSettingsFilename: () => 'book/settings.json', getPaperbackFrontFilename: () => 'book/front.json' }));
vi.mock('@/utils/misc', () => ({ makeSafeFilename: (value: string) => value }));
const book = { hash: 'book', title: 'Words', format: 'EPUB' } as Book;
const arrayBuffer = (blob: Blob) => new Promise<ArrayBuffer>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result as ArrayBuffer); reader.onerror = reject; reader.readAsArrayBuffer(blob); });
it('prepares both export variants, carries saved author settings, and writes nothing', async () => {
  const original = new JSZip();
  original.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
  original.file('OEBPS/chapter.xhtml', '<html><body><p>The words stay here.</p></body></html>');
  original.file('OEBPS/meta.json', '{"scene":"private"}');
  const bytes = await original.generateAsync({ type: 'arraybuffer' });
  const settings = { version: 1, pages: '100', paper: 'bw-white', backText: 'Back cover', backgroundColor: '#ffffff', frontFit: 'fill' };
  const writeFile = vi.fn();
  const service = { writeFile, openFile: vi.fn(async (name: string) => {
    if (name === 'book/book.epub') return { arrayBuffer: async () => bytes };
    if (name === 'book/settings.json') return { text: async () => JSON.stringify(settings) };
    throw new Error('File not found: ' + name);
  }) } as unknown as AppService;
  const authors = await prepareEpubExport(service, book, 'authors');
  const authorZip = await JSZip.loadAsync(await arrayBuffer(authors.blob));
  expect(authors.filename).toBe('Words.epub');
  expect(JSON.parse(await authorZip.file('META-INF/ee-paperback/settings.json')!.async('string')).settings.pages).toBe('100');
  expect(await authorZip.file('OEBPS/chapter.xhtml')!.async('string')).toContain('The words stay here.');
  const sellers = await prepareEpubExport(service, book, 'booksellers');
  const sellerZip = await JSZip.loadAsync(await arrayBuffer(sellers.blob));
  expect(sellers.filename).toBe('Words-booksellers.epub');
  expect(sellerZip.file('META-INF/ee-paperback/settings.json')).toBeNull();
  expect(sellerZip.file('OEBPS/meta.json')).toBeNull();
  expect(await sellerZip.file('OEBPS/chapter.xhtml')!.async('string')).toContain('The words stay here.');
  expect(await original.file('OEBPS/meta.json')!.async('string')).toBe('{"scene":"private"}');
  expect(writeFile).not.toHaveBeenCalled();
});
it('does not read or prepare a cancelled export', async () => {
  const controller = new AbortController(); controller.abort();
  const openFile = vi.fn();
  await expect(prepareEpubExport({ openFile } as unknown as AppService, book, 'authors', { signal: controller.signal })).rejects.toMatchObject({ name: 'AbortError' });
  expect(openFile).not.toHaveBeenCalled();
});

it('excludes No Matter only from Booksellers, retaining chapter words and the Authors/enhanced source', async () => {
  const sections: WorkingCopySection[] = [
    { id: 'story', title: 'Story', type: 'chapter', xhtml: '<p>All the story words. <a id="note-link" epub:type="noteref" role="doc-noteref" href="nomatter/private.xhtml#note"><em>My note</em></a> More words.</p><p><a href="https://example.org/OEBPS/nomatter/private.xhtml">External link</a></p>' },
    { id: 'published-notes', title: "Author's Notes", type: 'afterword', xhtml: '<p>These published notes belong in the book.</p>' },
    { id: 'private', title: 'Private drafts', type: 'no-matter', xhtml: '<p id="note">PRIVATE DRAFT WORDS</p>' },
  ];
  const bytes = await generateEpubFromWorkingCopy({ title: 'Words', author: 'Writer', language: 'en', coverImageId: null, sectionIds: sections.map(s => s.id) }, sections);
  const original = await JSZip.loadAsync(bytes);
  // An older EPUB can also have a note entry in the EPUB 2 navigation.
  const ncx = await original.file('OEBPS/toc.ncx')!.async('string');
  original.file('OEBPS/toc.ncx', ncx.replace('</navMap>', '<navPoint id="private-point" playOrder="99"><navLabel><text>Private drafts</text></navLabel><content src="nomatter/private.xhtml#note"/></navPoint></navMap>'));
  // Non-linear alone must not remove a published section outside No Matter.
  const opf = await original.file('OEBPS/content.opf')!.async('string');
  original.file('OEBPS/content.opf', opf.replace('idref="published-notes"', 'idref="published-notes" linear="no"'));
  const sourceBytes = await original.generateAsync({ type: 'arraybuffer' });
  const sourceCopy = sourceBytes.slice(0);
  const writeFile = vi.fn();
  const service = { writeFile, openFile: vi.fn(async (name: string) => {
    if (name === 'book/book.epub') return { arrayBuffer: async () => sourceBytes };
    throw new Error('File not found: ' + name);
  }) } as unknown as AppService;
  const sellers = await prepareEpubExport(service, book, 'booksellers');
  const sellerZip = await JSZip.loadAsync(await arrayBuffer(sellers.blob));
  expect(Object.keys(sellerZip.files).some(path => path.startsWith('OEBPS/nomatter/'))).toBe(false);
  const parse = async (path: string) => new DOMParser().parseFromString(await sellerZip.file(path)!.async('string'), 'application/xml');
  const packageDoc = await parse('OEBPS/content.opf');
  expect(packageDoc.querySelector('item[id="private"], itemref[idref="private"]')).toBeNull();
  expect(packageDoc.querySelector('itemref[idref="published-notes"]')).not.toBeNull();
  const contents = await parse('OEBPS/contents.xhtml');
  expect(contents.querySelector('.toc-section-header')).toBeNull();
  expect(contents.querySelector('a[href="published-notes.xhtml"]')?.textContent).toBe("Author's Notes");
  const nav = await parse('OEBPS/nav.xhtml');
  expect(nav.querySelector('li > span')).toBeNull();
  expect((await parse('OEBPS/toc.ncx')).querySelector('[id="private-point"]')).toBeNull();
  const story = await parse('OEBPS/story.xhtml');
  const originalStory = new DOMParser().parseFromString(await original.file('OEBPS/story.xhtml')!.async('string'), 'application/xml');
  expect(story.querySelector('body')?.textContent).toBe(originalStory.querySelector('body')?.textContent);
  expect(story.getElementById('note-link')?.hasAttribute('href')).toBe(false);
  expect(story.getElementById('note-link')?.querySelector('em')?.textContent).toBe('My note');
  expect(story.querySelector('a[href^="https:"]')).not.toBeNull();
  for (const path of Object.keys(sellerZip.files).filter(path => /\.(xhtml|opf|ncx)$/.test(path))) {
    const content = await sellerZip.file(path)!.async('string');
    expect(content).not.toContain('PRIVATE DRAFT WORDS');
    const doc = new DOMParser().parseFromString(content, 'application/xml');
    expect(doc.querySelector('parsererror')).toBeNull();
    for (const element of Array.from(doc.querySelectorAll('[href], content[src]'))) {
      const href = element.getAttribute('href') || element.getAttribute('src')!;
      if (/^https?:/.test(href)) continue;
      const target = decodeURIComponent(new URL(href, `https://epub.invalid/${path}`).pathname).slice(1);
      expect(sellerZip.file(target), `${path}: ${href}`).not.toBeNull();
    }
  }
  // The enhanced reader uses the saved original. Authors exports retain the
  // same section files and contents/navigation, even after a Booksellers export.
  expect(sourceBytes).toEqual(sourceCopy);
  const authors = await prepareEpubExport(service, book, 'authors');
  const authorZip = await JSZip.loadAsync(await arrayBuffer(authors.blob));
  for (const path of ['OEBPS/nomatter/private.xhtml', 'OEBPS/contents.xhtml', 'OEBPS/nav.xhtml', 'OEBPS/content.opf']) {
    expect(await authorZip.file(path)!.async('string')).toBe(await original.file(path)!.async('string'));
  }
  expect(writeFile).not.toHaveBeenCalled();
});

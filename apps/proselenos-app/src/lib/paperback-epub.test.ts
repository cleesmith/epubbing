// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import JSZip from 'jszip';
import type { Book } from '@/types/book';
import type { AppService } from '@/types/system';
import { addPaperbackSetup, loadPaperbackSetup } from './paperback-epub';
import { stripEpubForBookseller } from './bookseller-strip';

vi.mock('@/utils/book', () => ({
  getLocalBookFilename: (book: Book) => `${book.hash}/book.epub`,
  getPaperbackSettingsFilename: (book: Book) => `${book.hash}/paperback-cover.json`,
  getPaperbackFrontFilename: (book: Book) => `${book.hash}/paperback-front.json`,
}));

const setupPath = 'META-INF/ee-paperback/settings.json';
const book = { hash: 'original', format: 'EPUB' } as Book;
const imported = { hash: 'imported', format: 'EPUB' } as Book;
const jpeg = 'data:image/jpeg;base64,AAAA';
const settings = { version: 1, pages: '700', paper: 'standard-color', backText: '',
  backgroundColor: '#2d38c8', frontFit: 'fill', backMode: 'image',
  backImage: { version: 1, name: 'back.jpg', jpeg, sourceWidth: 1838, sourceHeight: 2228 } };
const front = { version: 1, name: 'front.jpg', jpeg, fit: 'fill' };

function service() {
  const files = new Map<string, File>();
  const openFile = vi.fn(async (path: string) => {
    const file = files.get(path);
    if (!file) throw new Error(`File not found: ${path}`);
    return file;
  });
  const writeFile = vi.fn();
  return { files, openFile, writeFile, app: { openFile, writeFile } as unknown as AppService };
}

function source() {
  const zip = new JSZip();
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
  zip.file('META-INF/container.xml', '<container><rootfiles><rootfile full-path="OEBPS/content.opf"/></rootfiles></container>');
  zip.file('OEBPS/content.opf', '<package><manifest><item id="cover" href="images/cover.jpg" media-type="image/jpeg"/></manifest><spine/></package>');
  zip.file('OEBPS/chapter.xhtml', '<html><body><p>A chapter.</p></body></html>');
  zip.file('OEBPS/images/cover.jpg', 'normal ebook cover');
  return zip;
}

function local(s: ReturnType<typeof service>, data: object = settings) {
  s.files.set('original/paperback-cover.json', new File([JSON.stringify(data)], 'settings.json'));
  s.files.set('original/paperback-front.json', new File([JSON.stringify(front)], 'front.json'));
}

describe('Authors EPUB paperback setup', () => {
  it('round-trips saved settings and both uploaded images under a new book hash, without PDFs or storage writes', async () => {
    const original = source(), s = service(); local(s);
    const oldChapter = await original.file('OEBPS/chapter.xhtml')!.async('string');
    await addPaperbackSetup(original, s.app, book);
    const bytes = await original.generateAsync({ type: 'uint8array' });
    const exported = await JSZip.loadAsync(bytes);
    expect(Object.keys(exported.files).filter(name => !exported.files[name]!.dir && name.startsWith('META-INF/ee-paperback/'))).toEqual([setupPath]);
    expect(Object.keys(exported.files).some(name => /\.pdf$/i.test(name))).toBe(false);
    expect(await exported.file('OEBPS/chapter.xhtml')!.async('string')).toBe(oldChapter);
    const target = service();
    target.files.set('imported/book.epub', new File([new Uint8Array(bytes)], 'authors.epub'));
    expect(await loadPaperbackSetup(target.app, imported)).toEqual({ settings, front, frontStored: false, imageError: '' });
    expect(target.writeFile).not.toHaveBeenCalled();
    // Downloading again before opening/saving the calculator preserves the setup.
    await addPaperbackSetup(exported, target.app, imported);
    expect(JSON.parse(await exported.file(setupPath)!.async('string'))).toEqual({ version: 1, settings, front });
  });

  it('Booksellers removes all private print data while retaining the normal ebook cover and chapter', async () => {
    const zip = source(), s = service(); local(s);
    await addPaperbackSetup(zip, s.app, book);
    zip.file('META-INF/ee-paperback/future/cover.pdf', '%PDF-1.7');
    await stripEpubForBookseller(zip);
    expect(Object.keys(zip.files).some(name => name.startsWith('META-INF/ee-paperback/'))).toBe(false);
    expect(Object.keys(zip.files).some(name => /\.pdf$/i.test(name))).toBe(false);
    expect(await zip.file('OEBPS/images/cover.jpg')!.async('string')).toBe('normal ebook cover');
    expect(await zip.file('OEBPS/chapter.xhtml')!.async('string')).toContain('A chapter.');
    expect(await zip.file('OEBPS/content.opf')!.async('string')).toContain('images/cover.jpg');
  });

  it('local saved edits replace an older imported snapshot, including clearing a custom front image', async () => {
    const zip = source(), s = service(); local(s);
    await addPaperbackSetup(zip, s.app, book);
    const revised = { ...settings, pages: '200', paper: 'bw-cream', backMode: 'text', backText: 'Revised blurb', backImage: null };
    local(s, revised); s.files.delete('original/paperback-front.json');
    await addPaperbackSetup(zip, s.app, book);
    expect(JSON.parse(await zip.file(setupPath)!.async('string'))).toEqual({ version: 1, settings: revised, front: null });
  });

  it('serializes only settings and selected artwork, never PDF fields or inactive back content', async () => {
    const zip = source(), s = service();
    local(s, { ...settings, backText: 'Inactive text', pdf: '%PDF', backImage: { ...settings.backImage, pdf: '%PDF' } });
    s.files.set('original/paperback-front.json', new File([JSON.stringify({ ...front, pdf: '%PDF' })], 'front.json'));
    await addPaperbackSetup(zip, s.app, book);
    const text = await zip.file(setupPath)!.async('string');
    expect(text).not.toContain('%PDF'); expect(text).not.toContain('Inactive text');
    expect(JSON.parse(text)).toEqual({ version: 1, settings, front });
  });

  it('leaves an EPUB without saved paperback data free of private print data', async () => {
    const zip = source(), s = service(), names = Object.keys(zip.files);
    await addPaperbackSetup(zip, s.app, book);
    expect(Object.keys(zip.files)).toEqual(names);
  });

  it('rejects malformed imported settings for Authors, but Booksellers can still strip them', async () => {
    const zip = source(), s = service();
    zip.file(setupPath, JSON.stringify({ version: 99, settings, front }));
    await expect(addPaperbackSetup(zip, s.app, book)).rejects.toThrow(/unreadable/);
    await stripEpubForBookseller(zip);
    expect(zip.file(setupPath)).toBeNull();
  });

  it('does not silently export without a saved front image when reading that image fails', async () => {
    const zip = source(), s = service(); local(s);
    s.files.set('original/paperback-front.json', new File(['invalid JSON'], 'front.json'));
    await expect(addPaperbackSetup(zip, s.app, book)).rejects.toThrow(/could not be loaded/);
    expect(zip.file(setupPath)).toBeNull();
  });
});

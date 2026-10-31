import { describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import { parseEpub } from '@/services/epubService';
import { containsOnlyNavigation } from './epub-content';
import { generateEpubFromWorkingCopy } from './epub-generator';

const parse = (value: string) => new DOMParser().parseFromString(value, 'application/xml');
const readBlob = (blob: Blob) => new Promise<ArrayBuffer>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result as ArrayBuffer);
  reader.onerror = () => reject(reader.error);
  reader.readAsArrayBuffer(blob);
});

async function fixture() {
  const zip = new JSZip();
  zip.file('META-INF/container.xml', '<container><rootfiles><rootfile full-path="OEBPS/content.opf"/></rootfiles></container>');
  zip.file('OEBPS/content.opf', '<package><metadata><title>Example</title><creator>Writer</creator><language>en</language></metadata><manifest><item id="image" href="original-cover.png" media-type="image/png" properties="cover-image"/><item id="wrapper" href="wrap.xhtml" media-type="application/xhtml+xml" properties="svg"/><item id="opening" href="start.xhtml" media-type="application/xhtml+xml"/><item id="chapter" href="chapter.xhtml" media-type="application/xhtml+xml"/><item id="nav" href="toc.xhtml" media-type="application/xhtml+xml" properties="nav"/></manifest><spine><itemref idref="wrapper"/><itemref idref="opening"/><itemref idref="chapter"/></spine></package>');
  zip.file('OEBPS/original-cover.png', Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aBZkAAAAASUVORK5CYII='), c => c.charCodeAt(0)));
  zip.file('OEBPS/wrap.xhtml', '<html xmlns="http://www.w3.org/1999/xhtml"><head><title>"Cover"</title></head><body><svg xmlns="http://www.w3.org/2000/svg" xmlns:asset="http://www.w3.org/1999/xlink" viewBox="0 0 1 1"><image asset:href="original-cover.png" width="1" height="1"/></svg></body></html>');
  zip.file('OEBPS/start.xhtml', '<html xmlns="http://www.w3.org/1999/xhtml"><head><title>Opening</title></head><body><h1 id="begin">Example</h1><p>Keep this opening notice and these credits.</p><h2 id="contents">Contents</h2><a href="chapter.xhtml">Chapter</a></body></html>');
  zip.file('OEBPS/chapter.xhtml', '<html xmlns="http://www.w3.org/1999/xhtml"><head><title>Chapter</title></head><body><p>Every story word remains.</p></body></html>');
  zip.file('OEBPS/toc.xhtml', '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><body><nav epub:type="toc"><ol><li><a href="start.xhtml#begin">Opening</a></li><li><a href="start.xhtml#contents">Contents</a></li><li><a href="chapter.xhtml">Chapter</a></li></ol></nav></body></html>');
  return await zip.generateAsync({ type: 'uint8array' }) as unknown as File;
}

describe('Gutenberg import and publication', () => {
  it('keeps opening text when multiple contents links point into the same file', async () => {
    const book = await parseEpub(await fixture());
    const opening = book.sections.find(s => s.sourceHref === 'start.xhtml')!;
    expect(opening.title).toBe('Opening');
    expect(opening.type).toBe('chapter');
    expect(opening.xhtml).toContain('Keep this opening notice and these credits.');
  });

  it('distinguishes a pure contents page from one containing other words', () => {
    expect(containsOnlyNavigation('<h1>Contents</h1><p><a href="chapter.xhtml">Chapter</a></p>')).toBe(true);
    expect(containsOnlyNavigation('<h1>Contents</h1><p>Keep my preface.</p><a href="chapter.xhtml">Chapter</a>')).toBe(false);
    expect(containsOnlyNavigation('<h1>Contents</h1><img src="notice.png"/><a href="chapter.xhtml">Chapter</a>')).toBe(false);
  });

  it('publishes SVG with its cover image and required declaration, preserving opening text', async () => {
    const book = await parseEpub(await fixture());
    const sections = book.sections.filter(s => s.type !== 'table-of-contents').map((s, i) => ({ ...s, id: `section-${i + 1}`, type: s.type || 'chapter' as const }));
    for (const image of book.images || []) image.blob.arrayBuffer = () => readBlob(image.blob);
    book.coverImage!.arrayBuffer = () => readBlob(book.coverImage!);
    const data = await generateEpubFromWorkingCopy({ title: book.title, author: book.author, language: book.language, sectionIds: sections.map(s => s.id), coverImageId: null }, sections, book.coverImage, book.images);
    const zip = await JSZip.loadAsync(data);
    const opf = parse(await zip.file('OEBPS/content.opf')!.async('string'));
    expect(opf.querySelector('item[href="section-3.xhtml"]')?.getAttribute('properties')).toBe('svg');
    expect(opf.querySelector('item[href="section-4.xhtml"]')?.getAttribute('properties')).toBeNull();
    const cover = parse(await zip.file('OEBPS/section-3.xhtml')!.async('string'));
    expect(cover.querySelector('parsererror')).toBeNull();
    const image = cover.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'image')[0]!;
    const href = image.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
    expect(href).toBe('images/imported-original-cover.png');
    expect(zip.file(`OEBPS/${href}`)).not.toBeNull();
    expect(await zip.file('OEBPS/section-4.xhtml')!.async('string')).toContain('Keep this opening notice and these credits.');
    const reloaded = await parseEpub(data as unknown as File);
    expect(reloaded.images?.length).toBe(book.images?.length);
  });
});

import { describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import { parseEpub } from '@/services/epubService';
import { generateEpubFromWorkingCopy } from './epub-generator';
import { extractEpubBody, rewriteSectionReferences } from './epub-content';
import { plateToXhtml, xhtmlToPlate } from './plateXhtml';

const text = (html: string) => new DOMParser().parseFromString(html, 'text/html').body.textContent?.replace(/\s+/g, ' ').trim();
const xml = (html: string) => new DOMParser().parseFromString(`<div xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">${html}</div>`, 'application/xhtml+xml');

describe('EPUB content preservation', () => {
  async function importedBook(includeChapter = true) {
    const zip = new JSZip();
    zip.file('META-INF/container.xml', '<container><rootfiles><rootfile full-path="book/content.opf"/></rootfiles></container>');
    zip.file('book/content.opf', '<package><metadata><title>Example</title><creator>Writer</creator><language>en</language></metadata><manifest><item id="main" href="text/main.xhtml" media-type="application/xhtml+xml"/><item id="notes" href="notes/end%20notes.xhtml" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="main"/></spine></package>');
    if (includeChapter) zip.file('book/text/main.xhtml', '<html xmlns="http://www.w3.org/1999/xhtml"><head><title>Chapter</title></head><body><p id="ref">All the words. <a href="../notes/end%20notes.xhtml#note">Note</a></p></body></html>');
    zip.file('book/notes/end notes.xhtml', '<html xmlns="http://www.w3.org/1999/xhtml"><head><title>Notes</title></head><body><p id="note">Keep this note. <a href="../text/main.xhtml#ref">Return</a></p></body></html>');
    return await zip.generateAsync({ type: 'uint8array' }) as unknown as File;
  }

  it('loads linked notes outside the spine and republishes them with working links', async () => {
    const parsed = await parseEpub(await importedBook());
    expect(parsed.sections[2]?.sourceHref).toBe('text/main.xhtml');
    const sections = parsed.sections.map((s, i) => ({ ...s, id: `section-${i + 1}`, type: s.type || 'chapter' as const }));
    const note = sections.find(s => s.title === 'Notes')!;
    expect(note.type).toBe('no-matter');
    const bytes = await generateEpubFromWorkingCopy({ title: parsed.title, author: parsed.author, language: parsed.language, sectionIds: sections.map(s => s.id), coverImageId: null }, sections);
    const output = await JSZip.loadAsync(bytes);
    const main = await output.file('OEBPS/section-3.xhtml')!.async('string');
    const notes = await output.file('OEBPS/nomatter/section-4.xhtml')!.async('string');
    expect(main).toContain('nomatter/section-4.xhtml#note');
    expect(notes).toContain('../section-3.xhtml#ref');
    expect(text(notes)).toBe('Keep this note. Return');
  });

  it('stops loading if a section is missing instead of silently publishing a partial book', async () => {
    await expect(parseEpub(await importedBook(false))).rejects.toThrow('Cannot load the complete EPUB');
  });

  it('preserves imported title-page credits that are absent from book metadata', async () => {
    const section = { id: 'section-001', title: 'Title Page', type: 'title-page' as const, sourceHref: 'text/title.xhtml', xhtml: '<h1>Example</h1><p>Translated by Another Writer.</p><p id="edition">The illustrated edition.</p>' };
    const bytes = await generateEpubFromWorkingCopy({ title: 'Example', author: 'Writer', language: 'en', sectionIds: [section.id], coverImageId: null }, [section]);
    const output = await JSZip.loadAsync(bytes);
    const page = await output.file('OEBPS/title-page.xhtml')!.async('string');
    expect(text(page)).toBe(text(section.xhtml));
    expect(page).toContain('id="edition"');
  });

  it('keeps every word and inline space when extracting an imported body', () => {
    const source = '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" epub:prefix="se: https://standardebooks.org/vocab/1.0"><head><title>Sample</title></head><body><section id="original"><header><h2>Original heading</h2></header><p><em>one</em> <strong>two</strong> &amp; three.</p><p>Last words.</p></section></body></html>';
    const body = extractEpubBody(source);
    expect(text(body)).toBe(text(source));
    expect(body).toContain('id="original"');
    expect(body).toContain('epub:prefix=');
    expect(xml(body).querySelector('parsererror')).toBeNull();
  });

  it('resolves renamed files, encoded paths, fragments, media, and No Matter links', () => {
    const chapter = { id: 'section-003', title: 'Chapter', sourceHref: 'text/start.xhtml' };
    const notes = { id: 'section-004', title: 'Notes', type: 'no-matter', sourceHref: 'notes/end notes.xhtml' };
    const output = rewriteSectionReferences('<p id="here"><a href="../notes/end%20notes.xhtml#note-1">1</a> <a href="#here">Here</a> <a href="https://example.org/book">Web</a><img src="../images/logo.png" alt="Logo"/></p>', chapter, [chapter, notes], ['logo.png']);
    const doc = xml(output);
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('nomatter/section-004.xhtml#note-1');
    expect(doc.querySelectorAll('a')[1]?.getAttribute('href')).toBe('#here');
    expect(doc.querySelectorAll('a')[2]?.getAttribute('href')).toBe('https://example.org/book');
    expect(doc.querySelector('img')?.getAttribute('src')).toBe('images/logo.png');
    const back = rewriteSectionReferences('<a href="../text/start.xhtml#here">Back</a>', notes, [chapter, notes]);
    expect(xml(back).querySelector('a')?.getAttribute('href')).toBe('../section-003.xhtml#here');
  });

  it('retains note IDs, backlinks, separate paragraphs, and words when editing', () => {
    const source = '<section id="notes"><h2>Notes</h2><ol><li id="note-1" epub:type="endnote"><p>First paragraph.</p><p>Second <em>paragraph</em>. <a id="return" href="chapter.xhtml#ref-1" role="doc-backlink">Back</a></p></li></ol></section>';
    const nodes = xhtmlToPlate(source);
    // Make a deliberate text edit, retaining the note's other content.
    const item = nodes.find(n => n.listStyleType) as { children: Array<{ text?: string }> };
    item.children[0]!.text = 'Revised first paragraph.';
    const output = plateToXhtml(nodes);
    const doc = xml(output);
    expect(doc.querySelector('parsererror')).toBeNull();
    expect(doc.getElementById('notes')).toBeTruthy();
    expect(doc.getElementById('note-1')?.querySelectorAll('p').length).toBe(2);
    expect(doc.getElementById('return')?.getAttribute('href')).toBe('chapter.xhtml#ref-1');
    expect(text(output)).toContain('Revised first paragraph.');
    expect(text(output)).toContain('Second paragraph. Back');
  });

  it('keeps linked images inline and header logos outside paragraphs', () => {
    const output = plateToXhtml(xhtmlToPlate('<header><h2>Imprint</h2><img src="../images/logo.png" alt="Logo"/></header><p><a href="https://example.org"><img src="images/icon.png" alt="Icon"/> Follow</a></p>'));
    const doc = xml(output);
    expect(doc.querySelector('parsererror')).toBeNull();
    expect(doc.querySelector('p figure, a figure')).toBeNull();
    expect(doc.querySelector('figure img')?.getAttribute('alt')).toBe('Logo');
    expect(doc.querySelector('p a img')).toBeTruthy();
    expect(text(output)).toContain('Follow');
  });
});

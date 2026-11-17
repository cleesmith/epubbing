import React from 'react';
import JSZip from 'jszip';
import { expect, it, vi } from 'vitest';
import { parseEpub } from '@/services/epubService';
import type { WorkingCopySection } from '@/services/manuscriptStorage';
import { generateEpubFromWorkingCopy } from './epub-generator';
import { stripEpubForBookseller } from './bookseller-strip';
import { BookDocument, extractChapters } from './epub-to-pdf';
import { BookDocument5x8 } from './epub-to-pdf-5x8';

vi.mock('book-pdf', () => ({
  Document: 'document', Page: 'page', Text: 'text', View: 'view', Image: 'image',
  StyleSheet: { create: (styles: unknown) => styles }, pdf: vi.fn(),
}));

const marker = 'h1[data-ee-chapter-heading="true"]';
const xml = (html: string) => new DOMParser().parseFromString(html, 'application/xhtml+xml');
const bodyText = (html: string) => new DOMParser().parseFromString(html, 'text/html').body.textContent?.replace(/\s+/g, ' ').trim();
const section: WorkingCopySection = {
  id: 'story', title: '1. Wind & "Rain"', type: 'chapter', sourceHref: 'old/story.xhtml',
  xhtml: '<p id="opening">Every <em>word</em> stays.</p><h2>Inside the story</h2><p>The last words.</p>',
};
const publish = (sections: WorkingCopySection[]) => generateEpubFromWorkingCopy({
  title: 'Test Book', author: 'Writer', language: 'en', coverImageId: null, sectionIds: sections.map(s => s.id),
}, sections);

it.each([false, true])('publishes the heading in both EPUB reading copies (SceneCraft: %s)', async visual => {
  const story = { ...section, xhtml: visual ? section.xhtml + '<p class="internal">A quiet thought.</p>' : section.xhtml };
  const before = JSON.stringify(story);
  const bytes = await publish([story]);
  const authors = await JSZip.loadAsync(bytes);
  const booksellers = await JSZip.loadAsync(bytes);
  await stripEpubForBookseller(booksellers);
  for (const zip of [authors, booksellers]) {
    const doc = xml(await zip.file('OEBPS/story.xhtml')!.async('string'));
    expect(doc.querySelector('parsererror')).toBeNull();
    expect(doc.querySelectorAll(marker)).toHaveLength(1);
    expect(doc.querySelector(marker)?.textContent).toBe(story.title);
    expect(doc.querySelector('body > section, body > article')?.firstElementChild?.matches(marker) ?? doc.querySelector('body')?.firstElementChild?.matches(marker)).toBe(true);
    expect(doc.getElementById('opening')?.textContent).toBe('Every word stays.');
    expect(doc.querySelector('h2')?.textContent).toBe('Inside the story');
    const loaded = await parseEpub(await zip.generateAsync({ type: 'uint8array' }) as unknown as File);
    const restored = loaded.sections.find(s => s.title === story.title)!;
    expect(bodyText(restored.xhtml)).toBe(bodyText(story.xhtml));
    expect(restored.xhtml).not.toContain('data-ee-chapter-heading');
    restored.title = 'Revised chapter title';
    const republished = await JSZip.loadAsync(await publish([restored as WorkingCopySection]));
    const next = xml(await republished.file('OEBPS/story.xhtml')!.async('string'));
    expect(next.querySelectorAll(marker)).toHaveLength(1);
    expect(next.querySelector(marker)?.textContent).toBe(restored.title);
    expect(next.querySelector('body')?.textContent).not.toContain(story.title);
  }
  expect(JSON.stringify(story)).toBe(before);
});

it('leaves author-written headings alone when publishing and loading', async () => {
  const story = { ...section, xhtml: '<h1>My existing heading</h1>' + section.xhtml };
  const bytes = await publish([story]);
  const zip = await JSZip.loadAsync(bytes);
  const doc = xml(await zip.file('OEBPS/story.xhtml')!.async('string'));
  expect(doc.querySelectorAll('h1')).toHaveLength(2);
  const loaded = await parseEpub(bytes as unknown as File);
  expect(bodyText(loaded.sections.find(s => s.id === story.id)!.xhtml)).toBe(bodyText(story.xhtml));
});

function renderedText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(renderedText).join(' ');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return renderedText(node.props.children);
  return '';
}

it.each([BookDocument, BookDocument5x8])('keeps the PDF heading option working after EPUB publication', async Component => {
  const zip = await JSZip.loadAsync(await publish([section]));
  const chapters = await extractChapters(zip, ['OEBPS/story.xhtml']);
  const options = { title: 'Test Book', author: 'Writer', includeToc: false };
  for (const enabled of [false, true]) {
    const output = renderedText(Component({ chapters, options: { ...options, includeChapterHeadings: enabled } }));
    expect(output.split(section.title).length - 1).toBe(enabled ? 1 : 0);
    expect(output).toContain('Inside the story');
    expect(output).toContain('The last words.');
  }
});

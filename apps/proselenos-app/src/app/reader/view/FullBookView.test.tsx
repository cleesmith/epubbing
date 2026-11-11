import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it, vi } from 'vitest';
import FullBookView from './FullBookView';

vi.mock('@/lib/web-ready-generator', () => ({ buildEdgeHtml: vi.fn() }));

function renderBook(xhtml: string, imageUrls = new Map([['card.jpg', 'blob:local-card']])) {
  const html = renderToStaticMarkup(
    <FullBookView
      bookTitle="Example book"
      bookAuthor="Author"
      sections={[{ title: 'Fool', xhtml, sceneCraftConfig: null }]}
      imageUrls={imageUrls}
      audioUrls={new Map()}
    />,
  );
  return new DOMParser().parseFromString(html, 'text/html');
}

it('shows Authors image blocks and bare images without losing adjacent paragraphs', () => {
  const doc = renderBook(`
    <p>Before the illustration.</p>
    <div class="image-element-size-container">
      <img src="images/card.jpg" alt="The Fool" class="image-element-image" />
    </div>
    <p>After the illustration.</p>
    <img src="../images/card.jpg" alt="Another illustration" />
  `);
  const images = Array.from(doc.querySelectorAll('img'));
  expect(images.map(img => img.getAttribute('src'))).toEqual(['blob:local-card', 'blob:local-card']);
  expect(images.map(img => img.getAttribute('alt'))).toEqual(['The Fool', 'Another illustration']);
  expect(Array.from(doc.querySelectorAll('.sc-pv-block')).map(block => block.textContent)).toEqual([
    'Before the illustration.', 'The Fool', 'After the illustration.', 'Another illustration',
  ]);
});

it('resolves paragraph images locally and does not mistake an illustrated paragraph for a TOC entry', () => {
  const doc = renderBook('<p>Fool<img src="./images/card.jpg" alt="Card" /></p>');
  const block = doc.querySelector('.sc-pv-block');
  expect(block?.textContent).toBe('Fool');
  expect(block?.querySelector('img')?.getAttribute('src')).toBe('blob:local-card');
});

it('keeps existing figure and sticky illustrations, including their text', () => {
  const doc = renderBook(`
    <figure style="width: 45%"><img src="images/card.jpg" alt="Figure" /><figcaption>Figure</figcaption></figure>
    <div class="sticky-wrap">
      <div class="sticky-text"><p>Words beside the picture.</p></div>
      <img class="sticky-img" src="images/card.jpg" />
      <span class="sticky-caption">Sticky caption</span>
    </div>
  `);
  expect(Array.from(doc.querySelectorAll('img')).map(img => img.getAttribute('src'))).toEqual([
    'blob:local-card', 'blob:local-card',
  ]);
  expect(doc.body.textContent).toContain('Words beside the picture.');
  expect(doc.body.textContent).toContain('Sticky caption');
});

it('handles escaped filenames while leaving embedded and external image sources intact', () => {
  const embedded = 'data:image/png;base64,aGVsbG8=';
  const remote = 'https://example.com/card.jpg';
  const doc = renderBook(`
    <img src="../images/a%20card.jpg" />
    <img src="${embedded}" />
    <img src="${remote}" />
  `, new Map([['a card.jpg', 'blob:local-card'], ['card.jpg', 'blob:wrong-image']]));
  expect(Array.from(doc.querySelectorAll('img')).map(img => img.getAttribute('src'))).toEqual([
    'blob:local-card', embedded, remote,
  ]);
});

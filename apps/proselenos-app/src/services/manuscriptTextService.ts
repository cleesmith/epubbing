import type { ParsedEpub } from './epubService';

const markerPattern = /^[\t ]*=====[\t ]+(\d+)\.txt[\t ]+=====[\t ]*$/i;
const isBlank = (line: string | undefined): boolean => line !== undefined && /^[\t ]*$/.test(line);

function paragraphsToXhtml(lines: string[]): string {
  const paragraphs: string[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    paragraphs.push(`<p>${paragraph.map(line => line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'))
      .join('<br/>')}</p>`);
    paragraph = [];
  };

  for (const line of lines) {
    if (isBlank(line)) flush();
    else paragraph.push(line);
  }
  if (paragraph.length) flush();
  return paragraphs.join('\n');
}

/** Parse concatenated numbered TXT files without guessing headings from the prose. */
export function parseManuscriptText(text: string): ParsedEpub {
  const lines = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  const markers: Array<{ line: number; number: string }> = [];
  const numbers = new Set<string>();

  for (let index = 0; index < lines.length; index++) {
    const match = markerPattern.exec(lines[index]!);
    if (!match) continue;
    const number = match[1]!.replace(/^0+(?=\d)/, '');
    if (![index - 2, index - 1, index + 1, index + 2].every(i => isBlank(lines[i]))) {
      throw new Error(`The marker on line ${index + 1} needs two blank lines before it and two blank lines after it.`);
    }
    if (numbers.has(number)) {
      throw new Error(`Chapter number ${number} appears more than once. Please give each numbered TXT section a unique number.`);
    }
    numbers.add(number);
    markers.push({ line: index, number });
  }

  if (!markers.length) {
    throw new Error('No chapter markers found. Use a line such as ===== 001.txt ===== with two blank lines before and after it.');
  }
  if (lines.slice(0, markers[0]!.line).some(line => !isBlank(line))) {
    throw new Error('There is text before the first chapter marker. Move it into a numbered section before loading the manuscript.');
  }

  const chapters = markers.map((marker, index) => {
    const next = markers[index + 1];
    const content = lines.slice(marker.line + 3, next ? next.line - 2 : lines.length);
    // Strip only boundary whitespace. Blank lines inside the prose remain paragraphs.
    while (content.length && isBlank(content[0])) content.shift();
    while (content.length && isBlank(content[content.length - 1])) content.pop();
    return {
      id: `chapter-${marker.number}`,
      title: `Chapter ${marker.number}`,
      href: `chapter-${marker.number}.xhtml`,
      xhtml: paragraphsToXhtml(content) || '<p></p>',
      type: 'chapter' as const,
    };
  });

  return {
    title: 'Untitled',
    author: '',
    language: 'en',
    coverImage: null,
    sections: [
      { id: 'title-page', title: 'Title Page', href: 'title-page.xhtml', xhtml: '<p></p>', type: 'title-page' },
      { id: 'copyright', title: 'Copyright', href: 'copyright.xhtml', xhtml: '<p></p>', type: 'copyright' },
      ...chapters,
    ],
  };
}

export async function parseManuscriptFile(file: File): Promise<ParsedEpub> {
  let text: string;
  const bytes = await file.arrayBuffer();
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('This file is not UTF-8 text. Save the manuscript as a UTF-8 .txt file and try again.');
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(text)) {
    throw new Error('This file contains unsupported control characters. Save it as plain UTF-8 text and try again.');
  }
  return parseManuscriptText(text);
}

/** Extract prose without merging adjacent paragraphs or repeating nested text. */
function chapterText(xhtml: string): string {
  const doc = new DOMParser().parseFromString(xhtml, 'text/html');
  doc.querySelectorAll('script, style, template, noscript, img, audio, video, source, iframe, canvas, svg, input, button, .scene-audio, .audio-block, .sticky-img-wrap')
    .forEach(element => element.remove());
  doc.querySelectorAll('figure').forEach(figure => {
    if (!figure.textContent?.trim()) figure.remove();
  });
  doc.querySelectorAll('.dialogue .speaker').forEach(speaker => {
    speaker.append(doc.createTextNode(': '));
  });
  const blockSelector = 'p,div,h1,h2,h3,h4,h5,h6,blockquote,li,ul,ol,pre,figure,figcaption,section,article,table,thead,tbody,tfoot,tr,td,th,hr';
  const blocks: string[] = [];
  const inlineText = (node: Node): string => {
    if (node.nodeType === 3) return (node.textContent || '').replace(/\r\n?|\n/g, ' ');
    if (node.nodeType !== 1) return '';
    const element = node as Element;
    if (element.tagName === 'BR') return '\n';
    return Array.from(element.childNodes).map(inlineText).join('');
  };
  const walk = (container: Element) => {
    let inline = '';
    const flush = () => {
      if (inline.trim()) blocks.push(inline);
      inline = '';
    };
    for (const node of Array.from(container.childNodes)) {
      if (node.nodeType === 1 && (node as Element).matches(blockSelector)) {
        flush();
        const element = node as Element;
        if (element.querySelector(blockSelector)) walk(element);
        else if (element.tagName === 'HR') blocks.push('* * *');
        else if (element.tagName === 'PRE') blocks.push(element.textContent || '');
        else blocks.push(inlineText(element));
      } else if (node.nodeType !== 3 || node.textContent?.trim() || inline) {
        inline += inlineText(node);
      }
    }
    flush();
  };
  walk(doc.body);
  // A normal paragraph break is two newlines; an empty paragraph adds one more.
  return blocks.map((block, index) => `${index ? (blocks[index - 1] === '' ? '\n' : '\n\n') : ''}${block}`)
    .join('')
    .replace(/^\n+|\n+$/g, '');
}

/** Number chapters by their current order using the same delimiters as Load. */
export function exportManuscriptText(chapters: ReadonlyArray<{ xhtml: string }>): string {
  if (!chapters.length) throw new Error('There are no chapters to export.');
  const blocks = chapters.map((chapter, index) => {
    const text = chapterText(chapter.xhtml);
    if (text.split('\n').some(line => markerPattern.test(line))) {
      throw new Error(`Chapter ${index + 1} contains a chapter-marker line inside its text. Remove that marker before exporting TXT.`);
    }
    const number = String(index + 1).padStart(3, '0');
    return `===== ${number}.txt =====\n\n\n${text}`;
  });
  return `\n\n${blocks.join('\n\n\n')}\n`;
}

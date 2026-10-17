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
    if (!content.length) {
      throw new Error(`Chapter ${marker.number} has no text. Add its text or remove its marker before loading.`);
    }
    return {
      id: `chapter-${marker.number}`,
      title: `Chapter ${marker.number}`,
      href: `chapter-${marker.number}.xhtml`,
      xhtml: paragraphsToXhtml(content),
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

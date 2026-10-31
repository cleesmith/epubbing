import { parseXhtmlFragment, rewriteSectionReferences, sectionOutputPath, type SectionLocation } from './epub-content';

/** Read-only snapshots: the reviewer has no editor or storage access. */
export interface ReviewSection extends SectionLocation {
  xhtml: string;
}

export interface ReviewSnapshot {
  section: ReviewSection;
  linkDestinations: ReviewSection[];
  images: string[];
  audios: string[];
  includesUnsavedChanges: boolean;
}

export type ReviewCategory = 'characters' | 'accents' | 'hyphens' | 'links';
export const REVIEW_LABELS: Record<ReviewCategory, string> = {
  characters: 'Unusual characters',
  accents: 'Different accents',
  hyphens: 'Different hyphenation',
  links: 'Broken internal links',
};

export interface ReviewExample {
  before: string;
  match: string;
  after: string;
}

export interface ReviewFinding {
  category: ReviewCategory;
  label: string;
  explanation: string;
  count: number;
  examples: ReviewExample[];
}

export interface ReviewReport {
  checkedAt: string;
  includesUnsavedChanges: boolean;
  findings: ReviewFinding[];
  internalLinksChecked: number;
}

export interface AuthorsReview extends ReviewReport {
  nextSectionsWithFindings: string[];
}

const ROOT = 'https://text-review.invalid/';
const EXAMPLE_LIMIT = 8;
const NEXT_SECTION_LIMIT = 3;
const BLOCKS = new Set(['address', 'article', 'aside', 'blockquote', 'br', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'td', 'th', 'tr', 'ul']);
const NON_TEXT = new Set(['head', 'script', 'style', 'template']);

/** Keep spaces between blocks, but never split a word at an inline element. */
function readableText(root: Element): string {
  const pieces: string[] = [];
  const visit = (node: Node) => {
    if (node.nodeType === 3) {
      pieces.push(node.textContent || '');
      return;
    }
    if (node.nodeType !== 1) return;
    const element = node as Element;
    const name = element.localName.toLowerCase();
    if (NON_TEXT.has(name)) return;
    if (BLOCKS.has(name)) pieces.push('\n');
    for (const child of Array.from(node.childNodes)) visit(child);
    if (BLOCKS.has(name)) pieces.push('\n');
  };
  visit(root);
  return pieces.join('').replace(/[ \t\r\n\u00A0]+/g, ' ').replace(/^ +| +$/g, '');
}

function excerpt(text: string, start: number, length: number): ReviewExample {
  const from = Math.max(0, start - 85);
  const to = Math.min(text.length, start + length + 85);
  return {
    before: (from ? '…' : '') + text.slice(from, start),
    match: text.slice(start, start + length),
    after: text.slice(start + length, to) + (to < text.length ? '…' : ''),
  };
}

function addFinding(findings: Map<string, ReviewFinding>, key: string, category: ReviewCategory, label: string, explanation: string, example: ReviewExample) {
  let finding = findings.get(key);
  if (!finding) {
    finding = { category, label, explanation, count: 0, examples: [] };
    findings.set(key, finding);
  }
  finding.count++;
  if (finding.examples.length < EXAMPLE_LIMIT) finding.examples.push(example);
}

/** Compare only forms present in the open section, case-insensitively. */
function words(text: string) {
  return text.matchAll(/[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*(?:[-\u2010\u2011][\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*)*/gu);
}

function accentKey(word: string): string {
  return word.normalize('NFD').replace(/\p{M}/gu, '');
}

function hyphenKey(word: string): string {
  return word.replace(/[-\u2010\u2011]/g, '');
}

function addForm(index: Map<string, Set<string>>, key: string, form: string) {
  const forms = index.get(key) || new Set<string>();
  forms.add(form);
  index.set(key, forms);
}

function pathKey(path: string): string {
  return decodeURIComponent(new URL(path, ROOT).pathname);
}

export function snapshotForTextReview(
  selected: ReviewSection, sections: ReviewSection[],
  pendingXhtml: string | null, pendingTitle: string, images: string[], audios: string[],
): ReviewSnapshot {
  const section = { ...selected, title: pendingTitle || selected.title, xhtml: pendingXhtml ?? selected.xhtml };
  return {
    section,
    linkDestinations: sections.map(s => s.id === selected.id ? section : s),
    images: [...images],
    audios: [...audios],
    includesUnsavedChanges: pendingXhtml !== null || !!pendingTitle,
  };
}

async function checkSection(
  snapshot: ReviewSnapshot,
  onProgress: ((message: string) => void) | undefined,
  signal: AbortSignal | undefined,
  firstFindingOnly: boolean,
): Promise<ReviewReport> {
  const checkedAt = new Date().toISOString();
  const checkCancelled = () => {
    if (signal?.aborted) throw new DOMException('Review cancelled.', 'AbortError');
  };
  const pause = async (message: string, startOfSection = false) => {
    checkCancelled();
    // Yield once per section for the list, and at each stage for a detailed review.
    if (firstFindingOnly && !startOfSection) return;
    onProgress?.(message);
    await new Promise<void>(resolve => {
      if (typeof MessageChannel === 'undefined') {
        setTimeout(resolve, 0);
        return;
      }
      const channel = new MessageChannel();
      channel.port1.onmessage = () => {
        channel.port1.close();
        channel.port2.close();
        resolve();
      };
      channel.port2.postMessage(null);
    });
    checkCancelled();
  };
  const { section, linkDestinations, images, audios } = snapshot;
  await pause('Reading this section…', true);
  const root = parseXhtmlFragment(section.xhtml);
  const text = readableText(root);
  const findings = new Map<string, ReviewFinding>();
  let internalLinksChecked = 0;
  const result = (): ReviewReport => ({
    checkedAt,
    includesUnsavedChanges: snapshot.includesUnsavedChanges,
    internalLinksChecked,
    findings: [...findings.values()],
  });

  await pause('Checking unusual characters…');
  // Character patterns, not a spelling dictionary. Accents and non-Latin text
  // are not inherently suspicious. Exclude normal tabs/newlines and joiners.
  const suspect = /\uFFFD|[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]|Ã[\u0080-\u00BF]|Â[\u0080-\u00BF]|â€[\u0090-\u00BF\u0152\u0153\u0160\u0161\u017D\u017E\u2018-\u2022\u2039\u203A\u2122]/gu;
  for (const match of text.matchAll(suspect)) {
    const label = /^[\u0000-\u001F\u007F-\u009F]$/.test(match[0]) ? 'Unexpected invisible character' : `Possible damaged text: ${match[0]}`;
    addFinding(findings, `characters:${match[0]}`, 'characters', label, 'Check this passage. The character may have been damaged during copying or importing.', excerpt(text, match.index!, match[0].length));
    if (firstFindingOnly) return result();
  }

  const accents = new Map<string, Set<string>>();
  const hyphens = new Map<string, Set<string>>();
  await pause('Comparing word forms used in this section…');
  for (const match of words(text)) {
    const form = match[0].normalize('NFC').toLowerCase();
    // Removing vowel marks from other writing systems would be misleading.
    if (/^[\p{Script=Latin}\p{M}'’\-\u2010\u2011]+$/u.test(form)) addForm(accents, accentKey(form), form);
    addForm(hyphens, hyphenKey(form), form);
  }
  // Keep only differences actually found; there is no preferred/correct form.
  for (const [key, forms] of accents) if (forms.size < 2) accents.delete(key);
  for (const [key, forms] of hyphens) {
    if (forms.size < 2 || ![...forms].some(form => /[-\u2010\u2011]/.test(form))) hyphens.delete(key);
  }
  for (const [category, index, keyFor] of [
    ['accents', accents, accentKey], ['hyphens', hyphens, hyphenKey],
  ] as const) {
    await pause(category === 'accents' ? 'Checking different accents…' : 'Checking different hyphenation…');
    for (const match of words(text)) {
      const key = keyFor(match[0].normalize('NFC').toLowerCase());
      const forms = index.get(key);
      if (!forms) continue;
      addFinding(findings, `${category}:${key}`, category, [...forms].join(' / '), 'These forms occur in this section. The difference may be intentional.', excerpt(text, match.index!, match[0].length));
      if (firstFindingOnly) return result();
    }
  }

  await pause('Checking links from this section…');
  if (!root.querySelector('a[href]')) return result();
  const xhtml = rewriteSectionReferences(section.xhtml, section, linkDestinations, images, audios);
  const linkedRoot = parseXhtmlFragment(xhtml);
  const targets = new Map(linkDestinations.map(target => [pathKey(sectionOutputPath(target)), target]));
  const anchorsByPath = new Map<string, Set<string>>();
  const media = new Set([
    ...snapshot.images.map(name => pathKey(`images/${name}`)),
    ...snapshot.audios.map(name => pathKey(`audio/${name}`)),
  ]);
  // These pages are always created by EE's publisher, outside the editor.
  const generatedTargets = new Map([
    ['/nav.xhtml', new Set(['toc'])],
    ['/contents.xhtml', new Set(['table-of-contents'])],
    ['/cover.xhtml', new Set<string>()],
  ]);
  for (const anchor of Array.from(linkedRoot.querySelectorAll('a[href]'))) {
    const href = anchor.getAttribute('href')?.trim() || '';
    // No network requests: websites, email, telephone, data and blob links
    // are outside this check. Empty href points to the current document.
    if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue;
    internalLinksChecked++;
    let reason = '';
    try {
      const url = new URL(href, new URL(sectionOutputPath(section), ROOT));
      const path = pathKey(url.pathname);
      const fragment = decodeURIComponent(url.hash.slice(1));
      const target = targets.get(path);
      const generatedIds = generatedTargets.get(path);
      if (!target && !generatedIds && !media.has(path)) {
        reason = 'The destination file was not found in this book.';
      } else if (fragment && (target || generatedIds)) {
        let ids = generatedIds;
        if (target) {
          ids = anchorsByPath.get(path);
          if (!ids) {
            // Read another section only to locate a named destination of an outgoing link.
            const targetRoot = target.id === section.id ? root : parseXhtmlFragment(target.xhtml);
            ids = new Set(Array.from(targetRoot.querySelectorAll('[id]'), el => el.getAttribute('id')!));
            for (const el of Array.from(targetRoot.querySelectorAll('a[name]'))) ids.add(el.getAttribute('name')!);
            anchorsByPath.set(path, ids);
          }
        }
        if (ids && !ids.has(fragment)) reason = `The destination section exists, but the place named “${fragment}” was not found.`;
      }
    } catch {
      reason = 'The link address could not be read.';
    }
    if (reason) {
      const label = readableText(anchor) || '(link without a text label)';
      const paragraph = readableText(anchor.closest('p, li, blockquote, figcaption') || anchor);
      const position = paragraph.indexOf(label);
      addFinding(findings, `links:${href}`, 'links', label, `${reason} Link: ${href}`, position >= 0 ? excerpt(paragraph, position, label.length) : { before: '', match: label, after: '' });
      if (firstFindingOnly) return result();
    }
  }
  await pause('Preparing the review…');
  return result();
}

export function reviewText(snapshot: ReviewSnapshot, onProgress: (message: string) => void, signal?: AbortSignal) {
  return checkSection(snapshot, onProgress, signal, false);
}

/** A clear section suggests up to three later sections, in reading order. */
export async function reviewForAuthors(
  snapshot: ReviewSnapshot, onProgress: (message: string) => void, signal?: AbortSignal,
): Promise<AuthorsReview> {
  const report = await reviewText(snapshot, onProgress, signal);
  const nextSectionsWithFindings: string[] = [];
  if (report.findings.length) return { ...report, nextSectionsWithFindings };

  const sections = snapshot.linkDestinations;
  const current = sections.findIndex(section => section.id === snapshot.section.id);
  if (current < 0) throw new Error('The open section is missing from the book.');
  if (current === sections.length - 1) return { ...report, nextSectionsWithFindings };
  const titleCounts = new Map<string, number>();
  for (const section of sections) {
    const title = section.title.trim();
    titleCounts.set(title, (titleCounts.get(title) || 0) + 1);
  }
  const total = sections.length - current - 1;
  for (let index = current + 1; index < sections.length; index++) {
    const section = sections[index]!;
    onProgress(`This section is clear. Checking later sections (${index - current} of ${total})…`);
    // One finding is sufficient to recommend this section.
    const other = await checkSection({ ...snapshot, section, includesUnsavedChanges: false }, undefined, signal, true);
    if (other.findings.length) {
      const title = section.title.trim();
      const position = `Section ${index + 1}`;
      const label = title && titleCounts.get(title) === 1 ? title : `${position} · ${title || 'Untitled'}`;
      nextSectionsWithFindings.push(label);
      if (nextSectionsWithFindings.length === NEXT_SECTION_LIMIT) break;
    }
  }
  return { ...report, nextSectionsWithFindings };
}

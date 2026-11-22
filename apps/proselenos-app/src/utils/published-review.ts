import { sectionOutputPath, type SectionLocation } from '@/lib/epub-content';

/** The fragment stays out of requests, so the cached /library/ page works offline. */
export function publishedReviewFragment(bookHash: string, section?: SectionLocation): string {
  const href = !section || section.type === 'no-matter'
    ? 'title-page.xhtml'
    : sectionOutputPath(section);
  return '#' + new URLSearchParams({
    'ee-review': bookHash,
    section: `OEBPS/${href}`,
  }).toString();
}

export function readPublishedReview(fragment: string): { bookHash: string; href: string } | null {
  const params = new URLSearchParams(fragment.replace(/^#/, ''));
  const bookHash = params.get('ee-review');
  if (!bookHash) return null;
  const href = params.get('section') || 'OEBPS/title-page.xhtml';
  // Only book-local section filenames are accepted as navigation targets.
  if (!href.startsWith('OEBPS/') || !href.endsWith('.xhtml') || /[?#\\]/.test(href) ||
      href.split('/').some(part => part === '..' || part === '.')) return null;
  return { bookHash, href };
}

// KDP paperback rules, deliberately limited to the existing 6 x 9 export.
export const BACK_COVER_LIMIT = 1500;
// Match the cover calculator's input range. Publishing ranges below are advisory.
export const COVER_PAGE_MIN = 24;
export const COVER_PAGE_MAX = 830;
export const PAPER_CHOICES = {
  'bw-white': { label: 'Black-and-white on white paper', factor: 0.002252, min: 24, max: 828 },
  'bw-cream': { label: 'Black-and-white on cream paper', factor: 0.0025, min: 24, max: 776 },
  'standard-color': { label: 'Standard color on white paper', factor: 0.002252, min: 72, max: 600 },
  'premium-color': { label: 'Premium color on white paper', factor: 0.002347, min: 24, max: 828 },
} as const;
export type PaperChoice = keyof typeof PAPER_CHOICES;
export interface PaperbackCoverOptions { paper: PaperChoice; backText: string }

export function coverDimensions(pdfPages: number, paper: PaperChoice) {
  const choice = PAPER_CHOICES[paper];
  if (!choice || !Number.isSafeInteger(pdfPages) || pdfPages < 1) {
    throw new Error('The finished PDF has an invalid page count or paper choice.');
  }
  if (pdfPages < COVER_PAGE_MIN || pdfPages > COVER_PAGE_MAX) {
    throw new Error(`Page count must be between ${COVER_PAGE_MIN}–${COVER_PAGE_MAX}. This PDF has ${pdfPages} pages.`);
  }
  const printPages = Math.ceil(pdfPages / 2) * 2;
  const spine = printPages * choice.factor;
  return { pdfPages, printPages, spine, width: 12.25 + spine, height: 9.25 };
}

export function paperbackPublishingNote(pdfPages: number, paper: PaperChoice) {
  const { printPages } = coverDimensions(pdfPages, paper);
  const choice = PAPER_CHOICES[paper];
  if (printPages >= choice.min && printPages <= choice.max) return '';
  return `KDP lists ${choice.min}–${choice.max} pages for ${choice.label.toLowerCase()} at 6 × 9 inches. You can calculate this cover, but this page count is outside that publishing range.`;
}

export function characterCount(text: string) { return Array.from(text).length; }
export function limitBackText(text: string) { return Array.from(text).slice(0, BACK_COVER_LIMIT).join(''); }

// A quarter-inch inset preserves existing cover lettering without cropping.
export function frontPlacement(width: number, height: number) {
  if (!(width > 0 && height > 0)) throw new Error('The EPUB cover image has no usable dimensions.');
  const scale = Math.min(5.5 / width, 8.5 / height);
  const printWidth = width * scale;
  const printHeight = height * scale;
  return { width: printWidth, height: printHeight, dpi: 1 / scale };
}

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

// Front panel: 6 x 9 trim, plus bleed at top, bottom, and outer edge.
export const FRONT_WIDTH = 6.125;
export const FRONT_HEIGHT = 9.25;
export const COVER_BACKGROUND = '#f3efe5';
export type FrontFit = 'fill' | 'border';

export function frontPlacement(width: number, height: number, fit: FrontFit = 'fill') {
  if (![width, height].every(value => Number.isFinite(value) && value > 0)) throw new Error('The cover image has no usable dimensions.');
  const scale = fit === 'border' ? Math.min(5.5 / width, 8.5 / height) : Math.max(FRONT_WIDTH / width, FRONT_HEIGHT / height);
  const printWidth = width * scale;
  const printHeight = height * scale;
  const x = ((fit === 'border' ? 6 : FRONT_WIDTH) - printWidth) / 2;
  const y = fit === 'border' ? 0.125 + (9 - printHeight) / 2 : (FRONT_HEIGHT - printHeight) / 2;
  return { width: printWidth, height: printHeight, x, y, dpi: 1 / scale,
    cropSides: fit === 'fill' && (printWidth - FRONT_WIDTH) / scale > 1,
    cropTopBottom: fit === 'fill' && (printHeight - FRONT_HEIGHT) / scale > 1 };
}

export function frontImageWarnings(width: number, height: number, fit: FrontFit) {
  const placement = frontPlacement(width, height, fit);
  const warnings: string[] = [];
  if (fit === 'border') warnings.push('This option adds a cream border around the front image. It will be visible in print and may look uneven after trimming. Choose Fill front cover or a different image if you do not want it.');
  if (placement.cropSides || placement.cropTopBottom) warnings.push(`To fill the front cover without an added border, the ${placement.cropSides ? 'sides' : 'top and bottom'} of this image will be cropped. Check the preview, especially any lettering near the edges.`);
  if (placement.dpi < 299.9) warnings.push(`This image is ${width} × ${height} pixels, about ${Math.round(placement.dpi)} DPI at this size, and may look blurry in print. For the same image shape at 300 DPI, use at least ${Math.ceil(width * 300 / placement.dpi)} × ${Math.ceil(height * 300 / placement.dpi)} pixels. You can still use this image.`);
  return warnings;
}

// Dimensions for the existing 6 x 9 cover export.
export const BACK_COVER_LIMIT = 1500;
// Supported input range for this cover calculator.
export const COVER_PAGE_MIN = 24;
export const COVER_PAGE_MAX = 830;
export const PAPER_CHOICES = {
  'bw-white': { label: 'Black-and-white on white paper', factor: 0.002252 },
  'bw-cream': { label: 'Black-and-white on cream paper', factor: 0.0025 },
  'standard-color': { label: 'Standard color on white paper', factor: 0.002252 },
  'premium-color': { label: 'Premium color on white paper', factor: 0.002347 },
} as const;
export type PaperChoice = keyof typeof PAPER_CHOICES;
export type BackCoverMode = 'text' | 'image';
export interface PaperbackCoverOptions { paper: PaperChoice; backText: string; backgroundColor?: string; backMode?: BackCoverMode; backImage?: string }

// Fill to the spine, leaving a quarter-inch background strip above the barcode band.
// Barcode top: 0.125 + 9 - 0.25 - 1.2 = 7.675 inches from the top bleed edge.
export const BACK_IMAGE_WIDTH = 6.125;
export const BACK_IMAGE_HEIGHT = 7.425; // Barcode top (7.675) minus 0.25-inch gap.
export const BACK_IMAGE_PIXELS_WIDE = Math.ceil(BACK_IMAGE_WIDTH * 300);
export const BACK_IMAGE_PIXELS_HIGH = Math.ceil(BACK_IMAGE_HEIGHT * 300);

export function backImagePlacement(width: number, height: number) {
  if (![width, height].every(value => Number.isFinite(value) && value > 0)) throw new Error('This image has no usable dimensions.');
  const scale = Math.max(BACK_IMAGE_WIDTH / width, BACK_IMAGE_HEIGHT / height);
  const printWidth = width * scale, printHeight = height * scale;
  return { x: (BACK_IMAGE_WIDTH - printWidth) / 2, y: (BACK_IMAGE_HEIGHT - printHeight) / 2,
    width: printWidth, height: printHeight, dpi: 1 / scale,
    cropSides: (printWidth - BACK_IMAGE_WIDTH) / scale > 1,
    cropTopBottom: (printHeight - BACK_IMAGE_HEIGHT) / scale > 1 };
}

export function checkBackImageSize(width: number, height: number): string | null {
  if (![width, height].every(value => Number.isSafeInteger(value) && value > 0)) return 'This image has no usable dimensions.';
  if (width < BACK_IMAGE_PIXELS_WIDE || height < BACK_IMAGE_PIXELS_HIGH) return `This image is ${width.toLocaleString()} × ${height.toLocaleString()} pixels. Use at least 1,838 × 2,228 pixels for the 6.125 × 7.425-inch back-cover image area at 300 DPI.`;
  return null;
}

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

export function characterCount(text: string) { return Array.from(text).length; }
export function limitBackText(text: string) { return Array.from(text).slice(0, BACK_COVER_LIMIT).join(''); }

// Front panel: 6 x 9 trim, plus bleed at top, bottom, and outer edge.
export const FRONT_WIDTH = 6.125;
export const FRONT_HEIGHT = 9.25;
export const COVER_BACKGROUND = '#f3efe5';

export function coverBackground(value: unknown): string {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : COVER_BACKGROUND;
}

// Choose the larger contrast ratio against the selected RGB background.
export function coverTextColor(background: string): '#000000' | '#ffffff' {
  const hex = coverBackground(background).slice(1);
  const rgb = [0, 2, 4].map(offset => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  const luminance = rgb[0]! * 0.2126 + rgb[1]! * 0.7152 + rgb[2]! * 0.0722;
  return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05) ? '#000000' : '#ffffff';
}
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
  if (fit === 'border') warnings.push('This option adds a border in your chosen background color around the front image. It will be visible in print and may look uneven after trimming. Choose Fill front cover or a different image if you do not want it.');
  if (placement.cropSides || placement.cropTopBottom) warnings.push(`To fill the front cover without an added border, the ${placement.cropSides ? 'sides' : 'top and bottom'} of this image will be cropped. Check the preview, especially any lettering near the edges.`);
  return warnings;
}

import type JSZip from 'jszip';
import { createPaperbackCover } from 'book-pdf/cover';
import { extractEpubCover } from './epub-cover';
import { COVER_BACKGROUND, FRONT_WIDTH, FRONT_HEIGHT, coverDimensions, frontPlacement, frontImageWarnings, paperbackPublishingNote, type FrontFit, type PaperbackCoverOptions } from './paperback-cover';

export interface PreparedFrontImage {
  dataUrl: string;
  sourceWidth: number;
  sourceHeight: number;
  dpi: number;
  fit: FrontFit;
  warnings: string[];
}

// Keep the whole uploaded artwork in the one saved JPEG, so placement can change.
export async function normalizeFrontUpload(file: File): Promise<{ name: string; jpeg: string }> {
  if (!(['image/jpeg', 'image/png'].includes(file.type) || (!file.type && /\.(jpe?g|png)$/i.test(file.name)))) {
    throw new Error('Choose a JPG or PNG image for the front cover.');
  }
  const url = URL.createObjectURL(file);
  const canvas = document.createElement('canvas');
  try {
    const image = new Image(); image.src = url; await image.decode();
    const placement = frontPlacement(image.naturalWidth, image.naturalHeight, 'fill');
    const scale = Math.min(1, 300 / placement.dpi);
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not prepare the cover image.');
    context.fillStyle = COVER_BACKGROUND; context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const jpeg = canvas.toDataURL('image/jpeg', 0.95);
    if (!jpeg.startsWith('data:image/jpeg;base64,')) throw new Error('This image is too large for your browser. Choose a smaller JPG or PNG.');
    return { name: file.name.replace(/\.[^.]*$/, '') + '.jpg', jpeg };
  } finally { canvas.width = canvas.height = 1; URL.revokeObjectURL(url); }
}

export async function prepareFrontImage(blob: Blob, fit: FrontFit = 'fill'): Promise<PreparedFrontImage> {
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const placement = frontPlacement(image.naturalWidth, image.naturalHeight, fit);
    // Prepare only the front panel. Cap at 300 DPI; do not upscale small images.
    const dpi = Math.min(300, placement.dpi);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(FRONT_WIDTH * dpi));
    canvas.height = Math.max(1, Math.round(FRONT_HEIGHT * dpi));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not prepare the cover image.');
    context.fillStyle = COVER_BACKGROUND;
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Separate scales account for whole-pixel canvas rounding at its outer edges.
    const sx = canvas.width / FRONT_WIDTH, sy = canvas.height / FRONT_HEIGHT;
    context.drawImage(image, placement.x * sx, placement.y * sy, placement.width * sx, placement.height * sy);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    // Free the pixel buffer promptly when creating large illustrated books.
    canvas.width = canvas.height = 1;
    if (!dataUrl.startsWith('data:image/jpeg;base64,')) throw new Error('Your browser could not prepare this image. Choose another JPG or PNG.');
    return { dataUrl, sourceWidth: image.naturalWidth, sourceHeight: image.naturalHeight,
      dpi: placement.dpi, fit, warnings: frontImageWarnings(image.naturalWidth, image.naturalHeight, fit) };
  } finally { URL.revokeObjectURL(url); }
}

export interface PaperbackCoverResult {
  blob: Blob;
  warnings: string[];
  dimensions: ReturnType<typeof coverDimensions>;
}

export async function generatePaperbackCover(
  zip: JSZip, pageCount: number, options: PaperbackCoverOptions,
  title: string, author: string, cancelled: () => boolean = () => false,
  selectedFront?: PreparedFrontImage,
): Promise<PaperbackCoverResult> {
  const check = () => { if (cancelled()) throw new DOMException('Cancelled', 'AbortError'); };
  check();
  const dimensions = coverDimensions(pageCount, options.paper);
  const front = selectedFront ?? await prepareFrontImage(await extractEpubCover(zip));
  check();
  const result = await createPaperbackCover({
    title, author, backText: options.backText, printPages: dimensions.printPages,
    spine: dimensions.spine, frontImage: front.dataUrl, frontWidth: FRONT_WIDTH, frontHeight: FRONT_HEIGHT, frontFullBleed: true,
  });
  check();
  const warnings = [...front.warnings, ...result.warnings];
  const publishingNote = paperbackPublishingNote(pageCount, options.paper);
  if (publishingNote) warnings.push(publishingNote);
  if (dimensions.pdfPages !== dimensions.printPages) warnings.push(
    `The PDF has ${dimensions.pdfPages} pages. The cover allows for ${dimensions.printPages}, because KDP rounds up to an even page count.`,
  );
  return { blob: result.blob, dimensions, warnings };
}

import type JSZip from 'jszip';
import { createPaperbackCover } from 'book-pdf/cover';
import { extractEpubCover } from './epub-cover';
import { coverDimensions, frontPlacement, paperbackPublishingNote, type PaperbackCoverOptions } from './paperback-cover';

export async function prepareFrontImage(blob: Blob) {
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const placement = frontPlacement(image.naturalWidth, image.naturalHeight);
    // Preserve all artwork; only reduce oversized images, never invent detail.
    const scale = Math.min(1, 300 / placement.dpi);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not prepare the cover image.');
    context.fillStyle = '#f3efe5';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    // Free the pixel buffer promptly when creating large illustrated books.
    canvas.width = canvas.height = 1;
    return { ...placement, dataUrl, sourceWidth: image.naturalWidth, sourceHeight: image.naturalHeight };
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
): Promise<PaperbackCoverResult> {
  const check = () => { if (cancelled()) throw new DOMException('Cancelled', 'AbortError'); };
  check();
  const dimensions = coverDimensions(pageCount, options.paper);
  const original = await extractEpubCover(zip);
  check();
  const front = await prepareFrontImage(original);
  check();
  const result = await createPaperbackCover({
    title, author, backText: options.backText, printPages: dimensions.printPages,
    spine: dimensions.spine, frontImage: front.dataUrl, frontWidth: front.width, frontHeight: front.height,
  });
  check();
  const warnings = [...result.warnings];
  const publishingNote = paperbackPublishingNote(pageCount, options.paper);
  if (publishingNote) warnings.push(publishingNote);
  if (front.dpi < 300) warnings.unshift(
    `Your cover image may look blurry in print. Use a larger original image for a sharper cover. This image is ${front.sourceWidth} × ${front.sourceHeight} pixels; about ${Math.ceil(front.width * 300)} × ${Math.ceil(front.height * 300)} pixels would suit this cover.`,
  );
  if (dimensions.pdfPages !== dimensions.printPages) warnings.push(
    `The PDF has ${dimensions.pdfPages} pages. The cover allows for ${dimensions.printPages}, because KDP rounds up to an even page count.`,
  );
  return { blob: result.blob, dimensions, warnings };
}

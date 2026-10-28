import { coverBackground, coverDimensions, coverTextColor, PAPER_CHOICES, type PaperChoice } from './paperback-cover';

const DPI = 300;

// The PNG covers only the full wrap, including bleed; no extra page or border.
export function coverTemplateSvg(pdfPages: number, paper: PaperChoice, background: string) {
  const dimensions = coverDimensions(pdfPages, paper);
  const { width, height, spine, printPages } = dimensions;
  const pixelWidth = Math.round(width * DPI);
  const pixelHeight = Math.round(height * DPI);
  const color = coverBackground(background);
  const ink = coverTextColor(color);
  const backEnd = 6.125;
  const frontStart = backEnd + spine;
  const frontCenter = frontStart + 3;
  const spineCenter = backEnd + spine / 2;
  // Safe panels match the calculator: 5.875 × 8.75 inches, with the
  // 0.125-inch margin at the outside/top/bottom and no overlap into the spine.
  const spineSafe = spine > 0.125
    ? `<rect x="${backEnd + 0.0625}" y="0.25" width="${spine - 0.125}" height="8.75"/>` : '';
  const spineLabel = spine >= 0.18
    ? `<text transform="translate(${spineCenter} 4.625) rotate(90)" font-size="${Math.min(0.13, spine - 0.125)}" dominant-baseline="middle">SPINE · ${spine.toFixed(4)} in</text>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${pixelWidth}" height="${pixelHeight}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
  <rect width="${width}" height="${height}" fill="${color}"/>
  <g fill="none" stroke="${ink}" stroke-width="0.008">
    <rect x="0.125" y="0.125" width="${width - 0.25}" height="9"/>
    <path d="M ${backEnd} 0 V ${height} M ${frontStart} 0 V ${height}"/>
  </g>
  <g fill="none" stroke="${ink}" stroke-width="0.006" stroke-dasharray="0.055 0.035">
    <rect x="0.25" y="0.25" width="5.875" height="8.75"/>
    <rect x="${frontStart}" y="0.25" width="5.875" height="8.75"/>
    ${spineSafe}
    <rect x="3.875" y="7.675" width="2" height="1.2"/>
  </g>
  <g fill="${ink}" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
    <text x="3.125" y="3.65" font-size="0.23" font-weight="bold">BACK COVER</text>
    <text x="3.125" y="3.98" font-size="0.16">6 × 9 inches</text>
    <text x="3.125" y="4.6" font-size="0.14">Full cover: ${width.toFixed(4)} × ${height} inches</text>
    <text x="3.125" y="4.9" font-size="0.14">${printPages} pages for printing · ${pixelWidth} × ${pixelHeight} pixels</text>
    <text x="3.125" y="5.2" font-size="0.13">${PAPER_CHOICES[paper].label} · 300 DPI</text>
    <text x="${frontCenter}" y="3.65" font-size="0.23" font-weight="bold">FRONT COVER</text>
    <text x="${frontCenter}" y="3.98" font-size="0.16">6 × 9 inches</text>
    <text x="${frontCenter}" y="4.6" font-size="0.14">Solid lines: trim and spine folds</text>
    <text x="${frontCenter}" y="4.9" font-size="0.14">Dashed lines: safe areas</text>
    <text x="${frontCenter}" y="5.2" font-size="0.14">Outer bleed: 0.125 inch</text>
    <text x="${frontCenter}" y="5.5" font-size="0.14">Spine margin: 0.0625 inch each side</text>
    ${spineLabel}
    <text x="4.875" y="8.16" font-size="0.14">BARCODE AREA</text>
    <text x="4.875" y="8.43" font-size="0.12">2 × 1.2 inches</text>
    <text x="4.875" y="8.65" font-size="0.09">0.25 inch from spine and bottom trim</text>
  </g>
</svg>`;
  return { svg, pixelWidth, pixelHeight, dimensions };
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Canvas defaults to 96 DPI. Replace its PNG resolution chunk with 300 DPI
// (pixels per metre) so an image editor can recover the intended physical size.
export async function pngWithTemplateResolution(blob: Blob): Promise<Blob> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  if (!signature.every((byte, index) => bytes[index] === byte)) throw new Error('Could not create the template PNG.');
  const resolution = new Uint8Array(21);
  const view = new DataView(resolution.buffer);
  view.setUint32(0, 9);
  resolution.set([112, 72, 89, 115], 4); // pHYs
  view.setUint32(8, Math.round(DPI / 0.0254));
  view.setUint32(12, Math.round(DPI / 0.0254));
  resolution[16] = 1; // metres
  view.setUint32(17, crc32(resolution.subarray(4, 17)));
  const chunks = [bytes.slice(0, 8)];
  const source = new DataView(bytes.buffer);
  let inserted = false;
  let ended = false;
  for (let offset = 8; offset + 12 <= bytes.length;) {
    const end = offset + 12 + source.getUint32(offset);
    if (end > bytes.length) throw new Error('The template PNG is incomplete.');
    const type = String.fromCharCode(...bytes.subarray(offset + 4, offset + 8));
    if (type !== 'pHYs') chunks.push(bytes.slice(offset, end));
    if (type === 'IHDR') { chunks.push(resolution); inserted = true; }
    if (type === 'IEND') { ended = true; break; }
    offset = end;
  }
  if (!inserted || !ended) throw new Error('The template PNG is incomplete.');
  return new Blob(chunks, { type: 'image/png' });
}

export async function createCoverTemplatePng(pdfPages: number, paper: PaperChoice, background: string): Promise<Blob> {
  const { svg, pixelWidth, pixelHeight } = coverTemplateSvg(pdfPages, paper, background);
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const canvas = document.createElement('canvas');
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    canvas.width = pixelWidth; canvas.height = pixelHeight;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not create the template image.');
    context.drawImage(image, 0, 0, pixelWidth, pixelHeight);
    const png = await new Promise<Blob>((resolve, reject) => canvas.toBlob(
      value => value ? resolve(value) : reject(new Error('Could not create the template PNG.')), 'image/png',
    ));
    return await pngWithTemplateResolution(png);
  } finally {
    URL.revokeObjectURL(url);
    canvas.width = 0; canvas.height = 0;
  }
}

// A temporary browser download only: no app service, settings or ebook writes.
export function downloadCoverTemplate(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.appendChild(link);
  try { link.click(); }
  finally {
    link.remove();
    // Give Safari time to start reading the download before releasing its URL.
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
}

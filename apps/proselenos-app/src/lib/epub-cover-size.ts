export const EPUB_COVER_WIDTH = 1707;
export const EPUB_COVER_HEIGHT = 2560;
export const EPUB_COVER_SIZE = `${EPUB_COVER_WIDTH} × ${EPUB_COVER_HEIGHT} pixels`;

export interface EpubCoverImageInfo {
  width: number;
  height: number;
  isJpeg: boolean;
}

export function matchesEpubCoverSize(info: Pick<EpubCoverImageInfo, 'width' | 'height'>): boolean {
  return info.width === EPUB_COVER_WIDTH && info.height === EPUB_COVER_HEIGHT;
}

// Read the actual image bytes and decoded dimensions, entirely in the browser.
export async function inspectEpubCover(image: Blob): Promise<EpubCoverImageInfo> {
  const signature = new Uint8Array(await image.slice(0, 3).arrayBuffer());
  const isJpeg = signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff;
  const url = URL.createObjectURL(image);
  try {
    const decoded = new Image();
    decoded.src = url;
    await decoded.decode();
    if (!decoded.naturalWidth || !decoded.naturalHeight) throw new Error('The image has no dimensions.');
    return { width: decoded.naturalWidth, height: decoded.naturalHeight, isJpeg };
  } finally {
    URL.revokeObjectURL(url);
  }
}

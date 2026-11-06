// Library stores every cover as cover.png, regardless of its actual format.
// Preserve the image bytes and give Authors the matching name and media type.
export async function libraryCoverFile(image: Blob): Promise<File> {
  const bytes = new Uint8Array(await image.slice(0, 1024).arrayBuffer());
  const text = new TextDecoder().decode(bytes);
  let extension: string;
  let type: string;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    extension = 'jpg'; type = 'image/jpeg';
  } else if ([137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte)) {
    extension = 'png'; type = 'image/png';
  } else if (/^GIF8[79]a/.test(text)) {
    extension = 'gif'; type = 'image/gif';
  } else if (text.startsWith('RIFF') && text.slice(8, 12) === 'WEBP') {
    extension = 'webp'; type = 'image/webp';
  } else if (text.startsWith('BM')) {
    extension = 'bmp'; type = 'image/bmp';
  } else if (text.slice(4, 8) === 'ftyp' && /avif|avis/.test(text.slice(8, 64))) {
    extension = 'avif'; type = 'image/avif';
  } else if (/<svg(?:\s|>)/i.test(text)) {
    extension = 'svg'; type = 'image/svg+xml';
  } else {
    throw new Error('This Library cover could not be opened. Choose an image instead.');
  }
  return new File([image], `cover.${extension}`, { type });
}

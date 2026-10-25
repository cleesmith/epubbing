import type JSZip from 'jszip';

function resolvePath(from: string, href: string) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) throw new Error('The EPUB cover must be stored inside the EPUB.');
  const url = new URL(href, `https://epub.invalid/${from}`);
  if (url.origin !== 'https://epub.invalid') throw new Error('Invalid EPUB cover location.');
  return decodeURIComponent(url.pathname.slice(1));
}

export async function extractEpubCover(zip: JSZip): Promise<Blob> {
  const parser = new DOMParser();
  const container = parser.parseFromString(await zip.file('META-INF/container.xml')?.async('text') ?? '', 'application/xml');
  const opfPath = container.querySelector('rootfile')?.getAttribute('full-path');
  if (!opfPath) throw new Error('The EPUB has no package file.');
  const xml = await zip.file(opfPath)?.async('text');
  if (!xml) throw new Error('The EPUB package file could not be read.');
  const opf = parser.parseFromString(xml, 'application/xml');
  const items = Array.from(opf.querySelectorAll('manifest > item'));
  const epub2Id = opf.querySelector('metadata > meta[name="cover"]')?.getAttribute('content');
  const designated = items.find(item => (item.getAttribute('properties') ?? '').split(/\s+/).includes('cover-image'))
    ?? items.find(item => item.getAttribute('id') === epub2Id);
  const candidates: string[] = [];
  if (designated?.getAttribute('href')) candidates.push(resolvePath(opfPath, designated.getAttribute('href')!));
  for (const item of Array.from(opf.querySelectorAll('guide > reference'))) {
    if ((item.getAttribute('type') ?? '').split(/\s+/).includes('cover') && item.getAttribute('href')) {
      candidates.push(resolvePath(opfPath, item.getAttribute('href')!));
    }
  }
  // Older EE EPUBs use a cover.xhtml wrapper without an OPF cover-image property.
  for (const item of items) {
    const href = item.getAttribute('href') ?? '';
    if (/(?:^|\/)cover(?:[-_.]|$)/i.test(href)) candidates.push(resolvePath(opfPath, href));
  }
  for (const candidate of [...new Set(candidates)]) {
    const file = zip.file(candidate);
    if (!file) continue;
    let imagePath = candidate;
    if (/\.x?html?$/i.test(candidate)) {
      const page = parser.parseFromString(await file.async('text'), 'application/xhtml+xml');
      const image = page.querySelector('img, image');
      const href = image?.getAttribute('src') ?? image?.getAttribute('href') ?? image?.getAttribute('xlink:href');
      if (!href) continue;
      imagePath = resolvePath(candidate, href);
    }
    const imageFile = zip.file(imagePath);
    if (!imageFile) continue;
    const extension = imagePath.split('.').pop()?.toLowerCase();
    const mime = ({ jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' } as Record<string, string>)[extension ?? ''];
    if (!mime) continue;
    return new Blob([await imageFile.async('arraybuffer')], { type: mime });
  }
  throw new Error('The existing cover image could not be read from this EPUB.');
}

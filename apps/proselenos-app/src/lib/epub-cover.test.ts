import { describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import { extractEpubCover } from './epub-cover';

function fixture(manifest: string, metadata = '', guide = '') {
  const zip = new JSZip();
  zip.file('META-INF/container.xml', '<container><rootfiles><rootfile full-path="OEBPS/content.opf"/></rootfiles></container>');
  zip.file('OEBPS/content.opf', `<package><metadata>${metadata}</metadata><manifest>${manifest}</manifest>${guide}</package>`);
  zip.file('OEBPS/images/front art.jpg', 'original cover bytes');
  return zip;
}

describe('original EPUB cover extraction', () => {
  it('uses EPUB 3 cover-image metadata and decodes paths', async () => {
    const zip = fixture('<item id="art" properties="cover-image" href="images/front%20art.jpg" media-type="image/jpeg"/>');
    const blob = await extractEpubCover(zip);
    expect(blob.type).toBe('image/jpeg');
    expect(blob.size).toBe(20);
  });
  it('supports EPUB 2 cover metadata', async () => {
    const zip = fixture('<item id="art" href="images/front%20art.jpg" media-type="image/jpeg"/>', '<meta name="cover" content="art"/>');
    expect((await extractEpubCover(zip)).size).toBe(20);
  });
  it('supports cover wrappers and relative SVG image references', async () => {
    const zip = fixture('<item id="cover" href="text/cover.xhtml" media-type="application/xhtml+xml"/>');
    zip.file('OEBPS/text/cover.xhtml', '<html xmlns:xlink="http://www.w3.org/1999/xlink"><body><svg><image xlink:href="../images/front%20art.jpg"/></svg></body></html>');
    expect((await extractEpubCover(zip)).size).toBe(20);
  });
  it('rejects external covers and reports missing ones', async () => {
    await expect(extractEpubCover(fixture('<item properties="cover-image" href="https://example.com/cover.jpg"/>'))).rejects.toThrow(/inside/);
    await expect(extractEpubCover(fixture(''))).rejects.toThrow(/could not be read/);
  });
});

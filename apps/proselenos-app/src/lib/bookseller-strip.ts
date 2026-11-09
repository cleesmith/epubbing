/**
 * Strip No Matter sections, Visual Narrative, Sticky Image, and SceneCraft data from an epub zip.
 *
 * Produces a clean, plain epub suitable for booksellers (D2D, KDP, etc.)
 * while preserving the book's reading content.
 *
 * Used by both BookDetailModal (download bookseller epub) and
 * BookshelfItem (read as bookseller preview).
 */
import JSZip from 'jszip';
import { removePaperbackSetup } from './paperback-epub';

/**
 * Mutates the given JSZip in place, stripping VN/sticky/SceneCraft content.
 * - No Matter sections and their navigation entries are removed.
 * - Images and audio folders are kept intact.
 * - All XHTML files are cleaned of VN class names and sticky markup.
 * - visual-narrative.css and meta.json are removed from the zip.
 * - content.opf manifest entry for vn-style is removed.
 */
export async function stripEpubForBookseller(zip: JSZip): Promise<void> {
  removePaperbackSetup(zip);
  await removeNoMatterSections(zip);
  // Step 1: Strip XHTML content files
  const xhtmlFiles = Object.keys(zip.files).filter(
    (name) => name.startsWith('OEBPS/') && name.endsWith('.xhtml')
  );

  for (const name of xhtmlFiles) {
    const content = await zip.file(name)!.async('string');
    const stripped = stripXhtmlContent(content);
    if (stripped !== content) {
      zip.file(name, stripped);
    }
  }

  // Step 2: Remove VN CSS and SceneCraft meta.json
  zip.remove('OEBPS/css/visual-narrative.css');
  zip.remove('OEBPS/meta.json');

  // Step 3: Update content.opf — remove vn-style manifest entry
  const opfPath = 'OEBPS/content.opf';
  const opfFile = zip.file(opfPath);
  if (opfFile) {
    let opf = await opfFile.async('string');
    opf = opf.replace(/\s*<item\s+id="vn-style"\s+href="css\/visual-narrative\.css"[^>]*\/>/g, '');
    zip.file(opfPath, opf);
  }
}

/** Remove EE's No Matter sections only from the temporary Booksellers copy. */
async function removeNoMatterSections(zip: JSZip): Promise<void> {
  const prefix = 'OEBPS/nomatter/';
  if (!Object.keys(zip.files).some(name => name.startsWith(prefix))) return;

  // Do not classify by title or linear="no": ordinary books can use both
  // for published notes. EE puts sections assigned to No Matter in this folder.
  const isNoMatterLink = (href: string | null, from: string): boolean => {
    if (!href) return false;
    try {
      const url = new URL(href, `https://epub.invalid/${from}`);
      return url.origin === 'https://epub.invalid' &&
        decodeURIComponent(url.pathname).slice(1).startsWith(prefix);
    } catch {
      return false;
    }
  };

  const paths = Object.keys(zip.files).filter(name =>
    name.startsWith('OEBPS/') && !name.startsWith(prefix) && /\.(xhtml|opf|ncx)$/.test(name)
  );
  for (const path of paths) {
    const content = await zip.file(path)!.async('string');
    const doc = new DOMParser().parseFromString(content, 'application/xml');
    if (doc.querySelector('parsererror')) {
      throw new Error(`Could not prepare the Booksellers EPUB: ${path} contains invalid XML.`);
    }
    let changed = false;
    const remove = (element: Element) => { element.remove(); changed = true; };
    const onlyNoMatterLinks = (elements: Element[], attribute: string) =>
      elements.length > 0 && elements.every(element => isNoMatterLink(element.getAttribute(attribute), path));

    if (path.endsWith('.opf')) {
      const removedIds = new Set<string>();
      for (const item of Array.from(doc.querySelectorAll('manifest > item'))) {
        if (!isNoMatterLink(item.getAttribute('href'), path)) continue;
        const id = item.getAttribute('id');
        if (id) removedIds.add(id);
        remove(item);
      }
      for (const item of Array.from(doc.querySelectorAll('spine > itemref'))) {
        if (removedIds.has(item.getAttribute('idref') || '')) remove(item);
      }
      for (const reference of Array.from(doc.querySelectorAll('guide > reference'))) {
        if (isNoMatterLink(reference.getAttribute('href'), path)) remove(reference);
      }
      for (const meta of Array.from(doc.querySelectorAll('metadata > meta[refines]'))) {
        if (removedIds.has((meta.getAttribute('refines') || '').replace(/^#/, ''))) remove(meta);
      }
    } else if (path.endsWith('.ncx')) {
      for (const item of Array.from(doc.querySelectorAll('navPoint, pageTarget, navTarget'))) {
        if (item.isConnected && onlyNoMatterLinks(Array.from(item.querySelectorAll('content[src]')), 'src')) remove(item);
      }
    } else {
      // Remove the entire navigation group when all its entries are No Matter,
      // including the generated "Author's Notes" label, without matching titles.
      for (const item of Array.from(doc.querySelectorAll('nav li'))) {
        if (item.isConnected && onlyNoMatterLinks(Array.from(item.querySelectorAll('a[href]')), 'href')) remove(item);
      }
      if (path === 'OEBPS/contents.xhtml') {
        for (const header of Array.from(doc.querySelectorAll('.toc-section-header'))) {
          const links: Element[] = [];
          for (let next = header.nextElementSibling; next && !next.classList.contains('toc-section-header'); next = next.nextElementSibling) {
            links.push(...Array.from(next.querySelectorAll('a[href]')));
          }
          if (onlyNoMatterLinks(links, 'href')) remove(header);
        }
        for (const item of Array.from(doc.querySelectorAll('.toc-item'))) {
          if (onlyNoMatterLinks(Array.from(item.querySelectorAll('a[href]')), 'href')) remove(item);
        }
      }
      // A chapter may link to an author's private note. Keep its visible words,
      // formatting and ID, but do not leave a link to a file we have removed.
      for (const link of Array.from(doc.querySelectorAll('a[href]'))) {
        if (!isNoMatterLink(link.getAttribute('href'), path)) continue;
        link.removeAttribute('href');
        const epubNamespace = 'http://www.idpf.org/2007/ops';
        const types = link.getAttributeNS(epubNamespace, 'type');
        if (types?.split(/\s+/).includes('noteref')) {
          const kept = types.split(/\s+/).filter(type => type !== 'noteref').join(' ');
          if (kept) link.setAttributeNS(epubNamespace, 'epub:type', kept);
          else link.removeAttributeNS(epubNamespace, 'type');
        }
        if (link.getAttribute('role') === 'doc-noteref') link.removeAttribute('role');
        changed = true;
      }
    }
    if (changed) zip.file(path, new XMLSerializer().serializeToString(doc));
  }
  zip.remove(prefix);
}

/**
 * Strip all VN/sticky/SceneCraft markup from a single XHTML string.
 *
 * Replacements are applied in a specific order so that outer wrappers
 * are handled before their inner elements get individually transformed.
 */
function stripXhtmlContent(html: string): string {
  let s = html;

  // 1. VN CSS link → style.css
  //    Handles both "css/visual-narrative.css" and "../css/visual-narrative.css" (nomatter)
  s = s.replace(
    /<link[^>]*href="(\.\.\/)?css\/visual-narrative\.css"[^/]*\/>/g,
    (_match, prefix) => {
      const p = prefix || '';
      return `<link rel="stylesheet" type="text/css" href="${p}css/style.css"/>`;
    }
  );

  // 2. Sticky-wrap blocks → figure + text paragraphs
  //    Must run before individual sticky-* cleanups since this replaces the whole block.
  s = s.replace(
    /<div class="sticky-wrap">\s*<div class="sticky-img-wrap"[^>]*>([\s\S]*?)<\/div>\s*<div class="sticky-text">\s*([\s\S]*?)\s*<\/div>\s*<\/div>/g,
    (_match, imgWrapContent: string, textContent: string) => {
      const imgMatch = imgWrapContent.match(/<img[^>]*\bsrc="([^"]*)"[^>]*\balt="([^"]*)"[^>]*\/>/);
      let result = '';
      if (imgMatch) {
        result += `<figure><img src="${imgMatch[1]}" alt="${imgMatch[2]}"/></figure>\n`;
      }
      result += textContent.trim() + '\n';
      return result;
    }
  );

  // 3. Unwrap <article class="scene" ...> wrapper (keep children)
  s = s.replace(/<article\s+class="scene"[^>]*>\s*/g, '');
  s = s.replace(/\s*<\/article>/g, '');

  // 4. <h1 class="scene-title"> → plain <h1>
  s = s.replace(/<h1 class="scene-title">/g, '<h1>');

  // 5. Dialogue: <div class="dialogue"><span class="speaker">X</span>Y</div>
  //    → <blockquote><strong>X</strong>Y</blockquote>
  s = s.replace(
    /<div class="dialogue"><span class="speaker">([\s\S]*?)<\/span>([\s\S]*?)<\/div>/g,
    '<blockquote><strong>$1</strong><br/>$2</blockquote>'
  );

  // 6. <p class="internal"> → <p style="font-style:italic">
  s = s.replace(/<p class="internal">/g, '<p style="font-style:italic">');

  // 7. <p class="emphasis-line"> → <p style="text-align:center">
  s = s.replace(/<p class="emphasis-line">/g, '<p style="text-align:center">');

  // 8. <p class="scene-break">...</p> → <hr/>
  s = s.replace(/<p class="scene-break">[^<]*<\/p>/g, '<hr/>');

  // 9. <div class="visual ..."> → <figure>, with caption → figcaption
  s = s.replace(
    /<div class="visual[^"]*">\s*([\s\S]*?)\s*<\/div>/g,
    (_match, inner: string) => {
      const converted = inner.replace(
        /<p class="caption">([\s\S]*?)<\/p>/g,
        '<figcaption>$1</figcaption>'
      );
      return `<figure>${converted.trim()}</figure>`;
    }
  );

  // 10. <div class="clearfix"></div> → remove entirely
  s = s.replace(/<div class="clearfix">\s*<\/div>\n?/g, '');

  // 11. scene-audio wrapper → keep <audio> only, strip wrapper and audio-label
  s = s.replace(
    /<div class="scene-audio">\s*(?:<p class="audio-label">[^<]*<\/p>\s*)?(<audio[\s\S]*?<\/audio>)\s*<\/div>/g,
    '$1'
  );

  // 12. audio-block wrapper → keep <audio> only
  s = s.replace(
    /<div class="audio-block">\s*(<audio[\s\S]*?<\/audio>)\s*(?:<p class="caption">[^<]*<\/p>\s*)?<\/div>/g,
    '$1'
  );

  // 13–17. Cleanup any remaining sticky/enlarge artifacts
  s = s.replace(/<input type="checkbox" id="enlarge-\d+"\/>\n?/g, '');
  s = s.replace(/<label class="enlarge-overlay" for="enlarge-\d+"><\/label>\n?/g, '');
  s = s.replace(/<label class="img-label" for="enlarge-\d+">\s*/g, '');
  // Remove orphaned </label> only near sticky/enlarge context
  s = s.replace(/<\/label>\n?(?=\s*(?:<label class="enlarge|<p class="sticky))/g, '');
  s = s.replace(/ class="sticky-img"/g, '');
  s = s.replace(/<p class="sticky-caption">[^<]*<\/p>\n?/g, '');

  return s;
}

/** Preserve XHTML and resolve book-local references without passing through the editor. */
const XHTML = 'http://www.w3.org/1999/xhtml';
const EPUB = 'http://www.idpf.org/2007/ops';
const ROOT = 'https://epub.invalid/';

export interface SectionLocation {
  id: string;
  title: string;
  type?: string;
  sourceHref?: string;
}

export function sectionOutputPath(section: SectionLocation): string {
  const title = section.title.toLowerCase();
  if (section.id === 'cover' || title === 'cover') return 'cover.xhtml';
  if (section.id === 'title-page' || title === 'title page') return 'title-page.xhtml';
  if (section.id === 'copyright' || title === 'copyright') return 'copyright.xhtml';
  return `${section.type === 'no-matter' ? 'nomatter/' : ''}${section.id}.xhtml`;
}

export function parseXhtmlFragment(xhtml: string): Element {
  const parser = new DOMParser();
  const xml = parser.parseFromString(
    `<div xmlns="${XHTML}" xmlns:epub="${EPUB}">${xhtml}</div>`, 'application/xhtml+xml',
  );
  if (!xml.querySelector('parsererror')) return xml.documentElement;
  // Legacy working copies contain HTML void tags such as <img> and <br>.
  // XMLSerializer writes them as XHTML, retaining text and inline spacing.
  return parser.parseFromString(xhtml, 'text/html').body;
}

export function serializeChildren(element: Element): string {
  const serializer = new XMLSerializer();
  return Array.from(element.childNodes).map(node => serializer.serializeToString(node)).join('');
}

/** EPUB vocabulary declarations belong on the document's html element. */
export function restoreDocumentVocabulary(xhtml: string): string {
  if (!xhtml.includes('epub:prefix')) return xhtml;
  const doc = new DOMParser().parseFromString(xhtml, 'application/xhtml+xml');
  if (doc.querySelector('parsererror')) throw new Error('Could not preserve this section as valid XHTML.');
  const prefixes = new Set<string>();
  for (const element of [doc.documentElement, ...Array.from(doc.documentElement.querySelectorAll('*'))]) {
    const value = element.getAttributeNS(EPUB, 'prefix');
    if (value) prefixes.add(value);
    if (element !== doc.documentElement) element.removeAttributeNS(EPUB, 'prefix');
  }
  if (prefixes.size) doc.documentElement.setAttributeNS(EPUB, 'epub:prefix', [...prefixes].join(' '));
  return new XMLSerializer().serializeToString(doc);
}

export function extractEpubBody(html: string): string {
  const parser = new DOMParser();
  let doc = parser.parseFromString(html, 'application/xhtml+xml');
  if (doc.querySelector('parsererror')) doc = parser.parseFromString(html, 'text/html');
  const body = doc.getElementsByTagName('body')[0];
  if (!body) throw new Error('This EPUB section has no readable body.');
  // Preserve namespace/vocabulary declarations and body IDs as well as its
  // children. Whitespace between inline elements can separate words.
  const wrapper = doc.createElementNS(XHTML, 'div');
  for (const attribute of Array.from(doc.documentElement.attributes)) {
    if (/^(xmlns(?::.*)?|xml:lang|lang|epub:prefix)$/.test(attribute.name)) {
      wrapper.setAttributeNS(attribute.namespaceURI, attribute.name, attribute.value);
    }
  }
  for (const attribute of Array.from(body.attributes)) {
    wrapper.setAttributeNS(attribute.namespaceURI, attribute.name, attribute.value);
  }
  for (const child of Array.from(body.childNodes)) wrapper.appendChild(child.cloneNode(true));
  return new XMLSerializer().serializeToString(wrapper);
}

function fileKey(path: string): string {
  try { return decodeURIComponent(new URL(path, ROOT).pathname).slice(1); }
  catch { return path; }
}

function relativePath(from: string, to: string): string {
  const parent = from.split('/').slice(0, -1);
  const target = to.split('/');
  while (parent.length && parent[0] === target[0]) { parent.shift(); target.shift(); }
  return [...parent.map(() => '..'), ...target].map(part => part === '..' ? part : encodeURIComponent(part)).join('/');
}

export function rewriteSectionReferences(
  xhtml: string,
  section: SectionLocation,
  sections: SectionLocation[],
  images: string[] = [],
  audios: string[] = [],
): string {
  const output = sectionOutputPath(section);
  const source = section.sourceHref || output;
  const targets = new Map<string, string>();
  for (const item of sections) {
    if (item.sourceHref) targets.set(fileKey(item.sourceHref), sectionOutputPath(item));
  }
  // Current section filenames are also valid for links created inside EE.
  for (const item of sections) {
    const key = fileKey(sectionOutputPath(item));
    if (!targets.has(key)) targets.set(key, sectionOutputPath(item));
  }
  const media = new Map([
    ...images.map(name => [name, `images/${name}`] as const),
    ...audios.map(name => [name, `audio/${name}`] as const),
  ]);
  const rewrite = (value: string): string => {
    if (!value || value.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return value;
    let url: URL;
    try { url = new URL(value, new URL(source, ROOT)); } catch { return value; }
    const key = fileKey(url.pathname);
    const target = targets.get(key) || media.get(key.split('/').pop() || '');
    if (!target) return value; // Leave unresolved links visible to EPUBCheck.
    const path = target === output && url.hash ? '' : relativePath(output, target);
    return path + url.search + url.hash;
  };
  const root = parseXhtmlFragment(xhtml);
  for (const element of Array.from(root.querySelectorAll('*'))) {
    for (const name of ['href', 'src', 'poster', 'xlink:href']) {
      const value = element.getAttribute(name);
      if (value !== null) element.setAttribute(name, rewrite(value));
    }
    const srcset = element.getAttribute('srcset');
    if (srcset && !srcset.includes('data:')) {
      element.setAttribute('srcset', srcset.split(',').map(candidate => {
        const [url = '', ...descriptor] = candidate.trim().split(/\s+/);
        return [rewrite(url), ...descriptor].join(' ');
      }).join(', '));
    }
  }
  return serializeChildren(root);
}

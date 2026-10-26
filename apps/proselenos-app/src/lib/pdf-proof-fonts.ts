export interface PdfFontUsage {
  name: string;
  postscriptName: string;
  sizes: number[];
}

type Font = { fullName?: string; postscriptName?: string };
type LayoutNode = {
  children?: LayoutNode[];
  lines?: Array<{ runs?: Array<{
    glyphs?: unknown[];
    positions?: unknown[];
    attributes?: { font?: Font[]; fontSize?: number };
  }> }>;
};

// Read the same shaped text runs that the PDF renderer writes. Registered but
// unused font faces and empty running headers are not included.
export async function collectPdfFontUsage(
  layout: unknown,
  checkpoint: () => Promise<void>,
): Promise<PdfFontUsage[]> {
  const used = new Map<string, { name: string; postscriptName: string; sizes: Set<number> }>();
  const stack = [layout as LayoutNode | undefined];
  let lastYield = performance.now();
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    for (const line of node.lines ?? []) {
      for (const run of line.runs ?? []) {
        if (!run.glyphs?.length || !run.positions) continue;
        const font = run.attributes?.font?.[0];
        const size = run.attributes?.fontSize;
        const name = font?.fullName || font?.postscriptName;
        if (!name || typeof size !== 'number' || !Number.isFinite(size) || size <= 0) continue;
        const postscriptName = font?.postscriptName || name;
        let entry = used.get(postscriptName);
        if (!entry) {
          entry = { name, postscriptName, sizes: new Set() };
          used.set(postscriptName, entry);
        }
        entry.sizes.add(size);
      }
    }
    for (const child of node.children ?? []) stack.push(child);
    if (performance.now() - lastYield >= 32) {
      await checkpoint();
      lastYield = performance.now();
    }
  }
  return [...used.values()]
    .map(entry => ({ ...entry, sizes: [...entry.sizes].sort((a, b) => a - b) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { expect, it } from 'vitest';
import { collectPdfFontUsage } from './pdf-proof-fonts';

it('reports actual font names, deduplicates sizes and excludes unused faces and empty text', async () => {
  const packageRoot = path.resolve(__dirname, '../../../../packages/book-pdf');
  const require = createRequire(path.join(packageRoot, 'package.json'));
  const { create } = require('fontkit');
  const fonts = Object.fromEntries(['Regular', 'Bold', 'Italic', 'BoldItalic', 'Medium'].map(style => [style,
    create(fs.readFileSync(path.join(packageRoot, `fonts/EBGaramond-${style}.ttf`))),
  ]));
  const run = (style: string, size: number, text = 'Book text') => {
    const font = fonts[style];
    const shaped = font.layout(text);
    return { glyphs: shaped.glyphs, positions: shaped.positions, attributes: { font: [font], fontSize: size } };
  };
  const layout = { children: [
    { children: [{ lines: [{ runs: [run('Bold', 28), run('Italic', 16), run('Regular', 11)] }] }] },
    { lines: [{ runs: [run('Regular', 12), run('Regular', 9), run('Regular', 11), run('BoldItalic', 11), run('Medium', 15, '')] }] },
  ] };
  const usage = await collectPdfFontUsage(layout, async () => {});
  expect(Object.fromEntries(usage.map(row => [row.postscriptName, row.sizes]))).toEqual({
    'EBGaramond-Regular': [9, 11, 12],
    'EBGaramond-Bold': [28],
    'EBGaramond-Italic': [16],
    'EBGaramond-BoldItalic': [11],
  });
  expect(usage.every(row => row.name.startsWith('EB Garamond'))).toBe(true);
});

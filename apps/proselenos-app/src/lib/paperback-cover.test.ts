// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { coverBackground, coverTextColor, coverDimensions, frontPlacement, frontImageWarnings, FRONT_WIDTH, FRONT_HEIGHT, characterCount, limitBackText, PAPER_CHOICES, type PaperChoice } from './paperback-cover';
import { checkBackCoverText, createPaperbackCover } from 'book-pdf/cover';
import fs from 'node:fs';

describe('6x9 paperback cover', () => {
  it('chooses readable black or white ink for light, dark and saturated colors', () => {
    for (const color of ['#ffffff', '#f3efe5', '#ffff00', '#00ff00', '#ff0000']) expect(coverTextColor(color)).toBe('#000000');
    for (const color of ['#000000', '#123456', '#0000ff']) expect(coverTextColor(color)).toBe('#ffffff');
    expect(coverBackground('#ABCDEF')).toBe('#abcdef');
    for (const value of [undefined, null, '', 'red', '#123', '#12345678']) expect(coverBackground(value)).toBe('#f3efe5');
  });
  it('calculates the cover dimensions and rounds odd page counts up', () => {
    expect(coverDimensions(300, 'bw-cream')).toMatchObject({ spine: 0.75, width: 13, height: 9.25 });
    expect(coverDimensions(299, 'bw-cream').printPages).toBe(300);
    expect(coverDimensions(300, 'bw-white').spine).toBeCloseTo(0.6756, 6);
    expect(coverDimensions(300, 'standard-color').spine).toBeCloseTo(0.6756, 6);
    expect(coverDimensions(300, 'premium-color').spine).toBeCloseTo(0.7041, 6);
  });
  it('uses the calculator range for every paper and checks before rounding', () => {
    for (const paper of Object.keys(PAPER_CHOICES) as PaperChoice[]) {
      expect(coverDimensions(24, paper).printPages).toBe(24);
      expect(coverDimensions(829, paper).printPages).toBe(830);
      expect(coverDimensions(830, paper).printPages).toBe(830);
      for (const pages of [23, 831, 871]) expect(() => coverDimensions(pages, paper)).toThrow(/24–830/);
    }
    expect(() => coverDimensions(NaN, 'bw-white')).toThrow(/invalid/);
    expect(() => coverDimensions(24.5, 'bw-white')).toThrow(/invalid/);
  });
  it('covers the entire front panel including bleed for every image shape', () => {
    for (const [width, height] of [[2450, 3700], [600, 900], [1000, 1000], [2200, 1100]]) {
      const p = frontPlacement(width!, height!);
      expect(p.x).toBeLessThanOrEqual(0.000001); expect(p.y).toBeLessThanOrEqual(0.000001);
      expect(p.x + p.width).toBeGreaterThanOrEqual(FRONT_WIDTH - 0.000001);
      expect(p.y + p.height).toBeGreaterThanOrEqual(FRONT_HEIGHT - 0.000001);
    }
    expect(frontImageWarnings(1838, 2775, 'fill')).toEqual([]);
    expect(frontImageWarnings(245, 370, 'fill')).toEqual([]);
    expect(frontImageWarnings(2200, 1100, 'fill').join(' ')).toMatch(/cropped/);
    expect(frontPlacement(600, 900).dpi).toBeLessThan(300);
  });
  it('keeps the entire image only when the author chooses a warned border', () => {
    expect(frontPlacement(1650, 2550, 'border')).toMatchObject({ width: 5.5, height: 8.5, dpi: 300, x: 0.25, y: 0.375 });
    expect(frontPlacement(2200, 1100, 'border')).toMatchObject({ width: 5.5, height: 2.75, cropSides: false, cropTopBottom: false });
    expect(frontImageWarnings(1650, 2550, 'border')[0]).toMatch(/chosen background color/);
  });
  it('counts spaces and Unicode characters without splitting surrogate pairs', () => {
    expect(characterCount('A 😀 B')).toBe(5);
    expect(characterCount(limitBackText('😀'.repeat(1600)))).toBe(1500);
  });
  it('checks actual 14-point text fit as well as character count', () => {
    expect(checkBackCoverText('A quiet story about the people who stay.')).toBeNull();
    expect(checkBackCoverText('x'.repeat(1501))).toMatch(/1,500/);
    expect(checkBackCoverText('A\n'.repeat(100))).toMatch(/more space/);
    expect(checkBackCoverText('A story 😀')).toMatch(/cannot print/);
    expect(checkBackCoverText('')).toBeNull();
  });
  it('renders a single cover with a thick spine and omits lettering on a thin one', async () => {
    const image = fs.readFileSync('public/images/sand-texture.jpg').toString('base64');
    const input = { title: 'The Quiet Valley', author: 'Clee Smith', backText: 'The road follows the river until it runs out of room.',
      printPages: 300, spine: 0.75, frontImage: `data:image/jpeg;base64,${image}`, frontWidth: 5.5, frontHeight: 8.25 };
    const thick = await createPaperbackCover(input);
    expect(thick.spineText).toBe(true);
    expect(thick.blob.size).toBeGreaterThan(1000);
    const thin = await createPaperbackCover({ ...input, printPages: 24, spine: 0.054048 });
    expect(thin.spineText).toBe(false);
    expect(thin.warnings[0]).toMatch(/left off/);
    const full = await createPaperbackCover({ ...input, frontFullBleed: true, backgroundColor: '#123456', textColor: '#ffffff' });
    expect(full.blob.size).toBeGreaterThan(1000);
    if (process.env.COVER_TEST_OUTPUT) fs.writeFileSync(process.env.COVER_TEST_OUTPUT, new Uint8Array(await full.blob.arrayBuffer()));
  });
});

// Standalone cover renderer using the same embedded EB Garamond as the interior.
// RGB is intentional. No color conversion, profiles, or standard-font fallbacks.
import PDFDocument from './src/pdfkit/index';
import { EBGARAMOND_FONTS } from './src/font/embedded-fonts';

const PT = 72;
const BLEED = 9;
const BACK_FONT = 14;
const BACK_WIDTH = 5 * PT;
const BACK_HEIGHT = 6.5 * PT;
const BACK_OPTIONS = { width: BACK_WIDTH, lineGap: 3, paragraphGap: 7, align: 'left' };
const BG = '#f3efe5';
const INK = '#211d17';
let fontBytes;
function regularFont() {
  if (!fontBytes) {
    const data = EBGARAMOND_FONTS.fonts[0].src.split(',')[1];
    fontBytes = Uint8Array.from(atob(data), (character) => character.charCodeAt(0));
  }
  return fontBytes;
}

function documentWithFont(options = {}) {
  const doc = new PDFDocument({ autoFirstPage: false, compress: true, ...options });
  doc.registerFont('EBGaramond', regularFont());
  doc.font('EBGaramond');
  return doc;
}

function missingCharacter(doc, text) {
  return Array.from(text).find((character) => !/\s/u.test(character) &&
    !doc._font.font.hasGlyphForCodePoint(character.codePointAt(0)));
}

function checkText(doc, text) {
  if (Array.from(text).length > 1500) return 'Keep the back-cover text to 1,500 characters, including spaces.';
  const missing = missingCharacter(doc, text);
  if (missing) return `EB Garamond cannot print “${missing}”. Please replace that character.`;
  doc.fontSize(BACK_FONT);
  if (text.trim() && doc.heightOfString(text.trim(), BACK_OPTIONS) > BACK_HEIGHT) {
    return 'This text needs more space than the back cover allows. Shorten it or remove extra blank lines; the lettering stays at 14 points.';
  }
  return null;
}

export function checkBackCoverText(text) {
  const doc = documentWithFont();
  try { return checkText(doc, text); }
  finally { doc.destroy(); }
}

export async function createPaperbackCover(input) {
  const { title, author, backText, printPages, spine, frontImage, frontWidth, frontHeight } = input;
  if (!Number.isFinite(spine) || spine <= 0 || !Number.isInteger(printPages) || printPages < 24) {
    throw new Error('Invalid paperback dimensions.');
  }
  const doc = documentWithFont({ info: { Title: `${title} — Paperback Cover`, Author: author } });
  const textError = checkText(doc, backText);
  if (textError) { doc.destroy(); throw new Error(textError); }
  const width = (12.25 + spine) * PT;
  const height = 9.25 * PT;
  const chunks = [];
  const completed = new Promise((resolve, reject) => {
    doc.on('data', (chunk) => chunks.push(new Uint8Array(chunk)));
    doc.on('error', reject);
    doc.on('end', () => resolve(new Blob(chunks, { type: 'application/pdf' })));
  });
  const warnings = [];
  let spineText = false;
  try {
    doc.addPage({ size: [width, height], margin: 0 });
    doc.rect(0, 0, width, height).fill(BG);
    doc.fillColor(INK).fontSize(BACK_FONT);
    if (backText.trim()) doc.text(backText.trim(), BLEED + 0.5 * PT, BLEED + 0.65 * PT, BACK_OPTIONS);

    // Keep a 2 x 1.2-inch barcode box clear, 0.25 inch from spine and bottom trim.
    doc.rect(BLEED + (6 - 0.25 - 2) * PT, BLEED + (9 - 0.25 - 1.2) * PT, 2 * PT, 1.2 * PT).fill('#ffffff');

    // The full EPUB artwork is preserved; the matching neutral surround supplies bleed.
    const frontX = BLEED + (6 + spine) * PT;
    doc.image(frontImage, frontX + (6 - frontWidth) * PT / 2,
      BLEED + (9 - frontHeight) * PT / 2, { width: frontWidth * PT, height: frontHeight * PT });

    // Read down the spine. Title starts near the top; author ends near the bottom.
    const safeWidth = spine * PT - 2 * 0.0625 * PT;
    const cleanTitle = title.replace(/\s+/gu, ' ').trim();
    const cleanAuthor = author.replace(/\s+/gu, ' ').trim();
    let size = 18;
    while (size >= 7) {
      doc.fontSize(size);
      if (doc.currentLineHeight(true) <= safeWidth &&
          doc.widthOfString(cleanTitle) <= 4.75 * PT &&
          doc.widthOfString(cleanAuthor) <= 2.75 * PT) break;
      size -= 0.5;
    }
    if (printPages >= 80 && size >= 7 && cleanTitle && cleanAuthor &&
        !missingCharacter(doc, cleanTitle + cleanAuthor)) {
      spineText = true;
      const center = BLEED + 6 * PT + spine * PT / 2;
      const lineHeight = doc.currentLineHeight(true);
      const sideways = (text, y) => {
        doc.save().translate(center, y).rotate(90).fillColor(INK);
        doc.text(text, 0, -lineHeight / 2, { lineBreak: false });
        doc.restore();
      };
      sideways(cleanTitle, BLEED + 0.5 * PT);
      sideways(cleanAuthor, BLEED + 8.5 * PT - doc.widthOfString(cleanAuthor));
    } else {
      warnings.push('Spine lettering was left off because it would not fit safely at a readable size.');
    }
    doc.end();
  } catch (error) {
    doc.destroy(error);
  }
  const blob = await completed;
  if (blob.size > 650 * 1000 * 1000) throw new Error('The cover PDF exceeds KDP’s 650 MB limit.');
  if (blob.size > 40 * 1000 * 1000) warnings.push('This cover PDF is larger than KDP’s recommended 40 MB.');
  return { blob, spineText, warnings };
}

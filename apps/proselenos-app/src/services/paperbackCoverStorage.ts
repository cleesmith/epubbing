import type { AppService } from '@/types/system';
import type { Book } from '@/types/book';
import { coverBackground, PAPER_CHOICES, type FrontFit, type PaperChoice } from '@/lib/paperback-cover';
import { getPaperbackFrontFilename, getPaperbackSettingsFilename } from '@/utils/book';

export interface SavedPaperbackSettings {
  version: 1;
  pages: string;
  paper: PaperChoice;
  backText: string;
  backgroundColor: string;
  frontFit: FrontFit;
}

// Small settings records are separate from the one saved JPEG. Serialize explicit
// saves so a reopen cannot read an older save that is still finishing.
const settingsWrites = new Map<string, Promise<void>>();

export async function loadPaperbackSettings(service: AppService, book: Pick<Book, 'hash'>): Promise<SavedPaperbackSettings | null> {
  const filename = getPaperbackSettingsFilename(book);
  await settingsWrites.get(filename)?.catch(() => {});
  let file: File;
  try { file = await service.openFile(filename, 'Books'); }
  catch (error) {
    if (error instanceof Error && error.message.startsWith('File not found:')) return null;
    throw error;
  }
  const record = JSON.parse(await file.text()) as SavedPaperbackSettings;
  if (record.version !== 1 || typeof record.pages !== 'string' ||
      !Object.prototype.hasOwnProperty.call(PAPER_CHOICES, record.paper) ||
      typeof record.backText !== 'string' || !['fill', 'border'].includes(record.frontFit)) {
    throw new Error('The saved paperback details could not be read.');
  }
  return { version: 1, pages: record.pages, paper: record.paper, backText: record.backText,
    backgroundColor: coverBackground(record.backgroundColor), frontFit: record.frontFit };
}

export function savePaperbackSettings(service: AppService, book: Pick<Book, 'hash'>, settings: SavedPaperbackSettings): Promise<void> {
  const filename = getPaperbackSettingsFilename(book);
  const content = JSON.stringify(settings);
  const write = (settingsWrites.get(filename) ?? Promise.resolve()).catch(() => {}).then(async () => {
    await service.writeFile(filename, 'Books', content);
  });
  settingsWrites.set(filename, write);
  void write.finally(() => { if (settingsWrites.get(filename) === write) settingsWrites.delete(filename); }).catch(() => {});
  return write;
}

export interface SavedPaperbackFront {
  version: 1;
  name: string;
  jpeg: string;
  fit: FrontFit;
}

// One atomic file record per ebook. The normal Export All Data includes it.
export async function loadPaperbackFront(service: AppService, book: Pick<Book, 'hash'>): Promise<SavedPaperbackFront | null> {
  let file: File;
  try { file = await service.openFile(getPaperbackFrontFilename(book), 'Books'); }
  catch (error) {
    if (error instanceof Error && error.message.startsWith('File not found:')) return null;
    throw error;
  }
  const record = JSON.parse(await file.text()) as SavedPaperbackFront;
  if (record.version !== 1 || typeof record.name !== 'string' || typeof record.jpeg !== 'string' ||
      !record.jpeg.startsWith('data:image/jpeg;base64,') || !['fill', 'border'].includes(record.fit)) {
    throw new Error('The saved paperback image could not be read. Choose another JPG or PNG.');
  }
  return record;
}

export function paperbackFrontFile(record: SavedPaperbackFront): File {
  const bytes = Uint8Array.from(atob(record.jpeg.slice(record.jpeg.indexOf(',') + 1)), character => character.charCodeAt(0));
  return new File([bytes], record.name, { type: 'image/jpeg' });
}

export async function savePaperbackFront(service: AppService, book: Pick<Book, 'hash'>, record: SavedPaperbackFront) {
  await service.writeFile(getPaperbackFrontFilename(book), 'Books', JSON.stringify(record));
}

export async function removePaperbackFront(service: AppService, book: Pick<Book, 'hash'>) {
  await service.deleteFile(getPaperbackFrontFilename(book), 'Books');
}

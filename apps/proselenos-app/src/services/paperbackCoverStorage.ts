import type { AppService } from '@/types/system';
import type { Book } from '@/types/book';
import { coverBackground, PAPER_CHOICES, type BackCoverMode, type FrontFit, type PaperChoice } from '@/lib/paperback-cover';
import { getPaperbackFrontFilename, getPaperbackSettingsFilename } from '@/utils/book';

export interface SavedPaperbackBack {
  version: 1;
  name: string;
  jpeg: string;
  sourceWidth?: number;
  sourceHeight?: number;
}

export interface SavedPaperbackSettings {
  version: 1;
  pages: string;
  paper: PaperChoice;
  backText: string;
  backgroundColor: string;
  frontFit: FrontFit;
  backMode?: BackCoverMode;
  backImage?: SavedPaperbackBack | null;
}

// The selected back mode and image share one atomic settings record. The front
// JPEG remains separate. Serialize explicit saves so reopen waits for completion.
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
  return parsePaperbackSettings(JSON.parse(await file.text()));
}

export function parsePaperbackSettings(value: unknown): SavedPaperbackSettings {
  const record = value as SavedPaperbackSettings | null;
  if (!record || record.version !== 1 || typeof record.pages !== 'string' ||
      !Object.prototype.hasOwnProperty.call(PAPER_CHOICES, record.paper) ||
      typeof record.backText !== 'string' || !['fill', 'border'].includes(record.frontFit)) {
    throw new Error('The saved paperback details could not be read.');
  }
  return selectedPaperbackSettings(record);
}

// Keep only the selected content in persisted settings, including legacy records.
export function selectedPaperbackSettings(record: SavedPaperbackSettings): SavedPaperbackSettings {
  const backMode = record.backMode ?? 'text';
  if (!['text', 'image'].includes(backMode)) throw new Error('The saved back-cover choice could not be read.');
  const backImage = backMode === 'image' ? record.backImage ?? null : null;
  if (backImage && (backImage.version !== 1 || typeof backImage.name !== 'string' ||
      typeof backImage.jpeg !== 'string' || !/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(backImage.jpeg))) {
    throw new Error('The saved back-cover image could not be read.');
  }
  const selectedImage: SavedPaperbackBack | null = backImage ? {
    version: 1, name: backImage.name, jpeg: backImage.jpeg,
    ...(typeof backImage.sourceWidth === 'number' ? { sourceWidth: backImage.sourceWidth } : {}),
    ...(typeof backImage.sourceHeight === 'number' ? { sourceHeight: backImage.sourceHeight } : {}),
  } : null;
  return { version: 1, pages: record.pages, paper: record.paper, backText: backMode === 'text' ? record.backText : '',
    backgroundColor: coverBackground(record.backgroundColor), frontFit: record.frontFit, backMode, backImage: selectedImage };
}

export function savePaperbackSettings(service: AppService, book: Pick<Book, 'hash'>, settings: SavedPaperbackSettings): Promise<void> {
  const filename = getPaperbackSettingsFilename(book);
  const content = JSON.stringify(selectedPaperbackSettings(settings));
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
  return parsePaperbackFront(JSON.parse(await file.text()));
}

export function parsePaperbackFront(value: unknown): SavedPaperbackFront {
  const record = value as SavedPaperbackFront | null;
  if (!record || record.version !== 1 || typeof record.name !== 'string' || typeof record.jpeg !== 'string' ||
      !record.jpeg.startsWith('data:image/jpeg;base64,') || !['fill', 'border'].includes(record.fit)) {
    throw new Error('The saved paperback image could not be read. Choose another JPG or PNG.');
  }
  return { version: 1, name: record.name, jpeg: record.jpeg, fit: record.fit };
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

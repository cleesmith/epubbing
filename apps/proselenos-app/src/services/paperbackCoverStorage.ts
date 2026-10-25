import type { AppService } from '@/types/system';
import type { Book } from '@/types/book';
import type { FrontFit } from '@/lib/paperback-cover';
import { getPaperbackFrontFilename } from '@/utils/book';

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

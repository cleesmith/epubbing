import JSZip from 'jszip';
import type { Book } from '@/types/book';
import type { AppService } from '@/types/system';
import { getLocalBookFilename } from '@/utils/book';
import { makeSafeFilename } from '@/utils/misc';
import { addPaperbackSetup } from '@/lib/paperback-epub';
import { stripEpubForBookseller } from '@/lib/bookseller-strip';

export type EpubVariant = 'authors' | 'booksellers';
export const epubVariantLabel = (variant: EpubVariant) =>
  variant === 'authors' ? 'Authors EPUB' : 'Booksellers EPUB';

// Shared by downloading and checking. Only the temporary export is prepared;
// the library file and its saved settings are never written by this function.
export async function prepareEpubExport(
  service: AppService,
  book: Book,
  variant: EpubVariant,
  options: { signal?: AbortSignal; onProgress?: (message: string) => void } = {},
): Promise<{ blob: Blob; filename: string }> {
  const { signal, onProgress } = options;
  const label = epubVariantLabel(variant);
  signal?.throwIfAborted();
  onProgress?.(`Reading your book to prepare the ${label}…`);
  const file = await service.openFile(getLocalBookFilename(book), 'Books');
  const buffer = await file.arrayBuffer();
  signal?.throwIfAborted();
  const zip = await JSZip.loadAsync(buffer);
  signal?.throwIfAborted();
  onProgress?.(`Preparing your ${label}…`);
  if (variant === 'authors') {
    await addPaperbackSetup(zip, service, book);
    // Preserve the existing Authors download behavior.
    zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
  } else {
    await stripEpubForBookseller(zip);
  }
  signal?.throwIfAborted();
  onProgress?.(`Packaging your ${label}…`);
  const blob = await zip.generateAsync({
    type: 'blob', mimeType: 'application/epub+zip',
    ...(variant === 'authors' ? { compression: 'DEFLATE' as const } : {}),
  }, () => signal?.throwIfAborted());
  signal?.throwIfAborted();
  return {
    blob,
    filename: `${makeSafeFilename(book.title)}${variant === 'booksellers' ? '-booksellers' : ''}.epub`,
  };
}

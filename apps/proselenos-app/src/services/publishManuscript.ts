import type { AppService } from '@/types/system';
import type { Book } from '@/types/book';
import { saveWorkingCopyLibraryHash } from './manuscriptStorage';

/** Publish one working copy, replacing only its explicitly linked Library book. */
export async function publishManuscript(
  appService: AppService,
  file: File,
  previousHash?: string,
): Promise<Book> {
  const originalBooks = await appService.loadLibraryBooks();
  // importBook mutates its array and matching records. Keep the previous catalog
  // intact until the replacement EPUB has been written successfully.
  const books = originalBooks.map(book => ({ ...book }));
  const previous = originalBooks.find(book => book.hash === previousHash);
  const book = await appService.importBook(file, books, true, true, true);
  if (!book) throw new Error('EPUB was generated but could not be added to Library.');

  if (previous && previous.hash !== book.hash) {
    // Keep Library organization and reading notes with the replacement.
    book.createdAt = previous.createdAt;
    book.groupId = previous.groupId;
    book.groupName = previous.groupName;
    book.group = previous.group;
    book.tags = previous.tags;
    book.progress = previous.progress;
    const settings = await appService.loadSettings();
    const config = await appService.loadBookConfig(previous, settings);
    await appService.saveBookConfig(book, {
      ...config,
      bookHash: book.hash,
      booknotes: config.booknotes?.map(note => ({ ...note, bookHash: book.hash })),
    }, settings);
  }

  const nextBooks = books.filter(candidate =>
    candidate.hash !== previousHash || candidate.hash === book.hash,
  );
  // Keep both old files and the old catalog available until the new catalog and
  // the working-copy link have been saved. A failed import never deletes them.
  try {
    await appService.saveLibraryBooks(nextBooks);
    await saveWorkingCopyLibraryHash(book.hash);
  } catch (error) {
    try {
      await appService.saveLibraryBooks(originalBooks);
    } catch (rollbackError) {
      console.error('Could not restore the Library catalog after a failed publish:', rollbackError);
    }
    throw error;
  }

  // Matching hashes share the same files: never delete them in that case.
  if (previous && previous.hash !== book.hash) {
    try {
      await appService.deleteBook(previous, 'local');
    } catch (error) {
      // Publication has succeeded. Leftover old files must not make it look as
      // though the new book failed to save or remove the new Library link.
      console.warn('Published successfully, but could not remove old EPUB files:', error);
    }
  }
  return book;
}

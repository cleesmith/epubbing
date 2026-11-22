import type { Book } from '@/types/book';
import type { AppService } from '@/types/system';
import { useLibraryStore } from '@/store/libraryStore';
import { useBookDataStore } from '@/store/bookDataStore';
import { useSettingsStore } from '@/store/settingsStore';
import { prepareEpubExport } from './epubExport';

export const BOOKSELLER_TEMP_HASH = '__bookseller_temp__';

/** The same Booksellers copy for cover clicks and review after Publish. */
export async function prepareBooksellerReader(
  service: AppService,
  book: Book,
  sectionHref?: string,
): Promise<string> {
  const { blob } = await prepareEpubExport(service, book, 'booksellers');
  await service.writeFile(`${BOOKSELLER_TEMP_HASH}/bookseller.epub`, 'Books',
    new File([blob], 'bookseller.epub'));

  const tempBook: Book = {
    hash: BOOKSELLER_TEMP_HASH,
    format: 'EPUB',
    title: `${book.title} (Bookseller)`,
    sourceTitle: 'bookseller',
    author: book.author,
    coverImageUrl: book.coverImageUrl,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  if (sectionHref) {
    const { settings } = useSettingsStore.getState();
    const config = await service.loadBookConfig(tempBook, settings);
    // A saved reading position must not override the section selected in Authors.
    // This touches only the temporary reading copy, never the author's manuscript.
    await service.saveBookConfig(tempBook, { ...config, location: sectionHref }, settings);
  }

  // The temporary hash is reused: discard the previously parsed EPUB, otherwise
  // a second preview in this tab could still show the previous book's words.
  useBookDataStore.setState(state => {
    const booksData = { ...state.booksData };
    delete booksData[BOOKSELLER_TEMP_HASH];
    return { booksData };
  });
  const { library } = useLibraryStore.getState();
  useLibraryStore.getState().setLibrary([
    ...library.filter(candidate => candidate.hash !== BOOKSELLER_TEMP_HASH), tempBook,
  ]);
  return BOOKSELLER_TEMP_HASH;
}

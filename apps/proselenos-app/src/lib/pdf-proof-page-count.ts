import type { Book } from '@/types/book';

type ProofBook = Pick<Book, 'hash' | 'updatedAt'>;
const completedProofs = new Map<string, { revision: number; pages: number }>();

// Keep completed proof information in this tab's memory, not in saved cover settings.
// Closing either dialog retains it; reloading the app clears it.
export function rememberPdfPageCount(book: ProofBook, pages: number): void {
  if (book.hash && Number.isSafeInteger(pages) && pages > 0) {
    completedProofs.set(book.hash, { revision: book.updatedAt ?? 0, pages });
  }
}

export function getPdfPageCount(book: ProofBook): number | null {
  const proof = completedProofs.get(book.hash);
  return proof && proof.revision === (book.updatedAt ?? 0) ? proof.pages : null;
}

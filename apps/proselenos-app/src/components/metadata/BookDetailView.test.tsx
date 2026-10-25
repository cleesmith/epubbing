import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { Book } from '@/types/book';
import type { BookMetadata } from '@/libs/document';
import BookDetailView from './BookDetailView';
vi.mock('@/hooks/useTranslation', () => ({ useTranslation: () => (text: string) => text }));
vi.mock('@/components/BookCover', () => ({ default: () => null }));
vi.mock('@/utils/book', () => ({ formatTitle: (text: string) => text, formatAuthors: (text: string) => text, formatDate: () => '', formatBytes: () => '', formatLanguage: () => '', formatPublisher: () => '' }));
afterEach(cleanup);
it('replaces the visible 5x8 action with the pile-of-books cover action', () => {
  const cover = vi.fn(), smallPdf = vi.fn();
  render(<BookDetailView book={{ title: 'A book', author: 'Clee Smith', hash: 'one', format: 'EPUB' } as Book} metadata={{} as BookMetadata} fileSize={null} onDownloadPdf5x8={smallPdf} onPaperbackCover={cover} onDownloadPdf={vi.fn()} />);
  expect(screen.queryByTitle('Download 5x8 inch PDF (KDP)')).toBeNull();
  expect(screen.getByTitle('Download 6x9 inch PDF (KDP)')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Create 6x9 paperback cover PDF' }));
  expect(cover).toHaveBeenCalledOnce(); expect(smallPdf).not.toHaveBeenCalled();
});

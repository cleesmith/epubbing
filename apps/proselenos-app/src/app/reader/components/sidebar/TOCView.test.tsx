import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { TOCItem } from '@/libs/document';
import TOCView from './TOCView';

const state = vi.hoisted(() => ({
  progress: { sectionHref: 'OEBPS/story.xhtml' },
  goTo: vi.fn(),
}));
vi.mock('@/context/EnvContext', () => ({ useEnv: () => ({ appService: {} }) }));
vi.mock('@/store/readerStore', () => ({
  useReaderStore: () => ({
    getView: () => ({ goTo: state.goTo }),
    getProgress: () => state.progress,
  }),
}));
vi.mock('@/store/sidebarStore', () => ({
  useSidebarStore: () => ({ sideBarBookKey: 'book', isSideBarVisible: true }),
}));
vi.mock('@/utils/misc', () => ({ getContentMd5: (value: string) => value }));
vi.mock('@/utils/event', () => ({ eventDispatcher: { dispatch: vi.fn() } }));
vi.mock('overlayscrollbars-react', () => ({ useOverlayScrollbars: () => [vi.fn()] }));

const notesHref = 'OEBPS/nomatter/private.xhtml';
const toc: TOCItem[] = [
  { id: 0, label: 'Story', href: 'OEBPS/story.xhtml' },
  {
    id: 1,
    label: "Author's Notes",
    href: '',
    subitems: [{ id: 2, label: 'Private notes', href: notesHref }],
  },
];
beforeEach(() => {
  state.progress = { sectionHref: 'OEBPS/story.xhtml' };
  state.goTo.mockClear();
});
afterEach(cleanup);

it('opens notes from the group label and preserves expansion through progress updates', () => {
  const { rerender } = render(<TOCView bookKey='book' toc={toc} />);
  fireEvent.click(screen.getByText("Author's Notes"));
  expect(screen.getByText('Private notes')).toBeTruthy();
  expect(state.goTo).not.toHaveBeenCalled();

  state.progress = { ...state.progress };
  rerender(<TOCView bookKey='book' toc={toc} />);
  fireEvent.click(screen.getByText('Private notes'));
  expect(state.goTo).toHaveBeenCalledWith(notesHref);

  state.progress = { sectionHref: notesHref };
  rerender(<TOCView bookKey='book' toc={toc} />);
  state.progress = { sectionHref: 'OEBPS/story.xhtml' };
  rerender(<TOCView bookKey='book' toc={toc} />);
  expect(screen.getByText('Private notes')).toBeTruthy();
});

it('lets the triangle open and close notes without navigating', () => {
  render(<TOCView bookKey='book' toc={toc} />);
  fireEvent.click(screen.getByRole('button', { name: "Expand Author's Notes" }));
  expect(screen.getByText('Private notes')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: "Collapse Author's Notes" }));
  expect(screen.queryByText('Private notes')).toBeNull();
  expect(state.goTo).not.toHaveBeenCalled();
});

it('reveals the active note initially and allows keyboard expansion and collapse', () => {
  state.progress = { sectionHref: notesHref };
  const { rerender } = render(<TOCView bookKey='book' toc={toc} />);
  expect(screen.getByText('Private notes')).toBeTruthy();
  fireEvent.keyDown(screen.getByRole('treeitem', { name: /Author's Notes/ }), { key: 'Enter' });
  expect(screen.queryByText('Private notes')).toBeNull();
  state.progress = { ...state.progress };
  rerender(<TOCView bookKey='book' toc={toc} />);
  expect(screen.queryByText('Private notes')).toBeNull();
  fireEvent.keyDown(screen.getByRole('treeitem', { name: /Author's Notes/ }), { key: ' ' });
  expect(screen.getByText('Private notes')).toBeTruthy();
});

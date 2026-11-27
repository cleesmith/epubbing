import 'fake-indexeddb/auto';
import React, { forwardRef } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import AuthorsLayout from './AuthorsLayout';
import { getTheme } from '../shared/theme';
import { saveFullWorkingCopy, loadFullWorkingCopy, saveSectionEdits, deleteSection, replaceTextWorkingCopy } from '@/services/manuscriptStorage';
import { generateEpubFromWorkingCopy } from '@/lib/epub-generator';
import { reserveLibraryReview } from '@/utils/library-tab';

vi.mock('@/services/manuscriptStorage', async importOriginal => {
  const actual = await importOriginal<typeof import('@/services/manuscriptStorage')>();
  return { ...actual, saveSectionEdits: vi.fn(actual.saveSectionEdits) };
});
vi.mock('@/services/backupReminder', () => ({ markBackupChanged: vi.fn() }));
vi.mock('@/components/TrafficLightIcon', () => ({ default: ({ onClick }: { onClick: () => void }) => <button onClick={onClick}>Backup</button> }));
vi.mock('@/services/appUpdate', () => ({ updateApp: vi.fn() }));
vi.mock('../shared/alerts', () => ({ showAlert: vi.fn(), showConfirm: vi.fn(async () => true) }));
vi.mock('@/utils/library-tab', () => ({
  findLibraryTab: vi.fn(() => true),
  reserveLibraryReview: vi.fn(() => ({ confirmPublished: vi.fn(async () => {}), open: vi.fn(), cancel: vi.fn() })),
}));
vi.mock('@/lib/epub-generator', () => ({ generateEpubFromWorkingCopy: vi.fn(async () => new Uint8Array([1])) }));
vi.mock('@/services/environment', () => ({ default: { getAppService: async () => ({}) } }));
vi.mock('@/services/publishManuscript', () => ({ publishManuscript: vi.fn(async () => ({ hash: 'new-book' })) }));
vi.mock('@/services/epubService', () => ({ parseEpub: vi.fn() }));
vi.mock('@/services/docxService', () => ({ parseDocx: vi.fn() }));
vi.mock('@/lib/pdfToPages', () => ({ parsePdf: vi.fn() }));
vi.mock('@/lib/workspace-to-docx', () => ({ exportWorkspaceToDocx: vi.fn() }));
vi.mock('@/lib/fountain-generator', () => ({ exportWorkspaceToFountain: vi.fn() }));
vi.mock('./EpubCoverUploadModal', () => ({ default: () => null }));
vi.mock('./ChapterSidebar', () => ({ default: ({ sections, onSelectSection }: {
  sections: { id: string; title: string }[]; onSelectSection: (id: string) => void;
}) => <nav>{sections.map(s => <button key={s.id} onClick={() => onSelectSection(s.id)}>{s.title}</button>)}</nav> }));
// These tests exercise real layout + header + Title Page + queue + IndexedDB.
// The separate EditorPanel tests exercise the real Plate editor and its undo/cursor.
vi.mock('./EditorPanel', () => ({ default: forwardRef(function TestEditor(props: {
  sectionId?: string; sectionTitle: string; sectionXhtml: string;
  onTitleChange: (text: string) => void; onContentChange: (text: string) => void;
}, _ref) { return <div>
  <span data-testid="section-id">{props.sectionId}</span>
  <input aria-label="Heading" value={props.sectionTitle} onChange={e => props.onTitleChange(e.target.value)} />
  <textarea aria-label="Words" value={props.sectionXhtml} onChange={e => props.onContentChange(e.target.value)} />
</div>; }) }));

let releaseWrite: (() => void) | undefined;
beforeEach(async () => {
  vi.clearAllMocks();
  const actual = await vi.importActual<typeof import('@/services/manuscriptStorage')>('@/services/manuscriptStorage');
  vi.mocked(saveSectionEdits).mockImplementation(actual.saveSectionEdits);
  await saveFullWorkingCopy({ title: 'Book', author: 'Writer', language: 'en', coverImage: null, sections: [
    { id: 'title', title: 'Title Page', type: 'title-page', xhtml: '<h1>Book</h1>' },
    { id: 'copyright', title: 'Copyright', type: 'copyright', xhtml: '<p>Copyright</p>' },
    { id: 'a', title: 'Chapter A', type: 'chapter', xhtml: '<p>Original A</p>' },
    { id: 'b', title: 'Chapter B', type: 'chapter', xhtml: '<p>Original B</p>' },
  ] });
});
afterEach(async () => { releaseWrite?.(); releaseWrite = undefined; cleanup(); vi.restoreAllMocks(); });

async function openAuthors(onStorageClick = vi.fn(), expectedField = 'Title') {
  const result = render(<AuthorsLayout theme={getTheme(true)} isDarkMode onThemeToggle={vi.fn()}
    onAboutClick={vi.fn()} onStorageClick={onStorageClick} sidebarVisible onToggleSidebar={vi.fn()}
    onCoverClick={vi.fn()} onLoadFromLibraryClick={vi.fn()} />);
  await screen.findByLabelText(expectedField);
  return result;
}
async function openChapter() {
  await openAuthors();
  fireEvent.click(screen.getByRole('button', { name: 'Chapter A' }));
  await screen.findByLabelText('Words');
}
async function delayWrites() {
  const actual = await vi.importActual<typeof import('@/services/manuscriptStorage')>('@/services/manuscriptStorage');
  const gate = new Promise<void>(resolve => { releaseWrite = resolve; });
  vi.mocked(saveSectionEdits).mockImplementation(async (...args) => { await gate; await actual.saveSectionEdits(...args); });
}

it('waits for the latest words and heading when Save EPUB is clicked during a slow save', async () => {
  await openChapter();
  await delayWrites();
  fireEvent.change(screen.getByLabelText('Words'), { target: { value: '<p>First edit</p>' } });
  await waitFor(() => expect(saveSectionEdits).toHaveBeenCalled());
  fireEvent.change(screen.getByLabelText('Words'), { target: { value: '<p>Last typed words 日本語</p>' } });
  fireEvent.change(screen.getByLabelText('Heading'), { target: { value: 'Last heading' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save EPUB to Library' }));
  expect(screen.getByRole('button', { name: 'Processing...' })).toHaveProperty('disabled', true);
  expect(generateEpubFromWorkingCopy).not.toHaveBeenCalled();
  await act(async () => { releaseWrite!(); });
  await waitFor(() => expect(generateEpubFromWorkingCopy).toHaveBeenCalledOnce());
  expect(vi.mocked(generateEpubFromWorkingCopy).mock.calls[0]![1][2]).toMatchObject({ title: 'Last heading', xhtml: '<p>Last typed words 日本語</p>' });
  await waitFor(() => expect(screen.getByRole('button', { name: 'Save EPUB to Library' })).toHaveProperty('disabled', false));
});

it('saves every Title Page field while focused and publishes the last keystroke', async () => {
  await openAuthors();
  for (const label of ['Title', 'Subtitle', 'Author', 'Publisher']) {
    const field = screen.getByLabelText(label);
    field.focus();
    fireEvent.change(field, { target: { value: `${label} changed` } });
    await waitFor(async () => expect(await loadFullWorkingCopy()).toHaveProperty(label.toLowerCase(), `${label} changed`));
    expect(document.activeElement).toBe(field);
  }
  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Final title' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save EPUB to Library' }));
  await waitFor(() => expect(generateEpubFromWorkingCopy).toHaveBeenCalledOnce());
  expect(vi.mocked(generateEpubFromWorkingCopy).mock.calls[0]![0]).toMatchObject({ title: 'Final title', subtitle: 'Subtitle changed', author: 'Author changed', publisher: 'Publisher changed' });
  await waitFor(() => expect(screen.getByRole('button', { name: 'Save EPUB to Library' })).toHaveProperty('disabled', false));
});

it('finishes the old chapter before switching, retaining edits made while the save is pending', async () => {
  await openChapter();
  await delayWrites();
  fireEvent.change(screen.getByLabelText('Words'), { target: { value: '<p>First</p>' } });
  fireEvent.click(screen.getByRole('button', { name: 'Chapter B' }));
  expect(screen.getByTestId('section-id').textContent).toBe('section-003');
  fireEvent.change(screen.getByLabelText('Words'), { target: { value: '<p>Latest before switch</p>' } });
  await act(async () => { releaseWrite!(); });
  await waitFor(() => expect(screen.getByTestId('section-id').textContent).toBe('section-004'));
  expect((await loadFullWorkingCopy())?.sections[2]?.xhtml).toBe('<p>Latest before switch</p>');
  fireEvent.click(screen.getByRole('button', { name: 'Chapter A' }));
  await waitFor(() => expect(screen.getByLabelText('Words')).toHaveProperty('value', '<p>Latest before switch</p>'));
});

it('keeps failed edits open, blocks leaving and backups, and retries the latest words', async () => {
  const backup = vi.fn();
  await openAuthors(backup);
  fireEvent.click(screen.getByRole('button', { name: 'Chapter A' }));
  await screen.findByLabelText('Words');
  vi.mocked(saveSectionEdits).mockRejectedValue(new Error('Storage full'));
  fireEvent.change(screen.getByLabelText('Words'), { target: { value: '<p>Must not disappear</p>' } });
  await screen.findByRole('alert');
  fireEvent.click(screen.getByRole('button', { name: 'Chapter B' }));
  fireEvent.click(screen.getByRole('button', { name: 'Backup' }));
  await act(async () => {});
  expect(screen.getByTestId('section-id').textContent).toBe('section-003');
  expect(backup).not.toHaveBeenCalled();
  expect(screen.getByLabelText('Words')).toHaveProperty('value', '<p>Must not disappear</p>');
  const actual = await vi.importActual<typeof import('@/services/manuscriptStorage')>('@/services/manuscriptStorage');
  vi.mocked(saveSectionEdits).mockImplementation(actual.saveSectionEdits);
  fireEvent.click(screen.getByRole('button', { name: 'Retry saving' }));
  await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
  expect((await loadFullWorkingCopy())?.sections[2]?.xhtml).toBe('<p>Must not disappear</p>');
});

it('flushes pending writes before opening backups and guards tab close only while pending', async () => {
  const backup = vi.fn();
  await openAuthors(backup);
  fireEvent.click(screen.getByRole('button', { name: 'Chapter A' }));
  await screen.findByLabelText('Words');
  await delayWrites();
  fireEvent.change(screen.getByLabelText('Words'), { target: { value: '<p>Backup these words</p>' } });
  const pendingClose = new Event('beforeunload', { cancelable: true });
  window.dispatchEvent(pendingClose);
  expect(pendingClose.defaultPrevented).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Backup' }));
  expect(backup).not.toHaveBeenCalled();
  await act(async () => { releaseWrite!(); });
  await waitFor(() => expect(backup).toHaveBeenCalledOnce());
  expect((await loadFullWorkingCopy())?.sections[2]?.xhtml).toBe('<p>Backup these words</p>');
  const savedClose = new Event('beforeunload', { cancelable: true });
  window.dispatchEvent(savedClose);
  expect(savedClose.defaultPrevented).toBe(false);
});

it('does not generate an EPUB when flushing fails', async () => {
  await openChapter();
  vi.mocked(saveSectionEdits).mockRejectedValue(new Error('Storage full'));
  fireEvent.change(screen.getByLabelText('Words'), { target: { value: '<p>Unsaved latest</p>' } });
  await screen.findByRole('alert');
  fireEvent.click(screen.getByRole('button', { name: 'Save EPUB to Library' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Save EPUB to Library' })).toHaveProperty('disabled', false));
  expect(generateEpubFromWorkingCopy).not.toHaveBeenCalled();
  expect(vi.mocked(reserveLibraryReview).mock.results[0]!.value.cancel).toHaveBeenCalledOnce();
  // Finish the queued write so cleanup does not leave a failed promise behind.
  const actual = await vi.importActual<typeof import('@/services/manuscriptStorage')>('@/services/manuscriptStorage');
  vi.mocked(saveSectionEdits).mockImplementation(actual.saveSectionEdits);
  fireEvent.click(screen.getByRole('button', { name: 'Retry saving' }));
  await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
});

it('finishes pending edits before refreshing the workspace and restores the latest text', async () => {
  const view = await openAuthors();
  fireEvent.click(screen.getByRole('button', { name: 'Chapter A' }));
  await screen.findByLabelText('Words');
  await delayWrites();
  fireEvent.change(screen.getByLabelText('Words'), { target: { value: '<p>Before refresh</p>' } });
  view.rerender(<AuthorsLayout theme={getTheme(true)} isDarkMode onThemeToggle={vi.fn()}
    onAboutClick={vi.fn()} onStorageClick={vi.fn()} sidebarVisible onToggleSidebar={vi.fn()}
    onCoverClick={vi.fn()} onLoadFromLibraryClick={vi.fn()} refreshKey={1} />);
  fireEvent.change(screen.getByLabelText('Words'), { target: { value: '<p>Last edit during pending save</p>' } });
  await act(async () => { releaseWrite!(); });
  await waitFor(async () => expect((await loadFullWorkingCopy())?.sections[2]?.xhtml).toBe('<p>Last edit during pending save</p>'));
  await waitFor(() => expect(screen.getByLabelText('Words')).toHaveProperty('value', '<p>Last edit during pending save</p>'));
});


it('reopens the last chapter and falls back to the first section if that chapter is gone', async () => {
  await openChapter();
  fireEvent.click(screen.getByRole('button', { name: 'Chapter B' }));
  await waitFor(() => expect(screen.getByLabelText('Heading')).toHaveProperty('value', 'Chapter B'));
  cleanup();
  await openAuthors(vi.fn(), 'Words');
  expect(screen.getByLabelText('Heading')).toHaveProperty('value', 'Chapter B');
  cleanup();
  await deleteSection('section-004');
  await openAuthors();
  expect(screen.getByLabelText('Title')).toHaveProperty('value', 'Book');
});

it.each(['EPUB', 'text'])('starts a replacement %s on its Title Page despite reused chapter IDs', async format => {
  await openChapter();
  cleanup();
  const next = (await loadFullWorkingCopy())!;
  next.title = 'Another book';
  if (format === 'text') await replaceTextWorkingCopy(next);
  else await saveFullWorkingCopy(next);
  await openAuthors();
  expect(screen.getByLabelText('Title')).toHaveProperty('value', 'Another book');
});

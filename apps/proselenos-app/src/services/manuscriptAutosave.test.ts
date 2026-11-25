import 'fake-indexeddb/auto';
import { beforeEach, expect, it, vi } from 'vitest';
import { IDBObjectStore } from 'fake-indexeddb';
import {
  saveFullWorkingCopy, saveSectionEdits, saveTitlePageMetadata, saveSectionOrder,
  loadFullWorkingCopy, loadWorkingCopyMeta, deleteSection, loadManuscriptMeta,
} from './manuscriptStorage';
import { AuthorsAutosave } from './authorsAutosave';

vi.mock('./backupReminder', () => ({ markBackupChanged: vi.fn() }));

beforeEach(async () => {
  vi.restoreAllMocks();
  await saveFullWorkingCopy({ title: 'Book', author: 'Writer', language: 'en', coverImage: null, sections: [
    { id: 'title', title: 'Title Page', type: 'title-page', xhtml: '<h1>Book</h1>' },
    { id: 'a', title: 'A', type: 'chapter', xhtml: '<p>Original A</p>' },
    { id: 'b', title: 'B', type: 'chapter', xhtml: '<p>Original B</p>' },
  ] });
});

it('commits rapid text, heading, and all Title Page fields before the Library snapshot is read', async () => {
  const save = new AuthorsAutosave();
  for (let i = 0; i < 100; i++) {
    save.enqueue({ kind: 'section', id: 'section-002', fields: { xhtml: `<p>Text ${i} &amp; words</p>` } });
    save.enqueue({ kind: 'section', id: 'section-002', fields: { title: `Heading ${i}` } });
    save.enqueue({ kind: 'title-page', id: 'section-001', fields: {
      title: `Title ${i}`, subtitle: `Subtitle ${i}`, author: `Author ${i}`, publisher: `Publisher ${i}`,
    } });
  }
  await save.flush();
  const saved = await loadFullWorkingCopy();
  expect(saved).toMatchObject({ title: 'Title 99', subtitle: 'Subtitle 99', author: 'Author 99', publisher: 'Publisher 99' });
  expect(saved?.sections[1]).toMatchObject({ title: 'Heading 99', xhtml: '<p>Text 99 &amp; words</p>' });
  expect(saved?.sections[0]?.xhtml).toContain('TITLE 99');
  expect(await loadWorkingCopyMeta()).toMatchObject({ title: 'Title 99', publisher: 'Publisher 99' });
});

it('saves an empty heading and empty text without substituting old values', async () => {
  await saveSectionEdits('section-002', { title: '', xhtml: '' });
  expect((await loadFullWorkingCopy())?.sections[1]).toMatchObject({ title: '', xhtml: '' });
});

it('rolls back BOTH heading and text when a storage transaction aborts', async () => {
  const original = IDBObjectStore.prototype.put;
  vi.spyOn(IDBObjectStore.prototype, 'put').mockImplementation(function(this: IDBObjectStore, value, key) {
    if (value.key === 'section-002.xhtml') throw new DOMException('Disk full', 'QuotaExceededError');
    return original.call(this, value, key);
  });
  await expect(saveSectionEdits('section-002', { title: 'New heading', xhtml: '<p>New words</p>' })).rejects.toThrow();
  expect((await loadFullWorkingCopy())?.sections[1]).toMatchObject({ title: 'A', xhtml: '<p>Original A</p>' });
});

it('does not resurrect a deleted section from a delayed write', async () => {
  await deleteSection('section-002');
  await expect(saveSectionEdits('section-002', { xhtml: '<p>Old pending text</p>' })).rejects.toThrow('no longer');
  expect((await loadFullWorkingCopy())?.sections.some(section => section.id === 'section-002')).toBe(false);
});

it('keeps concurrent chapter headings, text, ordering, and Scenecraft metadata', async () => {
  await Promise.all([
    saveSectionEdits('section-002', { title: 'New A', xhtml: '<p>Newest words</p>' }),
    saveSectionOrder(['section-001', 'section-003', 'section-002']),
    saveSectionEdits('section-002', { sceneCraftConfig: { theme: 'dark' } as never }),
  ]);
  const saved = await loadFullWorkingCopy();
  expect(saved?.sections.map(section => section.id)).toEqual(['section-001', 'section-003', 'section-002']);
  expect(saved?.sections[2]).toMatchObject({ title: 'New A', xhtml: '<p>Newest words</p>', sceneCraftConfig: { theme: 'dark' } });
});

it('a failed Title Page transaction retains all previous metadata and readable text', async () => {
  const original = IDBObjectStore.prototype.put;
  vi.spyOn(IDBObjectStore.prototype, 'put').mockImplementation(function(this: IDBObjectStore, value, key) {
    if (value.key === 'section-001.xhtml') throw new DOMException('Disk full', 'QuotaExceededError');
    return original.call(this, value, key);
  });
  await expect(saveTitlePageMetadata('section-001', { title: 'New', author: 'New author' })).rejects.toThrow();
  expect(await loadWorkingCopyMeta()).toMatchObject({ title: 'Book', author: 'Writer' });
  expect(await loadManuscriptMeta()).toMatchObject({ title: 'Book', author: 'Writer' });
  expect((await loadFullWorkingCopy())?.sections[0]?.xhtml).toBe('<h1>Book</h1>');
});


it('deleting another section cannot overwrite a simultaneous autosaved heading', async () => {
  await Promise.all([
    deleteSection('section-003'),
    saveSectionEdits('section-002', { title: 'Retained heading', xhtml: '<p>Retained words</p>' }),
  ]);
  expect((await loadFullWorkingCopy())?.sections[1]).toMatchObject({ title: 'Retained heading', xhtml: '<p>Retained words</p>' });
  expect((await loadWorkingCopyMeta())?.sectionIds).toEqual(['section-001', 'section-002']);
});

it('rejects an invalid duplicate order without dropping a chapter', async () => {
  await expect(saveSectionOrder(['section-001', 'section-002', 'section-002'])).rejects.toThrow();
  expect((await loadFullWorkingCopy())?.sections.map(s => s.id)).toEqual(['section-001', 'section-002', 'section-003']);
});

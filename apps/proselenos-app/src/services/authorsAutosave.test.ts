import { describe, expect, it, vi } from 'vitest';
import { AuthorsAutosave, type AuthorsEdit } from './authorsAutosave';

const deferred = () => {
  let resolve!: () => void;
  const promise = new Promise<void>(done => { resolve = done; });
  return { promise, resolve };
};
const text = (xhtml: string, id = 'chapter'): AuthorsEdit => ({ kind: 'section', id, fields: { xhtml } });

describe('Authors autosave ordering', () => {
  it('starts without any debounce timer, blur, or navigation', async () => {
    const write = vi.fn(async () => {});
    const save = new AuthorsAutosave(write);
    save.enqueue(text('<p>One typed word</p>'));
    await Promise.resolve();
    expect(write).toHaveBeenCalledWith(text('<p>One typed word</p>'));
    await save.flush();
    expect(save.getSnapshot()).toEqual({ pending: false, error: null });
  });

  it('keeps the complete latest text and heading while a slower save is in flight', async () => {
    const gate = deferred();
    const write = vi.fn().mockImplementationOnce(() => gate.promise).mockResolvedValue(undefined);
    const save = new AuthorsAutosave(write);
    save.enqueue(text('<p>first</p>'));
    await Promise.resolve();
    for (let i = 0; i < 1000; i++) save.enqueue(text(`<p>Words ${i} — 日本語 👋</p>`));
    save.enqueue({ kind: 'section', id: 'chapter', fields: { title: ' Latest heading ' } });
    const done = vi.fn();
    const flushed = save.flush().then(done);
    expect(write).toHaveBeenCalledTimes(1);
    expect(done).not.toHaveBeenCalled();
    gate.resolve();
    await flushed;
    expect(write).toHaveBeenCalledTimes(2);
    expect(write.mock.calls[1]?.[0]).toEqual({ kind: 'section', id: 'chapter', fields: {
      xhtml: '<p>Words 999 — 日本語 👋</p>', title: ' Latest heading ',
    } });
    expect(save.getSnapshot().pending).toBe(false);
  });

  it('does not mix two chapters, the title page, or edits arriving during a flush', async () => {
    const gate = deferred();
    const write = vi.fn().mockImplementationOnce(() => gate.promise).mockResolvedValue(undefined);
    const save = new AuthorsAutosave(write);
    save.enqueue(text('<p>A</p>', 'a'));
    await Promise.resolve();
    const flushed = save.flush();
    save.enqueue(text('<p>B</p>', 'b'));
    save.enqueue({ kind: 'title-page', id: 'title', fields: { title: 'Book', author: 'Writer' } });
    save.enqueue(text('<p>A amended</p>', 'a'));
    gate.resolve();
    await flushed;
    expect(write.mock.calls.map(call => call[0])).toEqual([
      text('<p>A</p>', 'a'), text('<p>A amended</p>', 'a'), text('<p>B</p>', 'b'),
      { kind: 'title-page', id: 'title', fields: { title: 'Book', author: 'Writer' } },
    ]);
  });

  it('retains failed edits, blocks flush, and retries the latest text without a false saved state', async () => {
    const write = vi.fn().mockRejectedValue(new Error('Storage full'));
    const save = new AuthorsAutosave(write);
    save.enqueue(text('<p>Do not lose this</p>'));
    await expect(save.flush()).rejects.toThrow('Storage full');
    expect(save.getSnapshot()).toEqual({ pending: true, error: 'Storage full' });
    write.mockResolvedValue(undefined);
    save.enqueue(text('<p>Do not lose this or the new words</p>'));
    await save.flush();
    expect(write).toHaveBeenLastCalledWith(text('<p>Do not lose this or the new words</p>'));
    expect(save.getSnapshot()).toEqual({ pending: false, error: null });
  });

  it('persists deletions and undo back to the initial text, including an empty heading', async () => {
    const write = vi.fn(async () => {});
    const save = new AuthorsAutosave(write);
    for (const xhtml of ['<p>Original and more</p>', '<p>Original</p>', '<p></p>']) {
      save.enqueue(text(xhtml)); await save.flush();
    }
    save.enqueue({ kind: 'section', id: 'chapter', fields: { title: '' } });
    await save.flush();
    expect(write.mock.calls).toHaveLength(4);
    expect(write).toHaveBeenLastCalledWith({ kind: 'section', id: 'chapter', fields: { title: '' } });
  });

  it('retries after a synchronous storage exception', async () => {
    let fail = true;
    const save = new AuthorsAutosave(() => { if (fail) throw new Error('Unavailable'); return Promise.resolve(); });
    save.enqueue(text('<p>Retained</p>'));
    await expect(save.flush()).rejects.toThrow('Unavailable');
    fail = false;
    await save.flush();
    expect(save.getSnapshot().pending).toBe(false);
  });
});

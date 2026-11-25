import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import type { PlateEditor } from 'platejs/react';
import EditorPanel from './EditorPanel';
import { getTheme } from '../shared/theme';

const capture = vi.hoisted(() => ({ editor: null as PlateEditor | null }));
vi.mock('platejs/react', async importOriginal => {
  const actual = await importOriginal<typeof import('platejs/react')>();
  return { ...actual, usePlateEditor: (...args: Parameters<typeof actual.usePlateEditor>) => {
    const editor = actual.usePlateEditor(...args);
    capture.editor = editor;
    return editor;
  } };
});
vi.mock('@/components/plate-editor/editor-kit', async () => {
  const { FindReplacePlugin } = await import('@platejs/find-replace');
  const { MentionPlugin } = await import('@platejs/mention/react');
  const { EmojiPlugin } = await import('@platejs/emoji/react');
  return { EditorKit: [FindReplacePlugin, MentionPlugin, EmojiPlugin] };
});
vi.mock('@/components/plate-ui/editor', async () => {
  const { PlateContent } = await import('platejs/react');
  return { EditorContainer: ({ children }: React.PropsWithChildren) => <div>{children}</div>, Editor: () => <PlateContent /> };
});
vi.mock('./ImagePickerModal', () => ({ default: () => null }));
vi.mock('./AudioPickerModal', () => ({ default: () => null }));
vi.mock('./SceneCraftModal', () => ({ default: () => null }));
afterEach(cleanup);

const props = {
  theme: getTheme(true), isDarkMode: true, onToggleSidebar() {},
  sectionId: 'a', sectionTitle: 'Heading', sectionXhtml: '<p>Original words</p>', sectionWordCount: 2,
};

it('sends heading input immediately while still focused, including empty values and spaces', () => {
  const changed = vi.fn();
  render(<EditorPanel {...props} onTitleChange={changed} />);
  fireEvent.click(screen.getByTitle('Click to edit chapter title'));
  const input = screen.getByLabelText('Chapter heading');
  fireEvent.change(input, { target: { value: ' New heading ' } });
  expect(changed).toHaveBeenLastCalledWith(' New heading ');
  expect(document.activeElement).toBe(input);
  fireEvent.change(input, { target: { value: '' } });
  expect(changed).toHaveBeenLastCalledWith('');
  expect(screen.queryByRole('button', { name: /^Save$/ })).toBeNull();
});

it('saves real Plate value edits without resetting selection or undo when saved props return', async () => {
  const changed = vi.fn();
  const view = render(<EditorPanel {...props} onContentChange={changed} />);
  const editor = capture.editor!;
  await act(async () => {
    editor.tf.select({ path: [2, 0], offset: 'Original words'.length });
    editor.tf.insertText(' plus new words');
  });
  await waitFor(() => expect(changed).toHaveBeenCalled());
  const xhtml = changed.mock.calls.at(-1)![0] as string;
  expect(xhtml).toContain('Original words plus new words');
  const selection = structuredClone(editor.selection);
  const undoCount = editor.history.undos.length;
  view.rerender(<EditorPanel {...props} sectionXhtml={xhtml} onContentChange={changed} />);
  expect(capture.editor).toBe(editor);
  expect(editor.selection).toEqual(selection);
  expect(editor.history.undos.length).toBe(undoCount);
  await act(async () => { editor.undo(); });
  expect(changed.mock.calls.at(-1)![0]).not.toContain('plus new words');
});

it('keeps the same editor in Writing Mode and ignores selection-only changes', async () => {
  const changed = vi.fn();
  const view = render(<EditorPanel {...props} onContentChange={changed} />);
  const editor = capture.editor!;
  await act(async () => { editor.tf.select({ path: [2, 0], offset: 2 }); });
  expect(changed).not.toHaveBeenCalled();
  view.rerender(<EditorPanel {...props} writingMode onContentChange={changed} />);
  expect(capture.editor).toBe(editor);
  expect(screen.queryByRole('button', { name: /^Save$/ })).toBeNull();
  await act(async () => { editor.tf.insertText('Typed in Writing Mode'); });
  expect(changed.mock.calls.at(-1)![0]).toContain('Typed in Writing Mode');
});

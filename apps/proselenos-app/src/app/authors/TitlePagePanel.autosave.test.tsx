import React, { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import TitlePagePanel from './TitlePagePanel';
import { getTheme } from '../shared/theme';
afterEach(cleanup);

it('reports every field edit without Return, Tab, blur, or disabling the inputs', () => {
  const changed = vi.fn();
  function Form() {
    const [metadata, setMetadata] = useState({ title: '', subtitle: '', author: '', publisher: '' });
    return <TitlePagePanel theme={getTheme(true)} isDarkMode onToggleSidebar={() => {}}
      metadata={metadata} onChange={next => { changed(next); setMetadata(next); }} />;
  }
  render(<Form />);
  for (const field of ['Title', 'Subtitle', 'Author', 'Publisher']) {
    const input = screen.getByLabelText(field) as HTMLInputElement;
    input.focus();
    for (const value of ['a', 'ab', 'ab 日本語', '']) {
      fireEvent.change(input, { target: { value } });
      expect(changed.mock.calls.at(-1)![0][field.toLowerCase()]).toBe(value);
      expect(input.disabled).toBe(false);
      expect(document.activeElement).toBe(input);
    }
  }
  expect(changed).toHaveBeenCalledTimes(16);
  expect(screen.queryByRole('button', { name: /Save/ })).toBeNull();
});

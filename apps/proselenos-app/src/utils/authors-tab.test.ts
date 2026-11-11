import { afterEach, expect, it, vi } from 'vitest';
import { AUTHORS_TAB_NAME, openAuthorsTab } from './authors-tab';

afterEach(() => vi.unstubAllGlobals());

function browser(tab: unknown) {
  const open = vi.fn(() => tab);
  const assign = vi.fn();
  vi.stubGlobal('window', { open, location: { href: 'https://example.com/library/', assign } });
  return { open, assign };
}

it('finds Authors by name after Library reloads, without navigating the editor', () => {
  const navigate = vi.fn();
  const tab = {
    location: { origin: 'https://example.com', pathname: '/authors/' },
    focus: vi.fn(),
  };
  Object.defineProperty(tab.location, 'href', { set: navigate });
  const first = browser(tab);
  openAuthorsTab();
  // A fresh Library has no retained reference to the Authors window.
  const reloaded = browser(tab);
  openAuthorsTab();
  expect(first.open).toHaveBeenCalledWith('', AUTHORS_TAB_NAME);
  expect(reloaded.open).toHaveBeenCalledWith('', AUTHORS_TAB_NAME);
  expect(navigate).not.toHaveBeenCalled();
  expect(tab.focus).toHaveBeenCalledTimes(2);
});

it('navigates a newly created named tab to Authors', () => {
  const tab = { location: { origin: 'null', pathname: 'blank', href: 'about:blank' }, focus: vi.fn() };
  const { open } = browser(tab);
  openAuthorsTab();
  expect(open).toHaveBeenCalledWith('', AUTHORS_TAB_NAME);
  expect(tab.location.href).toBe('https://example.com/authors/');
  expect(tab.focus).toHaveBeenCalledOnce();
});

it('still opens Authors if the browser blocks creating a tab', () => {
  const { assign } = browser(null);
  openAuthorsTab();
  expect(assign).toHaveBeenCalledWith('https://example.com/authors/');
});

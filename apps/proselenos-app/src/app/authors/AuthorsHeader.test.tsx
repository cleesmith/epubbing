import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import AuthorsHeader from './AuthorsHeader';
import { getTheme } from '../shared/theme';
import { showAlert } from '../shared/alerts';
import { updateApp } from '@/services/appUpdate';
import { showOfflinePreparation } from '@/components/OfflinePreparation';

vi.mock('@/components/TrafficLightIcon', () => ({ default: () => null }));
vi.mock('@/generated/release', () => ({ RELEASE_HASH: 'abc123' }));
vi.mock('../shared/alerts', () => ({ showAlert: vi.fn(), showConfirm: vi.fn() }));
vi.mock('@/services/appUpdate', () => ({ updateApp: vi.fn(async () => {}) }));
vi.mock('@/components/OfflinePreparation', () => ({ showOfflinePreparation: vi.fn(async () => {}) }));

afterEach(() => { cleanup(); vi.clearAllMocks(); });

function openMenu(hasUnsavedChanges = false, isDarkMode = true) {
  const noop = () => {};
  render(<AuthorsHeader
    theme={getTheme(isDarkMode)} isDarkMode={isDarkMode} hasUnsavedChanges={hasUnsavedChanges}
    onThemeToggle={noop} onAboutClick={noop} onStorageClick={noop} onNewClick={noop}
    onOpenClick={noop} onOpenDocxClick={noop} onOpenPdfClick={noop} onOpenManuscriptClick={noop}
    onOpenFountainClick={noop} onLoadFromLibraryClick={noop} onSaveClick={noop}
  />);
  fireEvent.click(screen.getByTitle('Menu'));
}

it('shows the running release and calls the same update action used by Library', () => {
  openMenu();
  fireEvent.click(screen.getByRole('button', { name: /Update App - abc123/ }));
  expect(updateApp).toHaveBeenCalledOnce();
  expect(showAlert).not.toHaveBeenCalled();
  expect(screen.queryByText('Update App - abc123')).toBeNull();
});

it('keeps unsaved writing open instead of starting an update that would reload Authors', () => {
  openMenu(true);
  fireEvent.click(screen.getByRole('button', { name: /Update App - abc123/ }));
  expect(updateApp).not.toHaveBeenCalled();
  expect(showAlert).toHaveBeenCalledWith('Save your changes before updating the app.', 'info', 'Update App', true);
});

it.each([true, false])('opens the existing offline preparation dialog with dark mode %s', isDark => {
  openMenu(true, isDark);
  fireEvent.click(screen.getByRole('button', { name: /Prep for offline use/ }));
  expect(showOfflinePreparation).toHaveBeenCalledWith(isDark);
  expect(updateApp).not.toHaveBeenCalled();
  expect(screen.queryByText('Prep for offline use')).toBeNull();
});

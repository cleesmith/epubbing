import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { ServiceWorkerRegistration } from './ServiceWorkerRegistration';
import { initializeApp } from '@/services/appUpdate';

vi.mock('@/services/appUpdate', () => ({ initializeApp: vi.fn(async () => {}) }));
vi.mock('@/store/themeStore', () => ({ useThemeStore: { getState: () => ({ isDarkMode: true }) } }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

it('initializes on mount but does not restart setup when connectivity or focus returns', () => {
  render(<ServiceWorkerRegistration />);
  expect(initializeApp).toHaveBeenCalledOnce();
  window.dispatchEvent(new Event('online'));
  window.dispatchEvent(new Event('focus'));
  document.dispatchEvent(new Event('visibilitychange'));
  expect(initializeApp).toHaveBeenCalledOnce();
});

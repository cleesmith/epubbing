'use client';

import { useEffect } from 'react';
import { initializeApp } from '@/services/appUpdate';
import { useThemeStore } from '@/store/themeStore';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    void initializeApp(useThemeStore.getState().isDarkMode).catch(error => {
      console.error('App setup failed:', error);
    });
  }, []);

  return null;
}

'use client';

import { useEffect } from 'react';
import { initializeApp } from '@/services/appUpdate';
import { useThemeStore } from '@/store/themeStore';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    const prepare = () => {
      void initializeApp(useThemeStore.getState().isDarkMode).catch(error => {
        console.error('App setup failed:', error);
      });
    };
    prepare();
    // Retry unfinished setup when connectivity returns; no polling.
    window.addEventListener('online', prepare);
    return () => window.removeEventListener('online', prepare);
  }, []);

  return null;
}

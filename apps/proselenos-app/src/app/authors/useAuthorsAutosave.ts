'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { AuthorsAutosave } from '@/services/authorsAutosave';

export function useAuthorsAutosave() {
  const [autosave] = useState(() => new AuthorsAutosave());
  const state = useSyncExternalStore(autosave.subscribe, autosave.getSnapshot, autosave.getSnapshot);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!autosave.getSnapshot().pending) return;
      // Browsers cannot await an asynchronous save while closing a tab.
      event.preventDefault();
      event.returnValue = '';
    };
    const flush = () => { void autosave.flush().catch(() => { /* The inline error stays visible. */ }); };
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        flush();
      }
    };
    const onVisibility = () => { if (document.visibilityState === 'hidden') flush(); };
    window.addEventListener('beforeunload', beforeUnload);
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', onVisibility);
      flush();
    };
  }, [autosave]);

  return { autosave, ...state };
}

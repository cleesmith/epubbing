import { useCallback, useEffect, useRef, useState } from 'react';
import type { EnvConfigType } from '@/services/environment';
import { useLibraryStore } from '@/store/libraryStore';
import { useSettingsStore } from '@/store/settingsStore';

/** One owner for initial loads, publication notices, and returning to a tab. */
export function useLibraryRefresh(envConfig: EnvConfigType) {
  const requestId = useRef(0);
  const [ready, setReady] = useState(false);
  const cancel = useCallback(() => { requestId.current += 1; }, []);

  const refresh = useCallback(async () => {
    const request = ++requestId.current;
    setReady(false);
    try {
      const appService = await envConfig.getAppService();
      while (request === requestId.current) {
        const previousBooks = useLibraryStore.getState().library;
        const previousSettings = useSettingsStore.getState().settings;
        const settings = await appService.loadSettings();
        const library = await appService.loadLibraryBooks();
        if (request !== requestId.current) return null;
        // A publication or another local update may have replaced the list
        // while its saved copy was being read. Read again instead of reverting it.
        if (useLibraryStore.getState().library !== previousBooks) continue;
        // Do not undo a view/sort change made while this read was in progress.
        if (useSettingsStore.getState().settings === previousSettings) {
          useSettingsStore.getState().setSettings(settings);
        }
        useLibraryStore.getState().setLibrary(library);
        setReady(true);
        return { appService, settings, library };
      }
    } catch (error) {
      // Keep unavailable actions hidden; a return to the tab retries the read.
      // No popup interrupts the author.
      if (request === requestId.current) console.error('Could not refresh Library:', error);
    }
    return null;
  }, [envConfig]);

  useEffect(() => {
    const refreshVisibleLibrary = () => {
      if (document.visibilityState !== 'hidden') void refresh();
    };
    const channel = new BroadcastChannel('everythingebooks-library');
    channel.onmessage = () => { void refresh(); };
    // A background/suspended tab can miss a publication notice. Both Authors
    // navigation buttons can return to an already-open Library tab.
    window.addEventListener('focus', refreshVisibleLibrary);
    window.addEventListener('pageshow', refreshVisibleLibrary);
    document.addEventListener('visibilitychange', refreshVisibleLibrary);
    return () => {
      cancel();
      channel.close();
      window.removeEventListener('focus', refreshVisibleLibrary);
      window.removeEventListener('pageshow', refreshVisibleLibrary);
      document.removeEventListener('visibilitychange', refreshVisibleLibrary);
    };
  }, [refresh, cancel]);

  return { ready, refresh, cancel };
}

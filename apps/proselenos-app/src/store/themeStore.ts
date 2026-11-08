import { saveBackupPreference } from '@/services/backupReminder';
import { create } from 'zustand';
import { AppService } from '@/types/system';
import { getThemeCode, ThemeCode } from '@/utils/style';
// No Desktop - removed bridge and window imports
import { CustomTheme, Palette, ThemeMode } from '@/styles/themes';
import { EnvConfigType, isWebAppPlatform } from '@/services/environment';
import { SystemSettings } from '@/types/settings';
import { Insets } from '@/types/misc';

interface ThemeState {
  themeMode: ThemeMode;
  themeColor: string;
  systemIsDarkMode: boolean;
  themeCode: ThemeCode;
  isDarkMode: boolean;
  systemUIVisible: boolean;
  statusBarHeight: number;
  systemUIAlwaysHidden: boolean;
  safeAreaInsets: Insets | null;
  isRoundedWindow: boolean;
  setSystemUIAlwaysHidden: (hidden: boolean) => void;
  setStatusBarHeight: (height: number) => void;
  showSystemUI: () => void;
  dismissSystemUI: () => void;
  getIsDarkMode: () => boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeColor: (color: string) => void;
  updateAppTheme: (color: keyof Palette) => void;
  saveCustomTheme: (
    envConfig: EnvConfigType,
    settings: SystemSettings,
    theme: CustomTheme,
    isDelete?: boolean,
  ) => void;
  handleSystemThemeChange: (isDark: boolean) => void;
  updateSafeAreaInsets: (insets: Insets) => void;
}

const getInitialThemeMode = (): ThemeMode => {
  if (typeof window !== 'undefined' && localStorage) {
    const mode = localStorage.getItem('themeMode');
    return mode === 'dark' || mode === 'light' ? mode : 'auto';
  }
  return 'auto';
};

const getInitialThemeColor = (): string => {
  if (typeof window !== 'undefined' && localStorage) {
    return localStorage.getItem('themeColor') || 'default';
  }
  return 'default';
};

export const useThemeStore = create<ThemeState>((set, get) => {
  const initialThemeMode = getInitialThemeMode();
  const initialThemeColor = getInitialThemeColor();
  const systemIsDarkMode =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkMode =
    initialThemeMode === 'dark' || (initialThemeMode === 'auto' && systemIsDarkMode);
  const themeCode = getThemeCode();

  return {
    themeMode: initialThemeMode,
    themeColor: initialThemeColor,
    systemIsDarkMode,
    isDarkMode,
    themeCode,
    systemUIVisible: false,
    statusBarHeight: 24,
    systemUIAlwaysHidden: false,
    safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
    isRoundedWindow: true,
    showSystemUI: () => set({ systemUIVisible: true }),
    dismissSystemUI: () => set({ systemUIVisible: false }),
    setStatusBarHeight: (height: number) => set({ statusBarHeight: height }),
    setSystemUIAlwaysHidden: (hidden: boolean) => set({ systemUIAlwaysHidden: hidden }),
    getIsDarkMode: () => get().isDarkMode,
    setThemeMode: (mode) => {
      if (typeof window !== 'undefined' && localStorage) {
        saveBackupPreference('themeMode', mode);
      }
      const isDarkMode = mode === 'dark' || (mode === 'auto' && get().systemIsDarkMode);
      document.documentElement.setAttribute(
        'data-theme',
        `${get().themeColor}-${isDarkMode ? 'dark' : 'light'}`,
      );
      set({ themeMode: mode, isDarkMode });
      set({ themeCode: getThemeCode() });
    },
    setThemeColor: (color) => {
      if (typeof window !== 'undefined' && localStorage) {
        saveBackupPreference('themeColor', color);
      }
      document.documentElement.setAttribute(
        'data-theme',
        `${color}-${get().isDarkMode ? 'dark' : 'light'}`,
      );
      set({ themeColor: color });
      set({ themeCode: getThemeCode() });
    },
    updateAppTheme: (color) => {
      if (isWebAppPlatform()) {
        const { palette } = get().themeCode;
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palette[color]);
      }
    },
    saveCustomTheme: async (envConfig, settings, theme, isDelete) => {
      const customThemes = settings.globalReadSettings.customThemes || [];
      const index = customThemes.findIndex((t) => t.name === theme.name);
      if (isDelete) {
        if (index > -1) {
          customThemes.splice(index, 1);
        }
      } else {
        if (index > -1) {
          customThemes[index] = theme;
        } else {
          customThemes.push(theme);
        }
      }
      settings.globalReadSettings.customThemes = customThemes;
      saveBackupPreference('customThemes', JSON.stringify(customThemes));
      const appService = await envConfig.getAppService();
      await appService.saveSettings(settings);
    },
    handleSystemThemeChange: (systemIsDarkMode) => {
      const mode = get().themeMode;
      const isDarkMode = mode === 'dark' || (mode === 'auto' && systemIsDarkMode);
      set({ systemIsDarkMode, isDarkMode });
    },
    updateSafeAreaInsets: (insets) => {
      set({ safeAreaInsets: insets });
    },
  };
});

export const loadDataTheme = () => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined' || typeof document === 'undefined') return;

  const themeMode = getInitialThemeMode();
  const themeColor = getInitialThemeColor();
  const systemIsDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkMode = themeMode === 'dark' || (themeMode === 'auto' && systemIsDarkMode);
  document.documentElement.setAttribute(
    'data-theme',
    `${themeColor}-${isDarkMode ? 'dark' : 'light'}`,
  );
  // Read only: receiving another tab's choice must not write it back or mark
  // the backup reminder as changed again.
  useThemeStore.setState({ themeMode, themeColor, systemIsDarkMode, isDarkMode, themeCode: getThemeCode() });
};

const handleStoredThemeChange = (event: StorageEvent) => {
  if (event.storageArea !== localStorage) return;
  if (event.key === null || event.key === 'themeMode' || event.key === 'themeColor' || event.key === 'customThemes') {
    loadDataTheme();
  }
};

export const initSystemThemeListener = (appService: AppService) => {
  if (typeof window === 'undefined' || !appService) return;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const updateColorTheme = async () => {
    // Also reread the shared setting when returning to an already open tab.
    loadDataTheme();
  };

  const updateWindowTheme = async () => {
    // No Desktop - window theme updates removed
  };

  mediaQuery?.addEventListener('change', updateColorTheme);
  window.addEventListener('storage', handleStoredThemeChange);
  document.addEventListener('visibilitychange', updateColorTheme);
  window.addEventListener('resize', updateWindowTheme);
  updateColorTheme();
};

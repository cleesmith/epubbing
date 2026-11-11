import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { PiBooks, PiArrowClockwise, PiPencil, PiDotsThreeCircle } from 'react-icons/pi';
import { MdOutlineMenu, MdArrowBackIosNew } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';

import { useEnv } from '@/context/EnvContext';
import { useThemeStore } from '@/store/themeStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useLibraryStore } from '@/store/libraryStore';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';
import { useTrafficLightStore } from '@/store/trafficLightStore';
import { navigateToLibrary } from '@/utils/nav';
import { appPath } from '@/utils/app-path';
import { debounce } from '@/utils/debounce';
import useShortcuts from '@/hooks/useShortcuts';
import Dropdown from '@/components/Dropdown';
import TrafficLightIcon from '@/components/TrafficLightIcon';
import SettingsMenu from './SettingsMenu';
import ViewMenu from './ViewMenu';

interface LibraryHeaderProps {
  isSelectMode: boolean;
  isSelectAll: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onImportBooks: () => void;
  onToggleSelectMode: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onStorageClick?: () => void;
}

const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  isSelectMode,
  isSelectAll,
  searchQuery,
  onSearchChange,
  onImportBooks,
  onToggleSelectMode: _onToggleSelectMode, // disabled: multi-select mode
  onSelectAll,
  onDeselectAll,
  onStorageClick,
}) => {
  const _ = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { appService } = useEnv();
  const { systemUIVisible, statusBarHeight, themeMode, isDarkMode, setThemeMode } = useThemeStore();
  const { currentBookshelf } = useLibraryStore();
  const {
    isTrafficLightVisible,
    initializeTrafficLightStore,
    initializeTrafficLightListeners,
    setTrafficLightVisibility,
    cleanupTrafficLightListeners,
  } = useTrafficLightStore();
  // Local state for input value, synced with parent via onSearchChange
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const headerRef = useRef<HTMLDivElement>(null);
  const authorsWindowRef = useRef<Window | null>(null);
  const iconSize18 = useResponsiveSize(18);
  const iconSize20 = useResponsiveSize(20);
  const { safeAreaInsets: insets } = useThemeStore();

  useShortcuts({
    // disabled: onToggleSelectMode,
  });

  // Sync local state when parent searchQuery changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnSearchChange = useCallback(
    debounce((value: string) => {
      onSearchChange(value);
    }, 500),
    [onSearchChange],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setLocalSearchQuery(newQuery);
    debouncedOnSearchChange(newQuery);
  };

  const switchToAuthorsMode = () => {
    const authorsUrl = new URL(appPath('/authors/'), window.location.href);
    const authorsTab = authorsWindowRef.current;
    try {
      if (authorsTab && !authorsTab.closed &&
          authorsTab.location.origin === authorsUrl.origin &&
          authorsTab.location.pathname.replace(/\/$/, '') === authorsUrl.pathname.replace(/\/$/, '')) {
        // Bring back the writing tab without reloading unsaved writing.
        authorsTab.focus();
        return;
      }
    } catch {
      // The previous tab may have navigated to another website.
    }
    // A script-opened Authors tab can close itself when Exit is clicked.
    authorsWindowRef.current = window.open(authorsUrl.href, '_blank');
    if (!authorsWindowRef.current) {
      // If new tabs are blocked, the button still opens Authors.
      window.location.assign(authorsUrl.href);
    }
  };

  useEffect(() => {
    if (!appService?.hasTrafficLight) return;

    initializeTrafficLightStore(appService);
    initializeTrafficLightListeners();
    setTrafficLightVisibility(true);
    return () => {
      cleanupTrafficLightListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appService?.hasTrafficLight]);

  const windowButtonVisible = appService?.hasWindowBar && !isTrafficLightVisible;
  const isInGroupView = !!searchParams?.get('group');
  const currentBooksCount = currentBookshelf.reduce(
    (acc, item) => acc + ('books' in item ? item.books.length : 1),
    0,
  );

  if (!insets) return null;

  return (
    <div
      ref={headerRef}
      className={clsx(
        'titlebar z-10 flex h-[52px] w-full items-center py-2 pr-4 sm:h-[48px]',
        windowButtonVisible ? 'sm:pr-4' : 'sm:pr-6',
        isTrafficLightVisible ? 'pl-16' : 'pl-0 sm:pl-2',
      )}
      style={{
        marginTop: appService?.hasSafeAreaInset
          ? `max(${insets.top}px, ${systemUIVisible ? statusBarHeight : 0}px)`
          : '0px',
      }}
    >
      <div className='flex w-full items-center justify-between space-x-6 sm:space-x-12'>
        <div className='exclude-title-bar-mousedown relative flex w-full items-center pl-4'>
          <button
            onClick={() => window.location.reload()}
            aria-label={_('Reload Page')}
            title={_('Reload Page')}
            className='mr-4 flex h-6 w-6 items-center justify-center text-gray-500 hover:text-gray-400'
          >
            <PiArrowClockwise className='h-5 w-5' />
          </button>
          <button
            onClick={() => setThemeMode(isDarkMode ? 'light' : 'dark')}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className='mr-4 flex h-6 w-6 shrink-0 items-center justify-center'
            style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: '4px' }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          {onStorageClick && (
            <div className='mr-4 flex items-center'>
              <TrafficLightIcon
                isDarkMode={themeMode === 'dark' || (themeMode === 'auto' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)}
                onClick={onStorageClick}
              />
            </div>
          )}
          {isInGroupView && (
            <button
              onClick={() => {
                navigateToLibrary(router);
              }}
              className='ml-[-6px] mr-4 flex h-7 min-h-7 w-7 items-center p-0'
            >
              <div className='lg:tooltip lg:tooltip-bottom' data-tip={_('Go Back')}>
                <MdArrowBackIosNew size={iconSize20} />
              </div>
            </button>
          )}
          <button
            onClick={switchToAuthorsMode}
            aria-label={_('Authors')}
            title={_('Write Ebook')}
            className='mr-4 inline-flex h-8 shrink-0 items-center gap-1 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 text-blue-500 hover:bg-blue-500/20 hover:text-blue-400'
          >
            <PiPencil className='h-5 w-5' />
            <span className='text-sm'>Authors</span>
          </button>
          <button
            onClick={onImportBooks}
            aria-label={_('Import Ebook')}
            title={_('Import Ebook')}
            className='mr-4 inline-flex h-8 shrink-0 items-center gap-1 rounded-full border border-green-600/40 bg-green-600/10 px-3 text-green-600 hover:bg-green-600/20 hover:text-green-500'
          >
            <PiBooks className='h-5 w-5' />
            <span className='text-sm'>{_('Import Ebook')}</span>
          </button>
          <div className='relative flex h-9 max-w-sm flex-1 items-center sm:h-7'>
            <span className='absolute left-3 text-gray-500'>
              <FaSearch className='h-4 w-4' />
            </span>
            <input
              type='text'
              value={localSearchQuery}
              placeholder={
                currentBooksCount > 1
                  ? _('Search ebook metadata...', {
                      count: currentBooksCount,
                    })
                  : _('Search ebook metadata...')
              }
              onChange={handleSearchChange}
              spellCheck='false'
              className={clsx(
                'input rounded-badge bg-base-300/45 h-9 w-full pl-10 pr-8 sm:h-7',
                'font-sans text-sm font-light',
                'placeholder:text-base-content/50',
                'border-none focus:outline-none focus:ring-0',
              )}
            />
          </div>
          {localSearchQuery && (
            <button
              type='button'
              onClick={() => {
                setLocalSearchQuery('');
                onSearchChange('');
              }}
              className='ml-2 text-gray-400 hover:text-gray-600'
              aria-label={_('Clear Search')}
            >
              <IoMdCloseCircle className='h-4 w-4' />
            </button>
          )}
        </div>
        {isSelectMode ? (
          <div
            className={clsx(
              'flex h-full items-center',
              'w-max-[72px] w-min-[72px] sm:w-max-[80px] sm:w-min-[80px]',
            )}
          >
            <button
              onClick={isSelectAll ? onDeselectAll : onSelectAll}
              className='btn btn-ghost text-base-content/85 h-8 min-h-8 w-[72px] p-0 sm:w-[80px]'
              aria-label={isSelectAll ? _('Deselect') : _('Select All')}
            >
              <span className='font-sans text-base font-normal sm:text-sm'>
                {isSelectAll ? _('Deselect') : _('Select All')}
              </span>
            </button>
          </div>
        ) : (
          <div className='flex h-full items-center gap-x-2 sm:gap-x-4'>
            <Dropdown
              label={_('View Menu')}
              className='exclude-title-bar-mousedown dropdown-bottom dropdown-end'
              buttonClassName='btn btn-ghost h-8 min-h-8 w-8 p-0'
              toggleButton={<PiDotsThreeCircle role='none' size={iconSize18} />}
            >
              <ViewMenu />
            </Dropdown>
            <Dropdown
              label={_('Menu')}
              className='exclude-title-bar-mousedown dropdown-bottom dropdown-end'
              buttonClassName='btn btn-ghost h-8 min-h-8 w-8 p-0'
              toggleButton={<MdOutlineMenu role='none' size={iconSize18} />}
            >
              <SettingsMenu />
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryHeader;

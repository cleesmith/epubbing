// app/authors/AuthorsHeader.tsx

'use client';

import { appPath } from '@/utils/app-path';
import { findLibraryTab } from '@/utils/library-tab';

import { useState, useEffect, useRef } from 'react';
import { PiInfo, PiFileDoc, PiFileText, PiImage, PiArrowCircleUp } from 'react-icons/pi';
import { GiBoxUnpacking } from 'react-icons/gi';
import { ThemeConfig } from '../shared/theme';
import { showConfirm, showAlert } from '../shared/alerts';
import StyledSmallButton from '@/components/StyledSmallButton';
import TrafficLightIcon from '@/components/TrafficLightIcon';
import { updateApp } from '@/services/appUpdate';
import { RELEASE_HASH } from '@/generated/release';

interface AuthorsHeaderProps {
  theme: ThemeConfig;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onAboutClick: () => void;
  onStorageClick: () => void;
  onNewClick: () => void;
  onOpenClick: () => void;
  onOpenDocxClick: () => void;
  onOpenPdfClick: () => void;
  onOpenManuscriptClick: () => void;
  onOpenFountainClick: () => void;
  onLoadFromLibraryClick: () => void;
  onSaveClick: () => void;
  isProcessing?: boolean;
  onSearchClose?: () => void;
  onCoverClick?: () => void;
  onDocxExportClick?: () => void;
  onTxtExportClick?: () => void;
  onFountainExportClick?: () => void;
  onXrayClick?: () => void;
  hasUnsavedChanges?: boolean;
  onBeforeLeave?: () => Promise<boolean>;
}

export default function AuthorsHeader({
  theme,
  isDarkMode,
  onThemeToggle,
  onAboutClick,
  onStorageClick,
  onNewClick,
  onOpenClick,
  onOpenDocxClick,
  onOpenPdfClick,
  onOpenManuscriptClick,
  onOpenFountainClick: _onOpenFountainClick,
  onLoadFromLibraryClick,
  onSaveClick,
  isProcessing = false,
  onSearchClose,
  onCoverClick,
  onDocxExportClick,
  onTxtExportClick,
  onFountainExportClick: _onFountainExportClick,
  onXrayClick,
  hasUnsavedChanges = false,
  onBeforeLeave,
}: AuthorsHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdownOpen, setOpenDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openDropdownRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    if (!menuOpen && !openDropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (openDropdownOpen && openDropdownRef.current && !openDropdownRef.current.contains(e.target as Node)) {
        setOpenDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, openDropdownOpen]);

  const handleExitClick = async () => {
    if (onBeforeLeave && !(await onBeforeLeave())) return;
    if (!onBeforeLeave && hasUnsavedChanges) {
      const confirmed = await showConfirm(
        'You have unsaved changes that will be lost. Continue?',
        isDarkMode,
        'Unsaved Changes',
        'Go to Library',
        'Cancel'
      );
      if (!confirmed) return;
    }
    if (findLibraryTab()) {
      // The Library Authors button opens this tab with window.open, allowing
      // it to close itself. Do not focus, reload, or replace the Library tab.
      window.close();
    } else {
      // Use the same cached /library/ document as Reload Page. Do not restore
      // a previously visited Library through the client router's page state.
      window.location.assign(appPath('/library/'));
    }
  };

  const handleUpdateApp = async () => {
    setMenuOpen(false);
    if (onBeforeLeave && !(await onBeforeLeave())) return;
    if (!onBeforeLeave && hasUnsavedChanges) {
      showAlert('Save your changes before updating the app.', 'info', 'Update App', isDarkMode);
      return;
    }
    void updateApp(isDarkMode);
  };

  return (
    <header
      style={{
        backgroundColor: theme.headerBg,
        borderBottom: `1px solid ${theme.border}`,
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}
    >
      {/* Left section: Theme, backup reminder, File and Save EPUB to Library */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <TrafficLightIcon
          pending={hasUnsavedChanges}
          isDarkMode={isDarkMode}
          onClick={onStorageClick}
        />
        <div style={{ width: '8px' }} />

        {/* File dropdown + Save EPUB to Library */}
        <div style={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
          {/* File dropdown */}
          <div ref={openDropdownRef} style={{ position: 'relative' }}>
            <StyledSmallButton
              theme={theme}
              onClick={async () => {
                if (onBeforeLeave && !(await onBeforeLeave())) return;
                if (!onBeforeLeave && hasUnsavedChanges) {
                  const confirmed = await showConfirm(
                    'You have unsaved changes that will be lost. Continue?',
                    isDarkMode,
                    'Unsaved Changes',
                    'Continue',
                    'Cancel'
                  );
                  if (!confirmed) return;
                }
                onSearchClose?.();
                setOpenDropdownOpen(!openDropdownOpen);
              }}
              title="File"
            >
              File ▾
            </StyledSmallButton>
            {openDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '4px',
                  backgroundColor: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  zIndex: 1000,
                  minWidth: '280px',
                  maxWidth: 'calc(100vw - 16px)',
                }}
              >
                <button
                  onClick={() => { onNewClick(); setOpenDropdownOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: theme.text,
                    fontSize: '13px',
                  }}
                >
                  New EPUB
                </button>
                <button
                  onClick={() => { onOpenClick(); setOpenDropdownOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: theme.text,
                    fontSize: '13px',
                  }}
                >
                  Import EPUB from your device
                </button>
                <button
                  onClick={() => { onLoadFromLibraryClick(); setOpenDropdownOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: theme.text,
                    fontSize: '13px',
                  }}
                >
                  Edit EPUB from Library
                </button>
                <button
                  onClick={() => { onOpenDocxClick(); setOpenDropdownOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: theme.text,
                    fontSize: '13px',
                  }}
                >
                  Import DOCX as EPUB
                </button>
                <button
                  onClick={() => { onOpenPdfClick(); setOpenDropdownOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: theme.text,
                    fontSize: '13px',
                  }}
                >
                  Import PDF as EPUB
                </button>
                <button
                  onClick={() => { onOpenManuscriptClick(); setOpenDropdownOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: theme.text,
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Import manuscript.txt as EPUB
                </button>
                {/* <button
                  onClick={() => { onOpenFountainClick(); setOpenDropdownOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: theme.text,
                    fontSize: '13px',
                  }}
                >
                  Load Fountain Screenplay
                </button> */}
              </div>
            )}
          </div>
          <StyledSmallButton
            theme={theme}
            onClick={onSaveClick}
            disabled={isProcessing}
            aria-busy={isProcessing}
            title={isProcessing ? 'Processing...' : 'Save EPUB to Library'}
            styleOverrides={isProcessing ? { color: '#fff', cursor: 'wait' } : undefined}
          >
            {isProcessing ? 'Processing...' : 'Save EPUB to Library'}
          </StyledSmallButton>
        </div>
      </div>

      {/* Right section: Hamburger menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
        {/* Hamburger menu container (for click-outside detection) */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          {/* Hamburger menu button */}
          <button
            onClick={() => { setMenuOpen(!menuOpen); }}
            title="Menu"
            style={{
              background: 'none',
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '4px 8px',
              color: theme.text,
            }}
          >
            ☰
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 1000,
                minWidth: '280px',
                maxWidth: 'calc(100vw - 16px)',
              }}
            >
            <button
              onClick={() => { setMenuOpen(false); void handleExitClick(); }}
              title="Leave Authors and return to Library"
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: theme.text,
                fontSize: '13px',
              }}
            >
              Library
            </button>
            <button
              onClick={() => { onCoverClick?.(); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(236, 72, 153, 0.2)',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: theme.text,
                fontSize: '13px',
              }}
            >
              <PiImage size={16} />
              Cover
            </button>
            <button
              onClick={() => { onTxtExportClick?.(); setMenuOpen(false); }}
              title="Export chapters as manuscript.txt"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(34, 197, 94, 0.15)',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: theme.text,
                fontSize: '13px',
              }}
            >
              <PiFileText size={16} />
              TXT
            </button>
            <button
              onClick={() => { onDocxExportClick?.(); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(59, 130, 246, 0.15)',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#3b82f6',
                fontSize: '13px',
              }}
            >
              <PiFileDoc size={16} />
              DOCX
            </button>
            {/* <button
              onClick={() => { onFountainExportClick?.(); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(34, 197, 94, 0.15)',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#22c55e',
                fontSize: '13px',
              }}
            >
              <PiFileText size={16} />
              Fountain
            </button> */}
            <button
              onClick={() => { onXrayClick?.(); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(147, 51, 234, 0.15)',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#9333ea',
                fontSize: '13px',
              }}
            >
              <GiBoxUnpacking size={16} />
              X-Ray
            </button>
            <button
              onClick={handleUpdateApp}
              title="only works when online"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                padding: '8px 12px', background: 'none', border: 'none',
                textAlign: 'left', cursor: 'pointer', color: theme.text, fontSize: '13px',
              }}
            >
              <PiArrowCircleUp size={16} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ whiteSpace: 'nowrap' }}>Update App - {RELEASE_HASH}</span>
                <span style={{ color: theme.textSecondary, fontSize: '11px' }}>only works when online</span>
              </span>
            </button>
            <button
              onClick={() => { onAboutClick(); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(148, 163, 184, 0.2)',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: theme.text,
                fontSize: '13px',
              }}
            >
              <PiInfo size={16} />
              About
            </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

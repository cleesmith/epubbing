// apps/proselenos-app/src/components/WelcomeModal.tsx
// Library welcome guide; also available through Library About.

'use client';

import { useState } from 'react';
import { ThemeConfig } from '../app/shared/theme';
import StyledSmallButton from '@/components/StyledSmallButton';
import AboutHelpContent from './AboutHelpContent';

interface WelcomeModalProps {
  isDarkMode: boolean;
  theme: ThemeConfig;
  onHideForever?: () => void;
}

export default function WelcomeModal({
  isDarkMode,
  theme,
  onHideForever
}: WelcomeModalProps) {
  const [dismissed, setDismissed] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleDismiss = () => {
    if (dontShowAgain && onHideForever) {
      onHideForever();
    }
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: isDarkMode ? '#222' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
        borderRadius: '12px',
        maxWidth: '750px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${isDarkMode ? '#333' : '#e5e7eb'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '600'
            }}>
              Welcome to EverythingEbooks
            </h2>
          </div>
          <StyledSmallButton onClick={handleDismiss} theme={theme}>
            Close
          </StyledSmallButton>
        </div>

        {/* Content */}
        <div style={{
          padding: '24px',
          overflow: 'auto',
          flex: 1
        }}>

          <AboutHelpContent page="library" />

          {/* Do not show on startup */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px',
            fontSize: '13px',
            color: isDarkMode ? '#9ca3af' : '#6b7280',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
            />
            Don&apos;t show me this again
          </label>
        </div>
      </div>
    </div>
  );
}

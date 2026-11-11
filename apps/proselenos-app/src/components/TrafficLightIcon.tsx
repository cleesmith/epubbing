// components/TrafficLightIcon.tsx
// ZIP backup reminder shared by Library and Authors.

'use client';

import React, { useEffect, useState } from 'react';
import { BACKUP_EVENT, getBackupReminder, isBackupKey, type BackupReminder } from '@/services/backupReminder';

interface TrafficLightIconProps {
  pending?: boolean;
  isDarkMode: boolean;
  onClick: () => void;
}

export default function TrafficLightIcon({ pending = false, isDarkMode, onClick }: TrafficLightIconProps) {
  const [{ status, tooltip, dateLabel }, setReminder] = useState<BackupReminder>({
    status: 'green', tooltip: 'Open Storage', dateLabel: '',
  });
  useEffect(() => {
    const update = () => setReminder(getBackupReminder(pending));
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || isBackupKey(event.key)) update();
    };
    update();
    const timer = window.setInterval(update, 60_000);
    window.addEventListener(BACKUP_EVENT, update);
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener(BACKUP_EVENT, update);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', update);
    };
  }, [pending]);

  const housing = isDarkMode ? '#2a2a2a' : '#d0d0d0';
  const inactive = isDarkMode ? '#3a3a3a' : '#c0c0c0';

  const green = '#22c55e';
  const yellow = '#eab308';
  const red = '#ef4444';

  const activeColor = status === 'green' ? green : status === 'yellow' ? yellow : red;
  const filterId = 'traffic-glow';

  return (
    <button type="button" onClick={onClick} title={tooltip} aria-label={tooltip} className="inline-flex shrink-0 items-center gap-1">
      <svg
        width="12"
        height="24"
        viewBox="0 0 12 24"
        style={{ cursor: 'pointer', flexShrink: 0 }}
        aria-hidden="true"
      >
        <title>{tooltip}</title>
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Housing */}
        <rect x="0.75" y="0.75" width="10.5" height="22.5" rx="3" ry="3" fill={housing} stroke="#000000" strokeWidth="1.5" />
        {/* Red light (top) */}
        <circle
          cx="6"
          cy="5"
          r="3"
          fill={status === 'red' ? activeColor : inactive}
          filter={status === 'red' ? `url(#${filterId})` : undefined}
        />
        {/* Yellow light (middle) */}
        <circle
          cx="6"
          cy="12"
          r="3"
          fill={status === 'yellow' ? activeColor : inactive}
          filter={status === 'yellow' ? `url(#${filterId})` : undefined}
        />
        {/* Green light (bottom) */}
        <circle
          cx="6"
          cy="19"
          r="3"
          fill={status === 'green' ? activeColor : inactive}
          filter={status === 'green' ? `url(#${filterId})` : undefined}
        />
      </svg>
      {status === 'red' && <span className="text-xs" style={{ color: red }}>{dateLabel}</span>}
    </button>
  );
}

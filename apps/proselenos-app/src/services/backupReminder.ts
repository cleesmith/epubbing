// Both tabs share one reminder. Keep the last edit separate from the edit that
// was included in the ZIP, so a save during compression still needs a backup.
const CHANGE = 'ee_backup_change';
const EXPORTED = 'ee_backup_exported_change';
const DATE = 'last_export_date';
export const BACKUP_EVENT = 'ee-backup-reminder';

export function isBackupKey(key: string | null): boolean {
  return key === CHANGE || key === EXPORTED || key === DATE;
}

// A full localStorage must never interrupt a successful manuscript save.
let sessionRevision = '';
export function backupRevision(): string {
  return sessionRevision || localStorage.getItem(CHANGE) || '';
}

function notify(): void {
  window.dispatchEvent(new Event(BACKUP_EVENT));
}

export function markBackupChanged(): void {
  const previous = backupRevision();
  const clean = previous === (localStorage.getItem(EXPORTED) || '');
  const since = !clean && previous ? previous.split('|')[0] : new Date().toISOString();
  const revision = since + '|' + crypto.getRandomValues(new Uint32Array(4)).join('-');
  try {
    localStorage.setItem(CHANGE, revision);
    sessionRevision = '';
  } catch {
    sessionRevision = revision;
  }
  notify();
}

export function saveBackupPreference(key: string, value: string): void {
  if (localStorage.getItem(key) === value) return;
  localStorage.setItem(key, value);
  markBackupChanged();
}

export function recordZip(revision: string, date: string): void {
  localStorage.setItem(DATE, date);
  // A slower export must not undo a newer export that already covered every edit.
  const current = backupRevision();
  if (current === revision || current !== (localStorage.getItem(EXPORTED) || '')) {
    localStorage.setItem(EXPORTED, revision);
  }
  notify();
}

export type BackupReminder = { status: 'green' | 'yellow' | 'red'; tooltip: string; dateLabel: string };

export function getBackupReminder(pending = false, now = new Date()): BackupReminder {
  const change = backupRevision();
  const savedChanges = change !== (localStorage.getItem(EXPORTED) || '');
  if (!pending && !savedChanges) {
    return { status: 'green', tooltip: 'No changes to back up.', dateLabel: '' };
  }

  const lastZip = new Date(localStorage.getItem(DATE) || '');
  const hasZip = Number.isFinite(lastZip.getTime());
  const firstChange = new Date(change.split('|')[0] || now.getTime());
  const due = new Date(hasZip ? lastZip : firstChange);
  due.setHours(0, 0, 0, 0);
  // Leave both following calendar dates yellow (Monday through Wednesday).
  due.setDate(due.getDate() + 3);
  const overdue = now >= due;
  const dateLabel = hasZip
    ? 'Last ZIP: ' + lastZip.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : 'No ZIP exported yet';
  const action = pending ? 'Save your chapter, then export a ZIP backup.' : 'Changes to back up. Export a ZIP.';
  return { status: overdue ? 'red' : 'yellow', tooltip: action + ' ' + dateLabel, dateLabel };
}

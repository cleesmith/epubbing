import JSZip from 'jszip';
import type { Book } from '@/types/book';
import type { AppService } from '@/types/system';
import { getLocalBookFilename } from '@/utils/book';
import {
  loadPaperbackFront, loadPaperbackSettings, parsePaperbackFront, parsePaperbackSettings,
  type SavedPaperbackFront, type SavedPaperbackSettings,
} from '@/services/paperbackCoverStorage';

// Author-only setup, never a generated PDF or a resource in the reading spine.
const DIRECTORY = 'META-INF/ee-paperback/';
const SETTINGS_FILE = DIRECTORY + 'settings.json';

interface PaperbackSetup {
  settings: SavedPaperbackSettings | null;
  front: SavedPaperbackFront | null;
  frontStored: boolean;
  imageError: string;
}

function readSetup(value: unknown): PaperbackSetup {
  const record = value as { version?: unknown; settings?: unknown; front?: unknown } | null;
  if (!record || record.version !== 1 || record.settings === undefined || record.front === undefined) {
    throw new Error('The Authors EPUB contains unreadable cover-calculator settings.');
  }
  return {
    settings: record.settings === null ? null : parsePaperbackSettings(record.settings),
    front: record.front === null ? null : parsePaperbackFront(record.front),
    frontStored: false,
    imageError: '',
  };
}

// Local saved edits take precedence over the snapshot inside an imported EPUB.
// Reading the imported setup does not write files or change the original EPUB.
export async function loadPaperbackSetup(service: AppService, book: Pick<Book, 'hash' | 'sourceTitle' | 'title' | 'format'>, sourceZip?: JSZip): Promise<PaperbackSetup> {
  let imageError = '';
  const [settings, front] = await Promise.all([
    loadPaperbackSettings(service, book),
    loadPaperbackFront(service, book).catch(() => {
      imageError = 'The saved paperback image could not be loaded. You can choose another image.';
      return null;
    }),
  ]);
  if (settings || front || imageError || book.format !== 'EPUB') return { settings, front, frontStored: !!front, imageError };
  const zip = sourceZip ?? await JSZip.loadAsync(await (await service.openFile(getLocalBookFilename(book), 'Books')).arrayBuffer());
  const file = zip.file(SETTINGS_FILE);
  return file ? readSetup(JSON.parse(await file.async('string'))) : { settings: null, front: null, frontStored: false, imageError: '' };
}

export function removePaperbackSetup(zip: JSZip): void {
  // Remove the whole private directory, including unrecognized future contents.
  zip.remove(DIRECTORY);
}

export async function addPaperbackSetup(zip: JSZip, service: AppService, book: Book): Promise<void> {
  const setup = await loadPaperbackSetup(service, book, zip);
  if (setup.imageError) throw new Error(setup.imageError);
  removePaperbackSetup(zip);
  if (setup.settings || setup.front) {
    // These parsers select only supported settings and image fields. PDFs and
    // unrelated fields are never copied from local or imported records.
    zip.file(SETTINGS_FILE, JSON.stringify({ version: 1,
      settings: setup.settings ? parsePaperbackSettings(setup.settings) : null,
      front: setup.front ? parsePaperbackFront(setup.front) : null,
    }));
  }
}

import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Swal from 'sweetalert2';
import { showOfflinePreparation } from './OfflinePreparation';
import type { OfflineProgress } from '@/services/offlinePreparation';

// Exercise the real SweetAlert renderer so unsupported options or stale
// HTML cannot pass unnoticed behind the unit tests' mocked dialog.
beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  vi.stubGlobal('matchMedia', vi.fn((media: string) => ({
    matches: false, media, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  })));
});
afterEach(() => {
  Swal.close();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
const paragraphs = () => Array.from(Swal.getHtmlContainer()!.querySelectorAll('p'), p => p.textContent);

it('renders action, count, and instruction as spaced paragraphs, then waits for OK', async () => {
  let progress!: (value: OfflineProgress) => void;
  let finish!: () => void;
  const result = showOfflinePreparation(false, async report => {
    progress = report;
    await new Promise<void>(resolve => { finish = resolve; });
  }, 'setup');
  expect(paragraphs()).toEqual([
    'Getting the complete app ready in this browser…',
    'Stay online and keep this tab open.',
  ]);
  progress({ phase: 'saving', completed: 162, total: 266 });
  expect(paragraphs()).toEqual([
    'Saving application files for offline use',
    '162 of 266 files',
    'Stay online and keep this tab open until setup finishes.',
  ]);
  const content = Swal.getHtmlContainer()!.firstElementChild as HTMLElement;
  expect(content.style.display).toBe('grid');
  expect(content.style.gap).toBe('1rem');
  expect((content.children[1] as HTMLElement).style.fontVariantNumeric).toBe('tabular-nums');
  progress({ phase: 'verifying', completed: 266, total: 266 });
  expect(paragraphs()[0]).toBe('Verifying application files for offline use');
  expect(paragraphs()[1]).toBe('266 of 266 files');
  finish();
  await vi.advanceTimersByTimeAsync(60_000);
  expect(paragraphs()).toEqual([
    '266 application files saved and verified.',
    'EverythingEbooks is ready in this browser.',
    'Bookmark everythingebooks.org to return to it, even offline.',
  ]);
  expect(Swal.getConfirmButton()!.textContent).toBe('OK');
  Swal.clickConfirm();
  expect(await result).toBe(true);
});

it('replaces progress with readable error paragraphs and treats error text safely', async () => {
  const result = showOfflinePreparation(false, async progress => {
    progress({ phase: 'saving', completed: 1, total: 266 });
    throw new Error('Missing <script>file</script>.\nTry again.');
  }, 'setup');
  await Promise.resolve();
  expect(paragraphs()).toEqual([
    'Missing <script>file</script>.',
    'Try again.',
    'You can continue writing while online.',
    'You can choose Update App later.',
  ]);
  expect(Swal.getHtmlContainer()!.querySelector('script')).toBeNull();
  expect(Swal.getConfirmButton()!.textContent).toBe('Close');
  Swal.clickConfirm();
  expect(await result).toBe(false);
});

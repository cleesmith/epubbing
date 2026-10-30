import { appPath } from '@/utils/app-path';
import { epubVariantLabel, type EpubVariant } from './epubExport';

export interface EpubCheckMessage {
  id: string;
  severity: string;
  message: string;
  suggestion?: string;
  path?: string;
  line?: number;
  column?: number;
}

export interface EpubCheckResult {
  valid: boolean;
  exitCode: number;
  version: string;
  messages: EpubCheckMessage[];
  summary: { fatals: number; errors: number; warnings: number; infos: number } | null;
  stdout: string;
  stderr: string;
}

export interface EpubCheckReport {
  title: string;
  variant: EpubVariant;
  filename: string;
  checkedAt: string;
  elapsedMs: number;
  result: EpubCheckResult;
}

export function checkEpub(
  file: Blob,
  filename: string,
  options: { signal: AbortSignal; onProgress: (message: string, detail?: string) => void },
): Promise<EpubCheckResult> {
  const { signal, onProgress } = options;
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(signal.reason); return; }
    // A URL string intentionally bypasses Next/Webpack's worker bundling.
    const worker = new Worker(appPath('/epubcheck/worker.js'), { type: 'module', name: 'EE EPUBCheck' });
    const finish = () => {
      signal.removeEventListener('abort', abort);
      worker.terminate();
    };
    const abort = () => { finish(); reject(signal.reason); };
    signal.addEventListener('abort', abort, { once: true });
    worker.onerror = (event) => {
      event.preventDefault();
      finish();
      reject(new Error('The checker could not run. When online, use “Prep for offline use” and try again.'));
    };
    worker.onmessageerror = () => {
      finish();
      reject(new Error('The checker’s response could not be read. Please try again.'));
    };
    worker.onmessage = ({ data }) => {
      if (data.type === 'progress') onProgress(data.message, data.detail);
      else if (data.type === 'complete') {
        finish();
        const result = data.result as EpubCheckResult;
        if (!result || ![0, 1].includes(result.exitCode) || !Array.isArray(result.messages)) {
          reject(new Error('The checker did not return a complete validation result.'));
        } else resolve(result);
      } else if (data.type === 'error') {
        finish();
        reject(new Error(data.message));
      }
    };
    // Blobs are cloned by reference/backing store; no whole-book ArrayBuffer copy.
    try { worker.postMessage({ type: 'check', file, filename }); }
    catch (error) { finish(); reject(error); }
  });
}

export function checkCounts(result: EpubCheckResult) {
  const count = (severity: string) => result.messages.filter(message => message.severity === severity).length;
  // The engine's summary counts distinct messages; a message can have several
  // locations in the detailed list.
  return result.summary ?? { fatals: count('FATAL'), errors: count('ERROR'), warnings: count('WARNING'), infos: count('INFO') };
}

export function checkOutcome(result: EpubCheckResult): string {
  const { fatals, errors, warnings } = checkCounts(result);
  if (fatals || errors) return 'Check complete: errors found.';
  if (warnings) return 'Check complete: warnings found.';
  if (result.valid && result.exitCode === 0) return 'Check complete: no errors or warnings.';
  return 'The check did not pass. See the checker output below.';
}

export function messageLocation(message: EpubCheckMessage): string {
  return [message.path, message.line && message.line > 0 ? `line ${message.line}` : '',
    message.column && message.column > 0 ? `column ${message.column}` : ''].filter(Boolean).join(', ');
}

export function formatCheckReport(report: EpubCheckReport): string {
  const { result } = report;
  const counts = checkCounts(result);
  return [
    'EverythingEbooks — EPUBCheck report', '',
    `Book: ${report.title}`, `Checked: ${epubVariantLabel(report.variant)}`, `File: ${report.filename}`,
    `Date: ${new Date(report.checkedAt).toLocaleString()}`, `EPUBCheck: ${result.version}`,
    'Profile: Default', `Elapsed time: ${(report.elapsedMs / 1000).toFixed(1)} seconds`, '',
    checkOutcome(result),
    `Fatal errors: ${counts.fatals} | Errors: ${counts.errors} | Warnings: ${counts.warnings} | Information: ${counts.infos}`, '',
    ...result.messages.filter(message => message.severity !== 'SUPPRESSED').flatMap(message => [
      `${message.severity} ${message.id}: ${message.message}`,
      ...(messageLocation(message) ? [`Location: ${messageLocation(message)}`] : []),
      ...(message.suggestion ? [`Explanation: ${message.suggestion}`] : []), '',
    ]),
    'Checker output:', result.stdout, result.stderr, '',
  ].join('\n');
}

export function downloadCheckReport(report: EpubCheckReport): void {
  const url = URL.createObjectURL(new Blob([formatCheckReport(report)], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  const stem = report.filename.replace(/\.epub$/i, '');
  link.download = `${stem}${report.variant === 'authors' ? '-authors' : ''}-epubcheck.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

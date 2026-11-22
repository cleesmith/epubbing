'use client';

import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@/components/Dialog';
import { useEnv } from '@/context/EnvContext';
import type { Book } from '@/types/book';
import { prepareEpubExport, epubVariantLabel } from '@/services/epubExport';
import {
  checkEpub, checkCounts, checkOutcome, downloadCheckReport, messageLocation, type EpubCheckReport,
} from '@/services/epubCheck';

// Mount only while open: neither reports nor run history survive closing.
export default function EpubCheckModal({ book, onClose }: { book: Book; onClose: () => void }) {
  const { envConfig } = useEnv();
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('Ready to check.');
  const [detail, setDetail] = useState('');
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [report, setReport] = useState<EpubCheckReport | null>(null);
  const active = useRef<AbortController | null>(null);
  const started = useRef(0);

  useEffect(() => () => { active.current?.abort(); active.current = null; }, []);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setElapsed(performance.now() - started.current), 250);
    return () => clearInterval(timer);
  }, [running]);

  const cancel = () => {
    active.current?.abort();
    active.current = null;
    setElapsed(performance.now() - started.current);
    setRunning(false);
    setDetail('');
    setStatus('Check cancelled.');
  };

  const close = () => {
    active.current?.abort();
    active.current = null;
    onClose();
  };

  const start = async () => {
    if (active.current) return;
    const controller = new AbortController();
    active.current = controller;
    const current = () => active.current === controller && !controller.signal.aborted;
    const progress = (message: string, resource = '') => {
      if (current()) { setStatus(message); setDetail(resource); }
    };
    started.current = performance.now();
    setElapsed(0);
    setReport(null);
    setError('');
    setRunning(true);
    progress('Preparing your Booksellers EPUB…');
    try {
      const service = await envConfig.getAppService();
      controller.signal.throwIfAborted();
      const { blob, filename } = await prepareEpubExport(service, book, 'booksellers', {
        signal: controller.signal, onProgress: progress,
      });
      const result = await checkEpub(blob, filename, { signal: controller.signal, onProgress: progress });
      if (!current()) return;
      const elapsedMs = performance.now() - started.current;
      setReport({ title: book.title, variant: 'booksellers', filename, result, elapsedMs, checkedAt: new Date().toISOString() });
      setElapsed(elapsedMs);
      setStatus(checkOutcome(result));
      setDetail('');
    } catch (reason) {
      if (!current()) return;
      setStatus('The check could not finish.');
      setError(reason instanceof Error ? reason.message : 'Please try again.');
      setDetail('');
      setElapsed(performance.now() - started.current);
    } finally {
      if (current()) { active.current = null; setRunning(false); }
    }
  };

  const counts = report ? checkCounts(report.result) : null;
  const messages = report?.result.messages.filter(message => message.severity !== 'SUPPRESSED') ?? [];
  const hasErrors = !!counts && (counts.fatals + counts.errors > 0 || !report?.result.valid);

  return (
    <Dialog
      title='Check EPUB'
      isOpen
      onClose={close}
      boxClassName='sm:!w-[760px] sm:!max-w-[90vw] sm:!h-auto sm:!max-h-[90vh]'
      contentClassName='!px-6 !py-3'
    >
      <p className='mb-1 break-words text-lg font-semibold'>{book.title}</p>
      <p className='mb-4 text-sm text-base-content/70'>Checks the Booksellers EPUB prepared from this book.</p>
      <div className='mb-4 rounded-lg border border-base-300 bg-base-200/50 p-4'>
        <p role='status' aria-live='polite' className='font-medium'>{status}</p>
        {detail && <p className='mt-2 break-all text-sm text-base-content/70'>{detail}</p>}
        {(running || elapsed > 0) && <p className='mt-2 text-sm text-base-content/70'>Elapsed time: {(elapsed / 1000).toFixed(1)} seconds</p>}
      </div>
      {error && <p role='alert' className='mb-4 break-words text-sm text-error'>{error}</p>}
      {report && counts && (
        <section aria-label='Check results' className='mb-4'>
          <p className='mb-3 text-sm text-base-content/70'>Checked: {epubVariantLabel(report.variant)} · EPUBCheck {report.result.version}</p>
          <div className='mb-4 grid grid-cols-3 gap-2 rounded-lg border border-base-300 p-3 text-center text-sm'>
            <div><strong className={hasErrors ? 'text-error' : ''}>{counts.fatals + counts.errors}</strong> Errors</div>
            <div><strong>{counts.warnings}</strong> Warnings</div>
            <div><strong>{counts.infos}</strong> Information</div>
          </div>
          <ul className='space-y-3'>
            {messages.slice(0, 200).map((message, index) => (
              <li key={index} className='rounded-lg border border-base-300 p-3 text-sm'>
                <p className='mb-1 font-semibold'>{message.severity === 'FATAL' ? 'Fatal error' : message.severity.toLowerCase().replace(/^./, letter => letter.toUpperCase())} · {message.id}</p>
                <p className='whitespace-pre-wrap break-words'>{message.message}</p>
                {messageLocation(message) && <p className='mt-2 break-all text-xs text-base-content/70'>{messageLocation(message)}</p>}
                {message.suggestion && <p className='mt-2 whitespace-pre-wrap break-words'>{message.suggestion}</p>}
              </li>
            ))}
          </ul>
          {messages.length > 200 && <p className='mt-3 text-sm'>Showing the first 200 messages. Download the report for all {messages.length} messages.</p>}
          {!report.result.valid && messages.length === 0 && <pre className='whitespace-pre-wrap break-words text-sm'>{report.result.stdout}\n{report.result.stderr}</pre>}
        </section>
      )}
      <div className='sticky bottom-0 flex flex-wrap items-center gap-2 bg-base-100 py-3'>
        {running ? <button type='button' className='btn btn-outline btn-sm' onClick={cancel}>Cancel</button> :
          <button type='button' className='btn btn-primary btn-sm' onClick={() => void start()}>{report ? 'Check again' : 'Check EPUB'}</button>}
        {report && <button type='button' className='btn btn-outline btn-sm' onClick={() => downloadCheckReport(report)}>Download report</button>}
        <button type='button' className='btn btn-ghost btn-sm ml-auto' onClick={close}>Close</button>
      </div>
      <p className='text-xs text-base-content/60'>Results are cleared when you close this window.</p>
    </Dialog>
  );
}

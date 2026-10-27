'use client';

import React, { useEffect, useState, useRef } from 'react';
import JSZip from 'jszip';
import { pdf, type PdfProgress } from 'book-pdf';
import { Book } from '@/types/book';
import { BookMetadata } from '@/libs/document';
import { formatPublisher, getLocalBookFilename } from '@/utils/book';
import { useEnv } from '@/context/EnvContext';
import { createPdfProofUrl } from '@/lib/pdf-proof-url';
import { rememberPdfPageCount } from '@/lib/pdf-proof-page-count';
import { collectPdfFontUsage, type PdfFontUsage } from '@/lib/pdf-proof-fonts';
import {
  getSpineItems, extractChapters, extractCopyrightHtml, resolveTitlePageText,
  BookDocument, resetElementKeyCounter, type PdfOptions,
} from '@/lib/epub-to-pdf';

interface PdfModalProps {
  book: Book;
  bookMeta: BookMetadata | null;
  isOpen: boolean;
  onClose: () => void;
  includeToc: boolean;
  includeChapterHeadings: boolean;
}

type Proof = ReturnType<typeof createPdfProofUrl> & { pages: number; version: string; fontUsage: PdfFontUsage[] };

const PdfModal: React.FC<PdfModalProps> = ({ book, bookMeta, isOpen, onClose, includeToc, includeChapterHeadings }) => {
  const { envConfig } = useEnv();
  const [phase, setPhase] = useState<'loading' | 'ready' | 'error'>('loading');
  const [message, setMessage] = useState('Preparing your PDF proof…');
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [bookInfo, setBookInfo] = useState('');
  const [section, setSection] = useState('');
  const [startedAt, setStartedAt] = useState(0);
  const [error, setError] = useState('');
  const [proof, setProof] = useState<Proof | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const closeRef = useRef(onClose); closeRef.current = onClose;
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController(); abortRef.current = controller;
    let created: Proof | null = null;
    let sectionNames: string[] = [];
    const cancelled = () => controller.signal.aborted;
    const pause = async () => {
      await new Promise<void>(resolve => setTimeout(resolve, 0));
      if (cancelled()) throw new Error('Cancelled');
    };
    const onProgress = ({ stage, completed, total }: PdfProgress) => {
      if (cancelled()) return;
      const labels = {
        layout: `Book sections laid out: ${completed} of ${total}`,
        paginate: `Arranging pages… ${completed} pages so far`,
        finalize: `Numbering page ${completed} of ${total}…`,
        render: `Writing PDF page ${completed} of ${total}…`,
      };
      setMessage(labels[stage]);
      setStep(stage === 'layout' ? 1 : stage === 'paginate' ? 2 : stage === 'finalize' ? 3 : 4);
      setSection(stage === 'layout' ? sectionNames[Math.min(completed, sectionNames.length - 1)] || '' : '');
    };
    const run = async () => {
      setPhase('loading'); setProof(null); setCopyStatus('idle'); setError(''); setStep(0); setElapsed(0);
      setBookInfo(''); setSection(''); setStartedAt(Date.now());
      setMessage('Opening your EPUB…');
      try {
        await pause();
        const service = await envConfig.getAppService();
        const file = await service.openFile(getLocalBookFilename(book), 'Books');
        const zip = await JSZip.loadAsync(await file.arrayBuffer());
        await pause();
        const spine = await getSpineItems(zip);
        const chapters = await extractChapters(zip, spine, async (completed, total) => {
          setMessage(`Reading book content ${completed + 1} of ${total}…`);
          await pause();
        });
        if (!chapters.length) throw new Error('No chapter content found in EPUB.');
        const images = chapters.reduce((count, chapter) => count + (chapter.html.match(/<img\b/gi)?.length || 0), 0);
        setBookInfo(`${chapters.length} chapters · ${images} illustrations · 6 × 9 inches`);
        const copyrightHtml = await extractCopyrightHtml(zip, spine);
        const titlePage = await resolveTitlePageText(zip, spine, {
          title: book.title || 'Untitled', subtitle: bookMeta?.subtitle,
          publisher: bookMeta?.publisher ? formatPublisher(bookMeta.publisher) : undefined,
        });
        await pause();
        resetElementKeyCounter();
        const options: PdfOptions = {
          ...titlePage, author: book.author || 'Unknown', copyrightHtml: copyrightHtml ?? undefined,
          includeToc, includeChapterHeadings, sectionPages: true,
        };
        sectionNames = ['Title page', ...(copyrightHtml ? ['Copyright page'] : []),
          ...(includeToc ? ['Contents'] : []), ...chapters.map(chapter => chapter.title)];
        let pages = 0;
        let layout: unknown;
        const blob = await pdf(<BookDocument chapters={chapters} options={options}
          onRender={result => {
            layout = result._INTERNAL__LAYOUT__DATA_;
            pages = result._INTERNAL__LAYOUT__DATA_.children.length;
          }} />)
          .toBlob({ signal: controller.signal, onProgress });
        if (cancelled()) return;
        setMessage('Checking the PDF format and embedded font details…');
        await pause();
        const header = await blob.slice(0, 16).text();
        const version = /^%PDF-(\d+\.\d+)/.exec(header)?.[1] ?? '';
        const fontUsage = await collectPdfFontUsage(layout, pause);
        if (cancelled()) return;
        created = { ...createPdfProofUrl(blob), pages, version, fontUsage };
        rememberPdfPageCount(book, pages);
        setProof(created); setPhase('ready');
      } catch (err) {
        if (cancelled()) return;
        setError(err instanceof Error ? err.message : 'Could not create the PDF.');
        setPhase('error');
      }
    };
    void run();
    return () => { controller.abort(); created?.release(); };
  }, [isOpen, book, bookMeta, envConfig, includeToc, includeChapterHeadings]);

  const close = () => { abortRef.current?.abort(); closeRef.current(); };
  const copyPageCount = async () => {
    if (!proof) return;
    try {
      await navigator.clipboard.writeText(String(proof.pages));
      setCopyStatus('copied');
    } catch { setCopyStatus('error'); }
  };
  useEffect(() => {
    if (copyStatus !== 'copied') return;
    const timer = window.setTimeout(() => setCopyStatus('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);
  useEffect(() => {
    if (!isOpen || phase !== 'loading' || !startedAt) return;
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [isOpen, phase, startedAt]);
  useEffect(() => {
    if (!isOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { abortRef.current?.abort(); closeRef.current(); }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-base-100 py-6' role='dialog' aria-modal='true' aria-labelledby='pdf-proof-heading'>
      <div className='my-auto w-full max-w-3xl select-text px-6 text-center' style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>
        <h3 id='pdf-proof-heading' className='text-base-content mb-3 text-lg font-semibold'>
          {phase === 'ready' ? 'Your PDF proof is ready' : phase === 'error' ? 'Could not create the PDF' : 'Preparing your PDF proof'}
        </h3>
        {phase === 'loading' && <>
          <p className='text-base-content/70 mb-2 text-sm'>{book.title}</p>
          {bookInfo && <p className='text-base-content/60 mb-4 text-sm'>{bookInfo}</p>}
          <p role='status' className='text-base-content mb-2 font-medium'>{message}</p>
          {section && <p className='text-base-content/70 mb-2 text-sm'>{section}</p>}
          <p className='text-base-content/60 mb-4 text-sm'>Time elapsed: {Math.floor(elapsed / 60)}m {elapsed % 60}s</p>
          <ol className='text-base-content/70 mb-5 space-y-2 text-left text-sm' aria-label='PDF preparation steps'>
            {['Read chapters and illustrations', 'Lay out text and illustrations', 'Arrange the pages', 'Add page numbers and running headings', 'Write the downloadable PDF'].map((label, index) => (
              <li key={label} aria-current={index === step ? 'step' : undefined}>
                {index < step ? '✓ ' : index === step ? '→ ' : '○ '}{label}
              </li>
            ))}
          </ol>
          <p className='text-base-content/60 mb-5 text-sm'>Large books take longer. You can cancel while the book is being prepared.</p>
        </>}
        {phase === 'ready' && proof && <>
          <p className='text-base-content/70 mb-2'>Total pages: {proof.pages} for a 6 × 9 inch paperback</p>
          <button type='button' className='btn btn-outline btn-sm mb-4' aria-live='polite' onClick={() => { void copyPageCount(); }}>
            {copyStatus === 'copied' ? 'Copied: ' + proof.pages : 'Copy page count: ' + proof.pages}
          </button>
          {copyStatus === 'error' && <p role='alert' className='text-error mb-4 text-sm'>Could not copy. Select the page count above and copy it.</p>}
          <p className='text-base-content/70 mb-4 text-sm'>PDF format: Standard PDF{proof.version ? ` ${proof.version}` : ''}</p>
          {proof.fontUsage.length > 0 && <div className='text-base-content/70 mb-5 text-left text-sm'>
            <p className='text-base-content mb-2 text-center font-medium'>Embedded font styles and sizes</p>
            <table className='w-full' aria-label='Embedded font styles and sizes'>
              <thead>
                <tr className='border-base-content/20 border-b'>
                  <th scope='col' className='py-1 pr-3 font-medium'>Font style</th>
                  <th scope='col' className='py-1 font-medium'>Sizes (pt)</th>
                </tr>
              </thead>
              <tbody>{proof.fontUsage.map(font => <tr key={font.postscriptName}>
                <td className='py-1 pr-3 align-top'>{font.name}</td>
                <td className='py-1 align-top'>{font.sizes.join(', ')}</td>
              </tr>)}</tbody>
            </table>
          </div>}
          <a className='btn btn-primary mb-4' href={proof.url} target='_blank' rel='noreferrer' onClick={event => {
            event.preventDefault();
            setError(proof.open() ? '' : 'Allow a new tab for EverythingEbooks, then click the link again.');
          }}>Open PDF proof in a new tab</a>
          <p className='text-base-content/60 mb-2 text-sm'>Preview your PDF, then use its download button to save a copy.</p>
          <p className='text-base-content/60 mb-4 text-sm'>In Safari, you can also open it in Preview and save it there.</p>
          <p className='text-base-content/60 mb-4 text-sm'>This page count is also available in this ebook’s paperback cover calculator.</p>
        </>}
        {error && <p role='alert' className='text-error mb-5 text-sm'>{error}</p>}
        <button className='btn btn-ghost btn-sm' onClick={close}>{phase === 'loading' ? 'Cancel' : 'Close'}</button>
      </div>
    </div>
  );
};

export default PdfModal;

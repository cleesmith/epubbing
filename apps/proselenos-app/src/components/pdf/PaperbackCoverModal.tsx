'use client';

import React, { useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';
import SimpleShelfIcon from '@/components/SimpleShelfIcon';
import type { Book } from '@/types/book';
import type { BookMetadata } from '@/libs/document';
import { useEnv } from '@/context/EnvContext';
import { getLocalBookFilename } from '@/utils/book';
import { getSpineItems, resolveTitlePageText } from '@/lib/epub-to-pdf';
import { BACK_COVER_LIMIT, COVER_PAGE_MIN, COVER_PAGE_MAX, characterCount, coverDimensions, limitBackText, paperbackPublishingNote, type PaperChoice } from '@/lib/paperback-cover';
import type { PaperbackCoverResult } from '@/lib/paperback-cover-browser';

interface PaperbackCoverModalProps {
  book: Book;
  bookMeta: BookMetadata | null;
  isOpen: boolean;
  onClose: () => void;
}

const PaperbackCoverModal: React.FC<PaperbackCoverModalProps> = ({ book, bookMeta, isOpen, onClose }) => {
  const { envConfig } = useEnv();
  const [pages, setPages] = useState('');
  const [paper, setPaper] = useState<PaperChoice>('bw-white');
  const [backText, setBackText] = useState('');
  const [calculated, setCalculated] = useState<ReturnType<typeof coverDimensions> | null>(null);
  const [validation, setValidation] = useState<{ value: string; error: string | null } | null>(null);
  const [phase, setPhase] = useState<'options' | 'working' | 'ready'>('options');
  const [error, setError] = useState('');
  const [result, setResult] = useState<(PaperbackCoverResult & { url: string }) | null>(null);
  const request = useRef(0);
  const downloadUrl = useRef<string | null>(null);
  const pageInput = useRef<HTMLInputElement>(null);
  const interiorType = paper.startsWith('bw-') ? 'bw' : paper;
  const filename = (book.title || 'Book').replace(/[<>:"/\\|?*]/g, '').slice(0, 120).trim() || 'Book';

  const clearDownload = () => {
    if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current);
    downloadUrl.current = null;
  };

  useEffect(() => {
    request.current++;
    clearDownload();
    setResult(null);
    setError('');
    setPhase('options');
    return () => { request.current++; clearDownload(); };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && phase === 'options') pageInput.current?.focus();
  }, [isOpen, phase]);

  useEffect(() => {
    if (!isOpen || !calculated || phase !== 'options') return;
    let active = true;
    import('book-pdf/cover').then(({ checkBackCoverText }) => {
      if (active) setValidation({ value: backText, error: checkBackCoverText(backText) });
    }).catch(() => {
      if (active) setValidation({ value: backText, error: 'The cover lettering could not be prepared. Close this dialog and try again.' });
    });
    return () => { active = false; };
  }, [isOpen, calculated, phase, backText]);

  if (!isOpen) return null;

  let dimensions: ReturnType<typeof coverDimensions> | null = null;
  let pageError = '';
  if (pages.trim()) {
    try {
      if (!/^\d+$/.test(pages.trim())) throw new Error('Enter a whole number of pages.');
      dimensions = coverDimensions(Number(pages), paper);
    } catch (failure) { pageError = failure instanceof Error ? failure.message : 'Check the page count.'; }
  }

  const close = () => {
    request.current++;
    clearDownload();
    onClose();
  };
  const changePaper = (choice: PaperChoice) => {
    setPaper(choice);
    setCalculated(null);
    setValidation(null);
    setError('');
  };
  const createCover = async () => {
    if (!calculated || phase === 'working' || !validation || validation.value !== backText || validation.error) return;
    const generation = ++request.current;
    const cancelled = () => generation !== request.current;
    setPhase('working');
    setError('');
    clearDownload();
    setResult(null);
    try {
      const appService = await envConfig.getAppService();
      const file = await appService.openFile(getLocalBookFilename(book), 'Books');
      if (cancelled()) return;
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      if (cancelled()) return;
      const spinePaths = await getSpineItems(zip);
      const titlePage = await resolveTitlePageText(zip, spinePaths, { title: book.title || 'Untitled', subtitle: bookMeta?.subtitle });
      if (cancelled()) return;
      const { generatePaperbackCover } = await import('@/lib/paperback-cover-browser');
      if (cancelled()) return;
      const cover = await generatePaperbackCover(zip, calculated.pdfPages, { paper, backText }, titlePage.title, book.author || 'Unknown', cancelled);
      if (cancelled()) return;
      const url = URL.createObjectURL(cover.blob);
      downloadUrl.current = url;
      setResult({ ...cover, url });
      setPhase('ready');
    } catch (failure) {
      if (cancelled()) return;
      setError(failure instanceof Error ? failure.message : 'The cover could not be created.');
      setPhase('options');
    }
  };

  return (
    <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4' onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
    }}>
      <div role='dialog' aria-modal='true' aria-label='Paperback cover calculator' className='bg-base-100 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-xl'>
        <h3 className='flex items-center gap-2 text-lg font-semibold'><SimpleShelfIcon /> Paperback cover calculator</h3>
        <p className='mt-2 text-sm text-base-content/70'>Create your 6×9 interior PDF first, then enter its total page count here.</p>
        <a className='link mt-2 inline-block text-sm' href='https://kdp.amazon.com/cover-calculator' target='_blank' rel='noreferrer'>Open KDP’s cover calculator</a>

        {phase === 'ready' && result ? (
          <div className='mt-5 space-y-4'>
            <p className='font-semibold'>Your paperback cover PDF is ready.</p>
            <p className='text-sm'>6 × 9 inches · {result.dimensions.pdfPages} interior pages</p>
            {result.warnings.length > 0 && <ul className='list-disc space-y-2 pl-5 text-sm'>{result.warnings.map(message => <li key={message}>{message}</li>)}</ul>}
            <div className='flex flex-wrap items-center gap-3'>
              <a className='btn btn-primary btn-sm' href={result.url} download={`${filename}-6x9-cover.pdf`}>Download cover PDF</a>
              <a className='link text-sm' href={result.url} target='_blank' rel='noreferrer'>View cover PDF</a>
            </div>
            <p className='text-sm text-base-content/70'>Use this cover with the PDF whose page count you entered. If that PDF changes, create a new cover using its new page count.</p>
            <div className='flex justify-end gap-2'>
              <button className='btn btn-ghost btn-sm' onClick={() => { clearDownload(); setResult(null); setPhase('options'); }}>Change cover details</button>
              <button className='btn btn-primary btn-sm' onClick={close}>Close</button>
            </div>
          </div>
        ) : (
          <form className='mt-5' noValidate onSubmit={event => { event.preventDefault(); void createCover(); }}>
            <fieldset disabled={phase === 'working'}>
              <legend className='mb-3 text-sm font-semibold'>Enter your book information</legend>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <label className='block text-sm'>Binding type
                  <input className='input input-bordered input-sm mt-1 w-full bg-base-200' value='Paperback' readOnly tabIndex={-1} />
                </label>
                <label className='block text-sm'>Interior type
                  <select className='select select-bordered select-sm mt-1 w-full' value={interiorType} onChange={event => changePaper(event.target.value === 'bw' ? 'bw-white' : event.target.value as PaperChoice)}>
                    <option value='bw'>Black &amp; white</option><option value='standard-color'>Standard color</option><option value='premium-color'>Premium color</option>
                  </select>
                </label>
                <label className='block text-sm'>Paper type
                  <select className='select select-bordered select-sm mt-1 w-full' value={paper === 'bw-cream' ? 'cream' : 'white'} disabled={interiorType !== 'bw'} onChange={event => changePaper(event.target.value === 'cream' ? 'bw-cream' : 'bw-white')}>
                    <option value='white'>White paper</option>{interiorType === 'bw' && <option value='cream'>Cream paper</option>}
                  </select>
                </label>
                <label className='block text-sm'>Reading direction
                  <input className='input input-bordered input-sm mt-1 w-full bg-base-200' value='Left to right' readOnly tabIndex={-1} />
                </label>
                <label className='block text-sm'>Measurement units
                  <input className='input input-bordered input-sm mt-1 w-full bg-base-200' value='Inches' readOnly tabIndex={-1} />
                </label>
                <label className='block text-sm'>Interior trim size
                  <input className='input input-bordered input-sm mt-1 w-full bg-base-200' value='6 × 9 inches' readOnly tabIndex={-1} />
                </label>
                <label className='block text-sm sm:col-span-2'>Page count
                  <input ref={pageInput} type='number' min={COVER_PAGE_MIN} max={COVER_PAGE_MAX} step='1' inputMode='numeric' className='input input-bordered input-sm mt-1 w-full' value={pages}
                    aria-describedby='cover-page-help' aria-invalid={!!pageError} onChange={event => { setPages(event.target.value); setCalculated(null); setValidation(null); setError(''); }} />
                </label>
              </div>
              <p id='cover-page-help' className='mt-2 text-xs text-base-content/70'>Page count must be between {COVER_PAGE_MIN}–{COVER_PAGE_MAX}. Use the PDF viewer’s total, including title pages and blank pages, rather than the last printed page number.</p>
              {pageError && <p role='alert' className='mt-2 text-sm text-error'>{pageError}</p>}
              {dimensions && paperbackPublishingNote(dimensions.pdfPages, paper) && <p className='mt-2 text-sm text-base-content/70'>{paperbackPublishingNote(dimensions.pdfPages, paper)} <a className='link' href='https://kdp.amazon.com/en_US/help/topic/GVBQ3CMEQW3W2VL6#trimsize' target='_blank' rel='noreferrer'>KDP page-count limits</a></p>}
              <button type='button' className='btn btn-outline btn-sm mt-3' disabled={!dimensions} onClick={() => { setCalculated(dimensions); setValidation(null); setError(''); }}>Calculate dimensions</button>

              {calculated && (
                <div className='mt-5 border-t border-base-300 pt-4'>
                  <table className='mb-4 w-full text-sm' aria-label='Calculated cover dimensions'>
                    <tbody>
                      <tr><th className='py-1 text-left font-medium' scope='row'>Full cover, including bleed</th><td className='text-right'>{calculated.width.toFixed(4)} × {calculated.height.toFixed(4)} inches</td></tr>
                      <tr><th className='py-1 text-left font-medium' scope='row'>Spine width</th><td className='text-right'>{calculated.spine.toFixed(4)} inches</td></tr>
                      <tr><th className='py-1 text-left font-medium' scope='row'>Pages for printing</th><td className='text-right'>{calculated.printPages}</td></tr>
                    </tbody>
                  </table>
                  {calculated.printPages !== calculated.pdfPages && <p className='mb-3 text-xs text-base-content/70'>The cover allows for {calculated.printPages} pages because KDP rounds up to an even page count.</p>}
                  <p className='mb-3 text-sm text-base-content/70'>Uses this EPUB’s cover. The front, back, spine lettering, and space for KDP’s barcode are arranged automatically.</p>
                  <label className='block text-sm'>Back-cover text
                    <textarea className='textarea textarea-bordered mt-1 h-32 w-full text-base' value={backText} aria-describedby='cover-back-count'
                      onChange={event => { setBackText(limitBackText(event.target.value)); setValidation(null); }} />
                  </label>
                  <p id='cover-back-count' className='mt-1 text-xs text-base-content/70'>{characterCount(backText).toLocaleString()} / {BACK_COVER_LIMIT.toLocaleString()} characters, including spaces. Printed in 14-point EB Garamond.</p>
                  {validation?.error && <p role='alert' className='mt-2 text-sm text-error'>{validation.error}</p>}
                  <p className='mt-3 text-xs text-base-content/70'>Choose these same printing and paper options when publishing on KDP.</p>
                </div>
              )}
            </fieldset>
            {error && <p role='alert' className='mt-4 text-sm text-error'>{error}</p>}
            <div className='mt-5 flex items-center justify-end gap-2'>
              {phase === 'working' && <span role='status' className='mr-auto flex items-center gap-2 text-sm'><span className='loading loading-spinner loading-sm' />Creating your cover…</span>}
              <button type='button' className='btn btn-ghost btn-sm' onClick={close}>Cancel</button>
              {calculated && <button type='submit' className='btn btn-primary btn-sm' disabled={phase === 'working' || !validation || validation.value !== backText || !!validation.error}>Create cover PDF</button>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaperbackCoverModal;

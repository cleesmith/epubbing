'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';
import SimpleShelfIcon from '@/components/SimpleShelfIcon';
import type { Book } from '@/types/book';
import type { AppService } from '@/types/system';
import type { BookMetadata } from '@/libs/document';
import { useEnv } from '@/context/EnvContext';
import { getLocalBookFilename } from '@/utils/book';
import { appPath } from '@/utils/app-path';
import { loadPaperbackSetup } from '@/lib/paperback-epub';
import { getSpineItems, resolveTitlePageText } from '@/lib/epub-to-pdf';
import { COVER_BACKGROUND, coverBackground, coverTextColor, BACK_COVER_LIMIT, COVER_PAGE_MIN, COVER_PAGE_MAX, characterCount, coverDimensions, limitBackText, type BackCoverMode, type FrontFit, type PaperChoice } from '@/lib/paperback-cover';
import { extractEpubCover } from '@/lib/epub-cover';
import type { PaperbackCoverResult, PreparedFrontImage } from '@/lib/paperback-cover-browser';
import PaperbackFrontImage from './PaperbackFrontImage';
import PaperbackBackImage from './PaperbackBackImage';
import { getPdfPageCount } from '@/lib/pdf-proof-page-count';
import { createCoverTemplatePng, downloadCoverTemplate } from '@/lib/paperback-cover-template';
import { paperbackFrontFile, savePaperbackFront, removePaperbackFront, savePaperbackSettings, selectedPaperbackSettings, type SavedPaperbackBack, type SavedPaperbackFront, type SavedPaperbackSettings } from '@/services/paperbackCoverStorage';

interface PaperbackCoverModalProps {
  book: Book;
  bookMeta: BookMetadata | null;
  isOpen: boolean;
  onClose: () => void;
}

const PaperbackCoverModal: React.FC<PaperbackCoverModalProps> = ({ book, bookMeta, isOpen, onClose }) => {
  const { envConfig } = useEnv();
  const [pages, setPages] = useState('');
  const [pdfPages, setPdfPages] = useState<number | null>(null);
  const [paper, setPaper] = useState<PaperChoice>('bw-white');
  const [backText, setBackText] = useState('');
  const [backMode, setBackMode] = useState<BackCoverMode>('text');
  const [backRecord, setBackRecord] = useState<SavedPaperbackBack | null>(null);
  const [backPreparing, setBackPreparing] = useState(false);
  const [backError, setBackError] = useState('');
  const backRequest = useRef(0);
  const [backgroundColor, setBackgroundColor] = useState(COVER_BACKGROUND);
  const textColor = coverTextColor(backgroundColor);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [frontFit, setFrontFit] = useState<FrontFit>('fill');
  const [front, setFront] = useState<PreparedFrontImage | null>(null);
  const [frontRecord, setFrontRecord] = useState<SavedPaperbackFront | null>(null);
  const [frontLoaded, setFrontLoaded] = useState(false);
  const [frontSaving, setFrontSaving] = useState(false);
  const [frontError, setFrontError] = useState('');
  const frontRequest = useRef(0);
  const [frontRevision, setFrontRevision] = useState(0);
  const [detailsBook, setDetailsBook] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveError, setSaveError] = useState('');
  const [confirmClose, setConfirmClose] = useState(false);
  const [hasSavedDetails, setHasSavedDetails] = useState(false);
  const [reload, setReload] = useState(0);
  const detailsSession = useRef(0);
  const savedSettings = useRef('');
  const savedImage = useRef<SavedPaperbackFront | null>(null);
  const savedImageStored = useRef(false);
  const serviceRef = useRef<AppService | null>(null);
  const [calculated, setCalculated] = useState<ReturnType<typeof coverDimensions> | null>(null);
  const [templateReady, setTemplateReady] = useState(false);
  const [templateBusy, setTemplateBusy] = useState(false);
  const templateRequest = useRef(0);
  const invalidateTemplate = useCallback(() => { templateRequest.current++; }, []);
  useEffect(() => {
    invalidateTemplate(); setTemplateBusy(false);
    return invalidateTemplate;
  }, [book.hash, isOpen, calculated, backgroundColor, invalidateTemplate]);
  const [validation, setValidation] = useState<{ value: string; error: string | null } | null>(null);
  const [phase, setPhase] = useState<'options' | 'working' | 'ready'>('options');
  const [error, setError] = useState('');
  const [result, setResult] = useState<(PaperbackCoverResult & { url: string }) | null>(null);
  const request = useRef(0);
  const downloadUrl = useRef<string | null>(null);
  const pageInput = useRef<HTMLInputElement>(null);
  const interiorType = paper.startsWith('bw-') ? 'bw' : paper;
  const closing = saveStatus === 'saving';
  const filename = (book.title || 'Book').replace(/[<>:"/\\|?*]/g, '').slice(0, 120).trim() || 'Book';
  const epubFilename = getLocalBookFilename(book);
  const loadFrontFromEpub = useCallback(async () => {
    const appService = await envConfig.getAppService();
    const file = await appService.openFile(epubFilename, 'Books');
    return extractEpubCover(await JSZip.loadAsync(await file.arrayBuffer()));
  }, [envConfig, epubFilename]);

  const invalidateDetails = useCallback(() => {
    detailsSession.current++;
    frontRequest.current++; backRequest.current++;
  }, []);

  useEffect(() => {
    const id = ++detailsSession.current;
    frontRequest.current++; backRequest.current++;
    setDetailsBook(null); serviceRef.current = null; setTemplateReady(false);
    setPages(''); setPdfPages(null); setPaper('bw-white'); setBackText(''); setBackgroundColor(COVER_BACKGROUND); setCalculated(null); setValidation(null);
    setSaveStatus('idle'); setSaveError(''); setConfirmClose(false); setHasSavedDetails(false);
    savedSettings.current = ''; savedImage.current = null; savedImageStored.current = false;
    setFrontFile(null); setFrontFit('fill'); setFront(null); setFrontRecord(null);
    setFrontLoaded(false); setFrontSaving(false); setFrontError('');
    setBackMode('text'); setBackRecord(null); setBackPreparing(false); setBackError('');
    if (!isOpen) return;
    void (async () => {
      const service = await envConfig.getAppService();
      const { front: saved, settings: details, frontStored, imageError } = await loadPaperbackSetup(service, book);
      if (detailsSession.current !== id) return;
      const restored = selectedPaperbackSettings(details ?? { version: 1, pages: '', paper: 'bw-white', backText: '', backgroundColor: COVER_BACKGROUND, frontFit: saved?.fit ?? 'fill' });
      const latestPdfPages = getPdfPageCount({ hash: book.hash, updatedAt: book.updatedAt });
      const initialPages = restored.pages.trim() ? restored.pages : latestPdfPages?.toString() ?? restored.pages;
      setPdfPages(latestPdfPages);
      const imageRecord = saved ? { ...saved, fit: restored.frontFit } : null;
      const imageFile = imageRecord ? paperbackFrontFile(imageRecord) : null;
      serviceRef.current = service;
      savedSettings.current = JSON.stringify(restored); savedImage.current = imageRecord; savedImageStored.current = frontStored;
      setPages(initialPages); setPaper(restored.paper); setBackText(restored.backText); setBackgroundColor(restored.backgroundColor); setFrontFit(restored.frontFit);
      setFrontFile(imageFile); setFrontRecord(imageRecord); setFrontError(imageError); setFrontLoaded(true);
      setBackMode(restored.backMode ?? 'text'); setBackRecord(restored.backImage ?? null);
      try { if (/^\d+$/.test(initialPages.trim())) setCalculated(coverDimensions(Number(initialPages), restored.paper)); }
      catch { /* Keep a saved draft editable even when its count is incomplete or invalid. */ }
      setSaveStatus(details ? 'saved' : 'idle'); setHasSavedDetails(!!details); setDetailsBook(book.hash);
    })().catch(() => {
      if (detailsSession.current !== id) return;
      setSaveStatus('error'); setSaveError('Your saved cover details could not be loaded. Click Retry to try again.');
    });
    return invalidateDetails;
  }, [book.hash, book.updatedAt, isOpen, envConfig, reload, invalidateDetails]);

  const currentSettings = (): SavedPaperbackSettings => selectedPaperbackSettings({
    version: 1, pages, paper, backText, backgroundColor, frontFit, backMode, backImage: backRecord,
  });
  const storeDetails = async () => {
    const service = serviceRef.current;
    if (!service || saveStatus === 'saving' || frontSaving || backPreparing) return;
    const session = detailsSession.current;
    const details = currentSettings();
    const previousImage = savedImage.current;
    const previousImageStored = savedImageStored.current;
    const imageChanged = frontRecord !== previousImage || (!!frontRecord && !previousImageStored);
    let imageWritten = false;
    setSaveStatus('saving'); setSaveError('');
    try {
      if (imageChanged) {
        if (frontRecord) await savePaperbackFront(service, { hash: book.hash }, frontRecord);
        else if (previousImageStored) await removePaperbackFront(service, { hash: book.hash });
        imageWritten = !!frontRecord || previousImageStored;
      }
      await savePaperbackSettings(service, { hash: book.hash }, details);
      if (detailsSession.current === session) {
        savedSettings.current = JSON.stringify(details); savedImage.current = frontRecord; savedImageStored.current = !!frontRecord;
        setSaveStatus('saved'); setHasSavedDetails(true); setConfirmClose(false);
      }
    } catch (failure) {
      let rollbackFailed = false;
      if (imageWritten) {
        try {
          if (previousImage && previousImageStored) await savePaperbackFront(service, { hash: book.hash }, previousImage);
          else await removePaperbackFront(service, { hash: book.hash });
        } catch { rollbackFailed = true; }
      }
      if (detailsSession.current === session) {
        setSaveStatus('error');
        setSaveError(rollbackFailed ? 'Not all cover details were saved, and the previous image could not be restored. Your changes are still here; click Save to retry.' : `Your cover details were not saved. ${failure instanceof Error ? failure.message : 'Click Save to retry.'}`);
      }
    }
  };

  const chooseFrontFile = async (file: File | null) => {
    const id = ++frontRequest.current;
    setFront(null); setFrontSaving(true); setFrontError('');
    try {
      if (file) {
        const { normalizeFrontUpload } = await import('@/lib/paperback-cover-browser');
        const image = await normalizeFrontUpload(file, backgroundColor);
        if (frontRequest.current !== id) return;
        const saved: SavedPaperbackFront = { version: 1, ...image, fit: frontFit };
        setFrontRecord(saved); setFrontFile(paperbackFrontFile(saved));
      } else {
        setFrontRecord(null); setFrontFile(null);
      }
    } catch (failure) {
      if (frontRequest.current === id) {
        setFrontError(`The paperback image could not be prepared. ${failure instanceof Error ? failure.message : 'Try again.'}`);
        setFrontRevision(value => value + 1);
      }
    } finally { if (frontRequest.current === id) setFrontSaving(false); }
  };

  const chooseBackFile = async (file: File | null) => {
    const id = ++backRequest.current;
    setBackError('');
    if (!file) { setBackRecord(null); setBackPreparing(false); return; }
    setBackPreparing(true);
    try {
      const { normalizeBackUpload } = await import('@/lib/paperback-cover-browser');
      const image = await normalizeBackUpload(file);
      if (backRequest.current === id) setBackRecord({ version: 1, ...image });
    } catch (failure) {
      if (backRequest.current === id) setBackError(failure instanceof Error ? failure.message : 'This image could not be opened. Choose another JPG or PNG.');
    } finally { if (backRequest.current === id) setBackPreparing(false); }
  };

  const chooseFrontFit = (fit: FrontFit) => {
    setFront(null); setFrontFit(fit); setFrontError('');
    setFrontRecord(current => current ? { ...current, fit } : null);
  };

  const clearDownload = useCallback(() => {
    if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current);
    downloadUrl.current = null;
  }, []);

  const cancelGeneration = useCallback(() => {
    request.current++;
    clearDownload();
  }, [clearDownload]);

  useEffect(() => {
    cancelGeneration();
    setResult(null);
    setError('');
    setPhase('options');
    return cancelGeneration;
  }, [isOpen, book.hash, cancelGeneration]);

  useEffect(() => {
    if (isOpen && phase === 'options' && detailsBook === book.hash) pageInput.current?.focus();
  }, [isOpen, phase, detailsBook, book.hash]);

  useEffect(() => {
    if (!isOpen || !calculated || phase !== 'options' || backMode !== 'text') return;
    let active = true;
    import('book-pdf/cover').then(({ checkBackCoverText }) => {
      if (active) setValidation({ value: backText, error: checkBackCoverText(backText) });
    }).catch(() => {
      if (active) setValidation({ value: backText, error: 'The cover lettering could not be prepared. Close this dialog and try again.' });
    });
    return () => { active = false; };
  }, [isOpen, calculated, phase, backText, backMode]);

  if (!isOpen) return null;

  let dimensions: ReturnType<typeof coverDimensions> | null = null;
  let pageError = '';
  if (pages.trim()) {
    try {
      if (!/^\d+$/.test(pages.trim())) throw new Error('Enter a whole number of pages.');
      dimensions = coverDimensions(Number(pages), paper);
    } catch (failure) { pageError = failure instanceof Error ? failure.message : 'Check the page count.'; }
  }

  const dirty = detailsBook === book.hash && (JSON.stringify(currentSettings()) !== savedSettings.current || frontRecord !== savedImage.current);
  const finishClose = () => {
    request.current++; frontRequest.current++; backRequest.current++; clearDownload(); onClose();
  };
  const close = () => {
    if (frontSaving || backPreparing || saveStatus === 'saving') return;
    request.current++;
    if (dirty) { setConfirmClose(true); setPhase('options'); return; }
    finishClose();
  };
  const changePaper = (choice: PaperChoice) => {
    setPaper(choice);
    setCalculated(null);
    setValidation(null);
    setError('');
  };
  const downloadTemplate = async () => {
    if (!calculated || !templateReady || templateBusy) return;
    const id = ++templateRequest.current;
    setTemplateBusy(true); setError('');
    try {
      const blob = await createCoverTemplatePng(calculated.pdfPages, paper, backgroundColor);
      if (id !== templateRequest.current) return;
      downloadCoverTemplate(blob, filename + '-6x9-' + calculated.printPages + '-' + paper + '-template.png');
    } catch (failure) {
      if (id === templateRequest.current) setError(failure instanceof Error ? failure.message : 'The template could not be created.');
    } finally {
      if (id === templateRequest.current) setTemplateBusy(false);
    }
  };
  const backReady = backMode === 'image' ? !!backRecord && !backPreparing : !!validation && validation.value === backText && !validation.error;
  const createCover = async () => {
    if (detailsBook !== book.hash || closing || !calculated || !front || frontSaving || backPreparing || phase === 'working' || !backReady) return;
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
      const cover = await generatePaperbackCover(zip, calculated.pdfPages, { paper, backText: backMode === 'text' ? backText : '', backgroundColor, backMode, backImage: backMode === 'image' ? backRecord?.jpeg : undefined }, titlePage.title, book.author || 'Unknown', cancelled, front);
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
    <div className='fixed inset-0 z-[60] overflow-hidden bg-base-100' onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); void close(); }
    }}>
      <style>{`@font-face {
        font-family: 'PaperbackCoverEBGaramond';
        src: url('${appPath('/fonts/EBGaramond-Regular.ttf')}') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: block;
      }`}</style>
      <div role='dialog' aria-modal='true' aria-label='Paperback cover calculator' className='bg-base-100 flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden'>
        <header className='shrink-0 border-b border-base-300 px-6 py-4'>
          <div className='flex items-baseline justify-between gap-6'>
            <div className='flex min-w-0 flex-1 flex-wrap items-baseline gap-x-6 gap-y-1'>
              <h3 className='flex shrink-0 items-center gap-2 text-lg font-semibold'><SimpleShelfIcon /> Paperback cover calculator</h3>
              <p className='text-sm text-base-content/70'>Create your 6×9 interior PDF first, then enter its total page count here.</p>
            </div>
          </div>
          <p className='mt-1 break-words text-sm text-base-content/70'>{book.title}</p>
        </header>

        {phase === 'ready' && result ? (
          <div className='min-h-0 flex-1 overflow-y-auto px-6 py-5'>
            <div className='mx-auto max-w-2xl space-y-4'>
              <p className='font-semibold'>Your paperback cover PDF is ready.</p>
              <p className='text-sm'>6 × 9 inches · {result.dimensions.pdfPages} interior pages</p>
              {result.warnings.length > 0 && <ul className='list-disc space-y-2 pl-5 text-sm'>{result.warnings.map(message => <li key={message}>{message}</li>)}</ul>}
              <div className='flex flex-wrap items-center gap-3'>
                <a className='btn btn-primary btn-sm' href={result.url} download={`${filename}-6x9-cover.pdf`}>Download cover PDF</a>
                <a className='link text-sm' href={result.url} target='_blank' rel='noreferrer'>View cover PDF</a>
              </div>
              <p className='text-sm text-base-content/70'>Use this cover with the PDF whose page count you entered. If that PDF changes, create a new cover using its new page count.</p>
              {saveError && <p role='alert' className='text-sm text-error'>{saveError}</p>}
              <div className='flex justify-end gap-2'>
                <button className='btn btn-outline btn-sm' disabled={closing || (!dirty && hasSavedDetails)} onClick={() => { void storeDetails(); }}>Save</button>
                <button className='btn btn-ghost btn-sm' disabled={closing} onClick={() => { clearDownload(); setResult(null); setPhase('options'); }}>Change cover details</button>
                <button className='btn btn-primary btn-sm' disabled={closing} onClick={() => { void close(); }}>{closing ? 'Saving…' : 'Close'}</button>
              </div>
            </div>
          </div>
        ) : (
          <form className='flex min-h-0 flex-1 flex-col' noValidate onSubmit={event => { event.preventDefault(); void createCover(); }}>
            <div className='min-h-0 flex-1 overflow-y-auto'>
              <fieldset className='min-w-0 px-6 py-4' disabled={phase === 'working' || closing || detailsBook !== book.hash}>
                <legend className='sr-only'>Paperback cover details</legend>
                <div className='grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6'>
                  <section aria-labelledby='cover-calculator-heading' className='min-w-0'>
                    <h4 id='cover-calculator-heading' className='mb-2 font-semibold'>Book and printing details</h4>
                    <dl className='mb-3 grid grid-cols-2 gap-x-4 gap-y-1 rounded bg-base-200 px-3 py-2 text-xs text-base-content/70'>
                      <div><dt className='inline font-medium'>Binding: </dt><dd className='inline'>Paperback</dd></div>
                      <div><dt className='inline font-medium'>Trim size: </dt><dd className='inline'>6 × 9 inches</dd></div>
                      <div><dt className='inline font-medium'>Reading direction: </dt><dd className='inline'>Left to right</dd></div>
                      <div><dt className='inline font-medium'>Measurement units: </dt><dd className='inline'>Inches</dd></div>
                    </dl>
                    <div className='grid grid-cols-2 gap-3'>
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
                      <label className='block text-sm'>Page count
                        <input ref={pageInput} type='number' min={COVER_PAGE_MIN} max={COVER_PAGE_MAX} step='1' inputMode='numeric' className='input input-bordered input-sm mt-1 w-full' value={pages}
                          aria-describedby='cover-page-help' aria-invalid={!!pageError} onChange={event => { setPages(event.target.value); setCalculated(null); setValidation(null); setError(''); }} />
                      </label>
                      <button type='button' className={`btn btn-sm self-end ${dimensions && !calculated ? 'btn-primary' : 'btn-outline'}`} disabled={!dimensions} onClick={() => { setCalculated(dimensions); setTemplateReady(true); setValidation(null); setError(''); }}>Calculate dimensions</button>
                    </div>
                    {pdfPages !== null && <div className='mt-2'>
                      {pages.trim() === String(pdfPages)
                        ? <p className='text-xs text-base-content/70'>Latest 6 × 9 PDF proof: {pdfPages} pages.</p>
                        : <button type='button' className='btn btn-outline btn-sm' onClick={() => {
                          setPages(String(pdfPages)); setCalculated(null); setValidation(null); setError('');
                        }}>Use PDF page count: {pdfPages}</button>}
                    </div>}
                    <p id='cover-page-help' className='mt-2 text-xs text-base-content/70'>Enter {COVER_PAGE_MIN}–{COVER_PAGE_MAX} pages. Use the PDF’s total, including title pages and blank pages.</p>
                    {pageError && <p role='alert' className='mt-2 text-sm text-error'>{pageError}</p>}
                    {calculated && <div className='mt-3 rounded border border-base-300 px-3 py-2'>
                      <table className='w-full text-sm' aria-label='Calculated cover dimensions'>
                        <tbody>
                          <tr><th className='py-1 text-left font-medium' scope='row'>Full cover, including bleed</th><td className='pl-3 text-right'>{calculated.width.toFixed(4)} × {calculated.height.toFixed(4)} inches</td></tr>
                          <tr><th className='py-1 text-left font-medium' scope='row'>Spine width</th><td className='pl-3 text-right'>{calculated.spine.toFixed(4)} inches</td></tr>
                          <tr><th className='py-1 text-left font-medium' scope='row'>Pages for printing</th><td className='pl-3 text-right'>{calculated.printPages}</td></tr>
                        </tbody>
                      </table>
                      {calculated.printPages !== calculated.pdfPages && <p className='mt-1 text-xs text-base-content/70'>This calculation rounds up to {calculated.printPages} pages.</p>}
                      {templateReady && <button type='button' className='btn btn-outline btn-sm mt-3' disabled={templateBusy} onClick={() => { void downloadTemplate(); }}>
                        {templateBusy ? 'Creating template PNG…' : 'Download template PNG'}
                      </button>}
                    </div>}
                    <div className='mt-3 flex items-center gap-3'>
                      <label className='flex items-center gap-2 text-sm font-medium'>Background color
                        <input type='color' className='h-9 w-12 cursor-pointer rounded border border-base-300 p-1' value={backgroundColor}
                          onChange={event => { const next = coverBackground(event.target.value); if (next !== backgroundColor) { setFront(null); setBackgroundColor(next); } }} />
                      </label>
                      <span className='text-xs text-base-content/70'>{backgroundColor.toUpperCase()} · {textColor === '#ffffff' ? 'White' : 'Black'} text automatically</span>
                    </div>
                    <p className='mt-1 text-xs text-base-content/70'>Applies to the back, spine and any front-image border. The barcode area stays white.</p>
                    <fieldset className='mt-3' disabled={backPreparing}>
                      <legend className='text-sm font-medium'>Back cover</legend>
                      <div className='mt-2 flex gap-5'>
                        <label className='flex items-center gap-2 text-sm'><input type='radio' className='radio radio-sm' name='back-cover-mode' value='text' checked={backMode === 'text'} onChange={() => { setBackMode('text'); setBackError(''); }} />Text</label>
                        <label className='flex items-center gap-2 text-sm'><input type='radio' className='radio radio-sm' name='back-cover-mode' value='image' checked={backMode === 'image'} onChange={() => { setBackMode('image'); setBackError(''); }} />Image</label>
                      </div>
                      <p className='mt-1 text-xs text-base-content/70'>Only the selected option is saved and printed.</p>
                      {backMode === 'text' ? <>
                        <label className='mt-2 block text-sm font-medium'>Back-cover text
                          <textarea className='textarea textarea-bordered mt-1 h-48 w-full font-normal' value={backText} aria-describedby='cover-back-count' style={{ backgroundColor, color: textColor, fontFamily: 'PaperbackCoverEBGaramond', fontSize: '22pt', fontWeight: 400, fontStyle: 'normal', lineHeight: 1.35 }}
                            onChange={event => { setBackText(limitBackText(event.target.value)); setValidation(null); }} />
                        </label>
                        <p id='cover-back-count' className='mt-1 text-xs text-base-content/70'>{characterCount(backText).toLocaleString()} / {BACK_COVER_LIMIT.toLocaleString()} characters, including spaces. Printed in 22-point EB Garamond Regular (weight 400, no italics).</p>
                        {validation?.error && <p role='alert' className='mt-2 text-sm text-error'>{validation.error}</p>}
                      </> : <PaperbackBackImage record={backRecord} backgroundColor={backgroundColor} onFileChange={file => { void chooseBackFile(file); }} />}
                    </fieldset>
                    {backPreparing && <p role='status' className='mt-2 text-sm'>Preparing the back-cover image…</p>}
                    {backError && <p role='alert' className='mt-2 text-sm text-error'>{backError}</p>}
                  </section>
  
                  <section aria-label='Front-cover image and preview' className='min-w-0 border-l border-base-300 pl-6'>
                    {frontLoaded ? <fieldset disabled={frontSaving}>
                      <PaperbackFrontImage key={`${book.hash}:${frontRevision}`} loadEpubCover={loadFrontFromEpub} onChange={setFront}
                        file={frontFile} fit={frontFit} backgroundColor={backgroundColor} saved={frontRecord === savedImage.current} onFileChange={file => { void chooseFrontFile(file); }} onFitChange={chooseFrontFit} />
                    </fieldset> : <p role='status' className='text-sm'>Loading the saved front-cover image…</p>}
                    {frontSaving && <p role='status' className='mt-2 text-sm'>Preparing the paperback image…</p>}
                    {frontError && <p role='alert' className='mt-2 text-sm text-error'>{frontError}</p>}
                  </section>
                </div>
              </fieldset>
            </div>
            <footer className='shrink-0 border-t border-base-300 px-6 py-3'>
              {error && <p role='alert' className='mb-2 text-sm text-error'>{error}</p>}
              {saveError && <p role='alert' className='mb-2 text-sm text-error'>{saveError} {detailsBook !== book.hash && <button type='button' className='link font-medium' onClick={() => setReload(value => value + 1)}>Retry</button>}</p>}
              {confirmClose && <div role='alert' className='mb-3 flex items-center justify-between gap-4 rounded border border-base-300 px-3 py-2 text-sm'>
                <p>Close without saving your changes?</p>
                <div className='flex shrink-0 gap-2'>
                  <button type='button' className='btn btn-ghost btn-sm' onClick={() => setConfirmClose(false)}>Keep editing</button>
                  <button type='button' className='btn btn-outline btn-sm' onClick={finishClose}>Discard changes and close</button>
                </div>
              </div>}
              <div className='flex items-center justify-between gap-4'>
                {phase === 'working' ? <span role='status' className='flex items-center gap-2 text-sm'><span className='loading loading-spinner loading-sm' />Creating your cover…</span> :
                  <p role='status' className='text-xs text-base-content/70'>{detailsBook !== book.hash ? 'Loading saved cover details…' : saveStatus === 'saving' ? 'Saving cover details…' : saveStatus === 'error' ? 'Cover details have not been saved.' : dirty ? 'Unsaved changes. Click Save to keep them.' : hasSavedDetails ? 'Cover details saved with this ebook.' : 'Click Save to remember these cover details.'}</p>}
                <div className='flex shrink-0 items-center gap-2'>
                  <button type='button' className='btn btn-outline btn-sm' disabled={phase === 'working' || closing || frontSaving || backPreparing || detailsBook !== book.hash || (!dirty && hasSavedDetails)} onClick={() => { void storeDetails(); }}>Save</button>
                  <button type='button' className='btn btn-ghost btn-sm' disabled={closing || frontSaving || backPreparing} onClick={() => { void close(); }}>{closing ? 'Saving…' : phase === 'working' ? 'Cancel' : 'Close'}</button>
                  <button type='submit' className='btn btn-primary btn-sm' disabled={phase === 'working' || closing || detailsBook !== book.hash || !calculated || frontSaving || backPreparing || !front || !backReady}>Create cover PDF</button>
                </div>
              </div>
            </footer>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaperbackCoverModal;

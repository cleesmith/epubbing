'use client';

import { useEffect, useRef, useState } from 'react';
import type { ThemeConfig } from '../shared/theme';
import { EPUB_COVER_SIZE, inspectEpubCover, matchesEpubCoverSize, type EpubCoverImageInfo } from '@/lib/epub-cover-size';
import { libraryCoverFile } from '@/lib/library-cover-file';
import LibraryBooksModal from './LibraryBooksModal';
import environmentConfig from '@/services/environment';
import { getCoverFilename } from '@/utils/book';
import type { Book } from '@/types/book';

interface Props {
  theme: ThemeConfig;
  isDarkMode: boolean;
  currentCover: Blob | null;
  onSave: (file: File) => Promise<void>;
  onClose: () => void;
}

export default function EpubCoverUploadModal({ theme, isDarkMode, currentCover, onSave, onClose }: Props) {
  const [image, setImage] = useState<Blob | null>(currentCover);
  const [chosenFile, setChosenFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<(EpubCoverImageInfo & { image: Blob; url: string }) | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);
  const [libraryTitle, setLibraryTitle] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image) return;
    let active = true;
    const url = URL.createObjectURL(image);
    void inspectEpubCover(image).then(info => {
      if (active) setPreview({ ...info, image, url });
    }).catch(() => {
      if (active) setError('This image could not be opened. Choose a JPEG image.');
    });
    return () => { active = false; URL.revokeObjectURL(url); };
  }, [image]);

  const current = preview?.image === image ? preview : null;
  const matches = current ? matchesEpubCoverSize(current) : false;
  const busy = saving || loadingCover;
  const canSave = !!chosenFile && !!current && (libraryTitle !== null || current.isJpeg);
  const chooseLibraryCover = async (book: Book) => {
    setLoadingCover(true); setError('');
    try {
      const appService = await environmentConfig.getAppService();
      const storedCover = await appService.openFile(getCoverFilename(book), 'Books');
      const file = await libraryCoverFile(storedCover);
      // Check that the browser can display the cover before offering Save.
      await inspectEpubCover(file);
      setChosenFile(file); setImage(file); setPreview(null);
      setLibraryTitle(book.title || 'Untitled');
      setError('');
    } catch {
      setError('The cover for this Library book could not be opened. Choose another book or upload an image.');
    } finally {
      setLoadingCover(false);
    }
  };
  const save = async () => {
    if (busy || !canSave || !chosenFile) return;
    setSaving(true); setError('');
    try {
      await onSave(chosenFile);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'The cover could not be saved.');
      setSaving(false);
      return;
    }
    setSaving(false);
    onClose();
  };

  return (
    <>
    <div className='fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4'
      onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); if (!busy) onClose(); } }}>
      <div role='dialog' aria-modal='true' aria-labelledby='epub-cover-upload-title' className='w-full max-w-lg rounded-lg p-5 shadow-xl'
        style={{ background: theme.modalBg, color: theme.text, maxHeight: '92vh', overflowY: 'auto' }}>
        <h3 id='epub-cover-upload-title' className='mb-2 text-lg font-semibold'>EPUB cover</h3>
        <p className='text-sm'>Upload: JPEG · {EPUB_COVER_SIZE}</p>
        <p className='mt-2 text-sm'>Change only the cover. Your writing stays as it is.</p>
        <input ref={input} type='file' hidden aria-label='Choose EPUB cover image' accept='.jpg,.jpeg,image/jpeg'
          disabled={busy} onChange={event => {
            const file = event.target.files?.[0]; event.target.value = '';
            if (file) { setChosenFile(file); setImage(file); setPreview(null); setError(''); setLibraryTitle(null); }
          }} />
        <div className='mt-3 flex flex-wrap gap-2'>
          <button type='button' className='btn btn-outline btn-sm' disabled={busy} onClick={() => input.current?.click()}>
            Upload image
          </button>
          <button type='button' className='btn btn-outline btn-sm' disabled={busy} onClick={() => setShowLibrary(true)}>
            Use cover from Library
          </button>
        </div>
        {loadingCover && <p role='status' className='mt-3 text-sm'>Reading the Library cover…</p>}
        {!loadingCover && image && !current && !error && <p role='status' className='mt-3 text-sm'>Reading image…</p>}
        {current && <div className='mt-3 space-y-2'>
          {chosenFile && <p className='break-all text-sm'>{libraryTitle !== null ? `Cover from Library: ${libraryTitle}` : chosenFile.name}</p>}
          <p role={libraryTitle === null && (!matches || !current.isJpeg) ? 'alert' : undefined} className='text-sm' style={{ color: libraryTitle === null && (!matches || !current.isJpeg) ? '#d97706' : theme.text }}>
            {chosenFile ? 'Selected image' : 'Current cover'}: {current.width} × {current.height} pixels
          </p>
          {libraryTitle === null && !current.isJpeg && <p role='alert' className='text-sm'>Upload a JPEG cover (.jpg or .jpeg), or use a cover from Library.</p>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.url} alt='EPUB cover preview' className='mx-auto max-w-full object-contain' style={{ maxHeight: '48vh' }} />
        </div>}
        {error && <p role='alert' className='mt-3 text-sm text-error'>{error}</p>}
        <div className='mt-4 flex justify-end gap-2'>
          <button type='button' className='btn btn-ghost btn-sm' disabled={busy} onClick={onClose}>Cancel</button>
          <button type='button' className='btn btn-primary btn-sm' disabled={busy || !canSave} onClick={() => { void save(); }}>
            {saving ? 'Saving…' : libraryTitle === null && current && !matches ? 'Save anyway' : 'Save'}
          </button>
        </div>
      </div>
    </div>
    <LibraryBooksModal isOpen={showLibrary} onClose={() => setShowLibrary(false)}
      onSelectBook={book => { void chooseLibraryCover(book); }} theme={theme} isDarkMode={isDarkMode}
      title='Choose a Library cover' emptyHint='You can upload a cover image instead.' />
    </>
  );
}

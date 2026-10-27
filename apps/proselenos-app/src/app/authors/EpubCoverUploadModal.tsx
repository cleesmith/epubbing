'use client';

import { useEffect, useRef, useState } from 'react';
import type { ThemeConfig } from '../shared/theme';
import { EPUB_COVER_SIZE, inspectEpubCover, matchesEpubCoverSize, type EpubCoverImageInfo } from '@/lib/epub-cover-size';

interface Props {
  theme: ThemeConfig;
  currentCover: Blob | null;
  onSave: (file: File) => Promise<void>;
  onClose: () => void;
}

export default function EpubCoverUploadModal({ theme, currentCover, onSave, onClose }: Props) {
  const [image, setImage] = useState<Blob | null>(currentCover);
  const [chosenFile, setChosenFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<(EpubCoverImageInfo & { image: Blob; url: string }) | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
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
  const save = async () => {
    if (saving || !chosenFile || !current?.isJpeg) return;
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
    <div className='fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4'
      onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); if (!saving) onClose(); } }}>
      <div role='dialog' aria-modal='true' aria-labelledby='epub-cover-upload-title' className='w-full max-w-lg rounded-lg p-5 shadow-xl'
        style={{ background: theme.modalBg, color: theme.text, maxHeight: '92vh', overflowY: 'auto' }}>
        <h3 id='epub-cover-upload-title' className='mb-2 text-lg font-semibold'>EPUB cover</h3>
        <p className='text-sm'>EE cover: JPEG · {EPUB_COVER_SIZE}</p>
        <input ref={input} type='file' hidden aria-label='Choose EPUB cover image' accept='.jpg,.jpeg,image/jpeg'
          disabled={saving} onChange={event => {
            const file = event.target.files?.[0]; event.target.value = '';
            if (file) { setChosenFile(file); setImage(file); setPreview(null); setError(''); }
          }} />
        <button type='button' className='btn btn-outline btn-sm mt-3' disabled={saving} onClick={() => input.current?.click()}>
          {chosenFile ? 'Choose another image' : 'Choose image'}
        </button>
        {image && !current && !error && <p role='status' className='mt-3 text-sm'>Reading image…</p>}
        {current && <div className='mt-3 space-y-2'>
          {chosenFile && <p className='break-all text-sm'>{chosenFile.name}</p>}
          <p role={!matches || !current.isJpeg ? 'alert' : undefined} className='text-sm' style={{ color: !matches || !current.isJpeg ? '#d97706' : theme.text }}>
            {chosenFile ? 'Selected image' : 'Current cover'}: {current.width} × {current.height} pixels
          </p>
          {!current.isJpeg && <p role='alert' className='text-sm'>EE uses JPEG covers (.jpg or .jpeg).</p>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.url} alt='EPUB cover preview' className='mx-auto max-w-full object-contain' style={{ maxHeight: '48vh' }} />
        </div>}
        {error && <p role='alert' className='mt-3 text-sm text-error'>{error}</p>}
        <div className='mt-4 flex justify-end gap-2'>
          <button type='button' className='btn btn-ghost btn-sm' disabled={saving} onClick={onClose}>Cancel</button>
          <button type='button' className='btn btn-primary btn-sm' disabled={saving || !chosenFile || !current?.isJpeg} onClick={() => { void save(); }}>
            {saving ? 'Saving…' : current && !matches ? 'Save anyway' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

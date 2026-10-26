'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FRONT_WIDTH, FRONT_HEIGHT, type FrontFit } from '@/lib/paperback-cover';
import type { PreparedFrontImage } from '@/lib/paperback-cover-browser';

interface Props {
  loadEpubCover: () => Promise<Blob>;
  onChange: (front: PreparedFrontImage | null) => void;
  file: File | null;
  fit: FrontFit;
  backgroundColor: string;
  saved?: boolean;
  onFileChange: (file: File | null) => void;
  onFitChange: (fit: FrontFit) => void;
}

export default function PaperbackFrontImage({ loadEpubCover, onChange, file, fit, backgroundColor, saved = false, onFileChange, onFitChange }: Props) {
  const [front, setFront] = useState<PreparedFrontImage | null>(null);
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const epubCover = useRef<Promise<Blob> | null>(null);

  useEffect(() => { epubCover.current = null; }, [loadEpubCover]);
  useEffect(() => {
    let active = true;
    setFront(null); onChange(null); setError('');
    const prepare = async () => {
      if (file && !(['image/jpeg', 'image/png'].includes(file.type) || (!file.type && /\.(jpe?g|png)$/i.test(file.name)))) {
        throw new Error('Choose a JPG or PNG image for the front cover.');
      }
      if (!file && !epubCover.current) {
        epubCover.current = loadEpubCover().catch(failure => { epubCover.current = null; throw failure; });
      }
      const blob = file ?? await epubCover.current!;
      if (!active) return;
      const { prepareFrontImage } = await import('@/lib/paperback-cover-browser');
      if (!active) return;
      const prepared = await prepareFrontImage(blob, fit, backgroundColor);
      if (active) { setFront(prepared); onChange(prepared); }
    };
    void prepare().catch(failure => {
      if (active) setError(failure instanceof Error ? failure.message : 'This image could not be opened. Choose another JPG or PNG.');
    });
    return () => { active = false; onChange(null); };
  }, [file, fit, backgroundColor, loadEpubCover, onChange]);

  return (
    <div className='space-y-2'>
      <h4 className='font-semibold'>Front-cover image</h4>
      <p className='text-xs text-base-content/70'>Choose finished artwork with its title and author. Click Save to keep it with this ebook, replacing any previously saved paperback image.</p>
      <div>
        <button type='button' className='btn btn-outline btn-sm' onClick={() => input.current?.click()}>Choose image</button>
        <input ref={input} type='file' hidden aria-label='Choose front-cover image' accept='.jpg,.jpeg,.png,image/jpeg,image/png'
          onChange={event => { const selected = event.target.files?.[0]; event.target.value = ''; if (selected) { onChange(null); setFront(null); onFileChange(selected); } }} />
      </div>
      <div className='flex flex-wrap items-center gap-3 text-sm'>
        <span className='break-all'>{file ? `${file.name} · ${saved ? 'Saved with this ebook' : 'Not saved yet'}` : 'Using the EPUB cover'}</span>
        {file && <button type='button' className='link' onClick={() => { onChange(null); setFront(null); onFileChange(null); if (input.current) input.current.value = ''; }}>Use EPUB cover</button>}
      </div>
      <label className='block text-sm'>Image placement
        <select className='select select-bordered select-sm mt-1 w-full' value={fit}
          onChange={event => { onChange(null); setFront(null); onFitChange(event.target.value as FrontFit); }}>
          <option value='fill'>Fill front cover — no added border</option>
          <option value='border'>Keep whole image — add a border</option>
        </select>
      </label>
      <p className='text-xs text-base-content/70'>Front artwork including bleed: 6.125 × 9.25 inches.</p>
      {error ? <p role='alert' className='text-sm text-error'>{error}</p> : !front ? <p role='status' className='text-sm'>Preparing the front-cover preview…</p> : (
        <>
          <div className='relative mx-auto w-44 max-w-full overflow-hidden' style={{ aspectRatio: `${FRONT_WIDTH} / ${FRONT_HEIGHT}` }}>
            {/* The preview uses the exact panel that will be placed in the PDF. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={front.dataUrl} alt='Front-cover preview including bleed' className='block h-full w-full' />
            <div aria-hidden='true' className='pointer-events-none absolute border border-dashed border-white'
              style={{ left: `${0.125 / FRONT_WIDTH * 100}%`, right: `${0.25 / FRONT_WIDTH * 100}%`, top: `${0.25 / FRONT_HEIGHT * 100}%`, bottom: `${0.25 / FRONT_HEIGHT * 100}%`, boxShadow: '0 0 0 1px #333' }} />
          </div>
          <p className='text-xs text-base-content/70'>Dashed guide: keep the title, author name and important details inside.</p>
        </>
      )}
    </div>
  );
}

'use client';

import React, { useRef } from 'react';
import { BACK_IMAGE_PIXELS_WIDE, BACK_IMAGE_PIXELS_HIGH, BACK_IMAGE_WIDTH, BACK_IMAGE_HEIGHT, FRONT_WIDTH, FRONT_HEIGHT } from '@/lib/paperback-cover';
import type { SavedPaperbackBack } from '@/services/paperbackCoverStorage';

interface Props {
  record: SavedPaperbackBack | null;
  backgroundColor: string;
  onFileChange: (file: File | null) => void;
}

export default function PaperbackBackImage({ record, backgroundColor, onFileChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className='mt-2 space-y-2'>
      <p id='cover-back-image-help' className='text-xs text-base-content/70'>Back-image area: <strong>{BACK_IMAGE_WIDTH} × {BACK_IMAGE_HEIGHT} inches</strong>, including top and outer bleed. Pixel size at 300 DPI: <strong>{BACK_IMAGE_PIXELS_WIDE.toLocaleString()} × {BACK_IMAGE_PIXELS_HIGH.toLocaleString()} pixels</strong>.</p>
      <p className='text-xs text-base-content/70'>Choose a JPG or PNG at this size or larger. The image fills the back width and leaves a ¼-inch strip of your background color above the barcode band; different proportions are center-cropped, without stretching. Transparent areas become white.</p>
      <div className='flex flex-wrap items-center gap-3'>
        <button type='button' className='btn btn-outline btn-sm' onClick={() => input.current?.click()}>{record ? 'Replace back image' : 'Choose back image'}</button>
        <input ref={input} type='file' hidden aria-label='Choose back-cover image' aria-describedby='cover-back-image-help' accept='.jpg,.jpeg,.png,image/jpeg,image/png'
          onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) onFileChange(file); }} />
        {record && <button type='button' className='link text-sm' onClick={() => onFileChange(null)}>Remove image</button>}
      </div>
      {record ? <>
        <p className='break-all text-xs text-base-content/70'>{record.name} · Click Save to keep this choice with the ebook.</p>
        <div role='img' aria-label='Back-cover preview with image above the reserved barcode area' className='relative mx-auto w-44 max-w-full overflow-hidden border border-base-300'
          style={{ aspectRatio: `${FRONT_WIDTH} / ${FRONT_HEIGHT}`, backgroundColor }}>
          {/* These positions match the PDF renderer, measured from the bleed edge. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={record.jpeg} alt='' className='absolute block'
            style={{ left: 0, top: 0, width: `${BACK_IMAGE_WIDTH / FRONT_WIDTH * 100}%`, height: `${BACK_IMAGE_HEIGHT / FRONT_HEIGHT * 100}%`, objectFit: 'cover' }} />
          <div className='absolute flex items-center justify-center bg-white text-[9px] text-black' style={{ left: `${3.875 / FRONT_WIDTH * 100}%`, top: `${7.675 / FRONT_HEIGHT * 100}%`, width: `${2 / FRONT_WIDTH * 100}%`, height: `${1.2 / FRONT_HEIGHT * 100}%` }}>Barcode area</div>
        </div>
      </> : <p className='text-xs text-base-content/70'>Choose an image to create the PDF, or select Text.</p>}
    </div>
  );
}

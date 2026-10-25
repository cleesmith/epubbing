import React from 'react';
import { LuLibrary } from 'react-icons/lu';

type SimpleShelfIconProps = React.SVGProps<SVGSVGElement> & { size?: number | string };

// The selected "A · Simple shelf": four book spines above a single shelf.
export default function SimpleShelfIcon({ size = '1em', ...props }: SimpleShelfIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'
      width={size} height={size} fill='none' stroke='currentColor'
      strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'
      aria-hidden='true' focusable='false' {...props}
    >
      <LuLibrary size={24} />
      <path d='M2 23h20' />
    </svg>
  );
}

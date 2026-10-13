'use client';

import { createContext, useContext } from 'react';

// Presentation only: the same Plate instance and document stay mounted.
export const WritingModeContext = createContext(false);
export const useWritingMode = () => useContext(WritingModeContext);

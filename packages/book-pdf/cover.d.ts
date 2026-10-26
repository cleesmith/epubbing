export interface CoverPdfInput {
  title: string;
  author: string;
  backText: string;
  backgroundColor?: string;
  textColor?: '#000000' | '#ffffff';
  printPages: number;
  spine: number;
  frontImage: string;
  frontWidth: number;
  frontHeight: number;
  frontFullBleed?: boolean;
}
export function checkBackCoverText(text: string): string | null;
export function createPaperbackCover(input: CoverPdfInput): Promise<{ blob: Blob; spineText: boolean; warnings: string[] }>;

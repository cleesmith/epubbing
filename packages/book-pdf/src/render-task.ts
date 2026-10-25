export interface PdfProgress {
  stage: 'layout' | 'paginate' | 'finalize' | 'render';
  completed: number;
  total?: number;
}

export interface PdfRenderOptions {
  signal?: AbortSignal;
  onProgress?: (progress: PdfProgress) => void;
}

export function createRenderTask(options: PdfRenderOptions) {
  let lastYield = 0;
  const check = () => {
    if (options.signal?.aborted) {
      const error = new Error('PDF creation cancelled.');
      error.name = 'AbortError';
      throw error;
    }
  };
  return {
    check,
    async checkpoint(progress?: PdfProgress, force = false) {
      check();
      if (progress) options.onProgress?.(progress);
      if (force || Date.now() - lastYield >= 32) {
        // A real task boundary, not Promise.resolve(): let input and paint run.
        await new Promise<void>(resolve => setTimeout(resolve, 0));
        lastYield = Date.now();
      }
      check();
    },
  };
}

export type RenderTask = ReturnType<typeof createRenderTask>;

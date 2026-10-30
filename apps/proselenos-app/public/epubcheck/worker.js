// A plain, self-hosted module worker. No Webpack worker loader or remote service.
// All book bytes and results live only in memory for this one run.
self.onmessage = async ({ data }) => {
  if (data?.type !== 'check' || !(data.file instanceof Blob)) return;
  let loading = true;
  try {
    self.postMessage({ type: 'progress', message: 'Loading EPUBCheck…' });
    const [{ validate, configureEngine, EPUBCHECK_VERSION }, { blob }, { createEngine }] = await Promise.all([
      import('./vendor/validate-browser.js'),
      import('./vendor/plugins.js'),
      import('./vendor/epubcheck-engine.js'),
    ]);
    configureEngine({ createEngine });
    loading = false;
    self.postMessage({ type: 'progress', message: 'Checking the book’s structure and contents…' });
    let lastUpdate = 0;
    const result = await validate(blob(data.file), {
      name: data.filename,
      args: ['--profile', 'default', '--locale', 'en'],
      onFeature: ({ resource, feature, value }) => {
        if (feature === 'FORMAT_VERSION') {
          self.postMessage({ type: 'progress', message: `Checking the book using EPUB ${value} rules…` });
        } else if (resource && performance.now() - lastUpdate > 250) {
          // A feature identifies a resource the engine has reported on, not a
          // percentage or a promise that every check for that file is complete.
          lastUpdate = performance.now();
          self.postMessage({ type: 'progress', message: 'Checking the book’s structure and contents…', detail: `Examining: ${resource}` });
        }
      },
    });
    // An empty/no-op run must never be presented as a successful check.
    const hasVersion = result.features.some(({ feature }) => feature === 'FORMAT_VERSION');
    if (![0, 1].includes(result.exitCode) || (result.valid && !hasVersion)) {
      throw new Error('The checker did not return a complete validation result.');
    }
    self.postMessage({ type: 'complete', result: {
      valid: result.valid, exitCode: result.exitCode, version: EPUBCHECK_VERSION,
      messages: result.messages, summary: result.summary,
      stdout: result.stdout, stderr: result.stderr,
    } });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    self.postMessage({ type: 'error', message: loading
      ? `The checker files could not be loaded. When online, use “Prep for offline use”, then try again. ${reason}`
      : `EPUBCheck could not finish. ${reason}` });
  }
};

import { appPath } from '@/utils/app-path';
import { RELEASE_HASH } from '@/generated/release';

interface OfflineFile {
  url: string;
  bytes: number;
  sha256: string;
}

interface OfflineManifest {
  schema: number;
  version: string;
  files: OfflineFile[];
}

export interface OfflineProgress {
  phase: 'checking' | 'saving' | 'verifying';
  completed: number;
  total: number;
}

const updatedMessage = 'Epubbing changed during preparation. Reload the page and try again.';

function validateManifest(value: unknown, root: URL): OfflineManifest {
  const manifest = value as OfflineManifest | null;
  if (manifest?.schema !== 1 || manifest.version !== RELEASE_HASH || !Array.isArray(manifest.files)) {
    throw new Error('The offline file list is unavailable or belongs to another version. Reload while online and try again.');
  }
  const urls = new Set<string>();
  for (const file of manifest.files) {
    if (!file || typeof file.url !== 'string' || !Number.isSafeInteger(file.bytes) || file.bytes < 0 ||
        typeof file.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(file.sha256)) {
      throw new Error('The offline file list is incomplete. Please try again after updating the app.');
    }
    const url = new URL(file.url, root);
    if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname) || url.search || url.hash ||
        url.href === new URL('sw.js', root).href || urls.has(url.href)) {
      throw new Error('The offline file list contains an invalid address.');
    }
    urls.add(url.href);
  }
  for (const route of ['./', 'library/', 'authors/', 'reader/', 'reader/view/']) {
    if (!urls.has(new URL(route, root).href)) throw new Error('The offline file list is incomplete.');
  }
  return manifest;
}

async function matchesFile(response: Response | undefined, file: OfflineFile): Promise<boolean> {
  if (!response?.ok) return false;
  const bytes = await response.arrayBuffer();
  if (bytes.byteLength !== file.bytes) return false;
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  return hash === file.sha256;
}

async function download(url: URL, signal: AbortSignal): Promise<Response> {
  const request = new AbortController();
  const cancel = () => request.abort(signal.reason);
  signal.throwIfAborted();
  signal.addEventListener('abort', cancel, { once: true });
  const timeout = setTimeout(() => request.abort(new Error('The download timed out. Check your connection and try again.')), 120_000);
  try {
    const response = await fetch(url, { signal: request.signal, cache: 'no-store' });
    if (!response.ok) throw new Error('An application file could not be downloaded. Check your connection and try again.');
    // Consume the body while timeout/cancellation are still active.
    const blob = await response.blob();
    return new Response(blob, { status: response.status, headers: response.headers });
  } catch (error) {
    if (request.signal.aborted) throw request.signal.reason;
    throw error;
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener('abort', cancel);
  }
}

/** Downloads application assets only. Never opens or changes a user's books. */
export async function prepareForOffline(
  onProgress: (progress: OfflineProgress) => void,
  signal: AbortSignal,
): Promise<void> {
  if (!window.isSecureContext || !('serviceWorker' in navigator) || !('caches' in window) || !crypto.subtle) {
    throw new Error('Offline preparation is not available in this browser. Open Epubbing over HTTPS in a supported browser.');
  }
  const controller = navigator.serviceWorker.controller;
  const root = new URL(appPath('/'), window.location.origin);
  if (!controller || controller.scriptURL !== new URL('sw.js', root).href) {
    throw new Error('Epubbing is still setting up. Reload the page while online, then try again.');
  }
  const operation = new AbortController();
  const cancel = () => operation.abort(signal.reason);
  const changed = () => operation.abort(new Error(updatedMessage));
  signal.throwIfAborted();
  signal.addEventListener('abort', cancel, { once: true });
  navigator.serviceWorker.addEventListener('controllerchange', changed);

  const cacheName = `epubbing-${encodeURIComponent(root.pathname)}-${RELEASE_HASH}`;
  const checkCurrent = async () => {
    operation.signal.throwIfAborted();
    if (navigator.serviceWorker.controller !== controller || !(await caches.has(cacheName))) {
      throw new Error(updatedMessage);
    }
  };

  try {
    onProgress({ phase: 'checking', completed: 0, total: 0 });
    await checkCurrent();
    const manifestUrl = new URL('offline-manifest.json', root);
    manifestUrl.searchParams.set('offline-prep', RELEASE_HASH);
    const response = await download(manifestUrl, operation.signal);
    const manifest = validateManifest(await response.json(), root);
    await checkCurrent();
    const cache = await caches.open(cacheName);
    let completed = 0;
    onProgress({ phase: 'saving', completed, total: manifest.files.length });

    // Sequential requests bound memory even when the audio engine is large.
    for (const file of manifest.files) {
      await checkCurrent();
      const url = new URL(file.url, root);
      if (!(await matchesFile(await cache.match(url.href), file))) {
        const freshUrl = new URL(url);
        // Bypass older HTML/public assets served by cache-first handlers.
        freshUrl.searchParams.set('offline-prep', RELEASE_HASH);
        const fresh = await download(freshUrl, operation.signal);
        if (!(await matchesFile(fresh.clone(), file))) throw new Error(updatedMessage);
        await checkCurrent();
        // Await the canonical cache write; a finished fetch alone is not enough.
        await cache.put(url.href, fresh);
      }
      completed += 1;
      onProgress({ phase: 'saving', completed, total: manifest.files.length });
    }

    completed = 0;
    for (const file of manifest.files) {
      await checkCurrent();
      if (!(await cache.match(new URL(file.url, root).href))?.ok) {
        throw new Error('Some application files were not saved. Please run preparation again.');
      }
      completed += 1;
      onProgress({ phase: 'verifying', completed, total: manifest.files.length });
    }
    await checkCurrent();
  } finally {
    signal.removeEventListener('abort', cancel);
    navigator.serviceWorker.removeEventListener('controllerchange', changed);
  }
}

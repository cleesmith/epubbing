import { appPath } from '@/utils/app-path';
import { showOfflinePreparation } from '@/components/OfflinePreparation';
import { prepareForOffline } from './offlinePreparation';
import { RELEASE_HASH } from '@/generated/release';
import Swal from 'sweetalert2';

function waitForController(registration: ServiceWorkerRegistration, signal: AbortSignal): Promise<ServiceWorker> {
  const worker = registration.installing || registration.waiting || registration.active;
  if (!worker) return Promise.reject(new Error('The app update could not start. Please try again.'));
  return new Promise((resolve, reject) => {
    const finish = (error?: unknown) => {
      clearTimeout(timeout);
      worker.removeEventListener('statechange', check);
      navigator.serviceWorker.removeEventListener('controllerchange', check);
      signal.removeEventListener('abort', cancelled);
      if (error) reject(error); else resolve(worker);
    };
    const check = () => {
      if (signal.aborted) finish(signal.reason);
      else if (worker.state === 'redundant') finish(new Error('The app update was interrupted. Please try again.'));
      else if (worker.state === 'activated' && navigator.serviceWorker.controller === worker) finish();
    };
    const cancelled = () => finish(signal.reason);
    const timeout = setTimeout(() => finish(new Error('The app update timed out. Check your connection and try again.')), 120_000);
    worker.addEventListener('statechange', check);
    navigator.serviceWorker.addEventListener('controllerchange', check);
    signal.addEventListener('abort', cancelled, { once: true });
    check();
  });
}

function workerVersion(worker: ServiceWorker, signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const finish = (error?: unknown, version?: string) => {
      clearTimeout(timeout);
      signal.removeEventListener('abort', cancelled);
      channel.port1.close();
      channel.port2.close();
      if (error) reject(error); else resolve(version!);
    };
    const cancelled = () => finish(signal.reason);
    const timeout = setTimeout(() => finish(new Error('The updated app could not be verified. Please try Update App again.')), 10_000);
    signal.addEventListener('abort', cancelled, { once: true });
    channel.port1.onmessage = event => {
      const version = event.data?.version;
      if (typeof version !== 'string' || !/^[a-f0-9]+$/.test(version)) {
        finish(new Error('The updated app returned an invalid version. Please try again.'));
      } else finish(undefined, version);
    };
    if (signal.aborted) { cancelled(); return; }
    try { worker.postMessage({ type: 'EE_APP_VERSION' }, [channel.port2]); }
    catch (error) { finish(error); }
  });
}

// This cache is application state, separate from books and exported backups.
// A setup attempt is remembered independently of version/offline readiness.
function updateState() {
  const root = new URL(appPath('/'), window.location.origin);
  return {
    name: `epubbing-${encodeURIComponent(root.pathname)}-control`,
    setup: new URL('.ee-setup-attempted', root).href,
    request: new URL('.ee-update-request', root).href,
  };
}

function dialogOptions(isDark: boolean) {
  return {
    background: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#333',
    confirmButtonColor: '#3085d6', confirmButtonText: 'OK',
    allowOutsideClick: false, allowEscapeKey: false,
    didOpen: () => {
      const container = Swal.getContainer();
      if (container) container.style.zIndex = '10200';
    },
  };
}

async function latestVersion(signal: AbortSignal): Promise<string> {
  const url = new URL(appPath('/offline-manifest.json'), window.location.origin);
  // Existing workers already treat offline-prep requests as network-only.
  url.searchParams.set('offline-prep', RELEASE_HASH);
  url.searchParams.set('check', `${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const response = await fetch(url, { cache: 'no-store', signal });
  if (!response.ok) throw new Error('Version check failed');
  const manifest = await response.json();
  if (manifest?.schema !== 1 || typeof manifest.version !== 'string' || !/^[a-f0-9]+$/.test(manifest.version)) {
    throw new Error('Invalid version information');
  }
  return manifest.version;
}

// Bound API calls too: register/update can otherwise leave the dialog waiting
// before waitForController has even started its own timeout.
function bounded<T>(work: Promise<T>, signal: AbortSignal, milliseconds: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const finish = (error?: unknown, value?: T) => {
      clearTimeout(timer);
      signal.removeEventListener('abort', cancelled);
      if (error) reject(error); else resolve(value as T);
    };
    const cancelled = () => finish(signal.reason);
    const timer = setTimeout(() => finish(new Error('The update could not finish. Please try again later.')), milliseconds);
    signal.addEventListener('abort', cancelled, { once: true });
    work.then(value => finish(undefined, value), error => finish(error));
    if (signal.aborted) cancelled();
  });
}

async function installRelease(isDark: boolean, mode: 'update' | 'setup', expectedVersion?: string): Promise<void> {
  const state = updateState();
  let control: Cache | undefined;
  try {
    const complete = await showOfflinePreparation(isDark, async (onProgress, signal) => {
      if (navigator.onLine === false) throw new Error('Connect to the internet, then choose Update App again.');
      if (!window.isSecureContext || !('serviceWorker' in navigator) || !('caches' in window) || !crypto.subtle) {
        throw new Error('App updates need HTTPS and a browser that supports offline use.');
      }
      signal.throwIfAborted();
      control = await caches.open(state.name);
      // Only this explicit menu action authorizes replacement of an installed
      // release. The worker checks the version and expires this permission.
      if (expectedVersion) await control.put(state.request, new Response(JSON.stringify({
        version: expectedVersion, expires: Date.now() + 120_000,
      })));
      const registration = await bounded(navigator.serviceWorker.register(appPath('/sw.js'), { updateViaCache: 'none' }), signal, 30_000);
      if (!registration.installing && !registration.waiting) await bounded(registration.update(), signal, 30_000);
      signal.throwIfAborted();
      const worker = await waitForController(registration, signal);
      const version = await workerVersion(worker, signal);
      if (expectedVersion && version !== expectedVersion) throw new Error('The available version changed. Please choose Update App again.');
      await prepareForOffline(onProgress, signal, version);
    }, mode);
    if (complete && mode === 'update') window.location.reload();
  } finally {
    if (expectedVersion) await control?.delete(state.request);
  }
}

let updating = false;
/** A version check runs only in response to Update App in either menu. */
export async function updateApp(isDark = false): Promise<void> {
  if (updating) return;
  updating = true;
  try {
    const operation = new AbortController();
    const timeout = setTimeout(() => operation.abort(), 8_000);
    let checkingOpen = true;
    const dialog = Swal.fire({
      ...dialogOptions(isDark), title: 'Checking for updates…',
      showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Cancel',
      willClose: () => { checkingOpen = false; operation.abort(); },
    });
    let version: string;
    try {
      if (navigator.onLine === false) throw new Error('Offline');
      version = await bounded(latestVersion(operation.signal), operation.signal, 8_000);
    } catch {
      clearTimeout(timeout);
      // Cancellation closes the dialog; a timeout leaves it visible.
      if (!checkingOpen) return;
      Swal.update({
        title: 'Couldn’t check for updates', text: 'Please try again later. You can continue using EE.',
        icon: 'info', showConfirmButton: true, showCancelButton: false, confirmButtonText: 'OK',
      });
      await dialog;
      return;
    } finally { clearTimeout(timeout); }
    if (operation.signal.aborted) return;
    if (version === RELEASE_HASH) {
      Swal.update({
        title: 'You’re up-to-date!', text: `EE ${RELEASE_HASH} is currently the newest version available.`,
        icon: 'success', showConfirmButton: true, showCancelButton: false, confirmButtonText: 'OK',
      });
      await dialog;
      return;
    }
    Swal.close();
    await dialog;
    await installRelease(isDark, 'update', version);
  } finally { updating = false; }
}

let initialSetup: Promise<void> | undefined;

/** One initial attempt for a genuinely new browser; never update on return. */
export function initializeApp(isDark = false): Promise<void> {
  if (initialSetup) return initialSetup;
  if (navigator.onLine === false || !window.isSecureContext ||
      !('serviceWorker' in navigator) || !('caches' in window) || !crypto.subtle) {
    return Promise.resolve();
  }
  initialSetup = (async () => {
    const registration = await navigator.serviceWorker.getRegistration(appPath('/'));
    // Recognize existing users, including releases predating our setup marker.
    if (registration?.active || registration?.waiting || registration?.installing || navigator.serviceWorker.controller) return;
    const state = updateState();
    const cache = await caches.open(state.name);
    if (await cache.match(state.setup)) return;
    // Save before attempting: failure/cancellation must not trigger setup again
    // on the next bookmark visit, remount, or reconnection.
    await cache.put(state.setup, new Response(RELEASE_HASH));
    await installRelease(isDark, 'setup');
  })().finally(() => { initialSetup = undefined; });
  return initialSetup;
}

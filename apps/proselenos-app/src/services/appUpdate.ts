import { appPath } from '@/utils/app-path';
import { showOfflinePreparation } from '@/components/OfflinePreparation';
import { prepareForOffline } from './offlinePreparation';

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

// One action in both menus: activate the latest worker, verify and cache that
// exact release, then reload into it. No book storage is opened or cleared.
export async function updateApp(isDark = false): Promise<void> {
  const complete = await showOfflinePreparation(isDark, async (onProgress, signal) => {
    if (navigator.onLine === false) throw new Error('Connect to the internet, then choose Update App again.');
    if (!window.isSecureContext || !('serviceWorker' in navigator) || !('caches' in window) || !crypto.subtle) {
      throw new Error('App updates need HTTPS and a browser that supports offline use.');
    }
    signal.throwIfAborted();
    const registration = await navigator.serviceWorker.register(appPath('/sw.js'), { updateViaCache: 'none' });
    if (!registration.installing && !registration.waiting) await registration.update();
    signal.throwIfAborted();
    const worker = await waitForController(registration, signal);
    const version = await workerVersion(worker, signal);
    await prepareForOffline(onProgress, signal, version);
  });
  if (complete) window.location.reload();
}

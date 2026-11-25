// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Swal from 'sweetalert2';
import { initializeApp, updateApp } from './appUpdate';
import { prepareForOffline } from './offlinePreparation';
import { showOfflinePreparation } from '@/components/OfflinePreparation';

vi.mock('./offlinePreparation', () => ({ prepareForOffline: vi.fn(async () => {}) }));
vi.mock('@/generated/release', () => ({ RELEASE_HASH: 'def456' }));
vi.mock('@/components/OfflinePreparation', () => ({ showOfflinePreparation: vi.fn() }));
vi.mock('@/utils/app-path', () => ({ appPath: (path: string) => `/ee${path}` }));
vi.mock('sweetalert2', () => ({ default: { fire: vi.fn(), update: vi.fn(), close: vi.fn(), getContainer: vi.fn() } }));

let worker: EventTarget & { state: string; postMessage: ReturnType<typeof vi.fn> };
let workers: EventTarget & { controller: typeof worker | null; register: ReturnType<typeof vi.fn>; getRegistration: ReturnType<typeof vi.fn> };
let registration: { active: typeof worker | null; waiting: null; installing: typeof worker | null; update: ReturnType<typeof vi.fn> };
let reload: ReturnType<typeof vi.fn>;
let operation: AbortController;
let progress: ReturnType<typeof vi.fn>;
let fetcher: ReturnType<typeof vi.fn>;
let saved: Map<string, Response>;
let confirm: () => void;
let cancel: () => void;
const root = 'https://example.test';
const requestKey = root + '/ee/.ee-update-request';
const setupKey = root + '/ee/.ee-setup-attempted';
const tick = () => new Promise(resolve => setImmediate(resolve));

beforeEach(() => {
  vi.clearAllMocks();
  reload = vi.fn(); progress = vi.fn(); operation = new AbortController(); saved = new Map();
  worker = Object.assign(new EventTarget(), { state: 'activated', postMessage: vi.fn((_message, ports) => ports[0].postMessage({ version: 'fed987' })) });
  registration = { active: worker, installing: null, waiting: null, update: vi.fn(async () => {}) };
  workers = Object.assign(new EventTarget(), { controller: worker, register: vi.fn(async () => registration), getRegistration: vi.fn(async () => registration) });
  vi.stubGlobal('window', { isSecureContext: true, caches: {}, location: { origin: root, reload } });
  vi.stubGlobal('navigator', { onLine: true, serviceWorker: workers });
  vi.stubGlobal('caches', { open: vi.fn(async () => ({
    match: async (url: string) => saved.get(url)?.clone(),
    put: async (url: string, response: Response) => { saved.set(url, response.clone()); },
    delete: async (url: string) => saved.delete(url),
  })) });
  fetcher = vi.fn(async () => new Response(JSON.stringify({ schema: 1, version: 'fed987', files: [] })));
  vi.stubGlobal('fetch', fetcher);
  vi.mocked(showOfflinePreparation).mockImplementation(async (_dark, prepare) => { await prepare(progress, operation.signal); return true; });
  vi.mocked(Swal.fire).mockImplementation((value: unknown) => {
    const options = value as { willClose?: () => void };
    return new Promise(resolve => {
      confirm = () => { options.willClose?.(); resolve({ isConfirmed: true, isDenied: false, isDismissed: false }); };
      cancel = () => { options.willClose?.(); resolve({ isConfirmed: false, isDenied: false, isDismissed: true }); };
    });
  });
  vi.mocked(Swal.close).mockImplementation(() => cancel());
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
function firstVisit() { workers.getRegistration.mockResolvedValue(undefined); workers.controller = null; }

it('checks one network-only manifest and waits for OK when current, regardless of offline readiness', async () => {
  fetcher.mockResolvedValue(new Response(JSON.stringify({ schema: 1, version: 'def456' })));
  const result = updateApp(true); await tick();
  expect(fetcher).toHaveBeenCalledOnce();
  const [url, options] = fetcher.mock.calls[0]!;
  expect(url.pathname).toBe('/ee/offline-manifest.json');
  expect(url.searchParams.get('offline-prep')).toBe('def456');
  expect(url.searchParams.has('check')).toBe(true);
  expect(options.cache).toBe('no-store');
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ title: 'You’re up-to-date!', text: 'EE def456 is currently the newest version available.', confirmButtonText: 'OK' }));
  expect(workers.register).not.toHaveBeenCalled();
  expect(registration.update).not.toHaveBeenCalled();
  expect(prepareForOffline).not.toHaveBeenCalled();
  expect(reload).not.toHaveBeenCalled();
  confirm(); await result;
});
it('authorizes only the checked release, runs the normal update, then reloads', async () => {
  workers.register.mockImplementation(async () => {
    const approval = await saved.get(requestKey)!.clone().json();
    expect(approval.version).toBe('fed987'); expect(approval.expires).toBeGreaterThan(Date.now());
    return registration;
  });
  await updateApp(true);
  expect(showOfflinePreparation).toHaveBeenCalledWith(true, expect.any(Function), 'update');
  expect(workers.register).toHaveBeenCalledWith('/ee/sw.js', { updateViaCache: 'none' });
  expect(registration.update).toHaveBeenCalledOnce();
  expect(prepareForOffline).toHaveBeenCalledWith(progress, operation.signal, 'fed987');
  expect(reload).toHaveBeenCalledOnce(); expect(saved.has(requestKey)).toBe(false);
});
it('does nothing automatic for an older installed release without offline readiness', async () => {
  worker.postMessage.mockImplementation((_message, ports) => ports[0].postMessage({ version: 'abc123' }));
  await initializeApp(true); await initializeApp(true);
  expect(fetcher).not.toHaveBeenCalled(); expect(workers.register).not.toHaveBeenCalled();
  expect(registration.update).not.toHaveBeenCalled(); expect(showOfflinePreparation).not.toHaveBeenCalled();
  expect(worker.postMessage).not.toHaveBeenCalled(); expect(Swal.fire).not.toHaveBeenCalled(); expect(reload).not.toHaveBeenCalled();
});
it('leaves a waiting worker alone on startup', async () => {
  workers.getRegistration.mockResolvedValue({ waiting: worker }); workers.controller = null;
  await initializeApp(); expect(workers.register).not.toHaveBeenCalled(); expect(showOfflinePreparation).not.toHaveBeenCalled();
});
it('prepares a genuine first visit once without a version check or reload', async () => {
  firstVisit(); workers.register.mockImplementation(async () => { workers.controller = worker; return registration; });
  await initializeApp(true);
  expect(showOfflinePreparation).toHaveBeenCalledWith(true, expect.any(Function), 'setup');
  expect(prepareForOffline).toHaveBeenCalledOnce(); expect(fetcher).not.toHaveBeenCalled();
  expect(saved.has(setupKey)).toBe(true); expect(saved.has(requestKey)).toBe(false); expect(reload).not.toHaveBeenCalled();
});
it('does not repeat failed or cancelled first setup on later visits or reconnection', async () => {
  firstVisit(); vi.mocked(showOfflinePreparation).mockResolvedValueOnce(false);
  await initializeApp(); await initializeApp();
  expect(showOfflinePreparation).toHaveBeenCalledOnce(); expect(saved.has(setupKey)).toBe(true);
  expect(fetcher).not.toHaveBeenCalled(); expect(reload).not.toHaveBeenCalled();
});
it('does not restart setup just because the registration was removed', async () => {
  firstVisit(); saved.set(setupKey, new Response('older-release'));
  await initializeApp(); expect(showOfflinePreparation).not.toHaveBeenCalled();
});
it('shares first setup across React remounts', async () => {
  firstVisit(); vi.mocked(showOfflinePreparation).mockResolvedValue(false);
  const first = initializeApp(); const second = initializeApp(); expect(second).toBe(first);
  await first; expect(showOfflinePreparation).toHaveBeenCalledOnce();
});
it('keeps a connection failure separate from an up-to-date result', async () => {
  fetcher.mockRejectedValue(new Error('No connection'));
  const result = updateApp(); await tick();
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ title: 'Couldn’t check for updates' }));
  expect(workers.register).not.toHaveBeenCalled(); expect(prepareForOffline).not.toHaveBeenCalled(); confirm(); await result;
});
it('bounds a stalled version response to eight seconds', async () => {
  vi.useFakeTimers(); fetcher.mockImplementation(() => new Promise(() => {}));
  const result = updateApp(); await vi.advanceTimersByTimeAsync(8_000);
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ title: 'Couldn’t check for updates' }));
  expect(workers.register).not.toHaveBeenCalled(); confirm(); await result;
});
it('cancels a version check without starting an update', async () => {
  fetcher.mockImplementation(() => new Promise(() => {}));
  const result = updateApp(); cancel(); await result;
  expect(workers.register).not.toHaveBeenCalled(); expect(Swal.update).not.toHaveBeenCalled();
});
it('rejects invalid online version information', async () => {
  fetcher.mockResolvedValue(new Response('<html>not a manifest</html>'));
  const result = updateApp(); await tick();
  expect(Swal.update).toHaveBeenCalledWith(expect.objectContaining({ title: 'Couldn’t check for updates' }));
  confirm(); await result; expect(workers.register).not.toHaveBeenCalled();
});
it('does not overlap repeated Update clicks', async () => {
  fetcher.mockImplementation(() => new Promise(() => {}));
  const first = updateApp(); await updateApp(); expect(fetcher).toHaveBeenCalledOnce(); cancel(); await first;
});
it('does not reload when update preparation fails or is cancelled', async () => {
  vi.mocked(showOfflinePreparation).mockResolvedValue(false); await updateApp(); expect(reload).not.toHaveBeenCalled();
});
it('bounds a stalled worker registration and clears its authorization', async () => {
  vi.useFakeTimers(); workers.register.mockImplementation(() => new Promise(() => {}));
  const result = updateApp(); const failure = expect(result).rejects.toThrow(/could not finish/);
  await vi.advanceTimersByTimeAsync(31_000); await failure;
  expect(saved.has(requestKey)).toBe(false); expect(prepareForOffline).not.toHaveBeenCalled(); expect(reload).not.toHaveBeenCalled();
});
it('waits for the installing worker to control the page', async () => {
  worker.state = 'installing'; registration.active = null; registration.installing = worker; workers.controller = null;
  const result = updateApp(); await tick(); expect(prepareForOffline).not.toHaveBeenCalled();
  worker.state = 'activated'; worker.dispatchEvent(new Event('statechange')); expect(prepareForOffline).not.toHaveBeenCalled();
  workers.controller = worker; workers.dispatchEvent(new Event('controllerchange'));
  await result; expect(prepareForOffline).toHaveBeenCalledOnce();
});
it('does not prepare a different version than the one just checked', async () => {
  worker.postMessage.mockImplementation((_message, ports) => ports[0].postMessage({ version: 'aaa111' }));
  await expect(updateApp()).rejects.toThrow(/available version changed/);
  expect(prepareForOffline).not.toHaveBeenCalled(); expect(reload).not.toHaveBeenCalled(); expect(saved.has(requestKey)).toBe(false);
});
it('does not start initial setup while offline', async () => {
  firstVisit(); vi.stubGlobal('navigator', { onLine: false, serviceWorker: workers });
  await initializeApp(); expect(showOfflinePreparation).not.toHaveBeenCalled(); expect(workers.register).not.toHaveBeenCalled();
});

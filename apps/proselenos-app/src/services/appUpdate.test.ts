// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { updateApp } from './appUpdate';
import { prepareForOffline } from './offlinePreparation';
import { showOfflinePreparation } from '@/components/OfflinePreparation';

vi.mock('./offlinePreparation', () => ({ prepareForOffline: vi.fn(async () => {}) }));
vi.mock('@/components/OfflinePreparation', () => ({ showOfflinePreparation: vi.fn() }));
vi.mock('@/utils/app-path', () => ({ appPath: (path: string) => `/ee${path}` }));

let worker: EventTarget & { state: string; postMessage: ReturnType<typeof vi.fn> };
let workers: EventTarget & { controller: typeof worker | null; register: ReturnType<typeof vi.fn> };
let registration: { active: typeof worker | null; waiting: null; installing: typeof worker | null; update: ReturnType<typeof vi.fn> };
let reload: ReturnType<typeof vi.fn>;
let operation: AbortController;
let progress: ReturnType<typeof vi.fn>;
let deleteCache: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.clearAllMocks();
  reload = vi.fn(); deleteCache = vi.fn(); progress = vi.fn(); operation = new AbortController();
  worker = Object.assign(new EventTarget(), { state: 'activated', postMessage: vi.fn((_message, ports) => ports[0].postMessage({ version: 'def456' })) });
  registration = { active: worker, installing: null, waiting: null, update: vi.fn(async () => {}) };
  workers = Object.assign(new EventTarget(), { controller: worker, register: vi.fn(async () => registration) });
  vi.stubGlobal('window', { isSecureContext: true, caches: {}, location: { reload } });
  vi.stubGlobal('navigator', { onLine: true, serviceWorker: workers });
  vi.stubGlobal('caches', { delete: deleteCache });
  vi.mocked(showOfflinePreparation).mockImplementation(async (_dark, prepare) => {
    await prepare(progress, operation.signal);
    return true;
  });
});
afterEach(() => vi.unstubAllGlobals());

it('updates the worker, prepares that exact release, and only then reloads', async () => {
  await updateApp(true);
  expect(showOfflinePreparation).toHaveBeenCalledWith(true, expect.any(Function));
  expect(workers.register).toHaveBeenCalledWith('/ee/sw.js', { updateViaCache: 'none' });
  expect(registration.update).toHaveBeenCalledOnce();
  expect(prepareForOffline).toHaveBeenCalledWith(progress, operation.signal, 'def456');
  expect(reload).toHaveBeenCalledOnce();
  expect(vi.mocked(prepareForOffline).mock.invocationCallOrder[0]).toBeLessThan(reload.mock.invocationCallOrder[0]!);
  expect(deleteCache).not.toHaveBeenCalled();
});

it('waits for the installing worker to activate and control the page before preparing', async () => {
  worker.state = 'installing'; registration.active = null; registration.installing = worker; workers.controller = null;
  const result = updateApp();
  await new Promise(resolve => setImmediate(resolve));
  expect(prepareForOffline).not.toHaveBeenCalled();
  worker.state = 'activated'; worker.dispatchEvent(new Event('statechange'));
  expect(prepareForOffline).not.toHaveBeenCalled();
  workers.controller = worker; workers.dispatchEvent(new Event('controllerchange'));
  await result;
  expect(prepareForOffline).toHaveBeenCalledOnce();
  expect(reload).toHaveBeenCalledOnce();
});

it('does not touch app caches or workers when offline', async () => {
  vi.stubGlobal('navigator', { onLine: false, serviceWorker: workers });
  await expect(updateApp()).rejects.toThrow(/Connect to the internet/);
  expect(workers.register).not.toHaveBeenCalled();
  expect(deleteCache).not.toHaveBeenCalled();
  expect(reload).not.toHaveBeenCalled();
});

it('does not reload when the progress dialog reports cancellation or failure', async () => {
  vi.mocked(showOfflinePreparation).mockResolvedValue(false);
  await updateApp();
  expect(reload).not.toHaveBeenCalled();
});

it('stops before preparing if cancelled while waiting for the new worker', async () => {
  worker.state = 'installing'; registration.installing = worker; workers.controller = null;
  const result = updateApp();
  const rejected = expect(result).rejects.toMatchObject({ name: 'AbortError' });
  await new Promise(resolve => setImmediate(resolve));
  operation.abort();
  await rejected;
  expect(prepareForOffline).not.toHaveBeenCalled();
  expect(reload).not.toHaveBeenCalled();
});

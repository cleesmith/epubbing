// @vitest-environment node
import { createHash, webcrypto } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { prepareForOffline } from './offlinePreparation';

vi.mock('@/generated/release', () => ({ RELEASE_HASH: 'abc123' }));
vi.mock('@/utils/app-path', () => ({ appPath: (value: string) => `/test${value}` }));

const root = 'https://example.test/test/';
const routes = ['./', 'library/', 'authors/', 'reader/', 'reader/view/', '_next/static/chunks/export.js'];
const contents = 'application content';
const fileHash = createHash('sha256').update(contents).digest('hex');
const manifest = () => ({
  schema: 1,
  version: 'abc123',
  files: routes.map((url) => ({ url, bytes: contents.length, sha256: fileHash })),
});
let saved: Map<string, Response>;
let worker: EventTarget & { controller: { scriptURL: string } | null };
let storage: { has: ReturnType<typeof vi.fn>; open: ReturnType<typeof vi.fn> };
let cache: { match: ReturnType<typeof vi.fn>; put: ReturnType<typeof vi.fn> };
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  saved = new Map();
  worker = Object.assign(new EventTarget(), { controller: { scriptURL: `${root}sw.js` } });
  cache = {
    match: vi.fn(async (url: string) => saved.get(url)?.clone()),
    put: vi.fn(async (url: string, response: Response) => { saved.set(url, response.clone()); }),
  };
  storage = { has: vi.fn(async () => true), open: vi.fn(async () => cache) };
  fetchMock = vi.fn(async (url: URL) => new Response(url.pathname.endsWith('offline-manifest.json')
    ? JSON.stringify(manifest()) : contents));
  vi.stubGlobal('window', { isSecureContext: true, location: { origin: 'https://example.test' }, caches: storage });
  vi.stubGlobal('navigator', { serviceWorker: worker });
  vi.stubGlobal('caches', storage);
  vi.stubGlobal('crypto', webcrypto);
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => vi.unstubAllGlobals());

describe('offline preparation', () => {
  it('saves canonical URLs under a base path, verifies them, and reuses checked files', async () => {
    const progress = vi.fn();
    await prepareForOffline(progress, new AbortController().signal);
    expect(storage.open).toHaveBeenCalledWith('epubbing-%2Ftest%2F-abc123');
    expect([...saved.keys()]).toEqual(routes.map((route) => new URL(route, root).href));
    expect(progress).toHaveBeenLastCalledWith({ phase: 'verifying', completed: routes.length, total: routes.length });
    fetchMock.mockClear();
    await prepareForOffline(progress, new AbortController().signal);
    expect(fetchMock).toHaveBeenCalledTimes(1); // Only the versioned file list.
  });

  it('rejects a partial or wrong-version list before saving anything', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ...manifest(), version: 'old' })));
    await expect(prepareForOffline(vi.fn(), new AbortController().signal)).rejects.toThrow(/another version/);
    expect(cache.put).not.toHaveBeenCalled();
  });

  it('does not save an error page returned as HTTP 200', async () => {
    fetchMock.mockImplementation(async (url: URL) => new Response(url.pathname.endsWith('.json')
      ? JSON.stringify(manifest()) : 'Not the requested application file'));
    await expect(prepareForOffline(vi.fn(), new AbortController().signal)).rejects.toThrow(/changed/);
    expect(saved.size).toBe(0);
  });

  it('reports a storage failure instead of completion', async () => {
    cache.put.mockRejectedValue(new DOMException('Browser storage is full', 'QuotaExceededError'));
    const progress = vi.fn();
    await expect(prepareForOffline(progress, new AbortController().signal)).rejects.toThrow(/storage is full/);
    expect(progress.mock.calls.some(([state]) => state.phase === 'verifying')).toBe(false);
  });

  it('stops when cancelled and keeps already downloaded files', async () => {
    const operation = new AbortController();
    await expect(prepareForOffline(({ completed }) => {
      if (completed === 1) operation.abort();
    }, operation.signal)).rejects.toMatchObject({ name: 'AbortError' });
    expect(saved.size).toBe(1);
  });

  it('does not recreate a version cache deleted by an update', async () => {
    storage.has.mockResolvedValue(false);
    await expect(prepareForOffline(vi.fn(), new AbortController().signal)).rejects.toThrow(/changed/);
    expect(storage.open).not.toHaveBeenCalled();
  });

  it('stops if the controlling worker changes', async () => {
    await expect(prepareForOffline(({ completed }) => {
      if (completed === 1) worker.dispatchEvent(new Event('controllerchange'));
    }, new AbortController().signal)).rejects.toThrow(/changed/);
    expect(saved.size).toBe(1);
  });

  it('rejects files outside the app path', async () => {
    const invalid = manifest();
    invalid.files.push({ ...invalid.files[0]!, url: '../another-app/file.js' });
    fetchMock.mockResolvedValue(new Response(JSON.stringify(invalid)));
    await expect(prepareForOffline(vi.fn(), new AbortController().signal)).rejects.toThrow(/invalid address/);
    expect(cache.put).not.toHaveBeenCalled();
  });
});

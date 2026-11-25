// Auto-generated at build time - do not edit manually
// Version: 1a212cac529
const CACHE_VERSION = '1a212cac529';
const APP_ROOT = new URL('./', self.location.href);
const CACHE_PREFIX = 'epubbing-' + encodeURIComponent(APP_ROOT.pathname) + '-';
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;
const CONTROL_CACHE = CACHE_PREFIX + 'control';
const INSTALLED_VERSION = new URL('.ee-installed-version', APP_ROOT).href;
const UPDATE_REQUEST = new URL('.ee-update-request', APP_ROOT).href;

const PRECACHE_URLS = [
  './',
  'library/',
  'reader/',
  'authors/',
  'reader/view/',
].map((url) => new URL(url, APP_ROOT).href);

// Once this update policy is installed, automatic browser checks must never
// replace the chosen release. Reject an unrequested installation before any
// application files are fetched. The first legacy transition has no marker.
async function requireUpdateRequest() {
  const control = await caches.open(CONTROL_CACHE);
  const installed = await control.match(INSTALLED_VERSION);
  if (!self.registration.active || !installed) return;
  if (await installed.text() === CACHE_VERSION) return;
  const request = await control.match(UPDATE_REQUEST);
  const approval = request && await request.json();
  if (approval?.version !== CACHE_VERSION || !Number.isFinite(approval.expires) || approval.expires <= Date.now()) {
    throw new Error('EE keeps the installed release until Update App is chosen.');
  }
}

// Install: pre-cache critical pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    requireUpdateRequest().then(() => caches.open(CACHE_NAME))
      .then((cache) => {
        return Promise.all(
          PRECACHE_URLS.map((url) => {
            return fetch(url, { cache: 'no-store' })
              .then((response) => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              })
              .catch((err) => {
                console.warn(`Failed to pre-cache ${url}:`, err);
              });
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Identify the controlling release before its offline files are prepared.
self.addEventListener('message', (event) => {
  if (event.data?.type === 'EE_APP_VERSION') {
    event.ports[0]?.postMessage({ version: CACHE_VERSION });
  }
});

// Activate: clean old caches, take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.open(CONTROL_CACHE).then(async (control) => {
      await control.put(INSTALLED_VERSION, new Response(CACHE_VERSION));
      await control.delete(UPDATE_REQUEST);
    }).then(() => caches.keys())
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME && name !== CONTROL_CACHE)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first for pages, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin || !url.pathname.startsWith(APP_ROOT.pathname)) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Never cache the service worker script itself (defensive)
  if (url.href === self.location.href) {
    return;
  }

  // Preparation verifies the network bytes before saving canonical cache entries.
  // Never serve or retain a stale/error response under its versioned query URL.
  if (url.searchParams.has('offline-prep')) {
    event.respondWith(fetch(request, { cache: 'no-store' }));
    return;
  }

  // Navigation requests (HTML pages) - cache-first
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => cache.match(request)).then((cached) => {
        if (cached?.ok) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Static assets (/_next/static/*) - cache-first (hashed, safe to cache)
  if (url.pathname.startsWith(new URL('_next/static/', APP_ROOT).pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => cache.match(request)).then((cached) => {
        if (cached?.ok) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // RSC payloads and other requests - network-first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.open(CACHE_NAME).then((cache) => cache.match(request)))
  );
});

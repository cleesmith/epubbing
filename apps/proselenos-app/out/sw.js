// Auto-generated at build time - do not edit manually
// Version: 1a12b870332
const CACHE_VERSION = '1a12b870332';
const CACHE_NAME = `everythingebooks-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/library/',
  '/authors/',
  '/reader/view/',
  '/ffmpeg/ffmpeg-core.js',
  '/ffmpeg/ffmpeg-core.wasm',
];

// Install: pre-cache critical pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.all(
          PRECACHE_URLS.map((url) => {
            return fetch(url)
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

// Activate: clean old caches, take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('everythingebooks-') && name !== CACHE_NAME)
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
  if (url.origin !== self.location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Never cache the service worker script itself (defensive)
  if (url.pathname === '/sw.js') {
    return;
  }

  // Navigation requests (HTML pages) - cache-first
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Static assets (/_next/static/*) - cache-first (hashed, safe to cache)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
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
      .catch(() => caches.match(request))
  );
});

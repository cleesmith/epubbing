const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const assert = require('node:assert/strict');

const script = path.join(__dirname, 'generate-sw.js');
let generated;
vm.runInNewContext(readFileSync(script, 'utf8'), {
  __dirname: path.dirname(script), console: { log() {} },
  require(name) {
    if (name === 'path') return path;
    if (name === 'child_process') return {};
    if (name === 'fs') return { mkdirSync() {}, writeFileSync(filename, text) { if (filename.endsWith('/sw.js')) generated = text; } };
    throw Error(name);
  },
});

function worker() {
  const saved = new Map();
  let handler, fetches = 0, status = 200;
  const cache = {
    async match(request) { return saved.get(request.url)?.clone(); },
    async put(request, response) { saved.set(request.url, response.clone()); },
  };
  vm.runInNewContext(generated, {
    URL, console,
    self: { location: new URL('https://example.test/ee/sw.js'), addEventListener(name, fn) { if (name === 'fetch') handler = fn; } },
    caches: { async open() { return cache; } },
    async fetch() { fetches++; return new Response(status === 200 ? 'real file' : 'unavailable', {status}); },
  });
  return {
    saved,
    get fetches() { return fetches; },
    set status(value) { status = value; },
    async request(url, mode = 'cors') {
      let result;
      handler({request: {url, method:'GET', mode}, respondWith(p) {result = p;} });
      const response = await result;
      await new Promise(resolve => setImmediate(resolve));
      return response;
    },
  };
}
const font = 'https://example.test/ee/_next/static/media/KaTeX.woff2';
test('a temporary 503 is not saved as the font', async () => {
  const w = worker(); w.status = 503;
  assert.equal((await w.request(font)).status, 503);
  w.status = 200;
  assert.equal((await w.request(font)).status, 200);
  assert.equal(w.fetches, 2);
});
test('previously cached error responses are replaced', async () => {
  const w = worker(); w.saved.set(font, new Response('unavailable', {status:503}));
  assert.equal((await w.request(font)).status, 200);
  assert.equal(w.saved.get(font).status, 200);
});
test('offline preparation bypasses even a successful stale cache entry', async () => {
  const w = worker(); const url=font+'?offline-prep=abc123';
  w.saved.set(url, new Response('stale file'));
  assert.equal(await (await w.request(url)).text(), 'real file');
  assert.equal(w.fetches, 1);
});
test('preparation responses are left for the verifier to save under canonical URLs', async () => {
  const w = worker(); const url=font+'?offline-prep=abc123';
  await w.request(url);
  assert.equal(w.saved.has(url), false);
});
test('valid cached assets still work without a network request', async () => {
  const w = worker(); w.saved.set(font, new Response('cached file'));
  assert.equal(await (await w.request(font)).text(), 'cached file');
  assert.equal(w.fetches, 0);
});
test('a navigation error is not saved as an offline page', async () => {
  const w = worker();const url='https://example.test/ee/library/';w.status=503;
  await w.request(url, 'navigate');w.status=200;
  assert.equal((await w.request(url, 'navigate')).status, 200);
});

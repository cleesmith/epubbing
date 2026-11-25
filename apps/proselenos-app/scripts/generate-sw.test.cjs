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

// Exercise the generated install/activate handlers, not source-text matching.
function lifecycle({ active = true, installed = 'old123', approved, expires } = {}) {
  const version = generated.match(/const CACHE_VERSION = '([a-f0-9]+)'/)[1];
  const prefix = 'epubbing-%2Fee%2F-';
  const controlName = prefix + 'control';
  const installedKey = 'https://example.test/ee/.ee-installed-version';
  const requestKey = 'https://example.test/ee/.ee-update-request';
  const stores = new Map([[prefix + 'old123', new Map([['old-page', new Response('old app')]])]]);
  const control = new Map(); stores.set(controlName, control);
  if (installed) control.set(installedKey, new Response(installed));
  if (approved) control.set(requestKey, new Response(JSON.stringify({ version: approved === 'current' ? version : approved, expires })));
  const handlers = {}; let fetches = 0, skipped = 0;
  vm.runInNewContext(generated, {
    URL, Response, console,
    self: {
      location: new URL('https://example.test/ee/sw.js'), registration: { active: active ? {} : null },
      addEventListener(name, fn) { handlers[name] = fn; },
      async skipWaiting() { skipped++; }, clients: { async claim() {} },
    },
    caches: {
      async open(name) {
        if (!stores.has(name)) stores.set(name, new Map()); const data = stores.get(name);
        return { async match(key) { return data.get(key)?.clone(); },
          async put(key, response) { data.set(key, response.clone()); }, async delete(key) { return data.delete(key); } };
      },
      async keys() { return [...stores.keys()]; }, async delete(name) { return stores.delete(name); },
    },
    async fetch() { fetches++; return new Response('new app'); },
  });
  return { version, stores, control, prefix, controlName, installedKey, requestKey,
    get fetches() { return fetches; }, get skipped() { return skipped; },
    async run(name) { let done; handlers[name]({ waitUntil(p) { done = p; } }); return done; },
  };
}
test('automatic browser checks cannot install or fetch a newer app after the policy is installed', async () => {
  const w = lifecycle(); await assert.rejects(w.run('install'), /until Update App/);
  assert.equal(w.fetches, 0); assert.equal(w.skipped, 0);
  assert.equal(await w.stores.get(w.prefix + 'old123').get('old-page').text(), 'old app');
});
test('a deliberate update installs the exact approved version and keeps policy state', async () => {
  const w = lifecycle({ approved: 'current', expires: Date.now() + 120_000 });
  await w.run('install'); await w.run('activate');
  assert.equal(w.fetches, 5); assert.equal(w.skipped, 1);
  assert.equal(await w.control.get(w.installedKey).text(), w.version);
  assert.equal(w.control.has(w.requestKey), false);
  assert.equal(w.stores.has(w.controlName), true);
  assert.equal(w.stores.has(w.prefix + 'old123'), false);
});
for (const approval of [
  { approved: 'wrong123', expires: Date.now() + 120_000 },
  { approved: 'current', expires: Date.now() - 1 },
  { approved: 'current' },
]) test('missing, wrong, or expired approval cannot install a new release: ' + JSON.stringify(approval), async () => {
  const w = lifecycle(approval); await assert.rejects(w.run('install'), /until Update App/); assert.equal(w.fetches, 0);
});
test('a genuinely new browser can install without having a version already', async () => {
  const w = lifecycle({ active: false, installed: null }); await w.run('install'); await w.run('activate');
  assert.equal(w.skipped, 1); assert.equal(await w.control.get(w.installedKey).text(), w.version);
});
test('the one-time transition from legacy releases installs the manual update policy', async () => {
  const w = lifecycle({ active: true, installed: null }); await w.run('install'); await w.run('activate');
  assert.equal(await w.control.get(w.installedKey).text(), w.version);
});

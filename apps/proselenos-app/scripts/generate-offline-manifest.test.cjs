const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { generateOfflineManifest } = require('./generate-offline-manifest.cjs');

test('lists lazy assets and bookmark URLs without caching itself or changing the worker', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'epubbing-offline-'));
  try {
    const worker = "const CACHE_VERSION = 'abc123';";
    fs.writeFileSync(path.join(root, 'sw.js'), worker);
    for (const file of ['index.html', 'library/index.html', 'authors/index.html', 'reader/index.html',
      'reader/view/index.html', 'authors.txt', '_next/static/chunks/lazy.js', 'fonts/Book Font.ttf',
      'ffmpeg/core.wasm', '_next/static/chunks/lazy.js.map']) {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
      fs.writeFileSync(path.join(root, file), 'sample');
    }
    const manifest = generateOfflineManifest(root);
    const urls = manifest.files.map((file) => file.url);
    assert.ok(urls.includes('library/'));
    assert.ok(urls.includes('library/index.html'));
    assert.ok(urls.includes('authors.txt'));
    assert.ok(urls.includes('_next/static/chunks/lazy.js'));
    assert.ok(urls.includes('fonts/Book%20Font.ttf'));
    assert.ok(urls.includes('ffmpeg/core.wasm'));
    assert.ok(!urls.includes('sw.js'));
    assert.ok(!urls.includes('offline-manifest.json'));
    assert.ok(!urls.some((url) => url.endsWith('.map')));
    assert.equal(manifest.files[0].bytes, 6);
    assert.match(manifest.files[0].sha256, /^[a-f0-9]{64}$/);
    assert.equal(fs.readFileSync(path.join(root, 'sw.js'), 'utf8'), worker);
    assert.deepEqual(generateOfflineManifest(root), manifest);
    fs.rmSync(path.join(root, 'authors/index.html'));
    assert.throws(() => generateOfflineManifest(root), /missing authors/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

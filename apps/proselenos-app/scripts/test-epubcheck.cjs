const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { Worker } = require('node:worker_threads');
const { createHash } = require('node:crypto');
const { generateOfflineManifest } = require('./generate-offline-manifest.cjs');
const root = path.resolve(__dirname, '..');

function runChecker(bytes) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`
      const { parentPort, workerData } = require('node:worker_threads');
      globalThis.self = { postMessage: message => parentPort.postMessage(message) };
      import(workerData.url).then(() => {
        self.onmessage({ data: { type: 'check', file: new Blob([workerData.bytes]), filename: 'test.epub' } });
      }).catch(error => { throw error; });
    `, { eval: true, workerData: { bytes, url: pathToFileURL(path.join(root, 'public/epubcheck/worker.js')).href } });
    const timer = setTimeout(() => { worker.terminate(); reject(new Error('Checker timed out')); }, 60000);
    worker.on('error', error => { clearTimeout(timer); worker.terminate(); reject(error); });
    worker.on('message', message => {
      if (message.type === 'progress') return;
      clearTimeout(timer);
      worker.terminate();
      if (message.type === 'error') reject(new Error(message.message));
      else resolve(message.result);
    });
  });
}

const fixture = name => fs.readFileSync(path.join(__dirname, 'epubcheck-fixtures', name));

test('the real browser engine accepts the valid fixture and rejects a broken reading link', async () => {
  const passing = await runChecker(fixture('passing.epub'));
  assert.equal(passing.valid, true, passing.stdout + passing.stderr);
  assert.equal(passing.exitCode, 0);
  assert.equal(passing.version, '5.4.0');
  assert.ok(!passing.messages.some(message => ['ERROR', 'FATAL', 'WARNING'].includes(message.severity)));
  const broken = await runChecker(fixture('broken-link.epub'));
  assert.equal(broken.valid, false);
  assert.ok(broken.messages.some(message => ['ERROR', 'FATAL'].includes(message.severity) && /missing/i.test(message.message + message.path)));
});

test('the real engine reports a warning and never treats corrupt bytes as a clean EPUB', async () => {
  const warning = await runChecker(fixture('warning.epub'));
  assert.ok(warning.messages.some(message => message.severity === 'WARNING'), warning.stdout + warning.stderr);
  const corrupt = await runChecker(Buffer.from('This is not an EPUB.'));
  assert.equal(corrupt.valid, false);
  assert.ok(corrupt.messages.some(message => ['ERROR', 'FATAL'].includes(message.severity)));
});

test('all bundled validator bytes match their pinned provenance', () => {
  const vendor = path.join(root, 'public/epubcheck/vendor');
  const provenance = JSON.parse(fs.readFileSync(path.join(vendor, 'provenance.json'), 'utf8'));
  for (const [file, hash] of Object.entries(provenance.files)) {
    assert.equal(createHash('sha256').update(fs.readFileSync(path.join(vendor, file))).digest('hex'), hash, file);
  }
});

test('offline preparation includes every checker module and engine asset', () => {
  const os = require('node:os');
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ee-epubcheck-'));
  try {
    fs.cpSync(path.join(root, 'public/epubcheck'), path.join(temp, 'epubcheck'), { recursive: true });
    fs.writeFileSync(path.join(temp, 'sw.js'), "const CACHE_VERSION = 'abc123';");
    for (const file of ['index.html', 'library/index.html', 'authors/index.html', 'reader/index.html', 'reader/view/index.html']) {
      fs.mkdirSync(path.dirname(path.join(temp, file)), { recursive: true });
      fs.writeFileSync(path.join(temp, file), '<!doctype html>');
    }
    const urls = new Set(generateOfflineManifest(temp).files.map(file => file.url));
    assert.ok(urls.has('epubcheck/worker.js'));
    const provenance = JSON.parse(fs.readFileSync(path.join(temp, 'epubcheck/vendor/provenance.json'), 'utf8'));
    for (const file of Object.keys(provenance.files)) assert.ok(urls.has('epubcheck/vendor/' + file), file);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});

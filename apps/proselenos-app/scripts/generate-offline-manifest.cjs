// Run after next build: include the actual exported files, including lazy chunks.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

function generateOfflineManifest(outDir) {
  const worker = fs.readFileSync(path.join(outDir, 'sw.js'), 'utf8');
  const version = worker.match(/const CACHE_VERSION = '([a-f0-9]+)'/)?.[1];
  if (!version) throw new Error('Cannot identify the exported application version');

  const files = [];
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(filename);
      } else if (entry.isFile()) {
        const relative = path.relative(outDir, filename).split(path.sep).join('/');
        if (['sw.js', 'offline-manifest.json', '_headers', '_redirects'].includes(relative)) continue;
        if (/\.(map|LICENSE\.txt)$/.test(relative)) continue;
        const bytes = fs.readFileSync(filename);
        const file = {
          url: relative.split('/').map(encodeURIComponent).join('/'),
          bytes: bytes.length,
          sha256: createHash('sha256').update(bytes).digest('hex'),
        };
        files.push(file);
        // A bookmark requests /library/, not /library/index.html.
        if (relative === 'index.html' || relative.endsWith('/index.html')) {
          files.push({ ...file, url: file.url.slice(0, -'index.html'.length) || './' });
        }
      }
    }
  };
  visit(outDir);
  files.sort((a, b) => a.url.localeCompare(b.url));
  for (const required of ['./', 'library/', 'authors/', 'reader/', 'reader/view/']) {
    if (!files.some((file) => file.url === required)) {
      throw new Error(`Offline preparation is missing ${required}`);
    }
  }
  const manifest = { schema: 1, version, files };
  fs.writeFileSync(path.join(outDir, 'offline-manifest.json'), JSON.stringify(manifest));
  return manifest;
}

if (require.main === module) {
  const manifest = generateOfflineManifest(path.resolve(__dirname, '../out'));
  console.log(`Offline preparation: ${manifest.files.length} files for ${manifest.version}`);
}

module.exports = { generateOfflineManifest };

/**
 * EverythingEbooks local version bump
 *
 * Run from the epubbing repository root:
 *
 *   node bump-version.mjs
 *
 * EE assigns a new version each time pnpm builds the app. This script runs
 * that build, checks the version in the menu source, the exported service
 * worker and the offline manifest, and prints the old and new local IDs.
 *
 * To test Update App, open the first build and note its menu version.
 * Run this command again. When the build finishes, test Authors and Library
 * in the same browser profile at the same hostname and port. A fresh port
 * is useful when starting a separate test with a clean browser origin.
 *
 * For production, use your usual deploy.sh workflow. That script builds
 * again, so its printed version is the one to compare on GitHub Pages.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const app = join(root, 'apps', 'proselenos-app');
const manifest = join(app, 'out', 'offline-manifest.json');

function readVersion() {
  return JSON.parse(readFileSync(manifest, 'utf8')).version;
}

function bumpVersion() {
  if (!existsSync(join(app, 'scripts', 'generate-offline-manifest.cjs'))) {
    throw new Error('Place bump-version.mjs in the root of your epubbing repository.');
  }

  const previous = existsSync(manifest) ? readVersion() : undefined;
  const build = spawnSync('pnpm', ['build'], {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (build.error) throw build.error;
  if (build.status !== 0) throw new Error('The EE build did not finish successfully.');

  const current = readVersion();
  const worker = readFileSync(join(app, 'out', 'sw.js'), 'utf8');
  const release = readFileSync(join(app, 'src', 'generated', 'release.ts'), 'utf8');
  if (typeof current !== 'string' || !/^[a-f0-9]+$/.test(current) ||
      !worker.includes(`const CACHE_VERSION = '${current}'`) ||
      !release.includes(`RELEASE_HASH = '${current}'`)) {
    throw new Error('The menu, service worker and offline manifest do not agree on the version.');
  }
  if (current === previous) throw new Error('The build produced the same version.');

  console.log('\nPrevious local build:', previous ?? '(first build)');
  console.log('New local build:', current);
  console.log('For both builds, use the same browser profile, hostname and port.');
  console.log('Keep using your existing server. To start a fresh pair of local tests:');
  console.log('pnpm dlx http-server apps/proselenos-app/out -p 62483 -a 127.0.0.1 -c-1');
  console.log('http://127.0.0.1:62483/');
}

try {
  bumpVersion();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

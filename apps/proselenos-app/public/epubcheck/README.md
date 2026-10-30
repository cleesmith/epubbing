# EE browser EPUBCheck

This directory is served with EE and included by its existing offline manifest.
It is loaded only when the author requests a check. No network service receives
the EPUB, and there is no CDN or runtime package installation.

`worker.js` is an ordinary module Web Worker, outside Next/Webpack bundling.
The UI owns and terminates it after completion, cancellation, failure, or close.
The Blob reader requests slices instead of copying the EPUB into one more buffer.
Export preparation still uses EE's existing JSZip path and can take memory
proportional to the book size.

Vendor: epubcheck-standalone 5.4.0-build3, compiling EPUBCheck 5.4.0 with TeaVM.
Source: https://github.com/jlarmstrongiv/epubcheck-standalone

The `vendor` directory contains the published browser JavaScript and license
notices. `vendor/provenance.json` records package integrity and per-file hashes.
Only `vendor/version.js` is adapted, replacing its package-metadata import with
the identical literal version. No validation rules are changed. The package's
Node >=24 restriction does not apply to these precompiled browser files; EE's
existing build does not install or compile that package.

There are no result storage calls. Reports and status exist only in component
memory while the dialog is open. The sole report download is plain text. The
worker uses the default profile and English diagnostics, with no repair step.

Run `node scripts/test-epubcheck.cjs` from the app directory for the real-engine
and offline-manifest checks. It requires Node 22.14 or later and no Java.
The small passing and broken-link fixtures are generated examples. The warning
fixture comes from the upstream demo (`public/fixtures/test_warn.epub` at commit
06585eb49516f160592a54cd784da499a0194536), under the included BSD license.

When updating the vendor, retrieve a pinned published npm tarball, verify its
registry integrity, copy the browser module graph and engine, apply the version
adaptation, and update the provenance hashes. Re-run the real-engine tests,
browser cancellation/report tests, and a first-use offline check after Prep for
offline use. Do not use a remote engine URL or replace the default profile with
EDUPUB. Keep browser files, engine, and provenance from the same package build.

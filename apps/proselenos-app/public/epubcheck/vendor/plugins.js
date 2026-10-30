//#region src/plugins.ts
const DISPOSE = Symbol.dispose ?? Symbol.for("Symbol.dispose");
/** Does this backend expose the four synchronous fd calls? (fallback route) */
function hasSyncFsApi(impl) {
	const o = impl;
	return typeof o.openSync === "function" && typeof o.fstatSync === "function" && typeof o.readSync === "function" && typeof o.closeSync === "function";
}
/**
* Resolve the PREFERRED promise-based API from a backend, or null if it has
* none. A backend's own `.promises.open` (node:fs, ZenFS `fs`) wins first; a
* backend that IS a promises namespace (`open` present, node:fs/promises) is
* used directly, but only when it has no sync fd methods -- that guard dodges
* node's callback-based `fs.open`, which is also a function yet returns no
* promise (node:fs is always reached via its `.promises` namespace instead).
*/
function resolvePromisesApi(impl) {
	const ns = impl.promises;
	if (ns && typeof ns.open === "function") return ns;
	if (typeof impl.open === "function" && !hasSyncFsApi(impl)) return impl;
	return null;
}
const cleanupRegistry = typeof FinalizationRegistry === "function" ? new FinalizationRegistry((guard) => {
	if (guard.disposed) return;
	guard.disposed = true;
	guard.release();
}) : null;
function withCleanup(source, rawRelease) {
	const guard = {
		disposed: false,
		release: rawRelease
	};
	const token = {};
	source[DISPOSE] = () => {
		if (guard.disposed) return;
		guard.disposed = true;
		if (cleanupRegistry) cleanupRegistry.unregister(token);
		rawRelease();
	};
	if (cleanupRegistry) cleanupRegistry.register(source, guard, token);
	return source;
}
/**
* Range source over a File or Blob. Reads are ASYNC on every thread: `read`
* returns a promise from `blob.slice(offset, end).arrayBuffer()` and the engine
* SUSPENDS mid-run until it resolves -- the same pause mechanism URL downloads
* use. `Blob.slice().arrayBuffer()` is main-thread-legal in every browser, so
* File/Blob validation works on the browser MAIN thread and in Workers alike
* with no thread blocking (the library spawns no Worker either way).
*
* A user-picked File or a `fetch(...).then((r) => r.blob())` is disk-backed by
* the browser, and `blob.slice()` reads lazily, so this plugin only ever pulls
* the requested range from the Blob -- the engine streams those ranges mid-run
* (see the module's MEMORY MODEL note), so multi-GB books validate from a Blob
* without ever being loaded whole.
*
* The same holds for IndexedDB: IDB stores Blobs natively, and browsers back
* large stored Blobs with disk files, so a Blob read back from IndexedDB keeps
* the lazy `slice()` behavior. Store the book as a Blob in IDB and hand it
* straight to this plugin -- no extra copy on the plugin side.
*/
function blob(fileOrBlob) {
	const source = {
		size: fileOrBlob.size,
		read: async (offset, length) => new Uint8Array(await fileOrBlob.slice(offset, offset + length).arrayBuffer()),
		[DISPOSE]() {}
	};
	const maybeName = fileOrBlob.name;
	if (typeof maybeName === "string" && maybeName.length > 0) source.name = maybeName;
	return source;
}
/** Is this value a URL input source (as opposed to a range/directory source)? */
function isUrlSource(value) {
	return typeof value === "object" && value !== null && typeof value.url === "string" && typeof value.openBridge === "function" && typeof value.read !== "function";
}
/**
* Build the URL input source for an http(s) URL. See {@link UrlSource}: the
* URL itself is the input epubcheck sees, so message locations carry the URL
* (jar parity) and the body is downloaded mid-run over an async fetch while
* the engine is suspended -- spooled to disk in Node (no whole-body-in-memory,
* no size cap) and held in memory in browsers (subject to the target server's
* CORS policy there). Redirects are followed before the final status is
* reported, matching the jar's HttpURLConnection default.
*
* The event loop stays FREE while the engine downloads (the engine suspends;
* the fetch is plain async), so a URL served by an in-process server
* validates from the same thread, and browsers can validate URL inputs on
* the MAIN thread -- no Worker required, and the library spawns none.
*/
async function url(input) {
	if (typeof input !== "string" || !/^https?:\/\//.test(input)) throw new Error(`url: "${input}" is not an http(s) URL`);
	return {
		url: input,
		async openBridge() {
			const isNode = typeof process !== "undefined" && typeof process.versions?.node === "string" && typeof globalThis.importScripts !== "function";
			const bridge = await import("./http-bridge.js");
			return isNode ? bridge.createHttpBridgeNode() : bridge.createHttpBridgeFetch();
		},
		[DISPOSE]() {}
	};
}
/**
* Range source over a Uint8Array already in memory. Only sensible for SMALL
* bundled files (the whole book sits in RAM); prefer blob/opfs/fs otherwise.
*/
function memory(bytes) {
	return {
		size: bytes.length,
		read: (offset, length) => bytes.subarray(offset, offset + length),
		[DISPOSE]() {}
	};
}
/** Does this value look like a FileSystemFileHandle (kind "file" + getFile)? */
function isFileSystemFileHandle(value) {
	return typeof value === "object" && value !== null && value.kind === "file" && typeof value.getFile === "function";
}
/**
* Range source over a file in OPFS (origin private file system). Async-first,
* so it works on the browser MAIN thread as well as in Workers: the file is
* resolved to a `FileSystemFileHandle`, `getFile()` gives a `File` (a Blob
* snapshot), and each read awaits `file.slice(offset, end).arrayBuffer()` --
* byte-for-byte the same technique as `blob()`, so the engine suspends per
* cache-miss block. `getFile()` is main-thread-legal in every browser that has
* OPFS at all (Chrome/Edge 86+, Firefox 111+, Safari 15.2+); Safari's OPFS gap
* is on WRITING, and this plugin only reads.
*
* Accepts:
*   - an OPFS path string ("dir/book.epub", resolved from the OPFS root) --
*     the primary, any-thread route;
*   - a `FileSystemFileHandle` directly (the natural input for a main-thread
*     caller who already holds one) -- also the async any-thread route;
*   - an already-created `FileSystemSyncAccessHandle` -- the one SYNCHRONOUS
*     carve-out: you cannot obtain a `File` from a sync access handle, so this
*     input reads through the handle's synchronous `read` loop and is therefore
*     dedicated-Worker-only (sync access handles exist nowhere else, by spec).
*
* The factory is async (resolving/opening the file awaits). Disposal closes the
* sync access handle only when this plugin opened it; the async `File` route
* has nothing to release (the File is browser-managed), so dispose is a no-op.
*/
async function opfs(pathOrHandle) {
	let fileHandle = null;
	if (typeof pathOrHandle === "string") {
		let dir = await navigator.storage.getDirectory();
		const parts = pathOrHandle.split("/").filter(Boolean);
		for (let i = 0; i < parts.length - 1; i++) dir = await dir.getDirectoryHandle(parts[i], { create: false });
		fileHandle = await dir.getFileHandle(parts[parts.length - 1], { create: false });
	} else if (isFileSystemFileHandle(pathOrHandle)) fileHandle = pathOrHandle;
	if (fileHandle) {
		const file = await fileHandle.getFile();
		const source = {
			size: file.size,
			read: async (offset, length) => new Uint8Array(await file.slice(offset, offset + length).arrayBuffer()),
			[DISPOSE]() {}
		};
		if (file.name.length > 0) source.name = file.name;
		return source;
	}
	const handle = pathOrHandle;
	return withCleanup({
		size: handle.getSize(),
		read: (offset, length) => {
			const buf = new Uint8Array(length);
			let done = 0;
			while (done < length) {
				const n = handle.read(buf.subarray(done), { at: offset + done });
				if (n <= 0) throw new Error(`short OPFS read at ${offset + done}`);
				done += n;
			}
			return buf;
		},
		[DISPOSE]() {}
	}, () => {});
}
/**
* Range source over a file on a filesystem, using positional reads -- the file
* stays on disk and the plugin only ever holds the requested range, which the
* engine streams mid-run (see the MEMORY MODEL note at the top of this module)
* -- multi-GB books validate at flat memory.
*
* By default the implementation is node:fs (imported lazily, so this module
* stays importable in the browser). Pass `options.fs` to inject ANY
* fs-compatible implementation instead -- the motivating case is ZenFS in the
* browser (zip mounts, IndexedDB stores, cloud backends).
*
* The plugin PREFERS a promise-based FileHandle API and only falls back to the
* synchronous one:
*
*   PREFERRED -- the node:fs/promises shape ({@link FsPromisesLike}), reached
*   via the backend's `.promises` namespace (node:fs, ZenFS `fs`) or on the
*   backend directly (node:fs/promises, a promises-only store):
*     open(path, 'r') -> Promise<FileHandle>
*     FileHandle.stat() -> Promise<{ size }>
*     FileHandle.read(buffer, offset, length, position) -> Promise<{ bytesRead }>
*     FileHandle.close() -> Promise<void>
*   Reads return promises, so the engine suspends per cache-miss block -- which
*   is what lets an ASYNC-ONLY backend back this plugin end to end (the factory
*   is already awaited, so opening and stat-ing the size up front may await too).
*
*   FALLBACK -- the four synchronous, fd-positional calls of {@link FsLike}
*   (openSync/fstatSync/readSync/closeSync), used when the backend exposes no
*   promise-based `open`. Reads stay synchronous (the engine never suspends).
*
* An UNREADABLE file (open fails with EACCES/EPERM) is DEFERRED, not thrown:
* this returns a source whose every read throws the Java-shaped
* "<path> (Permission denied)" (or "(Operation not permitted)" for EPERM)
* message, so EPUBCheck reports it as FATAL(PKG-008) itself -- byte-identical
* to the jar (localization included), exactly as the native jar defers the
* lazy open inside the checker. Any OTHER open failure still throws (fail
* fast). The deferred source carries the same name and host directory a
* readable one would, so the reported path matches too.
*
* Nothing else is touched. `read` loops on short reads; the returned view
* reuses an internal scratch buffer (valid until the next `read`).
*/
async function fs(path, options = {}) {
	const impl = options.fs || await import("node:fs");
	let source;
	let release;
	const promises = resolvePromisesApi(impl);
	if (promises) {
		let handle;
		try {
			handle = await promises.open(path, "r");
		} catch (e) {
			return deferUnreadable(path, e, options);
		}
		const size = (await handle.stat()).size;
		let scratch = /* @__PURE__ */ new Uint8Array(0);
		source = {
			size,
			read: async (offset, length) => {
				if (scratch.length < length) scratch = new Uint8Array(length);
				let done = 0;
				while (done < length) {
					const { bytesRead } = await handle.read(scratch, done, length - done, offset + done);
					if (bytesRead <= 0) throw new Error(`short read at ${offset + done} (wanted ${length})`);
					done += bytesRead;
				}
				return scratch.subarray(0, length);
			},
			[DISPOSE]() {}
		};
		release = () => {
			const p = handle.close();
			if (p && typeof p.then === "function") p.catch(() => {});
		};
	} else if (hasSyncFsApi(impl)) {
		let fd;
		try {
			fd = impl.openSync(path, "r");
		} catch (e) {
			return deferUnreadable(path, e, options);
		}
		const size = impl.fstatSync(fd).size;
		let scratch = /* @__PURE__ */ new Uint8Array(0);
		source = {
			size,
			read: (offset, length) => {
				if (scratch.length < length) scratch = new Uint8Array(length);
				let done = 0;
				while (done < length) {
					const n = impl.readSync(fd, scratch, done, length - done, offset + done);
					if (n <= 0) throw new Error(`short read at ${offset + done} (wanted ${length})`);
					done += n;
				}
				return scratch.subarray(0, length);
			},
			[DISPOSE]() {}
		};
		release = () => impl.closeSync(fd);
	} else throw new Error("fs: the injected fs exposes neither a promise-based open() (node:fs/promises shape) nor the synchronous fd API (openSync/fstatSync/readSync/closeSync) -- cannot back the fs() source");
	attachFsMeta(source, path, !!options.fs);
	return withCleanup(source, release);
}
/**
* Attach the reported name (the path's last segment) and, when the path is a
* real host path (default node:fs + POSIX-absolute; see {@link hostParentDir}),
* the host parent directory. Shared by the readable and the deferred-unreadable
* fs() sources so both report identical name/path metadata.
*/
function attachFsMeta(source, path, injected) {
	const base = lastSegment(path);
	if (base.length > 0) source.name = base;
	const hostDir = hostParentDir(path, injected);
	if (hostDir !== void 0) source.hostDir = hostDir;
}
/**
* Build the DEFERRED source for an unreadable file, matching the jar. Called
* when fs()'s open() fails: if the failure is EACCES or EPERM ONLY, hand the
* engine a source whose every read throws the Java-shaped message
* `<path> (Permission denied)` (or `(Operation not permitted)` for EPERM), so
* EPUBCheck surfaces it as FATAL(PKG-008) itself -- byte-identical to the jar's
* lazy-open failure, localization included. Any OTHER open error is rethrown
* (fail fast). The source carries the same name + hostDir a readable one would.
*/
async function deferUnreadable(path, err, options) {
	const code = err?.code;
	if (code !== "EACCES" && code !== "EPERM") throw err;
	const message = `${path} (${code === "EPERM" ? "Operation not permitted" : "Permission denied"})`;
	let size = 1;
	try {
		const p = await import("node:fs/promises");
		size = Math.max((await p.stat(path)).size, 1);
	} catch {}
	const source = {
		size,
		read: () => {
			throw new Error(message);
		},
		[DISPOSE]() {}
	};
	attachFsMeta(source, path, !!options.fs);
	return withCleanup(source, () => {});
}
/** Is this value a directory source (as opposed to a range source or a Blob)? */
function isDirectorySource(value) {
	return typeof value === "object" && value !== null && typeof value.list === "function" && typeof value.read === "function";
}
/**
* Reject anything that could escape the directory root when the engine mounts
* the listing: absolute paths, backslashes, and empty/"."/".." segments. The
* Java side enforces the same rules again (neither side trusts the other).
*/
/**
* A bounded-concurrency limiter shared across a whole recursive directory walk.
* Same idea as the lane pool in teavm/reports-teavm.ts, but a shared permit
* budget (rather than a flat lane count) so recursion at any depth cannot fan
* out past the cap and exhaust file descriptors. `run(fn)` waits for a permit,
* runs `fn`, and releases the permit — no permit is ever held across a nested
* `run`, so the recursive walks below cannot deadlock.
*/
function createConcurrencyLimiter(limit) {
	let permits = limit;
	const waiters = [];
	const acquire = () => {
		if (permits > 0) {
			permits -= 1;
			return Promise.resolve();
		}
		return new Promise((resolve) => waiters.push(resolve));
	};
	const release = () => {
		const next = waiters.shift();
		if (next) next();
		else permits += 1;
	};
	return async (fn) => {
		await acquire();
		try {
			return await fn();
		} finally {
			release();
		}
	};
}
/**
* Concurrency cap for directory-walk metadata gathering (stat / getFile). The
* walk order is preserved deterministically regardless of this value (results
* are reassembled by sorted index), so this only bounds in-flight IO.
*/
const DIR_WALK_CONCURRENCY = 16;
function assertSafeRelativePath(path, plugin) {
	const bad = () => {
		throw new Error(`${plugin}: unsafe relative path "${path}" -- paths must be relative, '/'-separated, with no empty, ".", or ".." segments and no backslashes`);
	};
	if (typeof path !== "string" || path.length === 0) bad();
	if (path.startsWith("/") || path.includes("\\")) bad();
	for (const segment of path.split("/")) if (segment === "" || segment === "." || segment === "..") bad();
}
/** Shared guard: a File/Blob is a single file, never a directory. */
function assertNotBlob(value, plugin, hint) {
	if (typeof Blob !== "undefined" && value instanceof Blob) throw new Error(`${plugin}: got a single File/Blob where a DIRECTORY is required. ${hint}`);
}
/** The last path segment ('' when there is none), for defaulting names. */
function lastSegment(path) {
	return path.replace(/[\\/]+$/, "").split(/[\\/]/).pop() ?? "";
}
/**
* The REAL host parent directory to attach to a Node fs source (see
* RangeSource.hostDir / EngineRun.hostDir). Returns undefined -- so the engine
* keeps its internal-path behavior (graceful degradation) -- when an fs backend
* is INJECTED (its "paths" are not real host paths) or the path is not a POSIX
* absolute path (a relative path has no host cwd to report; Windows drive paths
* are left on the internal mount, preserving today's behavior there). For an
* absolute path it is the parent directory, so that <hostDir>/<lastSegment> ===
* the path the caller gave (which is what lets the engine reconstruct the exact
* host path from the bare name).
*/
function hostParentDir(path, injected) {
	if (injected || !path.startsWith("/")) return void 0;
	const cleaned = path.replace(/\/+$/, "");
	const idx = cleaned.lastIndexOf("/");
	return idx <= 0 ? "/" : cleaned.slice(0, idx);
}
/** Does this backend expose the synchronous dir surface? (fallback route) */
function hasSyncFsDirApi(impl) {
	const o = impl;
	return hasSyncFsApi(o) && typeof o.readdirSync === "function" && typeof o.statSync === "function";
}
/**
* Resolve the PREFERRED promise-based dir API from a backend, or null if it has
* none. Reuses {@link resolvePromisesApi} to find the promises namespace (the
* backend's own `.promises`, or the backend itself when it IS a promises
* namespace with no sync fd methods), then confirms that namespace also carries
* the async `readdir`/`stat` the directory walk needs.
*/
function resolveDirPromisesApi(impl) {
	const base = resolvePromisesApi(impl);
	if (base && typeof base.readdir === "function" && typeof base.stat === "function") return base;
	return null;
}
/**
* Directory source over an expanded EPUB directory on a filesystem (Node's
* node:fs by default; inject any fs-compatible implementation via
* `options.fs`). Async-first, mirroring the `fs` range source exactly: the
* plugin PREFERS a promise-based FileHandle API and only falls back to the
* synchronous one.
*
*   PREFERRED -- the node:fs/promises shape ({@link FsDirPromisesLike}), reached
*   via the backend's `.promises` namespace (node:fs, ZenFS `fs`) or on the
*   backend directly (node:fs/promises, a promises-only store): an async
*   `readdir`/`stat` walk, then per-file positional reads through
*   `open(path, 'r') -> FileHandle.read(...)`. Reads return promises, so the
*   engine suspends per cache-miss block at the directory feed seam -- which is
*   what lets an ASYNC-ONLY backend (a promises-only ZenFS, a cloud store) back
*   this plugin end to end. Even the default node:fs takes this path (it carries
*   a `.promises` namespace), so validating an expanded book keeps the Node
*   event loop free instead of blocking on every 8 MiB block.
*
*   FALLBACK -- the synchronous {@link FsDirLike} surface
*   (openSync/fstatSync/readSync/closeSync plus readdirSync/statSync), used only
*   when the backend exposes no promise-based `open`. Reads stay synchronous
*   (the engine never suspends). This is the compatibility floor for sync-only
*   stores, the async-law-legitimate case: there is no async equivalent to fall
*   through to when the backend offers none.
*
* Either way the factory walks the tree ONCE (sorted, deterministic listing);
* reads are lazy positional reads on the one file currently being pulled, so at
* most one fd/handle is open at a time and the plugin only ever holds the
* requested range, which the engine pulls on demand mid-run (see the MEMORY
* MODEL note). Disposal releases that fd/handle.
*/
async function fsDir(path, options = {}) {
	assertNotBlob(path, "fsDir", "Pass a directory PATH; for a single .epub file use the fs() range source.");
	if (typeof path !== "string" || path.length === 0) throw new Error("fsDir: path must be a non-empty directory path string");
	const impl = options.fs || await import("node:fs");
	const root = path.replace(/[\\/]+$/, "") || path;
	const entries = [];
	let source;
	let release;
	const promises = resolveDirPromisesApi(impl);
	if (promises) {
		if (!(await promises.stat(path)).isDirectory()) throw new Error(`fsDir: "${path}" is not a directory -- for a single .epub file use the fs() range source`);
		const limit = createConcurrencyLimiter(DIR_WALK_CONCURRENCY);
		const walk = async (relPrefix) => {
			const dirPath = relPrefix ? `${root}/${relPrefix}` : root;
			const dirents = await limit(() => promises.readdir(dirPath, { withFileTypes: true }));
			dirents.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
			return (await Promise.all(dirents.map(async (dirent) => {
				const rel = relPrefix ? `${relPrefix}/${dirent.name}` : dirent.name;
				const stat = await limit(() => promises.stat(`${root}/${rel}`));
				if (dirent.isDirectory() || stat.isDirectory()) return walk(rel);
				assertSafeRelativePath(rel, "fsDir");
				return [{
					path: rel,
					size: stat.size
				}];
			}))).flat();
		};
		entries.push(...await walk(""));
		const sizes = new Map(entries.map((e) => [e.path, e.size]));
		let openPath = null;
		let openHandle = null;
		const closeCurrent = () => {
			if (openHandle !== null) {
				const h = openHandle;
				openPath = null;
				openHandle = null;
				return h.close();
			}
		};
		let scratch = /* @__PURE__ */ new Uint8Array(0);
		source = {
			list: () => entries.map((e) => ({ ...e })),
			read: async (rel, offset, length) => {
				if (!sizes.has(rel)) throw new Error(`fsDir: "${rel}" is not in this directory's listing`);
				if (openPath !== rel) {
					await closeCurrent();
					openHandle = await promises.open(`${root}/${rel}`, "r");
					openPath = rel;
				}
				if (scratch.length < length) scratch = new Uint8Array(length);
				let done = 0;
				while (done < length) {
					const { bytesRead } = await openHandle.read(scratch, done, length - done, offset + done);
					if (bytesRead <= 0) throw new Error(`fsDir: short read of "${rel}" at ${offset + done} (wanted ${length})`);
					done += bytesRead;
				}
				return scratch.subarray(0, length);
			},
			[DISPOSE]() {}
		};
		release = () => {
			const p = closeCurrent();
			if (p && typeof p.then === "function") p.catch(() => {});
		};
	} else if (hasSyncFsDirApi(impl)) {
		if (!impl.statSync(path).isDirectory()) throw new Error(`fsDir: "${path}" is not a directory -- for a single .epub file use the fs() range source`);
		const walk = (relPrefix) => {
			const dirPath = relPrefix ? `${root}/${relPrefix}` : root;
			const dirents = impl.readdirSync(dirPath, { withFileTypes: true });
			dirents.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
			for (const dirent of dirents) {
				const rel = relPrefix ? `${relPrefix}/${dirent.name}` : dirent.name;
				const stat = impl.statSync(`${root}/${rel}`);
				if (dirent.isDirectory() || stat.isDirectory()) walk(rel);
				else {
					assertSafeRelativePath(rel, "fsDir");
					entries.push({
						path: rel,
						size: stat.size
					});
				}
			}
		};
		walk("");
		const sizes = new Map(entries.map((e) => [e.path, e.size]));
		let openPath = null;
		let openFd = -1;
		const closeCurrent = () => {
			if (openPath !== null) {
				const fd = openFd;
				openPath = null;
				openFd = -1;
				impl.closeSync(fd);
			}
		};
		let scratch = /* @__PURE__ */ new Uint8Array(0);
		source = {
			list: () => entries.map((e) => ({ ...e })),
			read: (rel, offset, length) => {
				if (!sizes.has(rel)) throw new Error(`fsDir: "${rel}" is not in this directory's listing`);
				if (openPath !== rel) {
					closeCurrent();
					openFd = impl.openSync(`${root}/${rel}`, "r");
					openPath = rel;
				}
				if (scratch.length < length) scratch = new Uint8Array(length);
				let done = 0;
				while (done < length) {
					const n = impl.readSync(openFd, scratch, done, length - done, offset + done);
					if (n <= 0) throw new Error(`fsDir: short read of "${rel}" at ${offset + done} (wanted ${length})`);
					done += n;
				}
				return scratch.subarray(0, length);
			},
			[DISPOSE]() {}
		};
		release = closeCurrent;
	} else throw new Error("fsDir: the injected fs exposes neither a promise-based open()/readdir()/stat() (node:fs/promises shape) nor the synchronous dir API (openSync/fstatSync/readSync/closeSync/readdirSync/statSync) -- cannot back the fsDir() source");
	const dirName = lastSegment(root);
	if (dirName.length > 0) source.name = dirName;
	const hostDir = hostParentDir(root, !!options.fs);
	if (hostDir !== void 0) source.hostDir = hostDir;
	return withCleanup(source, release);
}
/**
* Directory source over an OPFS directory (a FileSystemDirectoryHandle),
* walked recursively. Async-first, so it works on the browser MAIN thread as
* well as in Workers: the tree is walked with the standard async directory
* iterator, each file child's `File` is grabbed up front with `getFile()` (a
* cheap lazy handle to bytes), and each read awaits
* `file.slice(offset, end).arrayBuffer()` -- the same technique as the `opfs`
* range source, so the engine suspends per cache-miss block at the directory
* feed seam. Async directory iteration and `getFile()` are main-thread-legal
* in every browser that has OPFS at all; Safari reads fine (its OPFS gap is on
* writing). Nothing is opened through a sync access handle, so there are no
* per-file handles to budget and disposal is a no-op.
*/
async function opfsDir(directoryHandle) {
	assertNotBlob(directoryHandle, "opfsDir", "Pass a FileSystemDirectoryHandle; for a single file use blob() or opfs().");
	if (!directoryHandle || directoryHandle.kind !== "directory") throw new Error("opfsDir: expected a FileSystemDirectoryHandle (kind \"directory\") -- for a single OPFS file use the opfs() range source");
	const files = /* @__PURE__ */ new Map();
	const limit = createConcurrencyLimiter(DIR_WALK_CONCURRENCY);
	const collect = async (dir, prefix) => {
		const iter = dir.values();
		const children = [];
		for await (const child of iter) children.push(child);
		children.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
		return (await Promise.all(children.map(async (child) => {
			const rel = prefix + child.name;
			if (child.kind === "directory") return collect(child, rel + "/");
			assertSafeRelativePath(rel, "opfsDir");
			return [[rel, await limit(() => child.getFile())]];
		}))).flat();
	};
	for (const [rel, file] of await collect(directoryHandle, "")) files.set(rel, file);
	const source = {
		list: () => Array.from(files, ([rel, file]) => ({
			path: rel,
			size: file.size
		})),
		read: async (rel, offset, length) => {
			const file = files.get(rel);
			if (!file) throw new Error(`opfsDir: "${rel}" is not in this directory's listing`);
			return new Uint8Array(await file.slice(offset, offset + length).arrayBuffer());
		},
		[DISPOSE]() {}
	};
	if (directoryHandle.name.length > 0) source.name = directoryHandle.name;
	return source;
}
/**
* Directory source over an array of File objects -- the shape a folder
* drag-and-drop or an `<input webkitdirectory>` picker produces. Relative
* paths come from each File's `webkitRelativePath` by default; when every path
* shares the picker's top-level folder segment, that segment is stripped (the
* EPUB root is where mimetype/META-INF live) and becomes the source's `name`.
* Files gathered another way (e.g. a hand-rolled DataTransferItem walk, where
* `webkitRelativePath` is empty) supply their paths via `options.paths` -- a
* Map from File to relative path, or a `(file, index) => path` function --
* used exactly as given, no stripping.
*
* Reads are ASYNC on every thread, exactly like the `blob` range source:
* `read` awaits `file.slice(offset, end).arrayBuffer()` and the engine suspends
* per cache-miss block, so this runs on the browser MAIN thread as well as in
* Workers (the library spawns none either way). The plugin only ever pulls the
* requested range, which the engine pulls on demand mid-run (see the MEMORY
* MODEL note). Nothing to release: disposal is a no-op.
*/
function fileList(files, options = {}) {
	assertNotBlob(files, "fileList", "Pass the ARRAY of files from the folder drop or <input webkitdirectory>; to validate one .epub file use blob().");
	if (!Array.isArray(files)) throw new Error("fileList: expected an array of File objects");
	const mapped = files.map((file, index) => {
		if (typeof Blob === "undefined" || !(file instanceof Blob)) throw new Error(`fileList: files[${index}] is not a File`);
		let rel;
		if (typeof options.paths === "function") rel = options.paths(file, index);
		else if (options.paths) rel = options.paths.get(file);
		if (rel === void 0) {
			const wrp = file.webkitRelativePath;
			if (typeof wrp === "string" && wrp.length > 0) rel = wrp;
		}
		if (rel === void 0) throw new Error(`fileList: files[${index}] ("${file.name}") has no webkitRelativePath -- when the files were gathered by hand, supply their relative paths via options.paths`);
		return {
			rel,
			file
		};
	});
	let name;
	if (mapped.length > 0) {
		const first = mapped[0].rel.split("/")[0];
		if (first.length > 0 && mapped.every((m) => m.rel.startsWith(first + "/"))) {
			name = first;
			if (!options.paths) for (const m of mapped) m.rel = m.rel.slice(first.length + 1);
		}
	}
	const byPath = /* @__PURE__ */ new Map();
	for (const { rel, file } of mapped) {
		assertSafeRelativePath(rel, "fileList");
		if (byPath.has(rel)) throw new Error(`fileList: duplicate relative path "${rel}"`);
		byPath.set(rel, file);
	}
	const entries = Array.from(byPath, ([rel, file]) => ({
		path: rel,
		size: file.size
	}));
	entries.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
	const source = {
		list: () => entries.map((e) => ({ ...e })),
		read: async (rel, offset, length) => {
			const file = byPath.get(rel);
			if (!file) throw new Error(`fileList: "${rel}" is not in this listing`);
			return new Uint8Array(await file.slice(offset, offset + length).arrayBuffer());
		},
		[DISPOSE]() {}
	};
	if (name !== void 0) source.name = name;
	return source;
}
/**
* Directory source over an in-memory tree: a Map (or plain object) from
* relative '/'-separated path to Uint8Array. Only sensible for SMALL trees
* (everything sits in RAM); prefer fsDir/opfsDir/fileList otherwise. Nothing
* to release: disposal is a no-op.
*/
function memoryDir(map) {
	assertNotBlob(map, "memoryDir", "Pass a Map (or object) of relative path -> Uint8Array; to validate one .epub file use memory().");
	const pairs = map instanceof Map ? Array.from(map) : Object.entries(map);
	const byPath = /* @__PURE__ */ new Map();
	for (const [rel, bytes] of pairs) {
		assertSafeRelativePath(rel, "memoryDir");
		if (!(bytes instanceof Uint8Array)) throw new Error(`memoryDir: value for "${rel}" is not a Uint8Array -- Blobs and other shapes are not accepted (decode to bytes first, or use fileList/blob)`);
		if (byPath.has(rel)) throw new Error(`memoryDir: duplicate relative path "${rel}"`);
		byPath.set(rel, bytes);
	}
	const entries = Array.from(byPath, ([rel, bytes]) => ({
		path: rel,
		size: bytes.length
	}));
	entries.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
	return {
		list: () => entries.map((e) => ({ ...e })),
		read: (rel, offset, length) => {
			const bytes = byPath.get(rel);
			if (!bytes) throw new Error(`memoryDir: "${rel}" is not in this listing`);
			return bytes.subarray(offset, offset + length);
		},
		[DISPOSE]() {}
	};
}
/**
* Range source over a single packaged `.epub` object in S3-compatible storage.
* Reads are ASYNC (each is a ranged GetObject the engine suspends on), so the
* object is NEVER downloaded whole: `HeadObject` gives the size up front and
* the engine pulls only the [offset, length) ranges it needs mid-run (8 MiB
* max per pull, through its own block cache) -- so a multi-GB book validates at
* flat memory straight out of S3.
*
* The backend is INJECTED (you bring your own S3 client; see
* {@link S3RangeBackend} and {@link s3ClientBackend}). Like every injected /
* browser source this carries NO `hostDir` (the "path" is not a real host
* path), so epubcheck keeps its internal-path behavior. The reported `name`
* defaults to the key's last segment (`books/a/x.epub` -> `x.epub`), exactly as
* the `fs` source defaults it from the file basename; an explicit `name` option
* to `validate`/`runEpubcheck` still overrides it.
*/
async function s3(key, options) {
	if (typeof key !== "string" || key.length === 0) throw new Error("s3: key must be a non-empty object key string");
	const backend = options?.backend;
	if (!backend || typeof backend.size !== "function" || typeof backend.read !== "function") throw new Error("s3: options.backend must implement { size(key), read(key, offset, length) }");
	const size = await backend.size(key);
	if (typeof size !== "number" || !Number.isFinite(size) || size < 0) throw new Error(`s3: backend.size("${key}") returned an invalid size: ${String(size)}`);
	const source = {
		size,
		read: async (offset, length) => {
			const bytes = await backend.read(key, offset, length);
			if (bytes.length < length) throw new Error(`s3: short read of "${key}" at ${offset} (wanted ${length}, got ${bytes.length})`);
			return bytes.length === length ? bytes : bytes.subarray(0, length);
		},
		[DISPOSE]() {}
	};
	const base = lastSegment(key);
	if (base.length > 0) source.name = base;
	return source;
}
/**
* Directory source over an EXPANDED (unzipped) book stored as many objects
* under a key PREFIX in S3-compatible storage -- epubcheck's `--mode exp`.
* `list()` enumerates the prefix via the backend's `ListObjectsV2` walk (which
* paginates through `ContinuationToken`), strips the prefix to relative
* '/'-separated paths, and returns them sorted with their sizes; `read` does a
* ranged GetObject on the object's full key, so nothing is downloaded whole and
* only one file's requested range is ever in flight.
*
* The backend is INJECTED (see {@link S3DirBackend} / {@link s3ClientBackend}),
* so like every injected/browser directory source this carries NO `hostDir`.
* The reported `name` defaults to the prefix's last segment
* (`books/mybook/` -> `mybook`), exactly as `fsDir` defaults it from the
* directory name; an explicit `name` option still overrides it.
*
* Prefix handling: keys are matched against `prefix` and the prefix (plus any
* leading `/`) is stripped to form the relative path. An object whose key IS
* the prefix, or that reduces to an empty path (a "directory marker"), is
* skipped. Each relative path is validated against the same safe-path rules as
* the other directory sources; the full key is remembered for reads, so the
* exact stored key is used regardless of how the prefix was written.
*/
async function s3Dir(prefix, options) {
	if (typeof prefix !== "string") throw new Error("s3Dir: prefix must be a string");
	const backend = options?.backend;
	if (!backend || typeof backend.size !== "function" || typeof backend.read !== "function" || typeof backend.list !== "function") throw new Error("s3Dir: options.backend must implement { size(key), read(key, offset, length), list(prefix) }");
	const objects = await backend.list(prefix);
	const byPath = /* @__PURE__ */ new Map();
	for (const obj of objects) {
		const key = obj.key;
		let rel = key.startsWith(prefix) ? key.slice(prefix.length) : key;
		rel = rel.replace(/^\/+/, "");
		if (rel.length === 0) continue;
		assertSafeRelativePath(rel, "s3Dir");
		if (byPath.has(rel)) throw new Error(`s3Dir: duplicate relative path "${rel}"`);
		byPath.set(rel, {
			key,
			size: obj.size
		});
	}
	const entries = Array.from(byPath, ([rel, v]) => ({
		path: rel,
		size: v.size
	}));
	entries.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
	const source = {
		list: () => entries.map((e) => ({ ...e })),
		read: async (rel, offset, length) => {
			const target = byPath.get(rel);
			if (!target) throw new Error(`s3Dir: "${rel}" is not in this listing`);
			const bytes = await backend.read(target.key, offset, length);
			if (bytes.length < length) throw new Error(`s3Dir: short read of "${rel}" at ${offset} (wanted ${length}, got ${bytes.length})`);
			return bytes.length === length ? bytes : bytes.subarray(0, length);
		},
		[DISPOSE]() {}
	};
	const name = lastSegment(prefix);
	if (name.length > 0) source.name = name;
	return source;
}
/**
* OPTIONAL convenience: build an {@link S3DirBackend} (which is also an
* {@link S3RangeBackend}) from an `@aws-sdk/client-s3` `S3Client` and a bucket.
* The aws-sdk is loaded through a DYNAMIC `import('@aws-sdk/client-s3')` ONLY
* when you call this, so it stays an OPTIONAL peer dependency and never enters
* the library's static import graph -- `s3`/`s3Dir` themselves need nothing but
* the structural backend above. Bring your own client if you prefer (or use a
* non-aws S3 client): implement {@link S3DirBackend} directly, it is ~10 lines.
*
* The returned backend maps the structural surface onto the S3 REST verbs:
*   size(key)                -> HeadObject                 (ContentLength)
*   read(key, offset, length)-> GetObject Range: bytes=offset-(offset+length-1)
*                               (end INCLUSIVE), Body.transformToByteArray()
*   list(prefix)             -> ListObjectsV2, paginated through
*                               ContinuationToken, all pages concatenated.
*/
async function s3ClientBackend(client, bucket) {
	if (!client || typeof client.send !== "function") throw new Error("s3ClientBackend: expected an @aws-sdk/client-s3 S3Client (with send())");
	if (typeof bucket !== "string" || bucket.length === 0) throw new Error("s3ClientBackend: bucket must be a non-empty string");
	const aws = await import("@aws-sdk/client-s3");
	return {
		async size(key) {
			const r = await client.send(new aws.HeadObjectCommand({
				Bucket: bucket,
				Key: key
			}));
			return Number(r.ContentLength);
		},
		async read(key, offset, length) {
			const range = `bytes=${offset}-${offset + length - 1}`;
			const r = await client.send(new aws.GetObjectCommand({
				Bucket: bucket,
				Key: key,
				Range: range
			}));
			if (!r.Body || typeof r.Body.transformToByteArray !== "function") throw new Error(`s3ClientBackend: GetObject("${key}") returned no readable Body`);
			return r.Body.transformToByteArray();
		},
		async list(prefix) {
			const out = [];
			let token;
			do {
				const input = {
					Bucket: bucket,
					Prefix: prefix
				};
				if (token !== void 0) input.ContinuationToken = token;
				const r = await client.send(new aws.ListObjectsV2Command(input));
				for (const o of r.Contents ?? []) if (typeof o.Key === "string") out.push({
					key: o.Key,
					size: Number(o.Size ?? 0)
				});
				token = r.IsTruncated ? r.NextContinuationToken : void 0;
			} while (token);
			return out;
		}
	};
}
/**
* Encode a Uint8Array as base64 -- used by the run driver for the SMALL
* side-channel feeds that are still string transported (the custom-messages
* override file). Neither the packaged book nor expanded-directory file
* contents are base64 transported: both stream through their range-read
* feeds.
*
* Uses the native Uint8Array.prototype.toBase64 when available.
*/
function toBase64(bytes) {
	const maybe = bytes;
	if (typeof maybe.toBase64 === "function") return maybe.toBase64();
	let bin = "";
	const chunk = 32768;
	for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
	return btoa(bin);
}
var plugins_default = {
	blob,
	opfs,
	fs,
	memory,
	url,
	s3,
	s3Dir,
	s3ClientBackend,
	fsDir,
	opfsDir,
	fileList,
	memoryDir,
	isDirectorySource,
	isUrlSource,
	toBase64
};
//#endregion
export { blob, plugins_default as default, fileList, fs, fsDir, isDirectorySource, isUrlSource, memory, memoryDir, opfs, opfsDir, s3, s3ClientBackend, s3Dir, toBase64, url };

//# sourceMappingURL=plugins.js.map
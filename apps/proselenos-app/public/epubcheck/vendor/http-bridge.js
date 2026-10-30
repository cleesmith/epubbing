//#region src/http-bridge.ts
const NUL = String.fromCharCode(0);
/** Map a fetch failure to the bridge's { errKind, message } pair (Node causes). */
function mapFetchError(url, err) {
	let cause = err.cause;
	if (cause && cause.code === void 0 && Array.isArray(cause.errors) && cause.errors.length > 0) {
		const first = cause.errors[0];
		if (first && typeof first === "object") cause = first;
	}
	const code = cause?.code;
	if (code === "ECONNREFUSED") return {
		errKind: "connect",
		message: "Connection refused"
	};
	if (code === "ENOTFOUND" || code === "EAI_AGAIN") {
		let host = cause?.hostname;
		if (!host) try {
			host = new URL(url).hostname;
		} catch {
			host = url;
		}
		return {
			errKind: "unknownhost",
			message: host
		};
	}
	return {
		errKind: "io",
		message: cause?.message ?? (err instanceof Error ? err.message : String(err))
	};
}
/**
* Node bridge: async fetch streaming into a disk spool, async positional
* FileHandle reads back out (the engine suspends at HostHttp's @Async read
* seam per 8 MiB block -- nothing on this path blocks the event loop). The
* factory is async because node:fs/os/path are imported lazily -- this module
* stays importable (never touching node builtins) outside Node.
*/
async function createHttpBridgeNode() {
	const fsp = await import("node:fs/promises");
	const { tmpdir } = await import("node:os");
	const { join } = await import("node:path");
	const spools = [];
	let spoolSeq = 0;
	let closed = false;
	async function download(url) {
		let file = null;
		let path = null;
		try {
			const response = await fetch(url);
			path = join(tmpdir(), `epubcheck-http-${process.pid}-${spoolSeq++}.spool`);
			file = await fsp.open(path, "w+");
			try {
				await fsp.unlink(path);
				path = null;
			} catch {}
			let length = 0;
			if (response.body) {
				const chunks = response.body;
				for await (const chunk of chunks) {
					let done = 0;
					while (done < chunk.length) {
						const { bytesWritten } = await file.write(chunk, done, chunk.length - done, length + done);
						done += bytesWritten;
					}
					length += chunk.length;
				}
			}
			if (closed) {
				await file.close();
				if (path !== null) try {
					await fsp.unlink(path);
				} catch (err) {
					if (err.code !== "ENOENT") throw err;
				}
				return [
					"E",
					"io",
					"the http bridge was closed during the download"
				].join(NUL);
			}
			const handle = spools.push({
				file,
				path,
				length
			}) - 1;
			return [
				"S",
				response.status,
				handle,
				length
			].join(NUL);
		} catch (err) {
			if (file !== null) try {
				await file.close();
			} catch {}
			if (path !== null) try {
				await fsp.unlink(path);
			} catch {}
			const { errKind, message } = mapFetchError(url, err);
			return [
				"E",
				errKind,
				message
			].join(NUL);
		}
	}
	return {
		get(url, done) {
			download(url).then(done);
		},
		async read(target, handle, offset, length) {
			const spool = spools[handle];
			if (!spool) return 0;
			const out = new Uint8Array(target.buffer, target.byteOffset, length);
			let done = 0;
			while (done < length) {
				const { bytesRead } = await spool.file.read(out, done, length - done, offset + done);
				if (bytesRead <= 0) break;
				done += bytesRead;
			}
			return done;
		},
		async close() {
			if (closed) return;
			closed = true;
			const releasing = spools.splice(0, spools.length);
			await Promise.all(releasing.map(async (spool) => {
				try {
					await spool.file.close();
				} catch {}
				if (spool.path !== null) try {
					await fsp.unlink(spool.path);
				} catch {}
			}));
		}
	};
}
/**
* Browser (and any non-Node host) bridge: async fetch, holding the body as a
* browser-managed Blob (response.blob()) and range-reading it back with
* blob.slice().arrayBuffer() so only the requested block is ever decoded. Works
* on the MAIN thread and in Workers alike -- the library spawns no threads and
* needs no synchronous XHR. On Chromium a large Blob spools to disk, so multi-GB
* URL inputs range-read at flat memory like the Node spool; on Firefox/Safari
* the Blob may stay memory-resident (disk-spooling is not spec-guaranteed) but
* it is off-heap and dodges the ~2 GiB contiguous main-thread ArrayBuffer cap.
*/
function createHttpBridgeFetch() {
	/** Fetched response bodies, by the handle returned through get(). */
	const bodies = [];
	async function download(url) {
		try {
			const response = await fetch(url);
			const blob = await response.blob();
			const handle = bodies.push(blob) - 1;
			return [
				"S",
				response.status,
				handle,
				blob.size
			].join(NUL);
		} catch (err) {
			return [
				"E",
				"io",
				(err instanceof Error && err.message ? err.message : String(err)) + " fetching " + url + " (connection failure, or the server does not allow cross-origin requests)"
			].join(NUL);
		}
	}
	return {
		get(url, done) {
			download(url).then(done);
		},
		async read(target, handle, offset, length) {
			const blob = bodies[handle];
			if (!blob) return 0;
			const end = Math.min(offset + length, blob.size);
			const chunk = new Uint8Array(await blob.slice(offset, end).arrayBuffer());
			new Uint8Array(target.buffer, target.byteOffset, length).set(chunk);
			return chunk.length;
		},
		close() {
			bodies.length = 0;
		}
	};
}
//#endregion
export { createHttpBridgeFetch, createHttpBridgeNode };

//# sourceMappingURL=http-bridge.js.map
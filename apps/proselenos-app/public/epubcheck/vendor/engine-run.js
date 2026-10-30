//#region src/engine-run.ts
let cachedModule = null;
let cachedModuleFactory = null;
let runQueue = Promise.resolve();
const FEED_KEYS = [
	"__ecSize",
	"__ecRead",
	"__epubName",
	"__epubArgs",
	"__ecExtraPaths",
	"__ecExtraB64",
	"__ecInputArg",
	"__ecHostDir",
	"__ecInputIsDir",
	"__ecDirPaths",
	"__ecDirSizes",
	"__ecDirRead",
	"__ecReadPending",
	"__ecDirReadPending",
	"__ecReadError",
	"__ecDirReadError",
	"__epubHttpGet",
	"__epubHttpRead",
	"__epubHttpReadPending",
	"__epubHttpReadError",
	"__ecTapMessage",
	"__ecTapInfo",
	"__ecPlain",
	"__ecRelArg",
	"__ecTZ",
	"__ecJson",
	"__ecExit",
	"__ecFile"
];
function clearFeeds(g) {
	for (const k of FEED_KEYS) delete g[k];
}
/**
* The rejection value for an aborted run: the signal's reason (an AbortError
* DOMException unless the aborter chose one; AbortSignal.timeout's is a
* TimeoutError DOMException), with a defensive AbortError fallback for a
* nonstandard signal whose reason is unset.
*/
function abortReasonOf(signal) {
	return signal.reason !== void 0 ? signal.reason : new DOMException("The validation was aborted", "AbortError");
}
const HTTP_ABORTED_RESPONSE = [
	"E",
	"io",
	"the validation was aborted"
].join(String.fromCharCode(0));
/**
* Drive ONE validation to completion, returning the raw engine outputs.
* `getFactory` returns the (cached) engine factory; the run reuses the last
* run's engine scope when it ended cleanly, else calls the factory for a
* fresh one. `yieldMacrotask` yields exactly one macrotask after the run.
*/
function driveEngine(run, getFactory, yieldMacrotask) {
	const task = runQueue.then(() => runOnce(run, getFactory, yieldMacrotask));
	runQueue = task.then(() => void 0, () => void 0);
	return task;
}
async function runOnce(run, getFactory, yieldMacrotask) {
	const signal = run.signal;
	if (signal !== void 0 && signal.aborted) throw abortReasonOf(signal);
	const createEngine = await getFactory();
	const g = globalThis;
	let aborted = false;
	const throwIfAborted = () => {
		if (signal !== void 0 && signal.aborted) {
			aborted = true;
			throw abortReasonOf(signal);
		}
	};
	const stdoutLines = [];
	const stderrLines = [];
	const files = {};
	let json = null;
	const origInfo = console.info;
	const origError = console.error;
	let mod = null;
	let completed = false;
	try {
		const fill = (target, offset, length, chunk) => {
			if (chunk.length < length) throw new Error(`epubcheck-standalone: source read returned ${chunk.length} of ${length} bytes at offset ${offset}`);
			new Uint8Array(target.buffer, target.byteOffset, length).set(chunk.length === length ? chunk : chunk.subarray(0, length));
			return length;
		};
		const consume = (target, offset, length, chunk) => {
			if (typeof chunk.then !== "function") return fill(target, offset, length, chunk);
			const capturedInfo = console.info;
			const capturedError = console.error;
			console.info = origInfo;
			console.error = origError;
			return Promise.resolve(chunk).then((bytes) => {
				console.info = capturedInfo;
				console.error = capturedError;
				throwIfAborted();
				return fill(target, offset, length, bytes);
			}, (err) => {
				console.info = capturedInfo;
				console.error = capturedError;
				throw err;
			});
		};
		if (run.size !== void 0 && run.read !== void 0) {
			const read = run.read;
			g.__ecSize = run.size;
			g.__ecRead = (target, offset, length) => {
				throwIfAborted();
				return consume(target, offset, length, read(offset, length));
			};
		}
		if (run.dir !== void 0) {
			const dir = run.dir;
			g.__ecDirPaths = dir.paths;
			g.__ecDirSizes = dir.sizes;
			g.__ecDirRead = (target, index, offset, length) => {
				throwIfAborted();
				return consume(target, offset, length, dir.read(dir.paths[index], offset, length));
			};
		}
		if (run.name !== void 0) g.__epubName = run.name;
		g.__epubArgs = run.args;
		if (run.inputArg !== void 0) g.__ecInputArg = run.inputArg;
		if (run.hostDir !== void 0) g.__ecHostDir = run.hostDir;
		if (run.inputIsDir) g.__ecInputIsDir = true;
		if (run.httpGet !== void 0 && run.httpRead !== void 0) {
			const hostGet = run.httpGet;
			const hostRead = run.httpRead;
			g.__epubHttpGet = (url, done) => {
				const capturedInfo = console.info;
				const capturedError = console.error;
				console.info = origInfo;
				console.error = origError;
				let settled = false;
				const finish = (response) => {
					if (settled) return;
					settled = true;
					if (signal !== void 0) signal.removeEventListener("abort", onAbort);
					console.info = capturedInfo;
					console.error = capturedError;
					done(response);
				};
				const onAbort = () => {
					aborted = true;
					queueMicrotask(() => finish(HTTP_ABORTED_RESPONSE));
				};
				if (signal !== void 0) {
					if (signal.aborted) {
						onAbort();
						return;
					}
					signal.addEventListener("abort", onAbort, { once: true });
				}
				hostGet(url, finish);
			};
			g.__epubHttpRead = (target, handle, offset, length) => {
				if (signal !== void 0 && signal.aborted) {
					aborted = true;
					return 0;
				}
				const r = hostRead(target, handle, offset, length);
				if (typeof r.then !== "function") return r;
				const capturedInfo = console.info;
				const capturedError = console.error;
				console.info = origInfo;
				console.error = origError;
				return Promise.resolve(r).then((count) => {
					console.info = capturedInfo;
					console.error = capturedError;
					if (signal !== void 0 && signal.aborted) {
						aborted = true;
						return 0;
					}
					return count;
				}, (err) => {
					console.info = capturedInfo;
					console.error = capturedError;
					throw err;
				});
			};
		}
		if (run.tap !== void 0) {
			const tap = run.tap;
			const restored = (fn) => (...a) => {
				const capturedInfo = console.info;
				const capturedError = console.error;
				console.info = origInfo;
				console.error = origError;
				try {
					fn(...a);
				} finally {
					console.info = capturedInfo;
					console.error = capturedError;
				}
			};
			g.__ecTapMessage = restored(tap.message);
			g.__ecTapInfo = restored(tap.info);
		}
		if (run.extraFiles && run.extraFiles.length > 0) {
			g.__ecExtraPaths = run.extraFiles.map((f) => f.path);
			g.__ecExtraB64 = run.extraFiles.map((f) => f.b64);
		}
		if (run.plain) g.__ecPlain = true;
		if (run.relArg) g.__ecRelArg = true;
		if (run.tz !== void 0) g.__ecTZ = run.tz;
		g.__ecJson = (s) => {
			json = s;
		};
		g.__ecFile = (name, content) => {
			files[name] = content;
		};
		console.info = (...a) => stdoutLines.push(a.join(" "));
		console.error = (...a) => stderrLines.push(a.join(" "));
		if (cachedModule !== null && cachedModuleFactory === createEngine) {
			mod = cachedModule;
			cachedModule = null;
			cachedModuleFactory = null;
		} else {
			cachedModule = null;
			cachedModuleFactory = null;
			mod = createEngine();
		}
		try {
			await new Promise((resolve, reject) => {
				mod.main([], (err) => err ? reject(err instanceof Error ? err : new Error(String(err))) : resolve());
			});
		} catch (err) {
			if (aborted || signal !== void 0 && signal.aborted) throw abortReasonOf(signal);
			throw err;
		}
		if (aborted || signal !== void 0 && signal.aborted) throw abortReasonOf(signal);
		completed = true;
		const exit = g.__ecExit;
		return {
			exitCode: typeof exit === "number" ? exit : null,
			stdout: stdoutLines.length ? stdoutLines.join("\n") + "\n" : "",
			stderr: stderrLines.length ? stderrLines.join("\n") + "\n" : "",
			json,
			files
		};
	} finally {
		console.info = origInfo;
		console.error = origError;
		if (completed && mod !== null) {
			cachedModule = mod;
			cachedModuleFactory = createEngine;
		}
		mod = null;
		clearFeeds(g);
		await yieldMacrotask();
	}
}
//#endregion
export { driveEngine };

//# sourceMappingURL=engine-run.js.map
import { isDirectorySource, memory } from "./plugins.js";
import { runToResult } from "./run-core.js";
//#region src/validate-core.ts
/** Resolve customMessages (bytes|string) to the run driver's { bytes, name }. */
function resolveCustomMessages(customMessages, name) {
	if (typeof customMessages === "string") return {
		bytes: new TextEncoder().encode(customMessages),
		name
	};
	if (customMessages instanceof Uint8Array) return {
		bytes: customMessages,
		name
	};
	throw new Error("validate: customMessages must be a Uint8Array or a string");
}
/**
* Resolve the run's effective abort signal from the `signal` and `timeoutMs`
* options: the caller's signal alone, a fresh `AbortSignal.timeout` alone, or
* the two combined so that whichever aborts first wins (native
* `AbortSignal.any` where it exists, else a manual combiner that removes its
* listeners once either side fires -- the timeout side always eventually
* fires, so no listener outlives a long-lived caller signal).
*/
function resolveSignal(signal, timeoutMs) {
	if (timeoutMs === void 0) return signal;
	const timeout = AbortSignal.timeout(timeoutMs);
	if (signal === void 0) return timeout;
	if (typeof AbortSignal.any === "function") return AbortSignal.any([signal, timeout]);
	if (signal.aborted) return signal;
	const controller = new AbortController();
	const onAbort = (event) => {
		signal.removeEventListener("abort", onAbort);
		timeout.removeEventListener("abort", onAbort);
		controller.abort(event.target.reason);
	};
	signal.addEventListener("abort", onAbort);
	timeout.addEventListener("abort", onAbort);
	return controller.signal;
}
/**
* The shared validate(): normalize the source, resolve options, and delegate to
* the one run driver with the platform `runEngine`. Takes ownership of the
* source's disposal (success or throw).
*/
function validateWith(runEngine, source, options = {}) {
	const core = { source: source instanceof Uint8Array ? memory(source) : source };
	if (options.name !== void 0) core.name = options.name;
	if (options.args !== void 0 && options.args.length > 0) core.args = options.args;
	if (options.customMessages !== void 0) core.customMessages = resolveCustomMessages(options.customMessages, options.customMessagesName ?? "messages.txt");
	if (options.reports !== void 0 && options.reports.length > 0) core.reports = options.reports;
	if (options.maxOfEachMessage !== void 0) core.maxOfEachMessage = options.maxOfEachMessage;
	if (options.tz !== void 0) core.tz = options.tz;
	if (options.dirMode !== void 0) core.dirMode = options.dirMode;
	if (options.onMessage !== void 0) core.onMessage = options.onMessage;
	if (options.onFeature !== void 0) core.onFeature = options.onFeature;
	const signal = resolveSignal(options.signal, options.timeoutMs);
	if (signal !== void 0) core.signal = signal;
	return runToResult(runEngine, core);
}
//#endregion
export { isDirectorySource, validateWith };

//# sourceMappingURL=validate-core.js.map
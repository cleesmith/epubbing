import { driveEngine } from "./engine-run.js";
//#region src/engine-browser.ts
let cachedFactory = null;
let configuredFactory = null;
let configuredUrl = null;
/**
* Point the browser build at the engine asset. Call once, before the first
* `validate`, with EITHER a pre-imported factory (`createEngine`, e.g. from
* `import { createEngine } from 'epubcheck-standalone/epubcheck-engine.js'`) or
* the URL to dynamically import it from (`url`). Optional: by default the engine
* is imported from `new URL('../dist/epubcheck-engine.js', import.meta.url)`.
*/
function configureEngine(options) {
	if (options.createEngine !== void 0) configuredFactory = options.createEngine;
	if (options.url !== void 0) configuredUrl = options.url;
	cachedFactory = null;
}
async function getFactory() {
	if (cachedFactory !== null) return cachedFactory;
	if (configuredFactory !== null) {
		cachedFactory = configuredFactory;
		return cachedFactory;
	}
	const url = configuredUrl ?? new URL("../dist/epubcheck-engine.js", import.meta.url).href;
	const mod = await import(
		/* @vite-ignore */
		url
);
	if (typeof mod.createEngine !== "function") throw new Error(`epubcheck-standalone: the engine module at ${url} does not export createEngine(); check the URL points at the built dist/epubcheck-engine.js.`);
	cachedFactory = mod.createEngine;
	return cachedFactory;
}
function yieldMacrotask() {
	return new Promise((resolve) => setTimeout(resolve, 0));
}
/** Drive one validation run through the browser-loaded engine. */
function runEngine(run) {
	return driveEngine(run, getFactory, yieldMacrotask);
}
//#endregion
export { configureEngine, runEngine };

//# sourceMappingURL=engine-browser.js.map
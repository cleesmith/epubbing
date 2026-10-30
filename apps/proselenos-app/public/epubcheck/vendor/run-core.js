import { parseConsoleReport } from "./parse.js";
import { isDirectorySource, isUrlSource, toBase64 } from "./plugins.js";
import { formatJsonReport, formatXmlReport, formatXmpReport } from "./formatters/index.js";
//#region src/run-core.ts
const DISPOSE = Symbol.dispose ?? Symbol.for("Symbol.dispose");
function disposeSource(source) {
	const dispose = source[DISPOSE];
	if (typeof dispose === "function") dispose.call(source);
}
/** Default reported name for a source without one. */
function defaultName(source) {
	if (typeof source.name === "string" && source.name.length > 0) return source.name;
	return isDirectorySource(source) ? "book" : "book.epub";
}
const REPORT_SEVERITIES = [
	"SUPPRESSED",
	"USAGE",
	"INFO",
	"WARNING",
	"ERROR",
	"FATAL"
];
/**
* Drive one validation to completion and return the structured result. Takes
* ownership of the source's disposal (success or throw). `runEngine` is the
* platform engine driver.
*/
async function runToResult(runEngine, opts) {
	const { source } = opts;
	let bridge = null;
	try {
		const isUrl = isUrlSource(source);
		const isDir = !isUrl && isDirectorySource(source);
		const name = isUrl ? source.url : opts.name && opts.name.length > 0 ? opts.name : defaultName(source);
		const userArgs = opts.args ? [...opts.args] : [];
		const extraFiles = [];
		if (opts.customMessages) {
			const cm = opts.customMessages;
			extraFiles.push({
				path: cm.name,
				b64: toBase64(cm.bytes)
			});
			userArgs.push("-c", cm.name);
		}
		const wantReports = opts.reports && opts.reports.length > 0 ? opts.reports : null;
		const run = {
			args: userArgs,
			extraFiles,
			plain: true,
			relArg: true,
			tz: opts.tz ?? hostTimeZone()
		};
		if (opts.signal !== void 0) run.signal = opts.signal;
		const tapMessages = [];
		const tapFeatures = [];
		const onMessage = opts.onMessage;
		const onFeature = opts.onFeature;
		let callbackError = null;
		let callbackFailed = false;
		let sequence = 0;
		run.tap = {
			message: (id, severity, message, suggestion, path, line, column, context) => {
				const sev = severity ?? "";
				const reportMessage = {
					id,
					severity: REPORT_SEVERITIES.includes(sev) ? sev : "INFO",
					message: message ?? "",
					suggestion: suggestion ?? "",
					path: path ?? "",
					line,
					column,
					context,
					sequence: sequence++
				};
				tapMessages.push(reportMessage);
				if (onMessage) try {
					onMessage(reportMessage);
				} catch (e) {
					if (!callbackFailed) {
						callbackFailed = true;
						callbackError = e;
					}
				}
			},
			info: (resource, feature, value) => {
				const reportFeature = {
					resource,
					feature: feature ?? "",
					value,
					sequence: sequence++
				};
				tapFeatures.push(reportFeature);
				if (onFeature) try {
					onFeature(reportFeature);
				} catch (e) {
					if (!callbackFailed) {
						callbackFailed = true;
						callbackError = e;
					}
				}
			}
		};
		if (isUrlSource(source)) {
			bridge = await source.openBridge();
			run.inputArg = source.url;
			run.httpGet = bridge.get;
			run.httpRead = bridge.read;
		} else if (isDirectorySource(source)) {
			if (userArgs.includes("--mode") || userArgs.includes("-m")) throw new Error("validate: a directory source's mode is controlled by the dirMode option (default direct, or exp to package first); do not also pass --mode/-m in args");
			const root = name;
			const entries = source.list();
			run.name = name;
			run.inputArg = root;
			if (source.hostDir !== void 0) run.hostDir = source.hostDir;
			run.args = opts.dirMode === "exp" ? [
				"--mode",
				"exp",
				...userArgs
			] : userArgs;
			run.dir = {
				paths: entries.map((entry) => entry.path),
				sizes: entries.map((entry) => entry.size),
				read: (path, offset, length) => source.read(path, offset, length)
			};
		} else {
			run.name = name;
			if (source.hostDir !== void 0) run.hostDir = source.hostDir;
			if (source.isDirectory) run.inputIsDir = true;
			else {
				run.size = source.size;
				run.read = (offset, length) => source.read(offset, length);
			}
		}
		const startDate = /* @__PURE__ */ new Date();
		const engineResult = await runEngine(run);
		const elapsedTime = Date.now() - startDate.getTime();
		let reports;
		if (wantReports) {
			if (tapFeatures.length === 0) throw new Error("epubcheck-standalone: the loaded engine emitted no report events; the engine build predates the message tap. Run `npm run build` in packages/epubcheck-standalone to rebuild dist/epubcheck-engine.js.");
			const filename = isDir && opts.dirMode === "exp" ? `${name}.epub` : name;
			const reportData = {
				messages: tapMessages,
				features: tapFeatures
			};
			const generationDate = /* @__PURE__ */ new Date();
			const capOptions = opts.maxOfEachMessage === void 0 ? {} : { maxOfEachMessage: opts.maxOfEachMessage };
			reports = {};
			for (const fmt of wantReports) if (fmt === "json") reports.json = formatJsonReport(reportData, {
				filename,
				checkDate: startDate,
				elapsedTime,
				...capOptions
			});
			else if (fmt === "xml") reports.xml = formatXmlReport(reportData, {
				filename,
				generationDate,
				...capOptions
			});
			else reports.xmp = formatXmpReport(reportData, {
				filename,
				generationDate,
				...capOptions
			});
		}
		const result = assembleResult(engineResult, tapMessages, tapFeatures, reports);
		if (callbackFailed) throw callbackError;
		return result;
	} finally {
		if (bridge) await bridge.close();
		disposeSource(source);
	}
}
function hostTimeZone() {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
	} catch {
		return "UTC";
	}
}
function assembleResult(engine, tapMessages, tapFeatures, reports) {
	const exitCode = engine.exitCode;
	const stdout = engine.stdout;
	const stderr = engine.stderr;
	const { summary } = parseConsoleReport(stdout + "\n" + stderr);
	const result = {
		valid: exitCode === 0,
		exitCode,
		messages: tapMessages,
		features: tapFeatures,
		summary,
		stdout,
		stderr
	};
	if (reports) result.reports = reports;
	return result;
}
//#endregion
export { runToResult };

//# sourceMappingURL=run-core.js.map
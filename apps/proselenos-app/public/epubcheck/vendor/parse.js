//#region src/parse.ts
const MESSAGE_RE = /^(FATAL|ERROR|WARNING|INFO|USAGE)\(([A-Z0-9]+[-_]\d+[a-z]?)\):\s*([\s\S]*)$/;
const LOCATION_RE = /^(.*?)\((\d+),(\d+)\):\s*([\s\S]*)$/;
const VERSION_RE = /^Validating using EPUB version (.+?) rules\.$/;
/** Extract the EPUB version from a "Validating using EPUB version X rules." line. */
function parseEpubVersion(line) {
	const m = line.match(VERSION_RE);
	return m ? m[1] ?? null : null;
}
/**
* Parse a single console line into a structured message, or null if the line is
* not a `SEVERITY(CODE): ...` message line. The line should already be trimmed
* and free of any transport tagging (e.g. a worker's "[stderr] " prefix).
*/
function parseMessageLine(line) {
	const match = line.match(MESSAGE_RE);
	if (!match) return null;
	const severity = match[1];
	const code = match[2];
	const rest = match[3];
	let path = null;
	let lineNo = null;
	let column = null;
	let message = rest;
	const loc = rest.match(LOCATION_RE);
	if (loc) {
		path = loc[1];
		lineNo = Number(loc[2]);
		column = Number(loc[3]);
		message = loc[4];
	}
	return {
		severity,
		code,
		path,
		line: lineNo,
		column,
		message
	};
}
/**
* Parse a run's console lines into structured messages plus the reported EPUB
* version. Blank lines and non-message lines are ignored. Lines are trimmed
* before matching; supply already-detagged lines (strip any "[stderr] " markers
* first).
*/
function parseEpubcheckLines(lines) {
	const messages = [];
	let epubVersion = null;
	for (const raw of lines) {
		const line = raw.trim();
		if (!line) continue;
		const version = parseEpubVersion(line);
		if (version !== null) {
			epubVersion = version;
			continue;
		}
		const parsed = parseMessageLine(line);
		if (parsed) messages.push(parsed);
	}
	return {
		messages,
		epubVersion
	};
}
const REPORT_MSG_RE = /^(FATAL|ERROR|WARNING|INFO|USAGE)\(([A-Z0-9]+[-_]\d+[a-z]?)\):\s*(.*)$/;
const REPORT_SUMMARY_RE = /^Messages:\s*(\d+)\s+fatals?\s*\/\s*(\d+)\s+errors?\s*\/\s*(\d+)\s+warnings?\s*\/\s*(\d+)\s+infos?/;
/**
* Parse ONE console line into the `EpubCheckMessage` shape, or null when the
* line is not a `SEVERITY(CODE): ...` message line. This is the exact per-line
* logic `parseConsoleReport` applies, exported separately so the live
* per-message stream (the engine tap's console-line field) parses IDENTICALLY
* to the post-run console text.
*/
function parseReportMessageLine(line) {
	const m = line.match(REPORT_MSG_RE);
	if (!m) return null;
	const severity = m[1];
	const code = m[2];
	let rest = m[3];
	let location = null;
	const loc = rest.match(/^(.*?)\((\d+),(\d+)\):\s*(.*)$/);
	if (loc) {
		location = {
			path: loc[1],
			line: +loc[2],
			column: +loc[3]
		};
		rest = loc[4];
	}
	return {
		severity,
		code,
		location,
		message: rest
	};
}
/**
* Parse a run's raw console text (stdout, or stdout + stderr) into the
* `{ messages, summary }` an `EpubCheckResult` carries. The engine reports
* message locations as `<name>/<entry>` directly, so no path rewriting is
* needed. Lines that are not a `SEVERITY(CODE): ...` message (and are not the
* summary line) are ignored.
*/
function parseConsoleReport(text) {
	const messages = [];
	let summary = null;
	for (const line of text.split("\n")) {
		const s = line.match(REPORT_SUMMARY_RE);
		if (s) {
			summary = {
				fatals: +s[1],
				errors: +s[2],
				warnings: +s[3],
				infos: +s[4]
			};
			continue;
		}
		const message = parseReportMessageLine(line);
		if (message) messages.push(message);
	}
	return {
		messages,
		summary
	};
}
//#endregion
export { parseConsoleReport, parseEpubVersion, parseEpubcheckLines, parseMessageLine, parseReportMessageLine };

//# sourceMappingURL=parse.js.map
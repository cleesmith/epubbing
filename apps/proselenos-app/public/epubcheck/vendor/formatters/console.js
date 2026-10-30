//#region src/formatters/console.ts
/** Reporting levels, mirroring com.adobe.epubcheck.util.ReportingLevel. */
const ReportingLevel = {
	Fatal: 5,
	Error: 4,
	Warning: 3,
	Info: 2,
	Usage: 1,
	Suppressed: 0
};
/** The reporting level a given message severity is gated by. */
function severityReportingLevel(severity) {
	switch (severity) {
		case "FATAL": return ReportingLevel.Fatal;
		case "ERROR": return ReportingLevel.Error;
		case "WARNING": return ReportingLevel.Warning;
		case "INFO": return ReportingLevel.Info;
		case "USAGE": return ReportingLevel.Usage;
		default: return ReportingLevel.Suppressed;
	}
}
/** DefaultReportImpl.fixMessage: collapse Java whitespace runs to one space. */
function fixConsoleMessage(message) {
	if (message === null || message === void 0) return "";
	return message.replace(/[ \t\n\f\r]+/g, " ");
}
/**
* Render ONE message line exactly like DefaultReportImpl.formatMessage:
*   SEVERITY(ID): <epubName><fileName>(line,col): fixMessage(text)
* where `fileName` is "" when `epubName` already ends with the message's `path`
* (the location IS the EPUB itself), else "/" + `path`. The raw message text
* (message.message) is run through fixConsoleMessage at render, matching the
* jar's own composition byte-for-byte (the custom-message override annotation
* arrives already inside the raw text with its leading space).
*/
function renderConsoleMessageLine(message, epubName) {
	const fileName = epubName.endsWith(message.path) ? "" : "/" + message.path;
	return `${message.severity}(${message.id}): ${epubName}${fileName}(${message.line},${message.column}): ${fixConsoleMessage(message.message)}`;
}
/** Count messages by severity (the raw, pre-level-filter tallies). */
function countConsoleSeverities(messages) {
	const c = {
		fatal: 0,
		error: 0,
		warning: 0,
		info: 0,
		usage: 0
	};
	for (const m of messages) if (m.severity === "FATAL") c.fatal++;
	else if (m.severity === "ERROR") c.error++;
	else if (m.severity === "WARNING") c.warning++;
	else if (m.severity === "INFO") c.info++;
	else if (m.severity === "USAGE") c.usage++;
	return c;
}
/** The counts as DISPLAYED after applying the reporting-level filter. */
function displayedConsoleCounts(actual, reportingLevel) {
	return {
		fatal: reportingLevel <= ReportingLevel.Fatal ? actual.fatal : 0,
		error: reportingLevel <= ReportingLevel.Error ? actual.error : 0,
		warning: reportingLevel <= ReportingLevel.Warning ? actual.warning : 0,
		info: reportingLevel <= ReportingLevel.Info ? actual.info : 0,
		usage: reportingLevel <= ReportingLevel.Usage ? actual.usage : 0
	};
}
/** The English (default resource-bundle) chrome strings, verbatim from epubcheck. */
const DEFAULT_CONSOLE_LABELS = {
	validating_version_message: "Validating using EPUB version %1$s rules.",
	no_errors__or_warnings: "No errors or warnings detected.",
	there_were_warnings: "\nCheck finished with warnings",
	there_were_errors: "\nCheck finished with errors",
	messages: "Messages",
	counter_fatal_zero: "0 fatals",
	counter_fatal_one: "1 fatal",
	counter_fatal_many: "%1$d fatals",
	counter_error_zero: "0 errors",
	counter_error_one: "1 error",
	counter_error_many: "%1$d errors",
	counter_warn_zero: "0 warnings",
	counter_warn_one: "1 warning",
	counter_warn_many: "%1$d warnings",
	counter_info_zero: "0 infos",
	counter_info_one: "1 info",
	counter_info_many: "%1$d infos",
	counter_usage_zero: "0 usages",
	counter_usage_one: "1 usage",
	counter_usage_many: "%1$d usages",
	epubcheck_completed: "EPUBCheck completed"
};
/**
* Java printf-style substitution for the positional placeholders (`%1$s`,
* `%1$d`) the epubcheck chrome strings use.
*/
function formatTemplate(template, ...args) {
	return template.replace(/%(\d+)\$[sd]/g, (_m, idx) => {
		const v = args[Number(idx) - 1];
		return v === void 0 ? "" : String(v);
	});
}
function counter(kind, count, labels) {
	return formatTemplate(labels[`counter_${kind}_${count === 0 ? "zero" : count === 1 ? "one" : "many"}`], count);
}
/**
* The "Validating using EPUB version X rules." line (DefaultReportImpl.info on
* a FORMAT_VERSION feature), or null when the version is absent/blank. Gating by
* reporting level / quiet is the caller's concern.
*/
function renderValidatingLine(version, labels) {
	if (version === null || version === void 0 || version.length === 0) return null;
	return formatTemplate(labels.validating_version_message, version);
}
/**
* The "Messages: N fatals / N errors / ..." summary line exactly like
* EpubChecker.printEpubCheckCompleted, gated by the reporting level. `counts`
* are the DISPLAYED counts (already level-filtered). Returns "" when the level
* is Suppressed (no counters emitted).
*/
function renderConsoleSummaryLine(counts, reportingLevel, labels) {
	let s = "";
	if (reportingLevel <= ReportingLevel.Fatal) s += labels.messages + ": " + counter("fatal", counts.fatal, labels);
	if (reportingLevel <= ReportingLevel.Error) s += " / " + counter("error", counts.error, labels);
	if (reportingLevel <= ReportingLevel.Warning) s += " / " + counter("warn", counts.warning, labels);
	if (reportingLevel <= ReportingLevel.Info) s += " / " + counter("info", counts.info, labels);
	if (reportingLevel <= ReportingLevel.Usage) s += " / " + counter("usage", counts.usage, labels);
	return s;
}
/**
* Render the COMPLETE human-readable console output of one validation run from
* its `ReportData`, byte-identical to `java -jar epubcheck.jar <book>` with both
* streams captured together (stdout + stderr in program order). This is the
* batch counterpart of the CLI's live-streamed console: it loops the shared
* primitives above over `reportData` and returns one string.
*
* The lines, in epubcheck's own emission order:
*   1. "Validating using EPUB version X rules." (from the FORMAT_VERSION
*      feature), when level <= Info and not quiet;
*   2. one line per message, in emission order, filtered by the reporting level
*      (USAGE lines are also suppressed under --quiet, matching the out-writer);
*   3. the validateFile tail -- "No errors or warnings detected." when clean
*      (level-filtered), else "Check finished with warnings"/"...errors";
*   4. the "Messages: ..." summary + "EPUBCheck completed" footer, when not
*      quiet.
*/
function formatConsoleReport(reportData, options) {
	const epubName = options && options.filename;
	if (typeof epubName !== "string" || epubName.length === 0) throw new Error("formatConsoleReport: options.filename (string) is required -- the EPUB name");
	const level = options.reportingLevel ?? ReportingLevel.Info;
	const quiet = options.quiet ?? false;
	const labels = options.labels ?? DEFAULT_CONSOLE_LABELS;
	const lines = [];
	const ordered = [];
	if (level <= ReportingLevel.Info && !quiet) {
		for (const f of reportData.features) if (f.feature === "FORMAT_VERSION") {
			const vline = renderValidatingLine(f.value, labels);
			if (vline !== null) ordered.push({
				sequence: f.sequence,
				text: vline
			});
		}
	}
	for (const m of reportData.messages) {
		if (severityReportingLevel(m.severity) < level) continue;
		if (m.severity === "USAGE" && quiet) continue;
		ordered.push({
			sequence: m.sequence,
			text: renderConsoleMessageLine(m, epubName)
		});
	}
	ordered.sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
	for (const o of ordered) lines.push(o.text);
	const shown = displayedConsoleCounts(countConsoleSeverities(reportData.messages), level);
	if (shown.fatal === 0 && shown.error === 0 && shown.warning === 0) {
		if (!quiet) lines.push(labels.no_errors__or_warnings);
	} else if (shown.warning > 0 && shown.fatal === 0 && shown.error === 0) lines.push(labels.there_were_warnings);
	else lines.push(labels.there_were_errors);
	if (!quiet) {
		const summary = renderConsoleSummaryLine(shown, level, labels);
		if (summary.length > 0) {
			lines.push(summary);
			lines.push("");
		}
		lines.push(labels.epubcheck_completed);
	}
	return lines.length === 0 ? "" : lines.join("\n") + "\n";
}
//#endregion
export { DEFAULT_CONSOLE_LABELS, ReportingLevel, countConsoleSeverities, displayedConsoleCounts, fixConsoleMessage, formatConsoleReport, formatTemplate, renderConsoleMessageLine, renderConsoleSummaryLine, renderValidatingLine, severityReportingLevel };

//# sourceMappingURL=console.js.map
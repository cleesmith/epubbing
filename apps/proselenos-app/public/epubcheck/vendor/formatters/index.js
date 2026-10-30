import { EPUBCHECK_VERSION } from "../version.js";
import { DEFAULT_CONSOLE_LABELS, ReportingLevel, countConsoleSeverities, displayedConsoleCounts, fixConsoleMessage, formatConsoleReport, formatTemplate, renderConsoleMessageLine, renderConsoleSummaryLine, renderValidatingLine, severityReportingLevel } from "./console.js";
//#region src/formatters/index.ts
/** Upstream Report.DEFAULT_MAX_OF_EACH_MESSAGE. Negative values mean unlimited. */
const DEFAULT_MAX_OF_EACH_MESSAGE = 25;
/** Java String.compareTo sign (UTF-16 code-unit order). */
const scmp = (a, b) => a < b ? -1 : a > b ? 1 : 0;
/** CheckMessage.safeCompare / EPUBLocation.safeCompare (null-tolerant). */
function safeCompare(a, b) {
	if (a === null && b !== null) return -1;
	if (a !== null && b === null) return 1;
	if (a === null || b === null) return 0;
	return scmp(a, b);
}
/** Severity.toInt() */
const SEVERITY_INT = {
	SUPPRESSED: 0,
	USAGE: 1,
	INFO: 2,
	WARNING: 3,
	ERROR: 4,
	FATAL: 5
};
const pad2 = (n) => String(n).padStart(2, "0");
/** CheckerMetadata's SimpleDateFormat("MM-dd-yyyy HH:mm:ss") (local time). */
function formatCheckDate(d) {
	return `${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}-${d.getFullYear()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}
/** XmlReportAbstract.fromTime: ISO 8601 with a colon in the zone offset. */
function formatGenerationDate(d) {
	const off = -d.getTimezoneOffset();
	const sign = off < 0 ? "-" : "+";
	const abs = Math.abs(off);
	return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}${sign}${pad2(Math.floor(abs / 60))}:${pad2(abs % 60)}`;
}
function resolveOptions(options) {
	const filename = options && options.filename;
	if (typeof filename !== "string" || filename.length === 0) throw new Error("formatters: options.filename (string) is required -- the EPUB file name");
	const maxOfEachMessage = options.maxOfEachMessage ?? 25;
	if (!Number.isInteger(maxOfEachMessage)) throw new Error("formatters: options.maxOfEachMessage must be an integer");
	return {
		filename,
		checkDate: options.checkDate !== void 0 ? options.checkDate : formatCheckDate(/* @__PURE__ */ new Date()),
		elapsedTime: options.elapsedTime !== void 0 ? options.elapsedTime : 0,
		generationDate: options.generationDate !== void 0 ? options.generationDate : formatGenerationDate(/* @__PURE__ */ new Date()),
		maxOfEachMessage
	};
}
/**
* Map a VFS marker path (/jsfile/<filename>, legacy /tmp/<filename>) to the
* path native epubcheck derives for the EPUB itself ("./<filename>"). Paths
* already in native form pass through unchanged.
*/
function makePathMapper(filename) {
	const markers = [`/jsfile/${filename}`, `/tmp/${filename}`];
	const mapPath = (p) => {
		if (p === null || p === void 0) return p;
		for (const m of markers) {
			if (p === m) return `./${filename}`;
			if (p.startsWith(m + "/")) return `./${filename}` + p.slice(m.length);
		}
		return p;
	};
	const mapText = (t) => {
		if (t === null || t === void 0) return t;
		let out = t;
		for (const m of markers) out = out.split(m).join(`./${filename}`);
		return out;
	};
	return {
		mapPath,
		mapText
	};
}
/** EPUBLocation.equals (Optional<String> context: both-absent counts equal). */
function locationEquals(a, b) {
	return a.path === b.path && a.line === b.line && a.column === b.column && (a.context ?? null) === (b.context ?? null);
}
/** EPUBLocation.compareTo */
function locationCompare(a, b) {
	let c = safeCompare(a.path, b.path);
	if (c !== 0) return c;
	c = a.line - b.line;
	if (c !== 0) return c < 0 ? -1 : 1;
	c = a.column - b.column;
	if (c !== 0) return c < 0 ? -1 : 1;
	return safeCompare(a.context ?? null, b.context ?? null);
}
/**
* CheckMessage.addCheckMessage: group tap messages by (ID, text), dedupe
* retained locations, and apply the report's configurable location cap.
*/
function addCheckMessage(list, maxCount, tap, mapPath, mapText) {
	const text = mapText(tap.message);
	const location = {
		path: mapPath(tap.path),
		line: tap.line,
		column: tap.column,
		context: tap.context
	};
	let cm = list.find((m) => m.ID === tap.id && m.message === text);
	if (!cm) {
		cm = {
			ID: tap.id,
			severity: tap.severity,
			message: text,
			additionalLocations: 0,
			locations: [],
			suggestion: tap.suggestion === "" ? null : tap.suggestion
		};
		list.push(cm);
	}
	if (!cm.locations.some((l) => locationEquals(l, location))) {
		if (maxCount < 0 || cm.locations.length < maxCount) cm.locations.push(location);
		else cm.additionalLocations++;
	}
	return cm;
}
/** CheckMessage.compareTo */
function checkMessageCompare(a, b) {
	let c = safeCompare(a.ID, b.ID);
	if (c !== 0) return c;
	c = SEVERITY_INT[a.severity] - SEVERITY_INT[b.severity];
	if (c !== 0) return c < 0 ? -1 : 1;
	c = safeCompare(a.message, b.message);
	if (c !== 0) return c;
	c = safeCompare(a.suggestion, b.suggestion);
	if (c !== 0) return c;
	c = a.additionalLocations - b.additionalLocations;
	if (c !== 0) return c < 0 ? -1 : 1;
	c = a.locations.length - b.locations.length;
	if (c !== 0) return c < 0 ? -1 : 1;
	return 0;
}
const parseLong = (s) => parseInt(String(s).trim(), 10);
/** Boolean.parseBoolean: case-insensitive "true". */
const parseBool = (s) => /^true$/i.test(String(s).trim());
function javaStringHashCode(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
	return h;
}
function hashMapOrderKeys(keys) {
	let cap = 16;
	let threshold = 12;
	for (let size = 1; size <= keys.length; size++) if (size > threshold) {
		cap <<= 1;
		threshold = Math.floor(cap * .75);
	}
	return keys.map((key, i) => {
		const h = javaStringHashCode(key);
		return {
			key,
			i,
			bucket: (h ^ h >>> 16) & cap - 1
		};
	}).sort((a, b) => a.bucket - b.bucket || a.i - b.i).map((e) => e.key);
}
function newItem(fileName) {
	return {
		id: "",
		fileName,
		media_type: null,
		compressedSize: 0,
		uncompressedSize: 0,
		compressionMethod: null,
		checkSum: null,
		isSpineItem: false,
		spineIndex: null,
		isLinear: false,
		isFixedFormat: null,
		isScripted: false,
		renditionLayout: null,
		renditionOrientation: null,
		renditionSpread: null,
		referencedItems: /* @__PURE__ */ new Set()
	};
}
/** ItemMetadata.handleInfo */
function itemHandleInfo(item, feature, value) {
	switch (feature) {
		case "DECLARED_MIMETYPE":
			item.media_type = value;
			break;
		case "HAS_SCRIPTS":
			item.isScripted = true;
			break;
		case "HAS_FIXED_LAYOUT":
			item.isFixedFormat = true;
			break;
		case "IS_SPINEITEM":
			item.isSpineItem = true;
			break;
		case "UNIQUE_IDENT":
			item.id = value !== null ? value : "";
			break;
		case "IS_LINEAR":
			item.isLinear = parseBool(value);
			break;
		case "RESOURCE":
			if (value !== null && value !== item.fileName) item.referencedItems.add(value);
			break;
		case "SIZE":
			item.uncompressedSize = parseLong(value);
			break;
		case "COMPRESSED_SIZE":
			item.compressedSize = parseLong(value);
			break;
		case "COMPRESSION_METHOD":
			item.compressionMethod = value;
			break;
		case "SHA_256":
			item.checkSum = value;
			break;
		case "SPINE_INDEX":
			item.spineIndex = parseLong(value);
			break;
		case "RENDITION_LAYOUT":
			item.renditionLayout = value;
			break;
		case "RENDITION_ORIENTATION":
			item.renditionOrientation = value;
			break;
		case "RENDITION_SPREAD": item.renditionSpread = value;
	}
}
/** PublicationMetadata.handleInfo */
function publicationHandleInfo(pub, resource, feature, value) {
	switch (feature) {
		case "DC_TITLE":
			pub.title = value;
			break;
		case "DC_LANGUAGE":
			pub.language = value;
			break;
		case "DC_PUBLISHER":
			pub.publisher = value;
			break;
		case "DC_CREATOR":
			pub.creator.push(value);
			break;
		case "DC_RIGHTS":
			pub.rights = value;
			break;
		case "DC_SUBJECT":
			pub.subject.push(value);
			break;
		case "DC_DESCRIPTION":
			pub.description = value;
			break;
		case "MODIFIED_DATE":
			pub.date = value;
			break;
		case "UNIQUE_IDENT":
			if (resource === null) pub.identifier = value;
			break;
		case "FORMAT_VERSION":
			pub.ePubVersion = value;
			break;
		case "HAS_SCRIPTS":
			pub.isScripted = true;
			pub.isBackwardCompatible = false;
			break;
		case "HAS_FIXED_LAYOUT":
			pub.hasFixedFormat = true;
			pub.isBackwardCompatible = false;
			break;
		case "IS_SPINEITEM":
			pub.nSpines++;
			break;
		case "HAS_NCX":
			if (!parseBool(value)) pub.isBackwardCompatible = false;
			break;
		case "RENDITION_LAYOUT":
			if (resource === null) pub.renditionLayout = value;
			break;
		case "RENDITION_ORIENTATION":
			if (resource === null) pub.renditionOrientation = value;
			break;
		case "RENDITION_SPREAD":
			if (resource === null) pub.renditionSpread = value;
			break;
		case "CHARS_COUNT":
			pub.charsCount += parseLong(value);
			break;
		case "DECLARED_MIMETYPE":
			if (value !== null && value.startsWith("audio/")) pub.hasAudio = true;
			else if (value !== null && value.startsWith("video/")) pub.hasVideo = true;
			break;
		case "FONT_EMBEDDED":
			pub.embeddedFonts.add(value);
			break;
		case "FONT_REFERENCE":
			pub.refFonts.add(value);
			break;
		case "HAS_SIGNATURES":
			pub.hasSignatures = true;
			break;
		case "HAS_ENCRYPTION":
			pub.hasEncryption = true;
			break;
		case "DC_CONTRIBUTOR": pub.contributors.add(value);
	}
}
function jacksonEscape(s) {
	let out = "\"";
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		if (c === 34) out += "\\\"";
		else if (c === 92) out += "\\\\";
		else if (c === 8) out += "\\b";
		else if (c === 9) out += "\\t";
		else if (c === 10) out += "\\n";
		else if (c === 12) out += "\\f";
		else if (c === 13) out += "\\r";
		else if (c < 32 || c > 127) out += "\\u" + c.toString(16).toUpperCase().padStart(4, "0");
		else out += s.charAt(i);
	}
	return out + "\"";
}
/**
* Jackson pretty printing: objects indent 2 spaces per OBJECT depth with
* `"key" : value`; arrays stay on one line (", " separators, "[ ... ]").
*/
function jacksonSerialize(value, depth) {
	if (value === null) return "null";
	if (typeof value === "boolean" || typeof value === "number") return String(value);
	if (typeof value === "string") return jacksonEscape(value);
	if (Array.isArray(value)) {
		if (value.length === 0) return "[ ]";
		return "[ " + value.map((v) => jacksonSerialize(v, depth)).join(", ") + " ]";
	}
	const keys = Object.keys(value);
	if (keys.length === 0) return "{ }";
	const ind = "  ".repeat(depth + 1);
	return "{\n" + keys.map((k) => `${ind}${jacksonEscape(k)} : ${jacksonSerialize(value[k], depth + 1)}`).join(",\n") + "\n" + "  ".repeat(depth) + "}";
}
/**
* Format the JSON report -- byte-identical to `epubcheck --json`
* (com.adobe.epubcheck.reporting.CheckingReport rendered by Jackson).
*
* The single caveat: native epubcheck itself flips the field order inside
* locations[].url ({opaque, hierarchical}) between JVM runs; this formatter
* always emits {"opaque", "hierarchical"}.
*/
function formatJsonReport(reportData, options) {
	const opts = resolveOptions(options);
	const { mapPath, mapText } = makePathMapper(opts.filename);
	const messages = [];
	for (const tap of reportData.messages) addCheckMessage(messages, opts.maxOfEachMessage, tap, mapPath, mapText);
	const pub = {
		publisher: null,
		title: null,
		creator: [],
		date: null,
		subject: [],
		description: null,
		rights: null,
		identifier: null,
		language: null,
		nSpines: 0,
		checkSum: 0,
		renditionLayout: "reflowable",
		renditionOrientation: "auto",
		renditionSpread: "auto",
		ePubVersion: null,
		isScripted: false,
		hasFixedFormat: false,
		isBackwardCompatible: true,
		hasAudio: false,
		hasVideo: false,
		charsCount: 0,
		embeddedFonts: /* @__PURE__ */ new Set(),
		refFonts: /* @__PURE__ */ new Set(),
		hasEncryption: false,
		hasSignatures: false,
		contributors: /* @__PURE__ */ new Set()
	};
	const itemIndex = /* @__PURE__ */ new Map();
	for (const { resource, feature, value } of reportData.features) {
		publicationHandleInfo(pub, resource, feature, value);
		if (resource !== null && resource !== "") {
			let item = itemIndex.get(resource);
			if (!item) {
				item = newItem(resource);
				itemIndex.set(resource, item);
			}
			itemHandleInfo(item, feature, value);
		}
	}
	const items = hashMapOrderKeys([...itemIndex.keys()]).map((k) => itemIndex.get(k));
	const defaultFixedFormat = pub.renditionLayout === "pre-paginated";
	for (const item of items) {
		if (item.id === null || item.id === "") item.id = "ePubCheck.NoManifestRef:" + item.fileName;
		if (item.isSpineItem) {
			if (item.renditionLayout === null || item.renditionLayout === "") item.renditionLayout = pub.renditionLayout;
			if (item.renditionOrientation === null || item.renditionOrientation === "") item.renditionOrientation = pub.renditionOrientation;
			if (item.renditionSpread === null || item.renditionSpread === "") item.renditionSpread = pub.renditionSpread;
			if (item.isFixedFormat === null) item.isFixedFormat = defaultFixedFormat;
		}
	}
	let nFatal = 0, nError = 0, nWarning = 0, nUsage = 0;
	for (const m of messages) if (m.severity === "FATAL") nFatal++;
	else if (m.severity === "ERROR") nError++;
	else if (m.severity === "WARNING") nWarning++;
	else if (m.severity === "USAGE") nUsage++;
	items.sort((a, b) => scmp(a.id, b.id));
	messages.sort(checkMessageCompare);
	for (const m of messages) m.locations.sort(locationCompare);
	const checkDate = opts.checkDate instanceof Date ? formatCheckDate(opts.checkDate) : opts.checkDate;
	return jacksonSerialize({
		messages: messages.map((m) => ({
			ID: m.ID,
			severity: m.severity,
			message: m.message,
			additionalLocations: m.additionalLocations,
			locations: m.locations.map((l) => ({
				url: {
					opaque: false,
					hierarchical: true
				},
				path: l.path,
				line: l.line,
				column: l.column,
				context: l.context ?? null
			})),
			suggestion: m.suggestion
		})),
		customMessageFileName: null,
		checker: {
			path: `./${opts.filename}`,
			filename: opts.filename,
			checkerVersion: EPUBCHECK_VERSION,
			checkDate,
			elapsedTime: opts.elapsedTime,
			nFatal,
			nError,
			nWarning,
			nUsage
		},
		publication: {
			publisher: pub.publisher,
			title: pub.title,
			creator: pub.creator,
			date: pub.date,
			subject: pub.subject,
			description: pub.description,
			rights: pub.rights,
			identifier: pub.identifier,
			language: pub.language,
			nSpines: pub.nSpines,
			checkSum: pub.checkSum,
			renditionLayout: pub.renditionLayout,
			renditionOrientation: pub.renditionOrientation,
			renditionSpread: pub.renditionSpread,
			ePubVersion: pub.ePubVersion,
			isScripted: pub.isScripted,
			hasFixedFormat: pub.hasFixedFormat,
			isBackwardCompatible: pub.isBackwardCompatible,
			hasAudio: pub.hasAudio,
			hasVideo: pub.hasVideo,
			charsCount: pub.charsCount,
			embeddedFonts: [...pub.embeddedFonts],
			refFonts: [...pub.refFonts],
			hasEncryption: pub.hasEncryption,
			hasSignatures: pub.hasSignatures,
			contributors: [...pub.contributors]
		},
		items: items.map((i) => ({
			id: i.id,
			fileName: i.fileName,
			media_type: i.media_type,
			compressedSize: i.compressedSize,
			uncompressedSize: i.uncompressedSize,
			compressionMethod: i.compressionMethod,
			checkSum: i.checkSum,
			isSpineItem: i.isSpineItem,
			spineIndex: i.spineIndex,
			isLinear: i.isLinear,
			isFixedFormat: i.isFixedFormat,
			isScripted: i.isScripted,
			renditionLayout: i.renditionLayout,
			renditionOrientation: i.renditionOrientation,
			renditionSpread: i.renditionSpread,
			referencedItems: [...i.referencedItems].sort(scmp)
		}))
	}, 0);
}
/** XmlReportAbstract state + info() aggregation. */
function xmlAbstractAggregate(reportData, maxOfEachMessage, mapPath, mapText) {
	const st = {
		epubCheckName: "epubcheck",
		epubCheckVersion: EPUBCHECK_VERSION,
		epubCheckDate: "2012-10-31",
		creationDate: null,
		lastModifiedDate: null,
		identifier: null,
		titles: /* @__PURE__ */ new Set(),
		creators: /* @__PURE__ */ new Set(),
		contributors: /* @__PURE__ */ new Set(),
		subjects: /* @__PURE__ */ new Set(),
		publisher: null,
		rights: /* @__PURE__ */ new Set(),
		date: null,
		mediaTypes: /* @__PURE__ */ new Set(),
		formatName: null,
		formatVersion: null,
		pagesCount: 0,
		charsCount: 0,
		language: null,
		embeddedFonts: /* @__PURE__ */ new Set(),
		refFonts: /* @__PURE__ */ new Set(),
		references: /* @__PURE__ */ new Set(),
		hasEncryption: false,
		hasSignatures: false,
		hasAudio: false,
		hasVideo: false,
		hasFixedLayout: false,
		hasScripts: false,
		fatalErrors: [],
		errors: [],
		warns: [],
		hints: []
	};
	for (const tap of reportData.messages) switch (tap.severity) {
		case "FATAL":
			addCheckMessage(st.fatalErrors, maxOfEachMessage, tap, mapPath, mapText);
			break;
		case "ERROR":
			addCheckMessage(st.errors, maxOfEachMessage, tap, mapPath, mapText);
			break;
		case "WARNING":
			addCheckMessage(st.warns, maxOfEachMessage, tap, mapPath, mapText);
			break;
		case "USAGE": addCheckMessage(st.hints, maxOfEachMessage, tap, mapPath, mapText);
	}
	for (const { resource, feature, value } of reportData.features) {
		if (value === null) continue;
		switch (feature) {
			case "TOOL_DATE":
				if (!value.startsWith("$")) st.epubCheckDate = value;
				break;
			case "TOOL_NAME":
				st.epubCheckName = value;
				break;
			case "TOOL_VERSION":
				st.epubCheckVersion = value;
				break;
			case "FORMAT_NAME":
				st.formatName = value;
				break;
			case "FORMAT_VERSION":
				st.formatVersion = value;
				break;
			case "CREATION_DATE":
				st.creationDate = value;
				break;
			case "MODIFIED_DATE":
				st.lastModifiedDate = value;
				break;
			case "PAGES_COUNT":
				st.pagesCount = parseLong(value);
				break;
			case "CHARS_COUNT":
				st.charsCount += parseLong(value);
				break;
			case "DECLARED_MIMETYPE":
				st.mediaTypes.add(value);
				if (value.startsWith("audio/")) st.hasAudio = true;
				else if (value.startsWith("video/")) st.hasVideo = true;
				break;
			case "FONT_EMBEDDED":
				st.embeddedFonts.add(value);
				break;
			case "FONT_REFERENCE":
				st.refFonts.add(value);
				break;
			case "REFERENCE":
				st.references.add(value);
				break;
			case "DC_LANGUAGE":
				st.language = value;
				break;
			case "DC_TITLE":
				st.titles.add(value);
				break;
			case "DC_CREATOR":
				st.creators.add(value);
				break;
			case "DC_CONTRIBUTOR":
				st.contributors.add(value);
				break;
			case "DC_PUBLISHER":
				st.publisher = value;
				break;
			case "DC_SUBJECT":
				st.subjects.add(value);
				break;
			case "DC_RIGHTS":
				st.rights.add(value);
				break;
			case "DC_DATE":
				st.date = value;
				break;
			case "UNIQUE_IDENT":
				if (resource === null) st.identifier = value;
				break;
			case "HAS_SIGNATURES":
				st.hasSignatures = true;
				break;
			case "HAS_ENCRYPTION":
				st.hasEncryption = true;
				break;
			case "HAS_FIXED_LAYOUT":
				st.hasFixedLayout = true;
				break;
			case "HAS_SCRIPTS": st.hasScripts = true;
		}
	}
	return st;
}
/** XmlReportAbstract.getNameFromPath */
function getNameFromPath(path) {
	if (path === null || path === void 0 || path.length === 0) return null;
	const lastSlash = path.lastIndexOf("/");
	return lastSlash === -1 ? path : path.slice(lastSlash + 1);
}
/** XmlReportAbstract.capitalize */
function capitalize(s) {
	return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
/**
* XmlReportAbstract.correctToUtf8: ISO control chars (0x00-0x1F, 0x7F-0x9F)
* except \r \n are replaced with "0x%x" (lowercase hex).
*/
function correctToUtf8(s) {
	let out = "";
	for (const ch of s) {
		const c = ch.codePointAt(0);
		if ((c <= 31 || c >= 127 && c <= 159) && ch !== "\r" && ch !== "\n") out += "0x" + c.toString(16);
		else out += ch;
	}
	return out;
}
/** Java String.trim (strips chars <= 0x20 from both ends). */
function javaTrim(s) {
	let start = 0;
	let end = s.length;
	while (start < end && s.charCodeAt(start) <= 32) start++;
	while (end > start && s.charCodeAt(end - 1) <= 32) end--;
	return s.slice(start, end);
}
var XmlBuilder = class {
	root = null;
	stack = [];
	get current() {
		return this.stack[this.stack.length - 1];
	}
	startElement(name, ...attrs) {
		const el = {
			name,
			attrs: attrs.map(([k, v]) => [k, v]),
			children: [],
			text: null
		};
		if (this.stack.length === 0) this.root = el;
		else this.current.children.push(el);
		this.stack.push(el);
	}
	endElement() {
		this.stack.pop();
	}
	/** generateElement: skip when value null/blank; text is trim+correctToUtf8. */
	generateElement(name, value, ...attrs) {
		if (attrs.length === 0) {
			if (value === null || value === void 0 || javaTrim(String(value)).length === 0) return;
			this.current.children.push({
				name,
				attrs: [],
				children: [],
				text: correctToUtf8(javaTrim(String(value)))
			});
			return;
		}
		const el = {
			name,
			attrs: attrs.map(([k, v]) => [k, v]),
			children: [],
			text: null
		};
		if (value !== null && value !== void 0 && javaTrim(String(value)).length !== 0) el.text = correctToUtf8(javaTrim(String(value)));
		this.current.children.push(el);
	}
};
function saxonEscapeText(s) {
	let out = "";
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		if (c === 38) out += "&amp;";
		else if (c === 60) out += "&lt;";
		else if (c === 62) out += "&gt;";
		else if (c === 13) out += "&#xD;";
		else if (c < 32 && c !== 9 && c !== 10) out += "&#x" + c.toString(16) + ";";
		else if (c >= 127 && c < 160 || c === 8232) out += "&#x" + c.toString(16) + ";";
		else out += s.charAt(i);
	}
	return out;
}
function saxonEscapeAttr(s) {
	let out = "";
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		if (c === 38) out += "&amp;";
		else if (c === 60) out += "&lt;";
		else if (c === 62) out += "&gt;";
		else if (c === 34) out += "&#34;";
		else if (c === 10) out += "&#xA;";
		else if (c === 13) out += "&#xD;";
		else if (c === 9) out += "&#x9;";
		else if (c < 32) out += "&#x" + c.toString(16) + ";";
		else if (c >= 127 && c < 160 || c === 8232) out += "&#x" + c.toString(16) + ";";
		else out += s.charAt(i);
	}
	return out;
}
/**
* Serialize one element tree exactly as the bundled Saxon-HE does for
* transformer.setOutputProperty(INDENT, "yes") over a Xerces DOM:
* - 3-space indentation; elements with a text child stay on one line;
* - namespace declarations (from xmlns:* attrs) before attributes, sorted by
*   prefix; attributes sorted by qualified name (Xerces NamedNodeMap order);
* - Saxon's attribute-wrapping rule: when the summed length estimate exceeds
*   80, every ns/attr after the first goes on its own line indented to
*   depth*3 + 3 + name.length (XMLIndenter.startElement + XMLEmitter);
* - trailing newline after the root end tag.
*/
function saxonSerialize(rootEl) {
	const lines = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>"];
	const write = (el, depth, inheritedNs) => {
		const indent = "   ".repeat(depth);
		const nsDecls = [];
		const attrs = [];
		for (const [k, v] of el.attrs) if (k === "xmlns") nsDecls.push(["", v]);
		else if (k.startsWith("xmlns:")) nsDecls.push([k.slice(6), v]);
		else attrs.push([k, v]);
		const effectiveNs = nsDecls.filter(([p, u]) => inheritedNs.get(p) !== u);
		const scope = new Map(inheritedNs);
		for (const [p, u] of effectiveNs) scope.set(p, u);
		effectiveNs.sort((a, b) => scmp(a[0], b[0]));
		attrs.sort((a, b) => scmp(a[0], b[0]));
		let len = 0;
		for (const [p, u] of effectiveNs) len += p === "" ? 9 + u.length : p.length + 10 + u.length;
		for (const [k, v] of attrs) {
			const colon = k.indexOf(":");
			const prefix = colon === -1 ? "" : k.slice(0, colon);
			const localPart = colon === -1 ? k : k.slice(colon + 1);
			len += localPart.length + String(v).length + 4 + (prefix === "" ? 4 : prefix.length + 5);
		}
		const wrap = len > 80;
		const attrIndent = " ".repeat(depth * 3 + 3 + el.name.length);
		let line = indent + "<" + el.name;
		let first = true;
		const emitKv = (k, v) => {
			const kv = `${k}="${saxonEscapeAttr(String(v))}"`;
			if (first) {
				line += " " + kv;
				first = false;
			} else if (wrap) {
				lines.push(line);
				line = attrIndent + kv;
			} else line += " " + kv;
		};
		for (const [p, u] of effectiveNs) emitKv(p === "" ? "xmlns" : "xmlns:" + p, u);
		for (const [k, v] of attrs) emitKv(k, v);
		if (el.children.length === 0 && el.text === null) lines.push(line + "/>");
		else if (el.children.length === 0) lines.push(line + ">" + saxonEscapeText(el.text) + "</" + el.name + ">");
		else {
			lines.push(line + ">");
			for (const child of el.children) write(child, depth + 1, scope);
			lines.push(indent + "</" + el.name + ">");
		}
	};
	write(rootEl, 0, /* @__PURE__ */ new Map());
	return lines.join("\n") + "\n";
}
/** XmlReportImpl.generateProperty(String name, String[]|String|long|boolean) */
function generateProperty(x, name, value, type) {
	if (Array.isArray(value)) {
		if (value.length === 0) return;
		x.startElement("property");
		x.generateElement("name", name);
		x.startElement("values", ["arity", value.length === 1 ? "Scalar" : "Array"], ["type", type]);
		for (const v of value) x.generateElement("value", v);
		x.endElement();
		x.endElement();
		return;
	}
	if (value === null || value === void 0 || javaTrim(String(value)).length === 0) return;
	x.startElement("property");
	x.generateElement("name", name);
	x.startElement("values", ["arity", "Scalar"], ["type", type]);
	x.generateElement("value", String(value));
	x.endElement();
	x.endElement();
}
const generateLongProperty = (x, name, value) => {
	if (value !== 0) generateProperty(x, name, String(value), "Long");
};
const generateBooleanProperty = (x, name, value) => {
	generateProperty(x, name, value ? "true" : "false", "Boolean");
};
function xmlMessages(x, list, sevLabel, sevAttr) {
	for (const c of list) {
		const m = `${c.ID}, ${sevLabel}, [${c.message}], `;
		for (const ml of c.locations) {
			let loc = "";
			if (ml.line > 0 || ml.column > 0) loc = ` (${ml.line}-${ml.column})`;
			x.generateElement("message", m + ml.path + loc, ["id", c.ID], ["severity", sevAttr]);
		}
	}
}
/**
* Format the XML report -- byte-identical to `epubcheck --out`
* (com.adobe.epubcheck.util.XmlReportImpl rendered by Saxon-HE).
*/
function formatXmlReport(reportData, options) {
	const opts = resolveOptions(options);
	const { mapPath, mapText } = makePathMapper(opts.filename);
	const st = xmlAbstractAggregate(reportData, opts.maxOfEachMessage, mapPath, mapText);
	const generationDate = opts.generationDate instanceof Date ? formatGenerationDate(opts.generationDate) : opts.generationDate;
	const x = new XmlBuilder();
	x.startElement("jhove", ["xmlns", "http://schema.openpreservation.org/ois/xml/ns/jhove"], ["xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance"], ["name", st.epubCheckName], ["release", st.epubCheckVersion], ["date", st.epubCheckDate], ["xsi:schemaLocation", "http://schema.openpreservation.org/ois/xml/ns/jhove https://schema.openpreservation.org/ois/xml/xsd/jhove/jhove.xsd"]);
	x.generateElement("date", generationDate);
	x.startElement("repInfo", ["uri", opts.filename]);
	x.generateElement("created", st.creationDate);
	x.generateElement("lastModified", st.lastModifiedDate);
	x.generateElement("format", st.formatName === null ? "application/octet-stream" : st.formatName);
	x.generateElement("version", st.formatVersion);
	x.generateElement("status", st.fatalErrors.length === 0 && st.errors.length === 0 ? "Well-formed" : "Not well-formed");
	if (st.warns.length || st.fatalErrors.length || st.errors.length || st.hints.length) {
		x.startElement("messages");
		xmlMessages(x, st.fatalErrors, "FATAL", "error");
		xmlMessages(x, st.errors, "ERROR", "error");
		xmlMessages(x, st.warns, "WARN", "warning");
		xmlMessages(x, st.hints, "HINT", "info");
		x.endElement();
	}
	x.generateElement("mimeType", st.formatName);
	x.startElement("properties");
	generateProperty(x, "FileName", getNameFromPath(opts.filename), "String");
	generateLongProperty(x, "PageCount", st.pagesCount);
	generateLongProperty(x, "CharacterCount", st.charsCount);
	generateProperty(x, "Language", st.language, "String");
	x.startElement("property");
	x.generateElement("name", "Info");
	x.startElement("values", ["arity", "List"], ["type", "Property"]);
	generateProperty(x, "Identifier", st.identifier, "String");
	generateProperty(x, "CreationDate", st.creationDate, "Date");
	generateProperty(x, "ModDate", st.lastModifiedDate, "Date");
	if (st.titles.size) generateProperty(x, "Title", [...st.titles], "String");
	if (st.creators.size) generateProperty(x, "Creator", [...st.creators], "String");
	if (st.contributors.size) generateProperty(x, "Contributor", [...st.contributors], "String");
	generateProperty(x, "Date", st.date, "String");
	generateProperty(x, "Publisher", st.publisher, "String");
	if (st.subjects.size) generateProperty(x, "Subject", [...st.subjects], "String");
	if (st.rights.size) generateProperty(x, "Rights", [...st.rights], "String");
	x.endElement();
	x.endElement();
	if (st.embeddedFonts.size || st.refFonts.size) {
		x.startElement("property");
		x.generateElement("name", "Fonts");
		x.startElement("values", ["arity", "List"], ["type", "Property"]);
		for (const f of st.embeddedFonts) {
			x.startElement("property");
			x.generateElement("name", "Font");
			x.startElement("values", ["arity", "List"], ["type", "Property"]);
			generateProperty(x, "FontName", getNameFromPath(f), "String");
			generateBooleanProperty(x, "FontFile", true);
			x.endElement();
			x.endElement();
		}
		for (const f of st.refFonts) {
			x.startElement("property");
			x.generateElement("name", "Font");
			x.startElement("values", ["arity", "List"], ["type", "Property"]);
			generateProperty(x, "FontName", getNameFromPath(f), "String");
			generateBooleanProperty(x, "FontFile", false);
			x.endElement();
			x.endElement();
		}
		x.endElement();
		x.endElement();
	}
	if (st.references.size) {
		x.startElement("property");
		x.generateElement("name", "References");
		x.startElement("values", ["arity", "List"], ["type", "Property"]);
		for (const r of st.references) generateProperty(x, "Reference", r, "String");
		x.endElement();
		x.endElement();
	}
	if (st.mediaTypes.size) generateProperty(x, "MediaTypes", [...st.mediaTypes], "String");
	if (st.hasEncryption) generateBooleanProperty(x, "hasEncryption", true);
	if (st.hasSignatures) generateBooleanProperty(x, "hasSignatures", true);
	if (st.hasAudio) generateBooleanProperty(x, "hasAudio", true);
	if (st.hasVideo) generateBooleanProperty(x, "hasVideo", true);
	if (st.hasFixedLayout) generateBooleanProperty(x, "hasFixedLayout", true);
	if (st.hasScripts) generateBooleanProperty(x, "hasScripts", true);
	x.endElement();
	x.endElement();
	x.endElement();
	return saxonSerialize(x.root);
}
/** XmpReportImpl.generateFont */
function xmpFont(x, font) {
	const elFont = String(font).split(",");
	const attrs = [["stFnt:fontFamily", capitalize(elFont[0])]];
	let fontFace = "";
	for (let i = 1; i < elFont.length; i++) fontFace += capitalize(elFont[i]) + " ";
	fontFace = javaTrim(fontFace);
	attrs.push(["stFnt:fontFace", fontFace.length === 0 ? "Regular" : fontFace]);
	x.generateElement("rdf:li", null, ...attrs);
}
function xmpEventOutcome(x, list, sev) {
	for (const c of list) {
		x.startElement("rdf:li", ["rdf:parseType", "Resource"]);
		x.generateElement("premis:hasEventOutcome", `${c.ID}, ${sev}, ${c.message}`);
		if (c.locations.length !== 0) {
			x.startElement("premis:hasEventOutcomeDetail");
			x.startElement("rdf:Seq");
			let previousValue = "";
			for (const ml of c.locations) {
				let value = ml.path;
				if (ml.line > 0 || ml.column > 0) value += ` (${ml.line}-${ml.column})`;
				if (previousValue !== value) {
					x.generateElement("rdf:li", null, ["premis:hasEventOutcomeDetailNote", value]);
					previousValue = value;
				}
			}
			x.endElement();
			x.endElement();
		}
		x.endElement();
	}
}
/**
* Format the XMP report -- byte-identical to `epubcheck --xmp`
* (com.adobe.epubcheck.util.XmpReportImpl rendered by Saxon-HE).
*/
function formatXmpReport(reportData, options) {
	const opts = resolveOptions(options);
	const { mapPath, mapText } = makePathMapper(opts.filename);
	const st = xmlAbstractAggregate(reportData, opts.maxOfEachMessage, mapPath, mapText);
	const generationDate = opts.generationDate instanceof Date ? formatGenerationDate(opts.generationDate) : opts.generationDate;
	const x = new XmlBuilder();
	x.startElement("x:xmpmeta", ["xmlns:x", "adobe:ns:meta/"], ["x:xmptk", "Adobe XMP Core 5.1.0-jc003"]);
	x.startElement("rdf:RDF", ["xmlns:rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"]);
	const attrs = [
		["rdf:about", ""],
		["xmlns:dc", "http://purl.org/dc/elements/1.1/"],
		["xmlns:xmp", "http://ns.adobe.com/xap/1.0/"],
		["xmlns:xmpTPg", "http://ns.adobe.com/xap/1.0/t/pg/"],
		["xmlns:stFnt", "http://ns.adobe.com/xap/1.0/sType/Font#"],
		["xmlns:extended-properties", "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties/"],
		["xmlns:premis", "http://www.loc.gov/premis/rdf/v1#"]
	];
	if (st.formatName === null) attrs.push(["dc:format", "application/octet-stream"]);
	else if (st.formatVersion === null) attrs.push(["dc:format", st.formatName]);
	else attrs.push(["dc:format", `${st.formatName};version=${st.formatVersion}`]);
	if (st.creationDate !== null) attrs.push(["xmp:CreateDate", st.creationDate]);
	if (st.charsCount !== 0) attrs.push(["extended-properties:Characters", String(st.charsCount)]);
	if (st.pagesCount !== 0) attrs.push(["xmpTPg:NPages", String(st.pagesCount)]);
	if (st.publisher !== null) attrs.push(["dc:publisher", st.publisher]);
	attrs.push(["dc:identifier", st.identifier === null ? "" : st.identifier]);
	if (st.language !== null) attrs.push(["dc:language", st.language]);
	x.startElement("rdf:Description", ...attrs);
	if (st.creators.size) {
		x.startElement("dc:creator");
		x.startElement("rdf:Seq");
		for (const creator of st.creators) x.generateElement("rdf:li", creator);
		x.endElement();
		x.endElement();
	}
	if (st.titles.size) {
		x.startElement("dc:title");
		x.startElement("rdf:Alt");
		let firstTitle = true;
		for (const title of st.titles) if (firstTitle) {
			x.generateElement("rdf:li", javaTrim(title), ["xml:lang", "x-default"]);
			firstTitle = false;
		} else x.generateElement("rdf:li", title);
		x.endElement();
		x.endElement();
	}
	if (st.subjects.size) {
		x.startElement("dc:subject");
		x.startElement("rdf:Bag");
		for (const subject of st.subjects) x.generateElement("rdf:li", subject);
		x.endElement();
		x.endElement();
	}
	if (st.embeddedFonts.size || st.refFonts.size) {
		x.startElement("xmpTPg:Fonts");
		x.startElement("rdf:Bag");
		for (const font of st.embeddedFonts) xmpFont(x, font);
		for (const font of st.refFonts) xmpFont(x, font);
		x.endElement();
		x.endElement();
	}
	x.startElement("premis:hasEvent", ["rdf:parseType", "Resource"]);
	x.generateElement("premis:hasEventDateTime", String(generationDate), ["rdf:datatype", "http://www.w3.org/2001/XMLSchema#dateTime"]);
	x.generateElement("premis:hasEventType", null, ["rdf:resource", "http://id.loc.gov/vocabulary/preservation/eventType/val"]);
	x.generateElement("premis:hasEventDetail", st.fatalErrors.length === 0 && st.errors.length === 0 ? "Well-formed" : "Not well-formed");
	if (st.fatalErrors.length + st.errors.length + st.warns.length + st.hints.length !== 0) {
		x.startElement("premis:hasEventOutcomeInformation");
		x.startElement("rdf:Seq");
		xmpEventOutcome(x, st.fatalErrors, "FATAL");
		xmpEventOutcome(x, st.errors, "ERROR");
		xmpEventOutcome(x, st.warns, "WARN");
		xmpEventOutcome(x, st.hints, "HINT");
		x.endElement();
		x.endElement();
	}
	x.startElement("premis:hasEventRelatedAgent", ["rdf:parseType", "Resource"]);
	x.generateElement("premis:hasAgentType", null, ["rdf:resource", "http://id.loc.gov/vocabulary/preservation/agentType/sof"]);
	x.generateElement("premis:hasAgentName", st.epubCheckVersion === null ? st.epubCheckName : `${st.epubCheckName} ${st.epubCheckVersion}`);
	x.endElement();
	x.endElement();
	x.startElement("premis:hasSignificantProperties");
	x.startElement("rdf:Bag");
	const sig = (property, value) => x.generateElement("rdf:li", null, ["premis:hasSignificantPropertiesType", property], ["premis:hasSignificantPropertiesValue", value]);
	sig("renditionLayout", st.hasFixedLayout ? "fixed-layout" : "reflowable");
	sig("isScripted", String(st.hasScripts));
	sig("hasEncryption", String(st.hasEncryption));
	sig("hasAudio", String(st.hasAudio));
	sig("hasVideo", String(st.hasVideo));
	sig("hasSignatures", String(st.hasSignatures));
	sig("hasAllFontsEmbedded", String(st.refFonts.size === 0));
	let nRefs = 0;
	for (const ref of st.references) {
		nRefs++;
		if (nRefs > 50) {
			sig("reference", `${st.references.size - 50} more references`);
			break;
		}
		sig("reference", ref);
	}
	x.endElement();
	x.endElement();
	x.endElement();
	x.endElement();
	x.endElement();
	return saxonSerialize(x.root);
}
var formatters_default = {
	formatJsonReport,
	formatXmlReport,
	formatXmpReport,
	formatConsoleReport
};
//#endregion
export { DEFAULT_CONSOLE_LABELS, DEFAULT_MAX_OF_EACH_MESSAGE, ReportingLevel, countConsoleSeverities, formatters_default as default, displayedConsoleCounts, fixConsoleMessage, formatConsoleReport, formatJsonReport, formatTemplate, formatXmlReport, formatXmpReport, renderConsoleMessageLine, renderConsoleSummaryLine, renderValidatingLine, severityReportingLevel };

//# sourceMappingURL=index.js.map
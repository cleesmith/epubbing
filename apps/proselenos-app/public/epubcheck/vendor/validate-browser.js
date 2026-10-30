import { EPUBCHECK_VERSION } from "./version.js";
import { validateWith } from "./validate-core.js";
import { configureEngine, runEngine } from "./engine-browser.js";
//#region src/validate-browser.ts
/**
* Validate an EPUB from a source, in the current Worker, to completion. Same
* contract as the Node `validate`; see the package README.
*/
async function validate(source, options = {}) {
	const { customMessages, ...rest } = options;
	const core = { ...rest };
	if (customMessages !== void 0) {
		if (typeof Blob !== "undefined" && customMessages instanceof Blob) {
			core.customMessages = new Uint8Array(await customMessages.arrayBuffer());
			const blobName = customMessages.name;
			if (typeof blobName === "string" && blobName.length > 0 && options.customMessagesName === void 0) core.customMessagesName = blobName;
		} else core.customMessages = customMessages;
	}
	return validateWith(runEngine, source, core);
}
var validate_browser_default = {
	validate,
	configureEngine,
	EPUBCHECK_VERSION
};
//#endregion
export { EPUBCHECK_VERSION, configureEngine, validate_browser_default as default, validate };

//# sourceMappingURL=validate-browser.js.map
/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test helper. */
const { readFileSync } = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

module.exports = function loadSource(relative, imports = {}) {
  const filename = path.resolve(__dirname, "../..", relative);
  const source = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX }, fileName: filename,
  }).outputText;
  const loadedModule = { exports: {} };
  new Function("require", "module", "exports", source)((id) => {
    if (id in imports) return imports[id];
    throw new Error(`Unexpected runtime import: ${id}`);
  }, loadedModule, loadedModule.exports);
  return loadedModule.exports;
};

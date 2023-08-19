var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  default: () => macrosPlugin
});
module.exports = __toCommonJS(plugin_exports);

// node_modules/.pnpm/tsup@5.12.1_typescript@4.6.2/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/plugin.ts
var babel = __toESM(require("@babel/core"), 1);
var import_module = require("module");
var require2 = (0, import_module.createRequire)(importMetaUrl);
var sourceRegex = /\.(j|t)sx?$/;
var tsxRegex = /\.(j|t)sx$/;
function macrosPlugin() {
  return {
    name: "babel-macros",
    enforce: "pre",
    async transform(source, filename) {
      if (filename.includes("node_modules")) {
        return void 0;
      }
      if (!sourceRegex.test(filename)) {
        return void 0;
      }
      const result = await babel.transformAsync(source, {
        filename,
        plugins: [
          require2.resolve("@babel/plugin-syntax-jsx"),
          [
            require2.resolve("@babel/plugin-syntax-typescript"),
            { isTSX: tsxRegex.test(filename) }
          ],
          require2.resolve("babel-plugin-macros")
        ],
        babelrc: false,
        configFile: false,
        sourceMaps: true
      });
      return result;
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=plugin.cjs.map
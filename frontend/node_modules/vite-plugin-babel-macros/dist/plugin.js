// src/plugin.ts
import * as babel from "@babel/core";
import { createRequire } from "module";
var require2 = createRequire(import.meta.url);
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
export {
  macrosPlugin as default
};
//# sourceMappingURL=plugin.js.map
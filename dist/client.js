"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
function setupClient(app) {
  if (typeof window !== "undefined") {
    console.log("VitePress Sidebar Tags Plugin loaded");
  }
}
function createThemeExtension() {
  return {
    enhanceApp({ app }) {
      setupClient();
    }
  };
}
const styleFile = "./style.css";
const index = {
  enhance({ app, router, siteData }) {
  }
};
exports.createThemeExtension = createThemeExtension;
exports.default = index;
exports.setupClient = setupClient;
exports.styleFile = styleFile;
//# sourceMappingURL=client.js.map

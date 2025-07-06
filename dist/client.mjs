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
export {
  createThemeExtension,
  index as default,
  setupClient,
  styleFile
};
//# sourceMappingURL=client.mjs.map

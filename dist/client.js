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
export {
  createThemeExtension,
  setupClient,
  styleFile
};
//# sourceMappingURL=client.js.map

import fs from "fs";
import path from "path";
import matter from "gray-matter";
class SidebarTagsCore {
  constructor(options) {
    this.options = options;
    this.tagConfigs = options.tags || [];
    this.options.docsPath = this.options.docsPath || "docs";
    this.options.sidebarPath = this.options.sidebarPath || "sidebar";
    this.options.injectInProduction = this.options.injectInProduction ?? false;
    this.options.debug = this.options.debug ?? false;
    this.options.locales = this.options.locales || ["zh", "en"];
  }
  /**
   * 获取文件的 frontmatter 数据
   */
  getFrontmatter(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(content);
        return data;
      }
    } catch (error) {
      if (this.options.debug) {
        console.warn(`Warning: Could not read frontmatter from ${filePath}`, error);
      }
    }
    return {};
  }
  /**
   * 生成单个标签HTML
   */
  generateTag(config, value) {
    if (typeof config.show === "function" && !config.show(value)) return "";
    let displayValue = value;
    if (config.transform) {
      displayValue = config.transform(value);
    }
    if (config.prefix) displayValue = config.prefix + displayValue;
    if (config.suffix) displayValue = displayValue + config.suffix;
    const actualConfig = this.getActualConfig(config, value);
    const classes = this.generateTagClasses(actualConfig);
    const inlineStyles = this.generateInlineStyles(actualConfig.customStyle);
    const position = actualConfig.position || "after";
    const positionClass = position === "before" ? "before" : "after";
    return ` <span class="sidebar-tag ${classes} ${positionClass}"${inlineStyles}>${displayValue}</span>`;
  }
  /**
   * 获取实际配置（应用valueStyles覆盖）
   */
  getActualConfig(config, value) {
    var _a, _b, _c;
    const valueStyle = ((_a = config.valueStyles) == null ? void 0 : _a[value]) || ((_b = config.valueStyles) == null ? void 0 : _b[value.toLowerCase()]) || ((_c = config.valueStyles) == null ? void 0 : _c[value.toUpperCase()]);
    if (valueStyle) {
      return { ...config, ...valueStyle };
    }
    return config;
  }
  /**
   * 生成标签CSS类名
   */
  generateTagClasses(config) {
    const classes = [];
    if (config.size) {
      classes.push(config.size);
    }
    if (config.variant) {
      classes.push(config.variant);
    }
    if (config.customStyle) {
      classes.push("custom");
    } else if (config.color) {
      classes.push(config.color);
    }
    return classes.join(" ");
  }
  /**
   * 生成内联样式
   */
  generateInlineStyles(customStyle) {
    if (!customStyle) return "";
    const styles = [];
    if (customStyle.backgroundColor) {
      styles.push(`--sidebar-tag-bg: ${customStyle.backgroundColor}`);
    }
    if (customStyle.color) {
      styles.push(`--sidebar-tag-color: ${customStyle.color}`);
    }
    if (customStyle.borderColor) {
      styles.push(`--sidebar-tag-border: ${customStyle.borderColor}`);
    }
    if (customStyle.darkBackgroundColor) {
      styles.push(`--sidebar-tag-dark-bg: ${customStyle.darkBackgroundColor}`);
    }
    if (customStyle.darkColor) {
      styles.push(`--sidebar-tag-dark-color: ${customStyle.darkColor}`);
    }
    if (customStyle.darkBorderColor) {
      styles.push(`--sidebar-tag-dark-border: ${customStyle.darkBorderColor}`);
    }
    return styles.length > 0 ? ` style="${styles.join("; ")}"` : "";
  }
  /**
   * 生成标签 HTML
   */
  generateTags(frontmatter) {
    if (!frontmatter || this.tagConfigs.length === 0) {
      return { beforeTags: "", afterTags: "" };
    }
    const tags = [];
    for (const config of this.tagConfigs) {
      const value = frontmatter[config.field];
      if (value !== void 0 && value !== null && value !== "") {
        if (config.show && typeof config.show === "function" && !config.show(String(value))) {
          continue;
        }
        const displayValue = config.transform ? config.transform(String(value)) : String(value);
        const tagHtml = this.generateTag(config, displayValue);
        tags.push({
          html: tagHtml,
          priority: config.priority || 0,
          position: config.position || "after"
        });
      }
    }
    tags.sort((a, b) => a.priority - b.priority);
    const beforeTags = tags.filter((tag) => tag.position === "before").map((tag) => tag.html).join("");
    const afterTags = tags.filter((tag) => tag.position === "after").map((tag) => tag.html).join("");
    return { beforeTags, afterTags };
  }
  /**
   * 注入标签到侧边栏项目
   */
  injectTags(items, basePath = "", locale = "zh") {
    return items.map((item) => {
      const newItem = { ...item };
      if (newItem.link && !newItem.link.startsWith("http")) {
        let fullPath = newItem.link;
        if (newItem.base) {
          fullPath = newItem.base + newItem.link;
        } else if (basePath) {
          fullPath = basePath + newItem.link;
        }
        if (!fullPath.startsWith(`/${locale}/`)) {
          fullPath = `/${locale}${fullPath.startsWith("/") ? "" : "/"}${fullPath}`;
        }
        const docsPath = path.join(process.cwd(), this.options.docsPath || "docs");
        const markdownPath = path.join(docsPath, `${fullPath}.md`);
        const frontmatter = this.getFrontmatter(markdownPath);
        const { beforeTags, afterTags } = this.generateTags(frontmatter);
        if (newItem.text) {
          newItem.text = beforeTags + newItem.text + afterTags;
          if (this.options.debug && (beforeTags || afterTags)) {
            console.log(`Injected tags for ${fullPath}: before="${beforeTags}", after="${afterTags}"`);
          }
        }
      }
      if (newItem.items) {
        const currentBase = newItem.base || basePath;
        newItem.items = this.injectTags(newItem.items, currentBase, locale);
      }
      return newItem;
    });
  }
  /**
   * 根据不同的输入源获取侧边栏数据
   */
  async getSidebarData(source, locale) {
    if (Array.isArray(source)) {
      return source;
    }
    if (typeof source === "string") {
      return this.loadSidebarFromFile(source, locale);
    }
    if (typeof source === "function") {
      const result = source();
      return Promise.resolve(result);
    }
    return [];
  }
  /**
   * 从文件加载侧边栏配置
   */
  loadSidebarFromFile(basePath, locale) {
    try {
      const docsPath = this.options.docsPath || "docs";
      const sidebarPath = path.join(process.cwd(), docsPath, basePath, `${locale}.json`);
      if (!fs.existsSync(sidebarPath)) {
        if (this.options.debug) {
          console.warn(`Warning: Sidebar file not found: ${sidebarPath}`);
        }
        return [];
      }
      return JSON.parse(fs.readFileSync(sidebarPath, "utf-8"));
    } catch (error) {
      if (this.options.debug) {
        console.error(`Error reading sidebar file:`, error);
      }
      return [];
    }
  }
  /**
   * 从VitePress配置中获取侧边栏
   */
  getSidebarFromConfig(locale) {
    var _a, _b;
    if (!((_b = (_a = this.options.vitepressConfig) == null ? void 0 : _a.themeConfig) == null ? void 0 : _b.sidebar)) {
      return [];
    }
    const sidebarConfig = this.options.vitepressConfig.themeConfig.sidebar;
    if (typeof sidebarConfig === "object" && !Array.isArray(sidebarConfig)) {
      const localeKeys = Object.keys(sidebarConfig);
      const matchingKey = localeKeys.find(
        (key) => key.includes(`/${locale}/`) || key.includes(`${locale}/`) || key === locale
      );
      if (matchingKey && sidebarConfig[matchingKey]) {
        return sidebarConfig[matchingKey];
      }
      const firstKey = localeKeys[0];
      if (firstKey && sidebarConfig[firstKey]) {
        return sidebarConfig[firstKey];
      }
    }
    if (Array.isArray(sidebarConfig)) {
      return sidebarConfig;
    }
    return [];
  }
  /**
   * 生成侧边栏（新的统一接口）
   */
  async generateSidebar(locale = "zh") {
    try {
      let originalSidebar = [];
      if (this.options.sidebar) {
        originalSidebar = await this.getSidebarData(this.options.sidebar, locale);
      } else if (this.options.vitepressConfig) {
        originalSidebar = this.getSidebarFromConfig(locale);
      } else if (this.options.sidebarPath) {
        originalSidebar = this.loadSidebarFromFile(this.options.sidebarPath, locale);
      }
      if (originalSidebar.length === 0) {
        if (this.options.debug) {
          console.warn(`No sidebar data found for locale: ${locale}`);
        }
        return [];
      }
      if (!this.tagConfigs || this.tagConfigs.length === 0) {
        if (this.options.debug) {
          console.log(`No tag configs found for ${locale}, returning original sidebar`);
        }
        return originalSidebar;
      }
      const shouldInject = this.options.injectInProduction || process.env.NODE_ENV !== "production";
      if (shouldInject) {
        const result = this.injectTags(originalSidebar, "", locale);
        if (this.options.debug) {
          console.log(`Generated sidebar for ${locale} with ${result.length} items and ${this.tagConfigs.length} tag configs`);
        }
        return result;
      }
      return originalSidebar;
    } catch (error) {
      console.error(`Error generating sidebar for ${locale}:`, error);
      return [];
    }
  }
  /**
   * 同步生成侧边栏（兼容接口）
   */
  generateSidebarSync(locale = "zh") {
    if (this.options.sidebar && typeof this.options.sidebar === "function") {
      const result = this.options.sidebar();
      if (result && typeof result.then === "function") {
        throw new Error("Cannot use async sidebar source with generateSidebarSync. Please use generateSidebar instead.");
      }
      return result;
    }
    try {
      let originalSidebar = [];
      if (this.options.sidebar) {
        if (Array.isArray(this.options.sidebar)) {
          originalSidebar = this.options.sidebar;
        } else if (typeof this.options.sidebar === "string") {
          originalSidebar = this.loadSidebarFromFile(this.options.sidebar, locale);
        }
      } else if (this.options.vitepressConfig) {
        originalSidebar = this.getSidebarFromConfig(locale);
      } else if (this.options.sidebarPath) {
        originalSidebar = this.loadSidebarFromFile(this.options.sidebarPath, locale);
      }
      if (!this.tagConfigs || this.tagConfigs.length === 0) {
        if (this.options.debug) {
          console.log(`No tag configs found for ${locale}, returning original sidebar`);
        }
        return originalSidebar;
      }
      const shouldInject = this.options.injectInProduction || process.env.NODE_ENV !== "production";
      if (shouldInject) {
        return this.injectTags(originalSidebar, "", locale);
      }
      return originalSidebar;
    } catch (error) {
      console.error(`Error generating sidebar for ${locale}:`, error);
      return [];
    }
  }
}
const tagPresets = {
  /**
   * HTTP 方法标签预设
   */
  httpMethods: {
    field: "method",
    position: "after",
    size: "xs",
    variant: "solid",
    color: "primary",
    transform: (value) => value.toUpperCase(),
    valueStyles: {
      "GET": { color: "success" },
      "POST": { color: "info" },
      "PUT": { color: "warning" },
      "DELETE": { color: "error" },
      "PATCH": { color: "purple" },
      "HEAD": { color: "gray" },
      "OPTIONS": { color: "gray" }
    }
  },
  /**
   * 版本标签预设
   */
  version: {
    field: "version",
    position: "after",
    size: "xs",
    variant: "outline",
    color: "blue",
    prefix: "v",
    transform: (value) => value.replace(/^v?/, ""),
    show: (value) => Boolean(value)
  },
  /**
   * 状态标签预设
   */
  status: {
    field: "status",
    position: "after",
    size: "xs",
    variant: "soft",
    color: "gray",
    valueStyles: {
      "new": { color: "green" },
      "updated": { color: "blue" },
      "deprecated": { color: "orange" },
      "removed": { color: "red" },
      "experimental": { color: "purple" },
      "stable": { color: "success" },
      "beta": { color: "warning" },
      "alpha": { color: "error" }
    },
    transform: (value) => value.toUpperCase()
  },
  /**
   * 更新标签预设
   */
  update: {
    field: "update",
    position: "before",
    size: "xs",
    variant: "solid",
    color: "success",
    valueStyles: {
      "new": { color: "success" },
      "updated": { color: "info" },
      "hot": { color: "error" }
    },
    transform: (value) => value.toUpperCase(),
    show: (value) => ["new", "updated", "hot"].includes(value.toLowerCase())
  }
};
function createHttpMethodsTag(overrides) {
  return { ...tagPresets.httpMethods, ...overrides };
}
function createVersionTag(overrides) {
  return { ...tagPresets.version, ...overrides };
}
function createStatusTag(overrides) {
  return { ...tagPresets.status, ...overrides };
}
function createUpdateTag(overrides) {
  return { ...tagPresets.update, ...overrides };
}
function createSidebarTags(options) {
  return new SidebarTagsCore(options);
}
function processSidebar(sidebar, tags, options) {
  if (Array.isArray(sidebar)) {
    const core = new SidebarTagsCore({
      tags,
      sidebar,
      // 类型断言
      docsPath: (options == null ? void 0 : options.docsPath) || "docs",
      injectInProduction: (options == null ? void 0 : options.injectInProduction) ?? true,
      debug: (options == null ? void 0 : options.debug) ?? false
    });
    return core.generateSidebarSync();
  } else if (typeof sidebar === "object" && sidebar !== null) {
    const result = {};
    for (const [path2, config] of Object.entries(sidebar)) {
      if (Array.isArray(config)) {
        const pathCore = new SidebarTagsCore({
          tags,
          sidebar: config,
          // 类型断言
          docsPath: (options == null ? void 0 : options.docsPath) || "docs",
          injectInProduction: (options == null ? void 0 : options.injectInProduction) ?? true,
          debug: (options == null ? void 0 : options.debug) ?? false
        });
        result[path2] = pathCore.generateSidebarSync();
      } else {
        result[path2] = config;
      }
    }
    return result;
  }
  return sidebar;
}
function withSidebarTags(themeConfig, tags, options) {
  if (!themeConfig.sidebar) {
    return themeConfig;
  }
  return {
    ...themeConfig,
    sidebar: processSidebar(themeConfig.sidebar, tags, options)
  };
}
function withVitePressConfig(vitepressConfig, tags, locale = "zh") {
  const core = new SidebarTagsCore({
    tags,
    vitepressConfig
  });
  return core.generateSidebarSync(locale);
}
const cssPath = "vitepress-plugin-sidebar-tags/style.css";
function createThemeEnhancer() {
  return {
    enhanceApp({ app }) {
      if (typeof window !== "undefined") {
        console.log("VitePress Sidebar Tags: Please import CSS in your theme file");
      }
    }
  };
}
export {
  SidebarTagsCore,
  createHttpMethodsTag,
  createSidebarTags,
  createStatusTag,
  createThemeEnhancer,
  createUpdateTag,
  createVersionTag,
  cssPath,
  processSidebar,
  withSidebarTags,
  withVitePressConfig
};
//# sourceMappingURL=index.js.map

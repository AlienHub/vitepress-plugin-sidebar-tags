import { SidebarTagsOptions, TagConfig } from './types';
import { DefaultTheme } from 'vitepress';
import { SidebarTagsCore } from './core';
export type * from './types';
export { SidebarTagsCore };
export { createHttpMethodsTag, createVersionTag, createStatusTag, createUpdateTag } from './presets';
/**
 * 为侧边栏添加标签（推荐用法）
 *
 * @param sidebar 用户的侧边栏配置
 * @param tags 标签配置数组
 * @param options 可选配置
 * @returns 处理后的侧边栏数据
 */
export declare function withSidebarTags(sidebar: DefaultTheme.SidebarItem[], tags: TagConfig[], options?: {
    /** 文档根目录路径 */
    docsPath?: string;
    /** 是否在生产环境注入标签 */
    injectInProduction?: boolean;
    /** 是否开启调试模式 */
    debug?: boolean;
    /** 语言代码 */
    locale?: string;
    /** 是否为多语言模式 */
    multiLanguage?: boolean;
}): DefaultTheme.SidebarItem[];
/**
 * 为多路径侧边栏添加标签
 *
 * @param sidebarConfig 多路径侧边栏配置
 * @param tags 标签配置数组
 * @param options 可选配置
 * @returns 处理后的多路径侧边栏配置
 */
export declare function withMultiSidebarTags(sidebarConfig: DefaultTheme.SidebarMulti, tags: TagConfig[], options?: {
    /** 文档根目录路径 */
    docsPath?: string;
    /** 是否在生产环境注入标签 */
    injectInProduction?: boolean;
    /** 是否开启调试模式 */
    debug?: boolean;
    /** 是否为多语言模式 */
    multiLanguage?: boolean;
}): DefaultTheme.SidebarMulti;
/**
 * 自动生成带标签的侧边栏（从文件系统读取）
 *
 * @param tags 标签配置数组
 * @param options 可选配置
 * @returns 处理后的侧边栏数据
 */
export declare function generateSidebar(tags: TagConfig[], options?: {
    /** 文档根目录路径 */
    docsPath?: string;
    /** 是否在生产环境注入标签 */
    injectInProduction?: boolean;
    /** 是否开启调试模式 */
    debug?: boolean;
    /** 语言代码 */
    locale?: string;
    /** 是否为多语言模式 */
    multiLanguage?: boolean;
}): DefaultTheme.SidebarItem[];
/**
 * 从VitePress配置生成侧边栏（兼容用法）
 *
 * @param vitepressConfig VitePress配置对象
 * @param tags 标签配置数组
 * @param locale 语言代码
 * @returns 处理后的侧边栏数据
 */
export declare function generateSidebarFromConfig(vitepressConfig: any, tags: TagConfig[], locale?: string): DefaultTheme.SidebarItem[];
/**
 * 创建侧边栏标签实例（高级用法）
 */
export declare function createSidebarTags(options: SidebarTagsOptions): SidebarTagsCore;
/**
 * 获取CSS文件路径 - 用于手动导入
 */
export declare const cssPath = "vitepress-plugin-sidebar-tags/style.css";
/**
 * 创建VitePress主题增强器，自动处理CSS导入
 */
export declare function createThemeEnhancer(): {
    enhanceApp({ app }: any): void;
};
//# sourceMappingURL=index.d.ts.map
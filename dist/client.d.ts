import { Theme } from 'vitepress';

/**
 * VitePress 主题扩展
 */
export declare function createThemeExtension(): Partial<Theme>;

declare const _default: {
    enhance({ app, router, siteData }: any): void;
};
export default _default;

/**
 * 客户端插件设置
 */
export declare function setupClient(app: any): void;

export declare const styleFile = "./style.css";

export { }

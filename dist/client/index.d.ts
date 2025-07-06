import { Theme } from 'vitepress';

/**
 * 客户端插件设置
 */
export declare function setupClient(app: any): void;
/**
 * VitePress 主题扩展
 */
export declare function createThemeExtension(): Partial<Theme>;
export declare const styleFile = "./style.css";
declare const _default: {
    enhance({ app, router, siteData }: any): void;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
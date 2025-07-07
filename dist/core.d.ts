import { SidebarTagsOptions, SidebarItem } from './types';
export declare class SidebarTagsCore {
    private options;
    private tagConfigs;
    constructor(options: SidebarTagsOptions);
    /**
     * 获取文件的 frontmatter 数据
     */
    private getFrontmatter;
    /**
     * 生成单个标签HTML
     */
    private generateTag;
    /**
     * 获取实际配置（应用valueStyles覆盖）
     */
    private getActualConfig;
    /**
     * 生成标签CSS类名
     */
    private generateTagClasses;
    /**
     * 生成内联样式
     */
    private generateInlineStyles;
    /**
     * 生成标签 HTML
     */
    private generateTags;
    /**
     * 注入标签到侧边栏项目
     */
    private injectTags;
    /**
     * 根据不同的输入源获取侧边栏数据
     */
    private getSidebarData;
    /**
     * 从文件加载侧边栏配置
     */
    private loadSidebarFromFile;
    /**
     * 从VitePress配置中获取侧边栏
     */
    private getSidebarFromConfig;
    /**
     * 生成侧边栏（新的统一接口）
     */
    generateSidebar(locale?: string): Promise<SidebarItem[]>;
    /**
     * 同步生成侧边栏（兼容接口）
     */
    generateSidebarSync(locale?: string): SidebarItem[];
}
//# sourceMappingURL=core.d.ts.map
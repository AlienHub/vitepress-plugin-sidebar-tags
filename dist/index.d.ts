import { DefaultTheme } from 'vitepress';

/**
 * 快速配置函数
 */
export declare function createHttpMethodsTag(overrides?: Partial<TagConfig>): TagConfig;

/**
 * 创建侧边栏标签实例
 */
export declare function createSidebarTags(options: SidebarTagsOptions): SidebarTagsCore;

export declare function createStatusTag(overrides?: Partial<TagConfig>): TagConfig;

/**
 * 创建VitePress主题增强器，自动处理CSS导入
 */
export declare function createThemeEnhancer(): {
    enhanceApp({ app }: any): void;
};

export declare function createUpdateTag(overrides?: Partial<TagConfig>): TagConfig;

export declare function createVersionTag(overrides?: Partial<TagConfig>): TagConfig;

/**
 * 获取CSS文件路径 - 用于手动导入
 */
export declare const cssPath = "vitepress-plugin-sidebar-tags/style.css";

/**
 * 自定义标签样式
 */
export declare interface CustomTagStyle {
    /**
     * 背景颜色 (支持任何CSS颜色值)
     */
    backgroundColor?: string;
    /**
     * 文字颜色
     */
    color?: string;
    /**
     * 边框颜色
     */
    borderColor?: string;
    /**
     * 暗色模式下的背景颜色
     */
    darkBackgroundColor?: string;
    /**
     * 暗色模式下的文字颜色
     */
    darkColor?: string;
    /**
     * 暗色模式下的边框颜色
     */
    darkBorderColor?: string;
}

export declare interface FrontmatterData {
    [key: string]: any;
}

/**
 * 向后兼容的简化配置（会自动转换为TagConfig）
 */
export declare interface LegacyTagsOptions {
    /**
     * @deprecated 使用 tags 替代
     * 标签字段名称，从 frontmatter 中读取
     */
    tagField?: string;
    /**
     * @deprecated 使用 tags[].valueStyles 替代
     * 标签样式映射
     */
    tagStyles?: Record<string, string>;
    /**
     * @deprecated 使用 customGenerator 替代
     * 自定义标签生成器
     */
    tagGenerator?: (tagValue: string, tagField: string) => string;
}

export declare interface SidebarItem extends DefaultTheme.SidebarItem {
    base?: string;
    items?: SidebarItem[];
}

/**
 * 侧边栏输入源类型
 */
export declare type SidebarSource = SidebarItem[] | string | (() => SidebarItem[]) | (() => Promise<SidebarItem[]>);

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

/**
 * 主配置选项接口
 */
export declare interface SidebarTagsOptions {
    /** 标签配置数组 */
    tags: TagConfig[];
    /** 侧边栏数据源 */
    sidebar?: SidebarSource;
    /** 文档根目录路径（相对于项目根目录） */
    docsPath?: string;
    /** 侧边栏文件目录路径（相对于docsPath，向后兼容） */
    sidebarPath?: string;
    /** 是否在生产环境注入标签 */
    injectInProduction?: boolean;
    /** 是否开启调试模式 */
    debug?: boolean;
    /** 支持的语言列表 */
    locales?: string[];
    /** VitePress 配置对象（用于自动获取sidebar配置） */
    vitepressConfig?: any;
}

/**
 * 预设颜色主题
 */
export declare type TagColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

/**
 * 标签配置
 */
export declare interface TagConfig {
    /**
     * 从 frontmatter 中读取的字段名
     */
    field: string;
    /**
     * 标签在文本中的位置
     * @default 'after'
     */
    position?: TagPosition;
    /**
     * 标签大小
     * @default 'sm'
     */
    size?: TagSize;
    /**
     * 标签变体
     * @default 'solid'
     */
    variant?: TagVariant;
    /**
     * 预设颜色主题
     * @default 'primary'
     */
    color?: TagColor;
    /**
     * 自定义样式（会覆盖预设主题）
     */
    customStyle?: CustomTagStyle;
    /**
     * 值到样式的映射
     * 例如: { 'GET': { color: 'success' }, 'POST': { color: 'info' } }
     */
    valueStyles?: Record<string, Partial<Omit<TagConfig, 'field' | 'valueStyles'>>>;
    /**
     * 值转换函数
     * 例如: (value) => value.toUpperCase()
     */
    transform?: (value: string) => string;
    /**
     * 是否显示此标签
     * 可以是布尔值或者根据值判断的函数
     */
    show?: boolean | ((value: string) => boolean);
    /**
     * 标签的显示优先级（数字越小优先级越高）
     * @default 0
     */
    priority?: number;
    /**
     * 标签前缀
     */
    prefix?: string;
    /**
     * 标签后缀
     */
    suffix?: string;
}

/**
 * 标签位置
 */
export declare type TagPosition = 'before' | 'after';

/**
 * 预设配置
 */
export declare interface TagPresets {
    /**
     * HTTP 方法标签预设
     */
    httpMethods: TagConfig;
    /**
     * 版本标签预设
     */
    version: TagConfig;
    /**
     * 状态标签预设
     */
    status: TagConfig;
    /**
     * 更新标签预设
     */
    update: TagConfig;
}

/**
 * 标签大小
 */
export declare type TagSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * 标签变体
 */
export declare type TagVariant = 'solid' | 'outline' | 'soft' | 'subtle';

/**
 * 使用VitePress配置创建侧边栏（兼容函数）
 */
export declare function withVitePressConfig(vitepressConfig: any, tags: TagConfig[], locale?: string): SidebarItem[];

export { }

import type { DefaultTheme } from 'vitepress'

/**
 * 标签位置
 */
export type TagPosition = 'before' | 'after'

/**
 * 标签大小
 */
export type TagSize = 'xs' | 'sm' | 'md' | 'lg'

/**
 * 标签变体
 */
export type TagVariant = 'solid' | 'outline' | 'soft' | 'subtle'

/**
 * 圆角大小类型，参考 NuxtUI 设计
 */
export type RoundedSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

/**
 * 预设颜色主题
 */
export type TagColor = 
  | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  | 'gray' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green'
  | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet'
  | 'purple' | 'fuchsia' | 'pink' | 'rose'

/**
 * 自定义标签样式
 */
export interface CustomTagStyle {
  /**
   * 背景颜色 (支持任何CSS颜色值)
   */
  backgroundColor?: string
  
  /**
   * 文字颜色
   */
  color?: string
  
  /**
   * 边框颜色
   */
  borderColor?: string
  
  /**
   * 暗色模式下的背景颜色
   */
  darkBackgroundColor?: string
  
  /**
   * 暗色模式下的文字颜色
   */
  darkColor?: string
  
  /**
   * 暗色模式下的边框颜色
   */
  darkBorderColor?: string
}

/**
 * 标签配置
 */
export interface TagConfig {
  /**
   * 从 frontmatter 中读取的字段名
   */
  field: string
  
  /**
   * 标签在文本中的位置
   * @default 'after'
   */
  position?: TagPosition
  
  /**
   * 标签大小
   * @default 'sm'
   */
  size?: TagSize
  
  /**
   * 标签变体
   * @default 'solid'
   */
  variant?: TagVariant
  
  /**
   * 预设颜色主题
   * @default 'primary'
   */
  color?: TagColor
  
  /**
   * 圆角大小，参考 NuxtUI 设计
   * @default 'sm'
   */
  rounded?: RoundedSize
  
  /**
   * 自定义样式（会覆盖预设主题）
   */
  customStyle?: CustomTagStyle
  
  /**
   * 值到样式的映射
   * 例如: { 'GET': { color: 'success' }, 'POST': { color: 'info' } }
   */
  valueStyles?: Record<string, Partial<Omit<TagConfig, 'field' | 'valueStyles'>>>
  
  /**
   * 值转换函数
   * 例如: (value) => value.toUpperCase()
   */
  transform?: (value: string) => string
  
  /**
   * 是否显示此标签
   * 可以是布尔值或者根据值判断的函数
   */
  show?: boolean | ((value: string) => boolean)
  
  /**
   * 标签的显示优先级（数字越小优先级越高）
   * @default 0
   */
  priority?: number
  
  /**
   * 标签前缀
   */
  prefix?: string
  
  /**
   * 标签后缀
   */
  suffix?: string
}

/**
 * 向后兼容的简化配置（会自动转换为TagConfig）
 */
export interface LegacyTagsOptions {
  /**
   * @deprecated 使用 tags 替代
   * 标签字段名称，从 frontmatter 中读取
   */
  tagField?: string
  
  /**
   * @deprecated 使用 tags[].valueStyles 替代
   * 标签样式映射
   */
  tagStyles?: Record<string, string>
  
  /**
   * @deprecated 使用 customGenerator 替代
   * 自定义标签生成器
   */
  tagGenerator?: (tagValue: string, tagField: string) => string
}

/**
 * 侧边栏输入源类型
 */
export type SidebarSource = 
  | SidebarItem[]  // 直接传入侧边栏数据
  | string         // 文件路径
  | (() => SidebarItem[])  // 函数返回侧边栏数据
  | (() => Promise<SidebarItem[]>)  // 异步函数返回侧边栏数据

/**
 * 主配置选项接口
 */
export interface SidebarTagsOptions {
  /** 标签配置数组 */
  tags: TagConfig[]
  
  /** 侧边栏数据源 */
  sidebar?: SidebarSource
  
  /** 文档根目录路径（相对于项目根目录） */
  docsPath?: string
  
  /** 侧边栏文件目录路径（相对于docsPath，向后兼容） */
  sidebarPath?: string
  
  /** 是否在生产环境注入标签 */
  injectInProduction?: boolean
  
  /** 是否开启调试模式 */
  debug?: boolean
  
  /** 支持的语言列表 */
  locales?: string[]
  
  /** VitePress 配置对象（用于自动获取sidebar配置） */
  vitepressConfig?: any
  
  /** 是否为多语言模式（如果未指定，会自动检测） */
  multiLanguage?: boolean
}

export interface SidebarItem extends DefaultTheme.SidebarItem {
  base?: string
  items?: SidebarItem[]
}

export interface FrontmatterData {
  [key: string]: any
}

/**
 * 预设配置
 */
export interface TagPresets {
  /**
   * HTTP 方法标签预设
   */
  httpMethods: TagConfig
  
  /**
   * 版本标签预设
   */
  version: TagConfig
  
  /**
   * 状态标签预设
   */
  status: TagConfig
  
  /**
   * 更新标签预设
   */
  update: TagConfig
} 
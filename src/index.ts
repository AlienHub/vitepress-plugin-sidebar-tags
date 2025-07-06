import type { SidebarTagsOptions, TagConfig, SidebarItem } from './types'
import type { DefaultTheme } from 'vitepress'
import { SidebarTagsCore } from './core'

// 导出类型
export type * from './types'

// 导出核心类（高级用法）
export { SidebarTagsCore }

// 导出预设标签配置函数
export { 
  createHttpMethodsTag, 
  createVersionTag, 
  createStatusTag, 
  createUpdateTag 
} from './presets'

/**
 * 为侧边栏添加标签（推荐用法）
 * 
 * @param sidebar 用户的侧边栏配置
 * @param tags 标签配置数组
 * @param options 可选配置
 * @returns 处理后的侧边栏数据
 */
export function withSidebarTags(
  sidebar: DefaultTheme.SidebarItem[],
  tags: TagConfig[],
  options?: {
    /** 文档根目录路径 */
    docsPath?: string
    /** 是否在生产环境注入标签 */
    injectInProduction?: boolean
    /** 是否开启调试模式 */
    debug?: boolean
  }
): DefaultTheme.SidebarItem[] {
  const core = new SidebarTagsCore({
    tags,
    sidebar,
    docsPath: options?.docsPath || 'docs',
    injectInProduction: options?.injectInProduction ?? true,
    debug: options?.debug ?? false
  })
  
  return core.generateSidebarSync() as DefaultTheme.SidebarItem[]
}

/**
 * 为多路径侧边栏添加标签
 * 
 * @param sidebarConfig 多路径侧边栏配置
 * @param tags 标签配置数组
 * @param options 可选配置
 * @returns 处理后的多路径侧边栏配置
 */
export function withMultiSidebarTags(
  sidebarConfig: DefaultTheme.SidebarMulti,
  tags: TagConfig[],
  options?: {
    /** 文档根目录路径 */
    docsPath?: string
    /** 是否在生产环境注入标签 */
    injectInProduction?: boolean
    /** 是否开启调试模式 */
    debug?: boolean
  }
): DefaultTheme.SidebarMulti {
  const result: DefaultTheme.SidebarMulti = {}
  
  for (const [path, config] of Object.entries(sidebarConfig)) {
    if (Array.isArray(config)) {
      result[path] = withSidebarTags(config, tags, options)
    } else {
      // 保持原有配置（函数类型等）
      result[path] = config
    }
  }
  
  return result
}

/**
 * 自动生成带标签的侧边栏（从文件系统读取）
 * 
 * @param tags 标签配置数组
 * @param options 可选配置
 * @returns 处理后的侧边栏数据
 */
export function generateSidebar(
  tags: TagConfig[],
  options?: {
    /** 文档根目录路径 */
    docsPath?: string
    /** 是否在生产环境注入标签 */
    injectInProduction?: boolean
    /** 是否开启调试模式 */
    debug?: boolean
  }
): DefaultTheme.SidebarItem[] {
  const core = new SidebarTagsCore({
    tags,
    docsPath: options?.docsPath || 'docs',
    injectInProduction: options?.injectInProduction ?? true,
    debug: options?.debug ?? false
  })
  
  return core.generateSidebarSync() as DefaultTheme.SidebarItem[]
}

/**
 * 从VitePress配置生成侧边栏（兼容用法）
 * 
 * @param vitepressConfig VitePress配置对象
 * @param tags 标签配置数组
 * @param locale 语言代码
 * @returns 处理后的侧边栏数据
 */
export function generateSidebarFromConfig(
  vitepressConfig: any,
  tags: TagConfig[],
  locale = 'zh'
): DefaultTheme.SidebarItem[] {
  const core = new SidebarTagsCore({
    tags,
    vitepressConfig
  })
  return core.generateSidebarSync(locale) as DefaultTheme.SidebarItem[]
}

/**
 * 创建侧边栏标签实例（高级用法）
 */
export function createSidebarTags(options: SidebarTagsOptions): SidebarTagsCore {
  return new SidebarTagsCore(options)
}

/**
 * 获取CSS文件路径 - 用于手动导入
 */
export const cssPath = 'vitepress-plugin-sidebar-tags/style.css'

/**
 * 创建VitePress主题增强器，自动处理CSS导入
 */
export function createThemeEnhancer() {
  return {
    enhanceApp({ app }: any) {
      // 客户端环境下的提示
      if (typeof window !== 'undefined') {
        console.log('VitePress Sidebar Tags: Please import CSS in your theme file')
      }
    }
  }
} 
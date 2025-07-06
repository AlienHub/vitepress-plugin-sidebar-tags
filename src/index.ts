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
 * 创建侧边栏标签实例
 */
export function createSidebarTags(options: SidebarTagsOptions): SidebarTagsCore {
  return new SidebarTagsCore(options)
}

/**
 * 直接处理 sidebar 配置对象（推荐用法）
 * 在语言特定的配置文件中使用，如 ./config/zh.ts 或 ./config/en.ts
 * 
 * @param sidebar 原始的 sidebar 配置
 * @param tags 标签配置数组
 * @param options 可选的配置选项
 * @returns 处理后的 sidebar 配置
 */
export function processSidebar(
  sidebar: DefaultTheme.Sidebar,
  tags: TagConfig[],
  options?: {
    /** 文档根目录路径 */
    docsPath?: string
    /** 是否在生产环境注入标签 */
    injectInProduction?: boolean
    /** 是否开启调试模式 */
    debug?: boolean
  }
): DefaultTheme.Sidebar {
  // 处理不同类型的 sidebar 配置
  if (Array.isArray(sidebar)) {
    // 简单数组形式
    const core = new SidebarTagsCore({
      tags,
      sidebar: sidebar as SidebarItem[], // 类型断言
      docsPath: options?.docsPath || 'docs',
      injectInProduction: options?.injectInProduction ?? true,
      debug: options?.debug ?? false
    })
    return core.generateSidebarSync() as DefaultTheme.SidebarItem[]
  } else if (typeof sidebar === 'object' && sidebar !== null) {
    // 对象形式（多路径）
    const result: DefaultTheme.SidebarMulti = {}
    
    for (const [path, config] of Object.entries(sidebar)) {
      if (Array.isArray(config)) {
        // 为每个路径创建独立的核心实例
        const pathCore = new SidebarTagsCore({
          tags,
          sidebar: config as SidebarItem[], // 类型断言
          docsPath: options?.docsPath || 'docs',
          injectInProduction: options?.injectInProduction ?? true,
          debug: options?.debug ?? false
        })
        result[path] = pathCore.generateSidebarSync() as DefaultTheme.SidebarItem[]
      } else {
        // 保持原有配置
        result[path] = config
      }
    }
    
    return result
  }

  // 返回原始配置（处理函数类型等）
  return sidebar
}

/**
 * 处理主题配置对象，自动处理其中的 sidebar 配置
 * 
 * @param themeConfig 主题配置对象
 * @param tags 标签配置数组
 * @param options 可选的配置选项
 * @returns 处理后的主题配置
 */
export function withSidebarTags<T extends { sidebar?: DefaultTheme.Sidebar }>(
  themeConfig: T,
  tags: TagConfig[],
  options?: {
    /** 文档根目录路径 */
    docsPath?: string
    /** 是否在生产环境注入标签 */
    injectInProduction?: boolean
    /** 是否开启调试模式 */
    debug?: boolean
  }
): T {
  if (!themeConfig.sidebar) {
    return themeConfig
  }

  return {
    ...themeConfig,
    sidebar: processSidebar(themeConfig.sidebar, tags, options)
  }
}

/**
 * 使用VitePress配置创建侧边栏（兼容函数）
 * @deprecated 推荐使用 processSidebar 或 withSidebarTags
 */
export function withVitePressConfig(
  vitepressConfig: any,
  tags: TagConfig[],
  locale = 'zh'
): SidebarItem[] {
  const core = new SidebarTagsCore({
    tags,
    vitepressConfig
  })
  return core.generateSidebarSync(locale)
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
      // 客户端环境下动态导入CSS
      if (typeof window !== 'undefined') {
        // 注意：这里不能直接导入，因为打包时会有问题
        // 用户需要在主题文件中手动导入CSS
        console.log('VitePress Sidebar Tags: Please import CSS in your theme file')
      }
    }
  }
} 
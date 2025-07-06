import type { SidebarTagsOptions, TagConfig, SidebarItem } from './types'
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
 * 使用VitePress配置创建侧边栏（兼容函数）
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
import { SidebarTagsCore } from './core'
import { SidebarTagsOptions, TagConfig, SidebarItem, SidebarSource } from './types'
import { createHttpMethodsTag, createVersionTag, createStatusTag, createUpdateTag } from './presets'

/**
 * 创建侧边栏标签插件实例
 */
export function createSidebarTags(options: SidebarTagsOptions): SidebarTagsCore {
  return new SidebarTagsCore(options)
}

/**
 * 从VitePress配置获取侧边栏并处理标签
 */
export function withVitePressConfig(
  vitepressConfig: any,
  tags: TagConfig[],
  locale?: string
): SidebarItem[] {
  const core = new SidebarTagsCore({
    tags,
    vitepressConfig
  })
  return core.generateSidebarSync(locale)
}

// 导出预设配置
export { createHttpMethodsTag, createVersionTag, createStatusTag, createUpdateTag }

// 导出类型
export type { SidebarTagsOptions, TagConfig, SidebarItem, SidebarSource }

// 导出核心类（高级用法）
export { SidebarTagsCore } 
import type { Theme } from 'vitepress'
import './style.css'

/**
 * 客户端插件设置
 */
export function setupClient(app: any) {
  // 在这里可以添加客户端特定的逻辑
  // 例如：注册全局组件、添加全局属性等
  
  // 当前主要是样式注入，未来可以扩展更多功能
  if (typeof window !== 'undefined') {
    // 客户端特定的初始化逻辑
    console.log('VitePress Sidebar Tags Plugin loaded')
  }
}

/**
 * VitePress 主题扩展
 */
export function createThemeExtension(): Partial<Theme> {
  return {
    enhanceApp({ app }) {
      setupClient(app)
    }
  }
}

// 导出样式文件路径，供用户手动导入
export const styleFile = './style.css' 
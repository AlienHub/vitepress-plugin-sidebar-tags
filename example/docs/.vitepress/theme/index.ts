import DefaultTheme from 'vitepress/theme'

// 导入插件样式
import 'vitepress-plugin-sidebar-tags/style.css'

// 自定义样式增强
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // app是Vue应用实例
    // router是VitePress路由实例
    // siteData包含站点级别的元数据
  }
} 
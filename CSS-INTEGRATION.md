# 🎨 CSS样式集成指南

如果你发现标签样式没有正确显示，请按照以下方法之一导入CSS样式：

## 方法1：在VitePress配置中导入（推荐）

在你的 `.vitepress/config.ts` 文件中：

```typescript
import { defineConfig } from 'vitepress'
import { createSidebarTags } from 'vitepress-plugin-sidebar-tags'
// 👈 在这里导入CSS样式
import 'vitepress-plugin-sidebar-tags/style.css'

export default defineConfig({
  // 你的VitePress配置
  themeConfig: {
    sidebar: {
      '/': sidebarTags.generateSidebarSync()
    }
  }
})
```

## 方法2：在主题配置中导入

如果你有自定义主题，在 `.vitepress/theme/index.ts` 中：

```typescript
import DefaultTheme from 'vitepress/theme'
// 👈 在主题中导入CSS样式
import 'vitepress-plugin-sidebar-tags/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 其他主题增强配置
  }
}
```

## 方法3：使用客户端插件（自动导入）

在 `.vitepress/theme/index.ts` 中：

```typescript
import DefaultTheme from 'vitepress/theme'
// 👈 导入客户端插件，会自动导入CSS
import SidebarTagsClient from 'vitepress-plugin-sidebar-tags/client'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 客户端插件会自动注入CSS样式
  }
}
```

## 方法4：在HTML中直接引用

如果以上方法都不工作，可以在 `.vitepress/config.ts` 中：

```typescript
export default defineConfig({
  head: [
    ['link', { 
      rel: 'stylesheet', 
      href: '/node_modules/vitepress-plugin-sidebar-tags/dist/style.css' 
    }]
  ]
})
```

## 🎯 推荐方案

**最推荐使用方法1**，在配置文件中直接导入，这样可以确保CSS在构建时被正确包含。

## 🐛 故障排除

如果样式仍然没有生效：

1. **检查控制台错误**：打开浏览器开发者工具，查看是否有CSS文件加载失败的错误
2. **检查网络面板**：确认CSS文件是否被正确加载
3. **清除缓存**：尝试清除浏览器缓存和VitePress构建缓存
4. **检查路径**：确认CSS文件路径是否正确

## 📝 完整示例

```typescript
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { createSidebarTags } from 'vitepress-plugin-sidebar-tags'
import 'vitepress-plugin-sidebar-tags/style.css'

const sidebarTags = createSidebarTags({
  tags: [
    {
      field: 'method',
      position: 'after',
      size: 'xs',
      variant: 'solid',
      valueStyles: {
        'GET': { color: 'success' },
        'POST': { color: 'primary' },
        'PUT': { color: 'warning' },
        'DELETE': { color: 'error' }
      }
    }
  ],
  sidebar: originalSidebar,
  docsPath: 'docs'
})

export default defineConfig({
  themeConfig: {
    sidebar: {
      '/': sidebarTags.generateSidebarSync()
    }
  }
})
```

这样标签就会正确显示样式了！🎉 
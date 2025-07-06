# 🎨 CSS样式集成指南

如果你发现标签样式没有正确显示，请按照以下方法导入CSS样式：

## ⚠️ 重要提醒

**不要在 `.vitepress/config.ts` 中直接导入CSS！** 这会导致 `Unknown file extension ".css"` 错误，因为配置文件在Node.js环境中执行。

## ✅ 正确的方法

### 方法1：在主题文件中导入（推荐）

创建或修改 `.vitepress/theme/index.ts`：

```typescript
import DefaultTheme from 'vitepress/theme'
// ✅ 在主题文件中导入CSS是正确的
import 'vitepress-plugin-sidebar-tags/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 其他主题增强配置
  }
}
```

### 方法2：使用head配置

在 `.vitepress/config.ts` 中：

```typescript
import { defineConfig } from 'vitepress'
import { createSidebarTags } from 'vitepress-plugin-sidebar-tags'
// ❌ 不要在这里导入CSS: import 'vitepress-plugin-sidebar-tags/style.css'

export default defineConfig({
  // ✅ 使用head配置来引入CSS
  head: [
    ['link', { 
      rel: 'stylesheet', 
      href: '/node_modules/vitepress-plugin-sidebar-tags/dist/style.css' 
    }]
  ],
  themeConfig: {
    sidebar: {
      // 你的侧边栏配置
    }
  }
})
```

### 方法3：使用主题增强器（v0.1.2+）

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { createThemeEnhancer } from 'vitepress-plugin-sidebar-tags'
import 'vitepress-plugin-sidebar-tags/style.css'

const themeEnhancer = createThemeEnhancer()

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    themeEnhancer.enhanceApp(ctx)
  }
}
```

## 🐛 错误解决

如果你遇到 `Unknown file extension ".css"` 错误：

1. **检查导入位置**：确保CSS导入在 `.vitepress/theme/index.ts` 中，而不是在 `.vitepress/config.ts` 中
2. **创建主题文件**：如果没有主题文件，创建 `.vitepress/theme/index.ts`
3. **使用head配置**：作为备选方案，使用VitePress的head配置

## 📝 完整示例

### 配置文件 (`.vitepress/config.ts`)
```typescript
import { defineConfig } from 'vitepress'
import { createSidebarTags } from 'vitepress-plugin-sidebar-tags'

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

### 主题文件 (`.vitepress/theme/index.ts`)
```typescript
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-sidebar-tags/style.css'

export default {
  extends: DefaultTheme
}
```

这样标签就会正确显示样式了！🎉

## 🎯 总结

- ✅ 在主题文件中导入CSS
- ✅ 使用head配置引入CSS
- ❌ 不要在config.ts中直接导入CSS 
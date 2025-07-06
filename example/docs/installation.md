# 安装指南

本指南将帮助你在 VitePress 项目中安装和配置 VitePress Sidebar Tags Plugin。

## 📦 安装插件

### 使用 npm

```bash
npm install vitepress-plugin-sidebar-tags
```

### 使用 yarn

```bash
yarn add vitepress-plugin-sidebar-tags
```

### 使用 pnpm

```bash
pnpm add vitepress-plugin-sidebar-tags
```

## ⚙️ 基础配置

### 1. 修改 VitePress 配置

编辑你的 `.vitepress/config.ts` 文件：

```typescript
import { defineConfig } from 'vitepress'
import { withSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

// 定义你的侧边栏
const sidebar = [
  {
    text: 'API 文档',
    items: [
      { text: '用户管理', link: '/api/users' },
      { text: '创建用户', link: '/api/create-user' },
      { text: '更新用户', link: '/api/update-user' },
      { text: '删除用户', link: '/api/delete-user' }
    ]
  }
]

export default defineConfig({
  title: 'My Documentation',
  description: 'Documentation with sidebar tags',
  
  themeConfig: {
    // 使用插件处理侧边栏
    sidebar: withSidebarTags(sidebar, [
      createHttpMethodsTag({
        rounded: 'sm',
        size: 'xs'
      })
    ])
  }
})
```

### 2. 导入样式文件

创建或修改 `.vitepress/theme/index.ts` 文件：

```typescript
import DefaultTheme from 'vitepress/theme'

// 导入插件样式
import 'vitepress-plugin-sidebar-tags/style.css'

export default DefaultTheme
```

### 3. 添加 Frontmatter

在你的 markdown 文件中添加相应的 frontmatter：

```markdown
---
method: GET
version: v1.0
status: stable
---

# 用户管理 API

这个 API 用于管理用户...
```

## 🎨 样式定制

### 导入自定义样式

如果你想自定义样式，可以在主题文件中添加：

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-sidebar-tags/style.css'

// 你的自定义样式
import './custom.css'

export default DefaultTheme
```

### 自定义 CSS 变量

在你的 `custom.css` 中覆盖默认的 CSS 变量：

```css
:root {
  /* 自定义品牌色 */
  --vp-c-brand-1: #3b82f6;
  --vp-c-brand-2: #60a5fa;
  --vp-c-brand-3: #93c5fd;
}

/* 自定义标签样式 */
.sidebar-tag {
  font-weight: 600;
  letter-spacing: 0.025em;
}

/* 自定义悬停效果 */
.sidebar-tag:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
```

## 🔧 高级配置

### 多语言支持

如果你的项目支持多语言，可以配置多路径侧边栏：

```typescript
import { withMultiSidebarTags } from 'vitepress-plugin-sidebar-tags'

const sidebarConfig = {
  '/zh/': [
    {
      text: 'API 文档',
      items: [
        { text: '用户管理', link: '/zh/api/users' },
        { text: '创建用户', link: '/zh/api/create-user' }
      ]
    }
  ],
  '/en/': [
    {
      text: 'API Documentation',
      items: [
        { text: 'User Management', link: '/en/api/users' },
        { text: 'Create User', link: '/en/api/create-user' }
      ]
    }
  ]
}

export default defineConfig({
  themeConfig: {
    sidebar: withMultiSidebarTags(sidebarConfig, [
      createHttpMethodsTag()
    ])
  }
})
```

### 自定义标签

```typescript
import { withSidebarTags } from 'vitepress-plugin-sidebar-tags'

export default defineConfig({
  themeConfig: {
    sidebar: withSidebarTags(sidebar, [
      // 自定义标签配置
      {
        field: 'difficulty',
        position: 'before',
        size: 'xs',
        variant: 'outline',
        color: 'warning',
        rounded: 'md',
        prefix: '难度: ',
        valueStyles: {
          'easy': { color: 'success' },
          'medium': { color: 'warning' },
          'hard': { color: 'error' }
        }
      }
    ])
  }
})
```

## 🚀 验证安装

完成上述配置后，启动你的 VitePress 开发服务器：

```bash
npm run dev
```

访问你的文档站点，在侧边栏中应该能看到相应的标签效果。

## 📝 注意事项

1. **CSS 导入**: 确保在主题文件中导入了插件的 CSS 文件
2. **文件路径**: 默认情况下，插件会从 `docs/` 目录读取 markdown 文件
3. **构建时生成**: 标签在构建时生成，不会影响运行时性能
4. **类型检查**: 如果使用 TypeScript，插件提供了完整的类型定义

## 🔍 故障排除

### 标签不显示

1. 检查是否正确导入了 CSS 文件
2. 确认 markdown 文件中有相应的 frontmatter
3. 验证 `docsPath` 配置是否正确

### 类型错误

1. 确保安装了最新版本的插件
2. 检查 VitePress 版本兼容性
3. 尝试重新启动 TypeScript 服务

### 样式问题

1. 确认 CSS 文件加载顺序
2. 检查是否有样式冲突
3. 尝试清除浏览器缓存

## 下一步

- [基础用法](/basic-usage) - 学习基本配置方法
- [API 文档](/api/users) - 查看实际效果
- [高级功能](/advanced/custom-tags) - 探索更多功能 
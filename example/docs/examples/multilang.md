# 多语言示例

本页面展示如何在多语言 VitePress 项目中使用 Sidebar Tags 插件，并给出中英文对照示例。

## 🌍 目录结构示例

```
docs/
├── .vitepress/
│   └── config.ts
├── index.md
├── zh/
│   ├── index.md
│   └── api/
│       └── users.md
└── en/
    ├── index.md
    └── api/
        └── users.md
```

## 🚀 配置多语言侧边栏

```typescript
import { defineConfig } from 'vitepress'
import { withMultiSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

const sidebar = {
  '/zh/': [
    {
      text: 'API 文档',
      items: [
        { text: '用户管理', link: '/zh/api/users' }
      ]
    }
  ],
  '/en/': [
    {
      text: 'API Docs',
      items: [
        { text: 'User Management', link: '/en/api/users' }
      ]
    }
  ]
}

export default defineConfig({
  themeConfig: {
    sidebar: withMultiSidebarTags(sidebar, [
      createHttpMethodsTag({ size: 'xs', rounded: 'sm' })
    ])
  }
})
```

## 📝 中文文档示例

```markdown
---
method: GET
status: stable
---

# 用户管理 API

获取用户列表的接口。
```

## 📝 English Example

```markdown
---
method: GET
status: stable
---

# User Management API

API for getting user list.
```

## 🎨 标签效果

- 中文侧边栏会显示 `GET`、`STABLE` 标签
- 英文侧边栏同样显示 `GET`、`STABLE` 标签，支持多语言切换

## 🔍 常见问题

1. 路径要与 sidebar 配置一致
2. frontmatter 字段建议统一（如 method/status/version 等）
3. 可为不同语言配置不同的标签样式

## 下一步

- [自定义样式](/examples/custom-styles) - 学习样式定制
- [多语言配置说明](/advanced/i18n) - 进阶多语言配置 
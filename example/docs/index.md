---
layout: home

hero:
  name: "VitePress Sidebar Tags"
  text: "通用标签插件"
  tagline: "为 VitePress 侧边栏自动添加基于 frontmatter 的多样化标签"
  actions:
    - theme: brand
      text: 查看示例
      link: /zh/api/users
    - theme: alt
      text: GitHub
      link: https://github.com/your-username/vitepress-plugin-sidebar-tags

features:
  - title: 🏷️ 多标签支持
    details: 支持同时配置多个 frontmatter 字段，每个文档可以显示多个标签
  - title: 🎨 丰富的样式
    details: 提供多种预设主题和完全自定义的样式选项，支持 20+ 颜色主题
  - title: 📍 灵活的位置
    details: 标签可以放在文本前或后，支持优先级排序
  - title: 🌈 多种变体
    details: 支持 solid、outline、soft、subtle 四种样式变体
  - title: 🌍 完整国际化
    details: 完整支持多语言配置和暗色模式
  - title: ⚡ 高性能设计
    details: 构建时生成，运行时零开销，完全向后兼容
---

## 🚀 新特性展示

### 多标签组合
在左侧侧边栏中，你可以看到每个 API 文档根据不同的 frontmatter 字段显示了多个标签：

- **状态标签**（前置）：`NEW`、`STABLE`、`BETA`、`EXPERIMENTAL`
- **HTTP 方法标签**：`GET`、`POST`、`PUT`、`DELETE`
- **版本标签**：`v1.2.0`、`v1.3.0`、`v2.0.0-alpha`
- **分类标签**：`CORE`、`ADVANCED`、`EXPERIMENTAL`
- **更新标签**（前置）：`HOT`

### 快速配置

```typescript
import { createSidebarTags, createHttpMethodsTag, createVersionTag } from 'vitepress-plugin-sidebar-tags'

const sidebarTags = createSidebarTags({
  tags: [
    // 使用预设配置
    createHttpMethodsTag(),
    createVersionTag(),
    
    // 自定义标签
    {
      field: 'status',
      position: 'before',
      size: 'xs',
      variant: 'soft',
      color: 'success',
      valueStyles: {
        'new': { color: 'green' },
        'experimental': { color: 'red' }
      }
    }
  ]
})
```

### 支持的配置选项

- **位置控制**：`position: 'before' | 'after'`
- **大小选择**：`size: 'xs' | 'sm' | 'md' | 'lg'`
- **样式变体**：`variant: 'solid' | 'outline' | 'soft' | 'subtle'`
- **颜色主题**：20+ 预设颜色 + 自定义颜色
- **优先级排序**：`priority` 控制标签显示顺序
- **条件显示**：`show` 函数控制标签显示条件
- **值转换**：`transform` 函数处理显示文本

## 📖 使用指南

### 安装

```bash
npm install vitepress-plugin-sidebar-tags
```

### 基本使用

```typescript
import { defineConfig } from 'vitepress'
import { createSidebarTags } from 'vitepress-plugin-sidebar-tags'

const sidebarTags = createSidebarTags({
  tags: [
    {
      field: 'method',      // frontmatter 字段名
      position: 'after',   // 标签位置
      size: 'xs',          // 标签大小
      variant: 'solid',    // 样式变体
      color: 'primary'     // 颜色主题
    }
  ]
})

export default defineConfig({
  themeConfig: {
    sidebar: {
      '/zh/': sidebarTags.generateSidebar('zh')
    }
  }
})
```

### Markdown frontmatter

```yaml
---
title: 示例文档
method: GET
status: stable
version: v1.0.0
category: core
---
```

这将自动生成对应的标签并注入到侧边栏中！ 
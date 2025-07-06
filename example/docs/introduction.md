# 介绍

VitePress Sidebar Tags Plugin 是一个强大的 VitePress 插件，可以根据 markdown 文件的 frontmatter 自动在侧边栏中添加各种标签。

## 🎯 快速预览

看看侧边栏中的标签效果！点击左侧的 "API 文档" 查看各种标签的实际展示：

- 🟢 **GET** - HTTP方法标签
- 🔵 **v1.2.0** - 版本标签  
- 🟡 **STABLE** - 状态标签
- 🟣 **[CORE]** - 分类标签

## 📦 快速安装使用

```bash
# 安装插件
npm install vitepress-plugin-sidebar-tags
```

```typescript
// 在 VitePress 配置中使用
import { withSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

export default defineConfig({
  themeConfig: {
    sidebar: withSidebarTags(yourSidebar, [
      createHttpMethodsTag({ rounded: 'sm' })
    ])
  }
})
```

## 🎯 核心特性

### 零配置使用
使用标准的 VitePress `defineConfig`，无需任何套壳函数：

```typescript
import { defineConfig } from 'vitepress'
import { withSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

export default defineConfig({
  themeConfig: {
    sidebar: withSidebarTags(yourSidebar, [createHttpMethodsTag()])
  }
})
```

### 丰富的标签类型
- **HTTP 方法标签**: GET, POST, PUT, DELETE 等
- **版本标签**: v1.0, v2.0 等版本信息
- **状态标签**: stable, beta, experimental 等
- **更新标签**: new, hot, updated 等
- **自定义标签**: 完全自定义的标签类型

### 美观的样式系统
- **4种尺寸**: xs, sm, md, lg
- **4种变体**: solid, outline, soft, subtle
- **20+颜色主题**: primary, success, warning, error 等
- **8种圆角**: none, sm, md, lg, xl, 2xl, 3xl, full

## 🚀 快速开始

### 1. 安装插件

```bash
npm install vitepress-plugin-sidebar-tags
```

### 2. 配置 VitePress

```typescript
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { withSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

const sidebar = [
  {
    text: 'API',
    items: [
      { text: '用户管理', link: '/api/users' },
      { text: '创建用户', link: '/api/create-user' }
    ]
  }
]

export default defineConfig({
  themeConfig: {
    sidebar: withSidebarTags(sidebar, [createHttpMethodsTag()])
  }
})
```

### 3. 导入样式

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-sidebar-tags/style.css'

export default DefaultTheme
```

### 4. 添加 Frontmatter

```markdown
---
method: GET
version: v1.0
status: stable
---

# 用户管理 API

这是一个用户管理接口...
```

## 🎨 效果预览

当你完成上述配置后，侧边栏中会自动显示：

- **用户管理** `GET` `v1.0` `STABLE`
- **创建用户** `POST` `v1.0` `BETA`

## 🌟 为什么选择这个插件？

### 用户友好的设计
- 遵循 VitePress 的设计理念
- 无需学习复杂的 API
- 渐进式增强，不影响现有配置

### 高度可定制
- 支持完全自定义标签
- 丰富的样式选项
- 支持条件显示和值转换

### 生产就绪
- TypeScript 类型支持
- 完善的错误处理
- 性能优化，构建时生成

## 🌟 为什么选择这个插件？

### 🎯 **用户友好的API设计**
```typescript
// ✅ 推荐：用户先定义侧边栏，然后添加标签
const sidebar = [/* 你的侧边栏配置 */]

export default defineConfig({
  themeConfig: {
    sidebar: withSidebarTags(sidebar, [createHttpMethodsTag()])
  }
})

// ❌ 不推荐：复杂的套壳函数
createSidebarWithTags(/* 复杂配置 */)
```

### 🎨 **丰富的样式选项**
```typescript
createHttpMethodsTag({
  rounded: 'full',    // 8种圆角：none, sm, md, lg, xl, 2xl, 3xl, full
  size: 'sm',         // 4种尺寸：xs, sm, md, lg  
  variant: 'soft',    // 4种变体：solid, outline, soft, subtle
  color: 'success'    // 20+颜色主题
})
```

### 🚀 **零学习成本**
如果你已经会使用 VitePress，那么你已经会使用这个插件了！

## 下一步

- [安装指南](/installation) - 详细的安装步骤
- [基础用法](/basic-usage) - 学习基本配置
- [API 文档](/api/users) - 查看实际效果 
# VitePress Sidebar Tags Plugin

一个强大的 VitePress 插件，可以根据 markdown 文件的 frontmatter 自动在侧边栏中添加各种标签。

## 🎯 快速开始

```typescript
// 推荐用法：从 VitePress 配置获取
import { withVitePressConfig, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

config.themeConfig.sidebar['/api/'] = withVitePressConfig(
  config, 
  [createHttpMethodsTag(), createStatusTag()],
  'zh'
)
```

```yaml
# 在你的 Markdown 中添加 frontmatter
---
method: GET
status: stable
---
```

结果：在侧边栏中自动显示 `GET` `STABLE` 标签 🏷️

## 📋 简洁 API

只有两个主要函数，简单易用：

| 函数 | 用途 | 适用场景 |
|------|------|----------|
| `withVitePressConfig(config, tags, locale?)` | 处理现有配置 | 已有侧边栏配置 |
| `createSidebarTags(options)` | 创建插件实例 | 动态生成、文件读取 |

## ✨ 特性

- 🏷️ **多标签支持**：一个文档可同时显示多个标签
- 📍 **灵活位置**：标签可前置或后置，支持优先级排序
- 🎨 **丰富样式**：20+ 预设颜色主题 + 4种变体（solid, outline, soft, subtle）
- ⚙️ **强大配置**：条件显示、值转换、自定义样式
- 🔧 **简洁 API**：支持标准的 VitePress 配置结构
- ✅ **完全可选**：不配置不会有任何副作用
- 🌍 **多语言支持**：完美适配 VitePress 多语言配置

## 📦 安装

```bash
npm install vitepress-plugin-sidebar-tags
# 或者
pnpm add vitepress-plugin-sidebar-tags
```

## 🚀 使用方法

### 方法 1：处理现有的 VitePress 配置（推荐）

如果你已经在 VitePress 配置中定义了侧边栏，可以直接处理现有配置：

```typescript
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { withVitePressConfig, createHttpMethodsTag, createVersionTag } from 'vitepress-plugin-sidebar-tags'

const config = defineConfig({
  themeConfig: {
    sidebar: {
      '/api/': [
        {
          text: "API 文档",
          items: [
            { text: "用户管理", link: "/api/users" },
            { text: "创建用户", link: "/api/create-user" }
          ]
        }
      ]
    }
  }
})

// 处理现有的侧边栏配置
config.themeConfig!.sidebar!['/api/'] = withVitePressConfig(
  config, 
  [
    createHttpMethodsTag(),
    createVersionTag(),
    {
      field: 'status',
      position: 'before',
      variant: 'soft',
      color: 'success'
    }
  ],
  'zh'
)

export default config
```

### 方法 2：动态生成侧边栏

使用 `createSidebarTags` 创建插件实例，支持多种数据源：

```typescript
import { createSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

// 从文件读取
const sidebarTags = createSidebarTags({
  tags: [createHttpMethodsTag(), createVersionTag()],
  sidebarPath: 'sidebar',  // 从 docs/sidebar/zh.json 读取
  docsPath: 'docs'
})

// 或者使用函数动态生成
const sidebarTags = createSidebarTags({
  tags: [createHttpMethodsTag()],
  sidebar: () => [
    {
      text: "动态API",
      items: [
        { text: "用户接口", link: "/api/users" },
        { text: "产品接口", link: "/api/products" }
      ]
    }
  ]
})

// 或者从现有配置获取
const sidebarTags = createSidebarTags({
  tags: [createHttpMethodsTag()],
  vitepressConfig: myConfig  // 从配置对象读取 sidebar
})

export default defineConfig({
  themeConfig: {
    sidebar: {
      '/zh/': sidebarTags.generateSidebarSync('zh'),
      '/en/': sidebarTags.generateSidebarSync('en')
    }
  }
})
```

## 🎨 标签配置

### 预设标签

```typescript
import { 
  createHttpMethodsTag,
  createVersionTag, 
  createStatusTag,
  createUpdateTag 
} from 'vitepress-plugin-sidebar-tags'

// HTTP 方法标签
createHttpMethodsTag({
  position: 'after',    // 位置：'before' | 'after'
  size: 'xs',          // 大小：'xs' | 'sm' | 'md' | 'lg'
  variant: 'solid'     // 变体：'solid' | 'outline' | 'soft' | 'subtle'
})

// 版本标签
createVersionTag({
  color: 'info',       // 颜色主题
  prefix: 'v',         // 前缀
  priority: 1          // 优先级（数字越小优先级越高）
})

// 状态标签
createStatusTag({
  valueStyles: {
    'stable': { color: 'success' },
    'beta': { color: 'warning' },
    'experimental': { color: 'error' }
  }
})

// 更新标签
createUpdateTag({
  show: (value) => ['new', 'hot'].includes(value.toLowerCase()),  // 条件显示
  transform: (value) => value.toUpperCase()                       // 值转换
})
```

### 自定义标签

```typescript
{
  field: 'category',              // frontmatter 字段名
  position: 'before',             // 标签位置
  size: 'sm',                     // 标签大小
  variant: 'outline',             // 样式变体
  color: 'purple',                // 颜色主题
  prefix: '[',                    // 前缀
  suffix: ']',                    // 后缀
  priority: 0,                    // 优先级
  
  // 值转换函数
  transform: (value) => value.toUpperCase(),
  
  // 条件显示函数
  show: (value) => value !== 'hidden',
  
  // 不同值的样式覆盖
  valueStyles: {
    'important': { 
      color: 'error',
      variant: 'solid' 
    },
    'normal': { 
      color: 'gray' 
    }
  },
  
  // 完全自定义样式
  customStyle: {
    backgroundColor: '#ff6b6b',
    color: '#ffffff',
    borderColor: '#ff5252',
    darkBackgroundColor: '#d63031',
    darkColor: '#ffffff',
    darkBorderColor: '#e17055'
  }
}
```

## 🎯 Markdown Frontmatter

在你的 Markdown 文件中添加 frontmatter：

```yaml
---
title: 用户管理 API
method: GET
status: stable  
version: v1.2.0
category: core
update: new
---

# 用户管理 API

这是一个稳定的核心 API...
```

## 🌈 颜色主题

支持 20+ 预设颜色主题：

- `primary` - 主色调
- `success` - 成功绿色  
- `warning` - 警告橙色
- `error` - 错误红色
- `info` - 信息蓝色
- `gray` - 灰色
- `red`, `pink`, `purple`, `indigo`, `blue`, `cyan`, `teal`, `green`, `lime`, `yellow`, `orange`

## 🔧 高级配置

### 生产环境控制

```typescript
createSidebarTags({
  tags: [...],
  injectInProduction: false,  // 生产环境不注入标签
  debug: true                 // 开启调试模式
})
```

### 多语言支持

```typescript
createSidebarTags({
  tags: [...],
  locales: ['zh', 'en', 'ja'],
  sidebarPath: 'sidebar'
})

// 使用
sidebarTags.generateSidebarSync('zh')
sidebarTags.generateSidebarSync('en')
```

### 异步数据源

```typescript
createSidebarTags({
  tags: [...],
  sidebar: async () => {
    const data = await fetch('/api/sidebar')
    return data.json()
  }
})

// 使用异步方法
const sidebar = await sidebarTags.generateSidebar('zh')
```

## 📝 完整示例

查看 [example](./example/) 目录获取完整的使用示例。

## 📄 License

MIT License 
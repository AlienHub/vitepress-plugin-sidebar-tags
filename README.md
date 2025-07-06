# VitePress Sidebar Tags Plugin

一个强大的 VitePress 插件，可以根据 markdown 文件的 frontmatter 自动在侧边栏中添加各种标签。

## 🚀 快速开始

### 基础用法（推荐）

用户先定义自己的侧边栏配置，然后用 `withSidebarTags` 函数包装：

```typescript
// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { withSidebarTags, createHttpMethodsTag, createVersionTag } from 'vitepress-plugin-sidebar-tags'

// 定义你的侧边栏配置
const sidebar = [
  {
    text: 'API 接口',
    items: [
      { text: '用户管理', link: '/api/users' },
      { text: '创建用户', link: '/api/create-user' },
      { text: '更新用户', link: '/api/update-user' },
      { text: '删除用户', link: '/api/delete-user' }
    ]
  }
]

export default defineConfig({
  title: 'My Docs',
  description: 'Documentation with tags',
  
  themeConfig: {
    // 使用函数包装，添加标签功能
    sidebar: withSidebarTags(sidebar, [
      createHttpMethodsTag({ position: 'after' }),
      createVersionTag({ position: 'before' }),
      {
        field: 'status',
        position: 'before',
        size: 'xs',
        variant: 'soft',
        valueStyles: {
          'STABLE': { color: 'success' },
          'BETA': { color: 'warning' },
          'EXPERIMENTAL': { color: 'error' }
        }
      }
    ], {
      docsPath: 'docs',
      debug: false
    })
  }
})
```

### 多路径侧边栏

对于多路径侧边栏，使用 `withMultiSidebarTags` 函数：

```typescript
import { defineConfig } from 'vitepress'
import { withMultiSidebarTags, createHttpMethodsTag, createVersionTag } from 'vitepress-plugin-sidebar-tags'

// 定义多路径侧边栏配置
const sidebarConfig = {
  '/api/': [
    {
      text: 'API 接口',
      items: [
        { text: '用户管理', link: '/api/users' },
        { text: '创建用户', link: '/api/create-user' }
      ]
    }
  ],
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '进阶使用', link: '/guide/advanced' }
      ]
    }
  ]
}

export default defineConfig({
  themeConfig: {
    sidebar: withMultiSidebarTags(sidebarConfig, [
      createHttpMethodsTag({ position: 'after' }),
      createVersionTag({ position: 'before' })
    ])
  }
})
```

### 多语言项目

多语言项目中每种语言分别配置：

```typescript
import { defineConfig } from 'vitepress'
import { withSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

// 中文侧边栏
const zhSidebar = [
  {
    text: 'API 接口',
    items: [
      { text: '用户管理', link: '/zh/api/users' },
      { text: '创建用户', link: '/zh/api/create-user' }
    ]
  }
]

// 英文侧边栏
const enSidebar = [
  {
    text: 'API',
    items: [
      { text: 'Users', link: '/en/api/users' },
      { text: 'Create User', link: '/en/api/create-user' }
    ]
  }
]

export default defineConfig({
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      themeConfig: {
        sidebar: withSidebarTags(zhSidebar, [
          createHttpMethodsTag({ position: 'after' })
        ])
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        sidebar: withSidebarTags(enSidebar, [
          createHttpMethodsTag({ position: 'after' })
        ])
      }
    }
  }
})
```

### 自动生成侧边栏

如果你不想手动配置侧边栏，可以让插件从文件系统自动生成：

```typescript
import { defineConfig } from 'vitepress'
import { generateSidebar, createHttpMethodsTag, createVersionTag } from 'vitepress-plugin-sidebar-tags'

export default defineConfig({
  themeConfig: {
    // 从文件系统自动生成侧边栏
    sidebar: generateSidebar([
      createHttpMethodsTag({ position: 'after' }),
      createVersionTag({ position: 'before' })
    ], {
      docsPath: 'docs',
      debug: false
    })
  }
})
```

## 🎯 Frontmatter 配置

在你的 markdown 文件中添加 frontmatter：

```markdown
---
method: GET
version: v1.0
status: STABLE
category: user
---

# 用户管理 API

这是用户管理接口的文档...
```

## 🎨 CSS 样式导入

在你的主题文件中导入 CSS：

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-sidebar-tags/style.css'

export default {
  extends: DefaultTheme,
  // ... 其他配置
}
```

## 🏷️ 标签配置

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
  variant: 'solid',    // 变体：'solid' | 'outline' | 'soft' | 'subtle'
  rounded: 'sm'        // 圆角：'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
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
  rounded: 'lg',                  // 圆角大小
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

## 🌈 样式主题

### 尺寸
- `xs` - 最小
- `sm` - 小（默认）
- `md` - 中等
- `lg` - 大

### 变体
- `solid` - 实心（默认）
- `outline` - 轮廓
- `soft` - 柔和
- `subtle` - 精细

### 颜色
支持 20+ 预设颜色主题：
`primary`, `secondary`, `success`, `warning`, `error`, `info`, `gray`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

### 圆角
参考 NuxtUI 设计，支持 8 种圆角尺寸：
- `none` - 无圆角 (0px)
- `sm` - 小圆角 (2px)
- `md` - 中等圆角 (4px) 
- `lg` - 大圆角 (6px)
- `xl` - 超大圆角 (8px)
- `2xl` - 特大圆角 (12px)
- `3xl` - 极大圆角 (16px)
- `full` - 完全圆角 (pill 形状)

```typescript
// 在标签配置中使用圆角
createHttpMethodsTag({
  rounded: 'lg'      // 使用大圆角
})

// 或者在自定义标签中使用
{
  field: 'category',
  rounded: 'full',   // 使用完全圆角
  // ... 其他配置
}
```

## 📖 API 文档

### `withSidebarTags(sidebar, tags, options?)`

为侧边栏添加标签（推荐用法）。

**参数：**
- `sidebar` - 用户的侧边栏配置
- `tags` - 标签配置数组
- `options` - 可选配置
  - `docsPath` - 文档根目录路径（默认: 'docs'）
  - `injectInProduction` - 是否在生产环境注入标签（默认: true）
  - `debug` - 是否开启调试模式（默认: false）

**返回：** `DefaultTheme.SidebarItem[]`

### `withMultiSidebarTags(sidebarConfig, tags, options?)`

为多路径侧边栏添加标签。

**参数：**
- `sidebarConfig` - 多路径侧边栏配置
- `tags` - 标签配置数组
- `options` - 可选配置（同上）

**返回：** `DefaultTheme.SidebarMulti`

### `generateSidebar(tags, options?)`

自动生成带标签的侧边栏（从文件系统读取）。

**参数：**
- `tags` - 标签配置数组
- `options` - 可选配置（同上）

**返回：** `DefaultTheme.SidebarItem[]`

### `generateSidebarFromConfig(vitepressConfig, tags, locale?)`

从VitePress配置生成侧边栏（兼容用法）。

**参数：**
- `vitepressConfig` - VitePress配置对象
- `tags` - 标签配置数组
- `locale` - 语言代码（默认: 'zh'）

**返回：** `DefaultTheme.SidebarItem[]`

### `createSidebarTags(options)`

创建侧边栏标签实例（高级用法）。

**参数：**
- `options` - 标签配置选项

### 预设标签创建函数

- `createHttpMethodsTag(options?)` - 创建 HTTP 方法标签
- `createVersionTag(options?)` - 创建版本标签
- `createStatusTag(options?)` - 创建状态标签
- `createUpdateTag(options?)` - 创建更新标签

## 🔧 调试

如果标签没有正确显示，可以开启调试模式：

```typescript
withSidebarTags(sidebar, tags, {
  debug: true  // 开启调试模式
})
```

## ✨ 特点

- 🚀 **零配置** - 使用标准 VitePress `defineConfig`，无需任何套壳
- 🏷️ **多标签支持** - 同时显示多个不同类型的标签
- 🎨 **丰富样式** - 20+ 颜色主题，4种尺寸，4种变体
- 🌙 **暗色模式** - 完美支持 VitePress 暗色主题
- 🌍 **国际化** - 完美支持多语言项目
- ⚡ **高性能** - 构建时生成，运行时无性能损耗
- 🎯 **类型安全** - 完整的 TypeScript 类型支持
- 📝 **简洁直观** - 用户先定义侧边栏，然后添加标签

## 📝 示例项目

参考 `example` 目录中的完整示例项目。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT 
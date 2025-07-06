# 基础用法

本页面详细介绍如何使用 VitePress Sidebar Tags Plugin 的基础功能。

## 🚀 快速开始

### 1. 基础配置

最简单的使用方式是使用预设的标签配置：

```typescript
import { withSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

const sidebar = [
  {
    text: 'API 文档',
    items: [
      { text: '用户管理', link: '/api/users' },
      { text: '创建用户', link: '/api/create-user' }
    ]
  }
]

export default defineConfig({
  themeConfig: {
    sidebar: withSidebarTags(sidebar, [
      createHttpMethodsTag()
    ])
  }
})
```

### 2. 添加 Frontmatter

在你的 markdown 文件中添加相应的 frontmatter：

```markdown
---
method: GET
---

# 用户管理

这是一个 GET 请求的 API 文档...
```

## 🏷️ 预设标签

插件提供了多种预设标签，开箱即用：

### HTTP 方法标签

```typescript
import { createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

withSidebarTags(sidebar, [
  createHttpMethodsTag({
    rounded: 'sm',
    size: 'xs'
  })
])
```

支持的 HTTP 方法：
- `GET` - 绿色
- `POST` - 蓝色
- `PUT` - 橙色
- `DELETE` - 红色
- `PATCH` - 紫色

### 版本标签

```typescript
import { createVersionTag } from 'vitepress-plugin-sidebar-tags'

withSidebarTags(sidebar, [
  createVersionTag({
    color: 'blue',
    rounded: 'md'
  })
])
```

Frontmatter 示例：
```markdown
---
version: v1.0
---
```

### 状态标签

```typescript
import { createStatusTag } from 'vitepress-plugin-sidebar-tags'

withSidebarTags(sidebar, [
  createStatusTag({
    rounded: 'lg'
  })
])
```

支持的状态：
- `stable` - 绿色
- `beta` - 橙色
- `experimental` - 红色
- `deprecated` - 灰色

### 更新标签

```typescript
import { createUpdateTag } from 'vitepress-plugin-sidebar-tags'

withSidebarTags(sidebar, [
  createUpdateTag({
    rounded: 'full'
  })
])
```

支持的更新状态：
- `new` - 绿色
- `updated` - 蓝色
- `hot` - 红色

## 🎨 样式配置

### 尺寸 (Size)

```typescript
createHttpMethodsTag({
  size: 'xs'  // xs, sm, md, lg
})
```

### 变体 (Variant)

```typescript
createHttpMethodsTag({
  variant: 'solid'  // solid, outline, soft, subtle
})
```

### 颜色 (Color)

```typescript
createHttpMethodsTag({
  color: 'success'  // primary, success, warning, error, info, gray, blue, green, red, orange, purple, pink, cyan, teal, amber, lime, emerald, indigo, violet, fuchsia, rose, sky, slate, zinc, neutral, stone
})
```

### 圆角 (Rounded)

```typescript
createHttpMethodsTag({
  rounded: 'md'  // none, sm, md, lg, xl, 2xl, 3xl, full
})
```

## 🔧 高级配置

### 多个标签组合

```typescript
withSidebarTags(sidebar, [
  createHttpMethodsTag({ size: 'xs' }),
  createVersionTag({ color: 'blue' }),
  createStatusTag({ rounded: 'lg' })
])
```

### 自定义标签

```typescript
withSidebarTags(sidebar, [
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
```

### 条件显示

```typescript
withSidebarTags(sidebar, [
  {
    field: 'featured',
    position: 'before',
    size: 'sm',
    variant: 'solid',
    color: 'warning',
    rounded: 'full',
    condition: (value) => value === true,
    transform: () => '🔥 热门'
  }
])
```

## 📝 实际示例

### 完整配置示例

```typescript
import { defineConfig } from 'vitepress'
import { 
  withSidebarTags, 
  createHttpMethodsTag, 
  createVersionTag, 
  createStatusTag 
} from 'vitepress-plugin-sidebar-tags'

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
  title: 'API 文档',
  description: 'RESTful API 文档',
  
  themeConfig: {
    sidebar: withSidebarTags(sidebar, [
      createHttpMethodsTag({
        rounded: 'sm',
        size: 'xs'
      }),
      createVersionTag({
        color: 'blue',
        rounded: 'md'
      }),
      createStatusTag({
        rounded: 'lg'
      })
    ])
  }
})
```

### Markdown 文件示例

```markdown
---
method: GET
version: v1.0
status: stable
---

# 用户管理 API

这是一个用于管理用户的 API 接口。

## 请求参数

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 用户 ID |

## 响应示例

```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## 下一步

- [高级功能](/advanced/custom-tags) - 学习自定义标签
- [样式定制](/advanced/styling) - 自定义样式
- [多语言支持](/advanced/i18n) - 国际化配置 
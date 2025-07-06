# 基础示例

这个页面展示了 VitePress Sidebar Tags Plugin 的基础使用示例。

## 🚀 快速开始示例

### 1. 最简单的配置

```typescript
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { withSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

const sidebar = [
  {
    text: 'API 文档',
    items: [
      { text: '用户列表', link: '/api/users' },
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

### 2. 对应的 Markdown 文件

```markdown
---
method: GET
---

# 用户列表 API

获取用户列表的接口...
```

## 🎨 样式示例

### 不同尺寸的标签

```typescript
withSidebarTags(sidebar, [
  createHttpMethodsTag({ size: 'xs' }),   // 超小
  createHttpMethodsTag({ size: 'sm' }),   // 小
  createHttpMethodsTag({ size: 'md' }),   // 中
  createHttpMethodsTag({ size: 'lg' })    // 大
])
```

### 不同变体的标签

```typescript
withSidebarTags(sidebar, [
  createHttpMethodsTag({ variant: 'solid' }),   // 实心
  createHttpMethodsTag({ variant: 'outline' }), // 轮廓
  createHttpMethodsTag({ variant: 'soft' }),    // 柔和
  createHttpMethodsTag({ variant: 'subtle' })   // 微妙
])
```

### 不同圆角的标签

```typescript
withSidebarTags(sidebar, [
  createHttpMethodsTag({ rounded: 'none' }),  // 无圆角
  createHttpMethodsTag({ rounded: 'sm' }),    // 小圆角
  createHttpMethodsTag({ rounded: 'md' }),    // 中圆角
  createHttpMethodsTag({ rounded: 'lg' }),    // 大圆角
  createHttpMethodsTag({ rounded: 'full' })   // 完全圆角
])
```

## 🏷️ 多标签组合示例

```typescript
withSidebarTags(sidebar, [
  // HTTP 方法标签
  createHttpMethodsTag({
    size: 'xs',
    variant: 'solid',
    rounded: 'sm'
  }),
  
  // 版本标签
  createVersionTag({
    size: 'xs',
    variant: 'outline',
    color: 'blue',
    rounded: 'md'
  }),
  
  // 状态标签
  createStatusTag({
    size: 'xs',
    variant: 'soft',
    rounded: 'lg'
  })
])
```

对应的 frontmatter：
```markdown
---
method: POST
version: v1.0
status: stable
---

# 创建用户 API
```

## 🎯 实际效果

查看左侧侧边栏，你可以看到精心设计的标签组合：

- **用户管理** - 单个 `GET` 标签，展示基础HTTP方法
- **创建用户** - 单个 `POST` 标签，蓝色主题
- **更新用户** - `PUT` + `UPDATED` 标签组合，展示多标签效果
- **删除用户** - `DELETE` + `EXPERIMENTAL` 标签，红色警示
- **角色管理** - `GET` + `v2.0` 版本标签，展示版本功能
- **权限管理** - `PATCH` + `BETA` 状态标签，紫色+橙色搭配

## 🔧 自定义标签示例

```typescript
withSidebarTags(sidebar, [
  {
    field: 'difficulty',
    position: 'after',
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

## 📱 响应式效果

在不同设备上查看效果：
- **桌面端**: 标签完整显示
- **平板端**: 标签适当缩小
- **手机端**: 标签进一步优化，保持可读性

## 🌟 最佳实践

1. **保持简洁**: 每个页面不超过 3-4 个标签
2. **语义化**: 使用有意义的字段名
3. **一致性**: 在整个项目中保持样式一致
4. **可读性**: 选择合适的颜色和尺寸

## 下一步

- [多语言示例](/examples/multilang) - 查看多语言配置
- [自定义样式](/examples/custom-styles) - 学习样式定制
- [高级功能](/advanced/custom-tags) - 探索高级特性 
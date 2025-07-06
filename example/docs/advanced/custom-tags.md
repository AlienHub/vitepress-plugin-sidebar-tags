# 自定义标签

学习如何创建和配置自定义标签来满足特定需求。

## 🎯 基础自定义标签

### 简单自定义标签

```typescript
import { withSidebarTags } from 'vitepress-plugin-sidebar-tags'

export default defineConfig({
  themeConfig: {
    sidebar: withSidebarTags(sidebar, [
      {
        field: 'difficulty',
        position: 'after',
        size: 'xs',
        variant: 'outline',
        color: 'warning',
        rounded: 'md'
      }
    ])
  }
})
```

对应的 frontmatter：
```markdown
---
difficulty: hard
---
```

### 带前缀和后缀的标签

```typescript
{
  field: 'priority',
  position: 'before',
  size: 'sm',
  variant: 'solid',
  color: 'error',
  rounded: 'full',
  prefix: '优先级: ',
  suffix: '!'
}
```

## 🎨 值样式定制

### 不同值使用不同样式

```typescript
{
  field: 'status',
  position: 'after',
  size: 'xs',
  variant: 'soft',
  color: 'gray', // 默认颜色
  rounded: 'lg',
  valueStyles: {
    'active': { color: 'success', variant: 'solid' },
    'inactive': { color: 'gray', variant: 'outline' },
    'pending': { color: 'warning', variant: 'soft' },
    'error': { color: 'error', variant: 'solid' }
  }
}
```

### 复杂样式配置

```typescript
{
  field: 'type',
  position: 'before',
  size: 'xs',
  variant: 'outline',
  color: 'primary',
  rounded: 'md',
  valueStyles: {
    'tutorial': { 
      color: 'blue', 
      variant: 'solid',
      rounded: 'full',
      size: 'sm'
    },
    'guide': { 
      color: 'green', 
      variant: 'soft',
      rounded: 'lg'
    },
    'reference': { 
      color: 'purple', 
      variant: 'outline',
      rounded: 'sm'
    }
  }
}
```

## 🔧 高级功能

### 条件显示

```typescript
{
  field: 'featured',
  position: 'before',
  size: 'sm',
  variant: 'solid',
  color: 'warning',
  rounded: 'full',
  condition: (value) => value === true,
  transform: () => '🔥'
}
```

### 值转换

```typescript
{
  field: 'level',
  position: 'after',
  size: 'xs',
  variant: 'outline',
  color: 'info',
  rounded: 'md',
  transform: (value) => {
    const levels = {
      '1': '初级',
      '2': '中级',
      '3': '高级',
      '4': '专家'
    }
    return levels[value] || value
  }
}
```

### 复杂条件和转换

```typescript
{
  field: 'score',
  position: 'after',
  size: 'xs',
  variant: 'solid',
  color: 'gray',
  rounded: 'full',
  condition: (value) => value >= 80,
  transform: (value) => `${value}分`,
  valueStyles: {
    '90': { color: 'success' },
    '80': { color: 'warning' }
  }
}
```

## 📝 实际应用示例

### 文档分类标签

```typescript
{
  field: 'category',
  position: 'before',
  size: 'xs',
  variant: 'soft',
  color: 'primary',
  rounded: 'md',
  prefix: '[',
  suffix: ']',
  transform: (value) => value.toUpperCase(),
  valueStyles: {
    'api': { color: 'blue' },
    'guide': { color: 'green' },
    'tutorial': { color: 'purple' },
    'reference': { color: 'orange' }
  }
}
```

### 难度等级标签

```typescript
{
  field: 'difficulty',
  position: 'after',
  size: 'xs',
  variant: 'outline',
  color: 'success',
  rounded: 'lg',
  valueStyles: {
    'beginner': { color: 'success', variant: 'solid' },
    'intermediate': { color: 'warning', variant: 'solid' },
    'advanced': { color: 'error', variant: 'solid' },
    'expert': { color: 'purple', variant: 'solid' }
  }
}
```

### 语言标签

```typescript
{
  field: 'language',
  position: 'before',
  size: 'xs',
  variant: 'solid',
  color: 'gray',
  rounded: 'sm',
  valueStyles: {
    'javascript': { color: 'amber' },
    'typescript': { color: 'blue' },
    'python': { color: 'green' },
    'java': { color: 'red' },
    'go': { color: 'cyan' },
    'rust': { color: 'orange' }
  }
}
```

## 🌟 最佳实践

### 1. 语义化字段名

```typescript
// ✅ 推荐
field: 'difficulty'
field: 'category'
field: 'language'

// ❌ 不推荐
field: 'tag1'
field: 'label'
field: 'type'
```

### 2. 一致的样式风格

```typescript
// 为相关标签使用一致的样式
const tagConfigs = [
  {
    field: 'method',
    size: 'xs',
    variant: 'solid',
    rounded: 'sm'
  },
  {
    field: 'version',
    size: 'xs',
    variant: 'outline',
    rounded: 'sm'
  },
  {
    field: 'status',
    size: 'xs',
    variant: 'soft',
    rounded: 'sm'
  }
]
```

### 3. 合理的标签数量

```typescript
// ✅ 推荐：2-4个标签
withSidebarTags(sidebar, [
  createHttpMethodsTag(),
  createVersionTag(),
  createStatusTag()
])

// ❌ 避免：过多标签影响阅读
withSidebarTags(sidebar, [
  // 6个以上标签会让界面混乱
])
```

### 4. 响应式设计考虑

```typescript
// 移动端使用更小的标签
{
  field: 'type',
  size: 'xs', // 移动端友好
  variant: 'solid',
  rounded: 'sm'
}
```

## 下一步

- [样式定制](/advanced/styling) - 自定义样式
- [多语言支持](/advanced/i18n) - 国际化配置
- [示例库](/examples/basic) - 查看更多示例 
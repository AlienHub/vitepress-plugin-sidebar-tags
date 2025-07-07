# 自定义样式示例

本页面展示如何通过 CSS 和配置实现 Sidebar Tags 插件的个性化样式。

## 🎨 基础样式覆盖

在 `.vitepress/theme/custom.css` 文件中添加自定义样式：

```css
.sidebar-tag {
  font-weight: bold;
  border-radius: 8px;
  padding: 2px 8px;
  background: linear-gradient(90deg, #f3ec78, #af4261);
  color: #fff;
  box-shadow: 0 2px 8px rgba(175,66,97,0.15);
  letter-spacing: 0.05em;
}

.sidebar-tag[data-method="GET"] {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.sidebar-tag[data-method="POST"] {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.sidebar-tag[data-value="experimental"] {
  background: repeating-linear-gradient(135deg, #f59e42, #f59e42 10px, #fff 10px, #fff 20px);
  color: #c2410c;
}
```

## 🏷️ 变体与尺寸

```css
.sidebar-tag--outline {
  background: transparent;
  color: #af4261;
  border: 1px solid #af4261;
}

.sidebar-tag--xs {
  font-size: 9px;
  padding: 1px 4px;
}

.sidebar-tag--lg {
  font-size: 14px;
  padding: 4px 12px;
}
```

## 🌈 动画与特效

```css
.sidebar-tag--pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 #af426144; }
  70% { box-shadow: 0 0 0 10px #af426100; }
  100% { box-shadow: 0 0 0 0 #af426100; }
}

.sidebar-tag--rainbow {
  background: linear-gradient(90deg, #ff6b6b, #f8e71c, #6bffb8, #6b83ff, #ff6bcb);
  background-size: 400% 400%;
  animation: rainbow 3s ease infinite;
}

@keyframes rainbow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## 📝 配置示例

```typescript
import { withSidebarTags, createHttpMethodsTag } from 'vitepress-plugin-sidebar-tags'

export default defineConfig({
  themeConfig: {
    sidebar: withSidebarTags(sidebar, [
      createHttpMethodsTag({
        size: 'lg',
        variant: 'outline',
        rounded: 'full',
        color: 'primary'
      }),
      {
        field: 'difficulty',
        size: 'xs',
        variant: 'solid',
        color: 'warning',
        rounded: 'md',
        prefix: '难度: '
      }
    ])
  }
})
```

## 📱 响应式适配

```css
@media (max-width: 768px) {
  .sidebar-tag {
    font-size: 8px;
    padding: 1px 3px;
  }
}
```

## 🔍 调试技巧

```css
.debug .sidebar-tag {
  outline: 1px dashed #af4261;
}
```

## 下一步

- [多语言示例](/examples/multilang) - 查看多语言标签效果
- [样式定制](/advanced/styling) - 深入学习样式系统 
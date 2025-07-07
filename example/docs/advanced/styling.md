# 样式定制

学习如何自定义 VitePress Sidebar Tags Plugin 的样式，打造独特的视觉效果。

## 🎨 样式系统概述

VitePress Sidebar Tags Plugin 提供了完整的样式定制系统，支持 CSS 变量、自定义样式和主题适配。

## 🚀 基础样式配置

### 1. 导入默认样式

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-sidebar-tags/style.css'

export default DefaultTheme
```

### 2. 基础样式覆盖

```css
/* .vitepress/theme/custom.css */

/* 覆盖默认标签样式 */
.sidebar-tag {
  font-weight: 600;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

/* 悬停效果 */
.sidebar-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

## 🌈 颜色主题定制

### CSS 变量系统

```css
/* 自定义颜色变量 */
:root {
  /* 主要颜色 */
  --sidebar-tag-primary: #3b82f6;
  --sidebar-tag-primary-hover: #2563eb;
  
  /* 成功颜色 */
  --sidebar-tag-success: #10b981;
  --sidebar-tag-success-hover: #059669;
  
  /* 警告颜色 */
  --sidebar-tag-warning: #f59e0b;
  --sidebar-tag-warning-hover: #d97706;
  
  /* 错误颜色 */
  --sidebar-tag-error: #ef4444;
  --sidebar-tag-error-hover: #dc2626;
  
  /* 信息颜色 */
  --sidebar-tag-info: #8b5cf6;
  --sidebar-tag-info-hover: #7c3aed;
  
  /* 灰色 */
  --sidebar-tag-gray: #6b7280;
  --sidebar-tag-gray-hover: #4b5563;
}

/* 暗色模式适配 */
.dark {
  --sidebar-tag-primary: #60a5fa;
  --sidebar-tag-primary-hover: #3b82f6;
  
  --sidebar-tag-success: #34d399;
  --sidebar-tag-success-hover: #10b981;
  
  --sidebar-tag-warning: #fbbf24;
  --sidebar-tag-warning-hover: #f59e0b;
  
  --sidebar-tag-error: #f87171;
  --sidebar-tag-error-hover: #ef4444;
  
  --sidebar-tag-info: #a78bfa;
  --sidebar-tag-info-hover: #8b5cf6;
  
  --sidebar-tag-gray: #9ca3af;
  --sidebar-tag-gray-hover: #6b7280;
}
```

### 特定颜色样式

```css
/* HTTP 方法颜色定制 */
.sidebar-tag[data-method="GET"] {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
}

.sidebar-tag[data-method="POST"] {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
}

.sidebar-tag[data-method="PUT"] {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
}

.sidebar-tag[data-method="DELETE"] {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
}

.sidebar-tag[data-method="PATCH"] {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
}
```

## 🎯 尺寸和间距定制

### 尺寸变体

```css
/* 自定义尺寸 */
.sidebar-tag--xs {
  font-size: 9px;
  padding: 1px 4px;
  line-height: 1.2;
}

.sidebar-tag--sm {
  font-size: 10px;
  padding: 2px 6px;
  line-height: 1.3;
}

.sidebar-tag--md {
  font-size: 11px;
  padding: 3px 8px;
  line-height: 1.4;
}

.sidebar-tag--lg {
  font-size: 12px;
  padding: 4px 10px;
  line-height: 1.5;
}
```

### 间距控制

```css
/* 标签间距 */
.sidebar-tag {
  margin-left: 4px;
  margin-right: 2px;
}

.sidebar-tag:first-of-type {
  margin-left: 6px;
}

.sidebar-tag:last-of-type {
  margin-right: 4px;
}

/* 垂直对齐 */
.VPSidebarItem .text {
  display: flex;
  align-items: center;
  gap: 4px;
}
```

## 🔮 变体样式定制

### Solid 变体

```css
.sidebar-tag--solid {
  background: var(--sidebar-tag-primary);
  color: white;
  border: none;
  font-weight: 600;
}

.sidebar-tag--solid:hover {
  background: var(--sidebar-tag-primary-hover);
  transform: translateY(-1px);
}
```

### Outline 变体

```css
.sidebar-tag--outline {
  background: transparent;
  color: var(--sidebar-tag-primary);
  border: 1px solid var(--sidebar-tag-primary);
  font-weight: 500;
}

.sidebar-tag--outline:hover {
  background: var(--sidebar-tag-primary);
  color: white;
}
```

### Soft 变体

```css
.sidebar-tag--soft {
  background: rgba(59, 130, 246, 0.1);
  color: var(--sidebar-tag-primary);
  border: none;
  font-weight: 500;
}

.sidebar-tag--soft:hover {
  background: rgba(59, 130, 246, 0.2);
}
```

### Subtle 变体

```css
.sidebar-tag--subtle {
  background: rgba(59, 130, 246, 0.05);
  color: var(--sidebar-tag-primary);
  border: 1px solid rgba(59, 130, 246, 0.1);
  font-weight: 400;
}

.sidebar-tag--subtle:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
}
```

## 🎪 动画效果

### 基础动画

```css
/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sidebar-tag {
  animation: fadeIn 0.3s ease-out;
}

/* 悬停动画 */
.sidebar-tag {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-tag:hover {
  transform: scale(1.05) translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### 高级动画效果

```css
/* 彩虹边框动画 */
@keyframes rainbow {
  0% { border-color: #ff0000; }
  16.66% { border-color: #ff8000; }
  33.33% { border-color: #ffff00; }
  50% { border-color: #00ff00; }
  66.66% { border-color: #0080ff; }
  83.33% { border-color: #8000ff; }
  100% { border-color: #ff0000; }
}

.sidebar-tag--rainbow {
  border: 2px solid;
  animation: rainbow 3s linear infinite;
}

/* 脉冲效果 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.sidebar-tag--pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* 闪烁效果 */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.sidebar-tag--blink {
  animation: blink 1s ease-in-out infinite;
}
```

## 📱 响应式设计

### 移动端适配

```css
/* 移动端样式 */
@media (max-width: 768px) {
  .sidebar-tag {
    font-size: 8px;
    padding: 1px 3px;
    margin: 0 1px;
  }
  
  .sidebar-tag--lg {
    font-size: 9px;
    padding: 2px 4px;
  }
  
  /* 隐藏部分标签 */
  .sidebar-tag[data-field="version"] {
    display: none;
  }
}

/* 平板端样式 */
@media (max-width: 1024px) and (min-width: 769px) {
  .sidebar-tag {
    font-size: 9px;
    padding: 1px 4px;
  }
}
```

### 容器查询

```css
/* 侧边栏容器查询 */
@container sidebar (max-width: 240px) {
  .sidebar-tag {
    font-size: 8px;
    padding: 1px 2px;
  }
}

@container sidebar (max-width: 200px) {
  .sidebar-tag:not(.sidebar-tag--important) {
    display: none;
  }
}
```

## 🎨 主题集成

### VitePress 主题变量

```css
/* 集成 VitePress 主题颜色 */
.sidebar-tag {
  --sidebar-tag-primary: var(--vp-c-brand-1);
  --sidebar-tag-primary-hover: var(--vp-c-brand-2);
  
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

/* 暗色模式自动适配 */
.dark .sidebar-tag {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-divider-light);
}
```

### 自定义主题

```css
/* 创建自定义主题 */
.theme-purple {
  --sidebar-tag-primary: #8b5cf6;
  --sidebar-tag-primary-hover: #7c3aed;
  --sidebar-tag-success: #10b981;
  --sidebar-tag-warning: #f59e0b;
  --sidebar-tag-error: #ef4444;
}

.theme-ocean {
  --sidebar-tag-primary: #0ea5e9;
  --sidebar-tag-primary-hover: #0284c7;
  --sidebar-tag-success: #06b6d4;
  --sidebar-tag-warning: #eab308;
  --sidebar-tag-error: #e11d48;
}

.theme-forest {
  --sidebar-tag-primary: #059669;
  --sidebar-tag-primary-hover: #047857;
  --sidebar-tag-success: #10b981;
  --sidebar-tag-warning: #d97706;
  --sidebar-tag-error: #dc2626;
}
```

## 🔧 高级定制技巧

### 条件样式

```css
/* 基于内容的条件样式 */
.sidebar-tag[data-value="experimental"] {
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
  position: relative;
  overflow: hidden;
}

.sidebar-tag[data-value="experimental"]::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

### 组合选择器

```css
/* 多标签组合样式 */
.sidebar-tag[data-method="GET"] + .sidebar-tag[data-field="status"] {
  margin-left: 2px;
}

.sidebar-tag[data-field="version"]:last-child {
  border-radius: 0 12px 12px 0;
}

/* 特殊页面样式 */
.api-page .sidebar-tag {
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### 伪元素装饰

```css
/* 添加装饰元素 */
.sidebar-tag--featured::before {
  content: '⭐';
  margin-right: 2px;
}

.sidebar-tag--new::after {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  width: 6px;
  height: 6px;
  background: #ef4444;
  border-radius: 50%;
  border: 1px solid white;
}

.sidebar-tag--beta::before {
  content: 'β ';
  font-style: italic;
  opacity: 0.8;
}
```

## 📝 完整示例

### 综合样式配置

```css
/* 完整的自定义样式示例 */
:root {
  --sidebar-tag-font-family: 'Inter', 'SF Pro Text', system-ui, sans-serif;
  --sidebar-tag-border-radius: 6px;
  --sidebar-tag-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --sidebar-tag-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-tag {
  font-family: var(--sidebar-tag-font-family);
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--sidebar-tag-border-radius);
  box-shadow: var(--sidebar-tag-shadow);
  transition: var(--sidebar-tag-transition);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  position: relative;
  overflow: hidden;
}

.sidebar-tag:hover {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sidebar-tag:active {
  transform: translateY(0) scale(0.98);
}

/* 特殊效果 */
.sidebar-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.sidebar-tag:hover::before {
  left: 100%;
}
```

## 🔍 调试技巧

### 样式调试

```css
/* 调试模式 */
.debug .sidebar-tag {
  outline: 1px solid red;
  position: relative;
}

.debug .sidebar-tag::after {
  content: attr(data-field) ':' attr(data-value);
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 8px;
  color: red;
  white-space: nowrap;
}
```

### 性能优化

```css
/* 性能优化 */
.sidebar-tag {
  /* 使用 transform 而不是 margin/padding 来避免重排 */
  will-change: transform;
  
  /* 使用 GPU 加速 */
  transform: translateZ(0);
  
  /* 优化字体渲染 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## 下一步

- [多语言支持](/advanced/i18n) - 学习多语言配置
- [自定义标签](/advanced/custom-tags) - 创建自定义标签
- [示例库](/examples/custom-styles) - 查看样式示例 
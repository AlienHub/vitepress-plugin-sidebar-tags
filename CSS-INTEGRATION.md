# CSS 集成指南

VitePress Sidebar Tags 插件需要导入CSS样式才能正常显示标签。以下是几种集成方式：

## 方式1：在主题文件中导入（推荐）

在 `.vitepress/theme/index.ts` 文件中导入CSS：

```typescript
import DefaultTheme from 'vitepress/theme'
import { withVitePressConfig } from 'vitepress-plugin-sidebar-tags'
import 'vitepress-plugin-sidebar-tags/style.css'  // 导入CSS样式

export default {
  extends: DefaultTheme,
  // ... 其他配置
}
```

## 方式2：使用客户端插件（自动导入）

如果你使用客户端插件功能，CSS会自动导入：

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  // 客户端插件会自动导入CSS
}
```

然后在VitePress配置中使用：

```typescript
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { withVitePressConfig } from 'vitepress-plugin-sidebar-tags'

export default withVitePressConfig(defineConfig({
  // ... 你的配置
}))
```

## 方式3：在配置文件的head中添加

在VitePress配置文件中添加CSS链接：

```typescript
// .vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  head: [
    ['link', { rel: 'stylesheet', href: '/node_modules/vitepress-plugin-sidebar-tags/dist/style.css' }]
  ],
  // ... 其他配置
})
```

## 方式4：自定义样式

如果你想自定义样式，可以复制样式文件并修改：

```bash
# 复制样式文件到你的项目
cp node_modules/vitepress-plugin-sidebar-tags/dist/style.css .vitepress/theme/sidebar-tags.css
```

然后在主题文件中导入：

```typescript
import DefaultTheme from 'vitepress/theme'
import './sidebar-tags.css'  // 导入自定义样式

export default {
  extends: DefaultTheme,
  // ... 其他配置
}
```

## 注意事项

⚠️ **不要在config.ts文件中直接导入CSS**

```typescript
// ❌ 错误的做法 - 会导致 "Unknown file extension .css" 错误
import 'vitepress-plugin-sidebar-tags/style.css'

export default defineConfig({
  // ...
})
```

VitePress配置文件在Node.js环境中执行，不支持直接导入CSS文件。

## 样式自定义

插件提供了丰富的CSS变量和类名，可以轻松自定义样式：

```css
/* 自定义标签样式 */
.sidebar-tag {
  --sidebar-tag-bg: #your-color;
  --sidebar-tag-color: #your-text-color;
  --sidebar-tag-border: #your-border-color;
}

/* 暗色模式 */
.dark .sidebar-tag {
  --sidebar-tag-dark-bg: #your-dark-color;
  --sidebar-tag-dark-color: #your-dark-text-color;
  --sidebar-tag-dark-border: #your-dark-border-color;
}
```

支持的尺寸：`xs`, `sm`, `md`, `lg`
支持的变体：`solid`, `outline`, `soft`, `subtle`  
支持的颜色：`primary`, `secondary`, `success`, `warning`, `error`, `info`, `gray`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose` 
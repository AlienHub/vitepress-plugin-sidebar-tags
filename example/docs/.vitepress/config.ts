import { defineConfig } from 'vitepress'
import { withSidebarTags, createHttpMethodsTag, createVersionTag, createStatusTag, createUpdateTag } from 'vitepress-plugin-sidebar-tags'

// 定义侧边栏配置
const sidebar = [
  {
    text: '快速开始',
    items: [
      { text: '介绍', link: '/introduction' },
      { text: '安装', link: '/installation' },
      { text: '基础用法', link: '/basic-usage' }
    ]
  },
  {
    text: 'API 文档',
    items: [
      { text: '用户管理', link: '/api/users' },
      { text: '创建用户', link: '/api/create-user' },
      { text: '更新用户', link: '/api/update-user' },
      { text: '删除用户', link: '/api/delete-user' },
      { text: '角色管理', link: '/api/roles' },
      { text: '权限管理', link: '/api/permissions' }
    ]
  },
  {
    text: '高级功能',
    items: [
      { text: '自定义标签', link: '/advanced/custom-tags' },
      { text: '多语言支持', link: '/advanced/i18n' },
      { text: '样式定制', link: '/advanced/styling' }
    ]
  },
  {
    text: '示例',
    items: [
      { text: '基础示例', link: '/examples/basic' },
      { text: '多语言示例', link: '/examples/multilang' },
      { text: '自定义样式', link: '/examples/custom-styles' }
    ]
  }
]

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'VitePress Sidebar Tags Plugin',
  description: '一个强大的 VitePress 插件，根据 frontmatter 自动为侧边栏添加标签',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c82f6' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['meta', { property: 'og:title', content: 'VitePress Sidebar Tags Plugin' }],
    ['meta', { property: 'og:site_name', content: 'VitePress Sidebar Tags Plugin' }],
    ['meta', { property: 'og:url', content: 'https://vitepress-plugin-sidebar-tags.example.com/' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/introduction' },
      { text: 'API', link: '/api/users' },
      { text: '示例', link: '/examples/basic' },
      {
        text: '链接',
        items: [
          { text: 'GitHub', link: 'https://github.com/AlienHub/vitepress-plugin-sidebar-tags' },
          { text: 'NPM', link: 'https://www.npmjs.com/package/vitepress-plugin-sidebar-tags' }
        ]
      }
    ],

    // 使用插件处理的侧边栏
    sidebar: withSidebarTags(sidebar, [
      // HTTP 方法标签
      createHttpMethodsTag({
        rounded: 'sm',
        size: 'xs'
      }),
      
      // 版本标签
      createVersionTag({
        rounded: 'md',
        size: 'xs',
        color: 'blue'
      }),
      
      // 状态标签
      createStatusTag({
        rounded: 'lg',
        size: 'xs'
      }),
      
      // 更新标签
      createUpdateTag({
        rounded: 'full',
        size: 'xs'
      }),
      
      // 自定义分类标签
      {
        field: 'category',
        position: 'before',
        size: 'xs',
        variant: 'outline',
        color: 'purple',
        rounded: 'xl',
        prefix: '[',
        suffix: ']',
        transform: (value) => value.toUpperCase(),
        valueStyles: {
          'core': { color: 'success' },
          'premium': { color: 'warning' },
          'beta': { color: 'info' }
        }
      }
    ], {
      docsPath: 'docs',
      debug: true
    }) as any,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AlienHub/vitepress-plugin-sidebar-tags' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 VitePress Sidebar Tags Plugin'
    },

    editLink: {
      pattern: 'https://github.com/AlienHub/vitepress-plugin-sidebar-tags/edit/main/example/docs/:path'
    }
  },

  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  }
})

import { defineConfig } from 'vitepress'
import { createSidebarTags,createHttpMethodsTag } from '../../../dist/index.js'

// 定义原始的侧边栏数据
const originalSidebar = {
  '/zh/': [
    {
      text: 'API 文档',
      items: [
        { text: '用户管理', link: '/zh/api/users' },
        { text: '创建用户', link: '/zh/api/create-user' },
        { text: '更新用户', link: '/zh/api/update-user' },
        { text: '删除用户', link: '/zh/api/delete-user' }
      ]
    }
  ],
  '/en/': [
    {
      text: 'API Documentation',
      items: [
        { text: 'User Management', link: '/en/api/users' },
        { text: 'Create User', link: '/en/api/create-user' },
        { text: 'Update User', link: '/en/api/update-user' },
        { text: 'Delete User', link: '/en/api/delete-user' }
      ]
    }
  ]
}

// 方式1：完全不使用标签插件（可选）
// const sidebar = originalSidebar

// 方式2：使用插件但不配置标签（插件会直接透传原始数据）
// const zhSidebarTags = createSidebarTags({
//   sidebar: originalSidebar['/zh/'],
//   docsPath: '.',
//   debug: true
// })

// 方式3：使用简单标签配置（推荐）
const zhSidebarTags = createSidebarTags({
  tags: [
    // HTTP 方法标签
    createHttpMethodsTag(),
  ],
  sidebar: originalSidebar['/zh/'],
  docsPath: '.',
  debug: true
})

const enSidebarTags = createSidebarTags({
  tags: [
    // 状态标签
    createHttpMethodsTag(),
  ],
  sidebar: originalSidebar['/en/'],
  docsPath: '.',
  debug: true
})

// 生成处理后的侧边栏
const processedSidebar = {
  '/zh/': zhSidebarTags.generateSidebarSync('zh'),
  '/en/': enSidebarTags.generateSidebarSync('en')
}

export default defineConfig({
  title: 'VitePress Sidebar Tags Plugin',
  description: '演示通用侧边栏标签插件的强大功能',
  
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: {
        sidebar: {
          '/zh/': processedSidebar['/zh/']
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        sidebar: {
          '/en/': processedSidebar['/en/']
        }
      }
    }
  },
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'API 文档', link: '/zh/api/users' },
      { text: 'English', link: '/en/api/' }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/vitepress-plugin-sidebar-tags' }
    ]
  }
}) 
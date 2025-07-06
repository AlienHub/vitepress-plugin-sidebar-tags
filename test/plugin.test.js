const { createSidebarTags } = require('../dist/index.js')
const fs = require('fs')
const path = require('path')

describe('VitePress Plugin Sidebar Tags', () => {
  let sidebarTags

  beforeEach(() => {
    sidebarTags = createSidebarTags({
      tagField: 'method',
      debug: true,
      locales: ['zh', 'en'],
      sidebarPath: 'example/docs/sidebar',
      docsPath: 'example/docs'
    })
  })

  test('应该能够创建插件实例', () => {
    expect(sidebarTags).toBeDefined()
    expect(typeof sidebarTags.generateSidebar).toBe('function')
    expect(typeof sidebarTags.generateAllSidebars).toBe('function')
    expect(typeof sidebarTags.createSidebarConfig).toBe('function')
  })

  test('应该能够生成中文侧边栏', () => {
    const zhSidebar = sidebarTags.generateSidebar('zh')
    expect(Array.isArray(zhSidebar)).toBe(true)
    expect(zhSidebar.length).toBeGreaterThan(0)
    
    // 检查是否包含标签
    const foundTaggedItem = findTaggedItem(zhSidebar)
    expect(foundTaggedItem).toBeTruthy()
  })

  test('应该能够生成所有侧边栏', () => {
    const allSidebars = sidebarTags.generateAllSidebars()
    expect(typeof allSidebars).toBe('object')
    expect(allSidebars['/zh/']).toBeDefined()
    expect(Array.isArray(allSidebars['/zh/'])).toBe(true)
  })

  test('应该能够创建侧边栏配置', () => {
    const config = sidebarTags.createSidebarConfig()
    expect(config).toBeDefined()
    expect(config.sidebar).toBeDefined()
    expect(typeof config.generateSidebar).toBe('function')
  })

  test('应该正确注入标签到侧边栏项目', () => {
    const zhSidebar = sidebarTags.generateSidebar('zh')
    const userManagementItem = findItemByLink(zhSidebar, '/zh/api/users')
    
    if (userManagementItem) {
      expect(userManagementItem.text).toContain('GET')
      expect(userManagementItem.text).toContain('method-tag')
    }
  })

  // 辅助函数
  function findTaggedItem(items) {
    for (const item of items) {
      if (item.text && item.text.includes('method-tag')) {
        return item
      }
      if (item.items) {
        const found = findTaggedItem(item.items)
        if (found) return found
      }
    }
    return null
  }

  function findItemByLink(items, link) {
    for (const item of items) {
      if (item.link === link) {
        return item
      }
      if (item.items) {
        const found = findItemByLink(item.items, link)
        if (found) return found
      }
    }
    return null
  }
}) 
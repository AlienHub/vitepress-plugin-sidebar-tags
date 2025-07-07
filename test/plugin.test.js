const { createSidebarTags, withSidebarTags, generateSidebar, createHttpMethodsTag } = require('../dist/index.js')
const fs = require('fs')
const path = require('path')

describe('VitePress Plugin Sidebar Tags', () => {
  let sidebarTags
  let testTags

  beforeEach(() => {
    testTags = [createHttpMethodsTag()]
    
    // 创建核心实例用于高级测试
    sidebarTags = createSidebarTags({
      tags: testTags,
      docsPath: 'example/docs',
      debug: true
    })
  })

  test('应该能够创建插件实例', () => {
    expect(sidebarTags).toBeDefined()
    expect(typeof sidebarTags.generateSidebarSync).toBe('function')
  })

  test('应该能够使用 withSidebarTags 处理侧边栏', () => {
    const mockSidebar = [
      {
        text: 'API',
        items: [
          { text: 'Users', link: '/api/users' }
        ]
      }
    ]
    
    const result = withSidebarTags(mockSidebar, testTags, {
      docsPath: 'example/docs',
      debug: true
    })
    
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  test('应该能够使用 generateSidebar 生成侧边栏', () => {
    const result = generateSidebar(testTags, {
      docsPath: 'example/docs',
      debug: true
    })
    
    expect(Array.isArray(result)).toBe(true)
    // 即使没有找到文件，也应该返回空数组
  })

  test('应该能够创建 HTTP 方法标签', () => {
    const httpTag = createHttpMethodsTag()
    expect(httpTag).toBeDefined()
    expect(httpTag.field).toBe('method')
    expect(httpTag.position).toBe('after')
    expect(httpTag.size).toBe('xs')
  })

  test('应该正确处理空侧边栏', () => {
    const result = withSidebarTags([], testTags, {
      docsPath: 'example/docs',
      debug: true
    })
    
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(0)
  })
}) 
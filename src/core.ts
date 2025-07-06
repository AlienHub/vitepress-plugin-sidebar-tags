import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { 
  SidebarTagsOptions, 
  SidebarItem, 
  FrontmatterData, 
  TagConfig,
  TagPosition,
  CustomTagStyle,
  SidebarSource
} from './types'

export class SidebarTagsCore {
  private options: SidebarTagsOptions
  private tagConfigs: TagConfig[]
  
  constructor(options: SidebarTagsOptions) {
    this.options = options
    this.tagConfigs = options.tags || []
    
    // 设置默认值
    this.options.docsPath = this.options.docsPath || 'docs'
    this.options.sidebarPath = this.options.sidebarPath || 'sidebar'
    this.options.injectInProduction = this.options.injectInProduction ?? false
    this.options.debug = this.options.debug ?? false
    this.options.locales = this.options.locales || ['zh', 'en']
  }
  
  /**
   * 获取文件的 frontmatter 数据
   */
  private getFrontmatter(filePath: string): FrontmatterData {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(content)
        return data
      }
    } catch (error) {
      if (this.options.debug) {
        console.warn(`Warning: Could not read frontmatter from ${filePath}`, error)
      }
    }
    return {}
  }
  
  /**
   * 生成单个标签HTML
   */
  private generateTag(config: TagConfig, value: string): string {
    // 检查是否应该显示此标签
    if (typeof config.show === 'function' && !config.show(value)) return ''
    
    // 应用值转换
    let displayValue = value
    if (config.transform) {
      displayValue = config.transform(value)
    }
    
    // 添加前缀和后缀
    if (config.prefix) displayValue = config.prefix + displayValue
    if (config.suffix) displayValue = displayValue + config.suffix
    
    // 获取实际配置（可能被valueStyles覆盖）
    const actualConfig = this.getActualConfig(config, value)
    
    // 生成CSS类名
    const classes = this.generateTagClasses(actualConfig)
    
    // 生成内联样式（如果有自定义样式）
    const inlineStyles = this.generateInlineStyles(actualConfig.customStyle)
    
    const position = actualConfig.position || 'after'
    const positionClass = position === 'before' ? 'before' : 'after'
    
    return ` <span class="sidebar-tag ${classes} ${positionClass}"${inlineStyles}>${displayValue}</span>`
  }
  
  /**
   * 获取实际配置（应用valueStyles覆盖）
   */
  private getActualConfig(config: TagConfig, value: string): TagConfig {
    const valueStyle = config.valueStyles?.[value] || config.valueStyles?.[value.toLowerCase()] || config.valueStyles?.[value.toUpperCase()]
    
    if (valueStyle) {
      return { ...config, ...valueStyle }
    }
    
    return config
  }
  
  /**
   * 生成标签CSS类名
   */
  private generateTagClasses(config: TagConfig): string {
    const classes: string[] = []
    
    // 添加大小类
    if (config.size) {
      classes.push(config.size)
    }
    
    // 添加变体类
    if (config.variant) {
      classes.push(config.variant)
    }
    
    // 添加颜色类或自定义类
    if (config.customStyle) {
      classes.push('custom')
    } else if (config.color) {
      classes.push(config.color)
    }
    
    return classes.join(' ')
  }
  
  /**
   * 生成内联样式
   */
  private generateInlineStyles(customStyle?: CustomTagStyle): string {
    if (!customStyle) return ''
    
    const styles: string[] = []
    
    if (customStyle.backgroundColor) {
      styles.push(`--sidebar-tag-bg: ${customStyle.backgroundColor}`)
    }
    if (customStyle.color) {
      styles.push(`--sidebar-tag-color: ${customStyle.color}`)
    }
    if (customStyle.borderColor) {
      styles.push(`--sidebar-tag-border: ${customStyle.borderColor}`)
    }
    if (customStyle.darkBackgroundColor) {
      styles.push(`--sidebar-tag-dark-bg: ${customStyle.darkBackgroundColor}`)
    }
    if (customStyle.darkColor) {
      styles.push(`--sidebar-tag-dark-color: ${customStyle.darkColor}`)
    }
    if (customStyle.darkBorderColor) {
      styles.push(`--sidebar-tag-dark-border: ${customStyle.darkBorderColor}`)
    }
    
    return styles.length > 0 ? ` style="${styles.join('; ')}"` : ''
  }
  
  /**
   * 生成标签 HTML
   */
  private generateTags(frontmatter: FrontmatterData): { beforeTags: string; afterTags: string } {
    if (!frontmatter || this.tagConfigs.length === 0) {
      return { beforeTags: '', afterTags: '' }
    }
    
    // 为每个标签配置生成标签，并收集结果
    const tags: Array<{ html: string; priority: number; position: TagPosition }> = []
    
    for (const config of this.tagConfigs) {
      const value = frontmatter[config.field]
      
      if (value !== undefined && value !== null && value !== '') {
        // 检查条件显示
        if (config.show && typeof config.show === 'function' && !config.show(String(value))) {
          continue
        }
        
        // 转换值
        const displayValue = config.transform ? config.transform(String(value)) : String(value)
        
        // 生成标签HTML
        const tagHtml = this.generateTag(config, displayValue)
        
        tags.push({
          html: tagHtml,
          priority: config.priority || 0,
          position: config.position || 'after'
        })
      }
    }
    
    // 按优先级排序（数值越小优先级越高）
    tags.sort((a, b) => a.priority - b.priority)
    
    // 分离前置和后置标签
    const beforeTags = tags.filter(tag => tag.position === 'before').map(tag => tag.html).join('')
    const afterTags = tags.filter(tag => tag.position === 'after').map(tag => tag.html).join('')
    
    return { beforeTags, afterTags }
  }
  
  /**
   * 注入标签到侧边栏项目
   */
  private injectTags(items: SidebarItem[], basePath = '', locale = 'zh'): SidebarItem[] {
    return items.map(item => {
      const newItem = { ...item }
      
      // 处理有 link 的项目
      if (newItem.link && !newItem.link.startsWith('http')) {
        // 构建完整的文件路径
        let fullPath = newItem.link
        if (newItem.base) {
          fullPath = newItem.base + newItem.link
        } else if (basePath) {
          fullPath = basePath + newItem.link
        }
        
        // 确保路径以 /locale/ 开头
        if (!fullPath.startsWith(`/${locale}/`)) {
          fullPath = `/${locale}${fullPath.startsWith('/') ? '' : '/'}${fullPath}`
        }
        
        // 构建实际的文件系统路径
        const docsPath = path.join(process.cwd(), this.options.docsPath || 'docs')
        const markdownPath = path.join(docsPath, `${fullPath}.md`)
        
        // 获取 frontmatter
        const frontmatter = this.getFrontmatter(markdownPath)
        
        // 生成标签
        const { beforeTags, afterTags } = this.generateTags(frontmatter)
        
        // 注入标签到文本中
        if (newItem.text) {
          newItem.text = beforeTags + newItem.text + afterTags
          
          if (this.options.debug && (beforeTags || afterTags)) {
            console.log(`Injected tags for ${fullPath}: before="${beforeTags}", after="${afterTags}"`)
          }
        }
      }
      
      // 递归处理子项目
      if (newItem.items) {
        const currentBase = newItem.base || basePath
        newItem.items = this.injectTags(newItem.items, currentBase, locale)
      }
      
      return newItem
    })
  }
  
  /**
   * 根据不同的输入源获取侧边栏数据
   */
  private async getSidebarData(source: SidebarSource, locale: string): Promise<SidebarItem[]> {
    if (Array.isArray(source)) {
      // 直接传入的侧边栏数据
      return source
    } 
    
    if (typeof source === 'string') {
      // 文件路径
      return this.loadSidebarFromFile(source, locale)
    }
    
    if (typeof source === 'function') {
      // 函数返回
      const result = source()
      return Promise.resolve(result)
    }
    
    return []
  }

  /**
   * 从文件加载侧边栏配置
   */
  private loadSidebarFromFile(basePath: string, locale: string): SidebarItem[] {
    try {
      const docsPath = this.options.docsPath || 'docs'
      const sidebarPath = path.join(process.cwd(), docsPath, basePath, `${locale}.json`)
      
      if (!fs.existsSync(sidebarPath)) {
        if (this.options.debug) {
          console.warn(`Warning: Sidebar file not found: ${sidebarPath}`)
        }
        return []
      }
      
      return JSON.parse(fs.readFileSync(sidebarPath, 'utf-8'))
    } catch (error) {
      if (this.options.debug) {
        console.error(`Error reading sidebar file:`, error)
      }
      return []
    }
  }

  /**
   * 从VitePress配置中获取侧边栏
   */
  private getSidebarFromConfig(locale: string): SidebarItem[] {
    if (!this.options.vitepressConfig?.themeConfig?.sidebar) {
      return []
    }
    
    const sidebarConfig = this.options.vitepressConfig.themeConfig.sidebar
    
    // 处理多语言配置
    if (typeof sidebarConfig === 'object' && !Array.isArray(sidebarConfig)) {
      // 尝试匹配语言路径
      const localeKeys = Object.keys(sidebarConfig)
      const matchingKey = localeKeys.find(key => 
        key.includes(`/${locale}/`) || 
        key.includes(`${locale}/`) ||
        key === locale
      )
      
      if (matchingKey && sidebarConfig[matchingKey]) {
        return sidebarConfig[matchingKey]
      }
      
      // 如果没找到匹配的语言，返回第一个
      const firstKey = localeKeys[0]
      if (firstKey && sidebarConfig[firstKey]) {
        return sidebarConfig[firstKey]
      }
    }
    
    // 如果是数组形式，直接返回
    if (Array.isArray(sidebarConfig)) {
      return sidebarConfig
    }
    
    return []
  }

  /**
   * 生成侧边栏（新的统一接口）
   */
  async generateSidebar(locale = 'zh'): Promise<SidebarItem[]> {
    try {
      let originalSidebar: SidebarItem[] = []
      
      // 按优先级获取侧边栏数据
      if (this.options.sidebar) {
        // 1. 优先使用用户指定的sidebar源
        originalSidebar = await this.getSidebarData(this.options.sidebar, locale)
      } else if (this.options.vitepressConfig) {
        // 2. 尝试从VitePress配置获取
        originalSidebar = this.getSidebarFromConfig(locale)
      } else if (this.options.sidebarPath) {
        // 3. 回退到文件方式（向后兼容）
        originalSidebar = this.loadSidebarFromFile(this.options.sidebarPath, locale)
      }
      
      if (originalSidebar.length === 0) {
        if (this.options.debug) {
          console.warn(`No sidebar data found for locale: ${locale}`)
        }
        return []
      }
      
      // 如果没有标签配置，直接返回原始数据
      if (!this.tagConfigs || this.tagConfigs.length === 0) {
        if (this.options.debug) {
          console.log(`No tag configs found for ${locale}, returning original sidebar`)
        }
        return originalSidebar
      }
      
      // 根据配置决定是否注入标签
      const shouldInject = this.options.injectInProduction || process.env.NODE_ENV !== 'production'
      
      if (shouldInject) {
        const result = this.injectTags(originalSidebar, '', locale)
        if (this.options.debug) {
          console.log(`Generated sidebar for ${locale} with ${result.length} items and ${this.tagConfigs.length} tag configs`)
        }
        return result
      }
      
      // 不注入标签，返回原始配置
      return originalSidebar
    } catch (error) {
      console.error(`Error generating sidebar for ${locale}:`, error)
      return []
    }
  }

  /**
   * 同步生成侧边栏（兼容接口）
   */
  generateSidebarSync(locale = 'zh'): SidebarItem[] {
    // 如果使用了异步数据源，抛出错误
    if (this.options.sidebar && typeof this.options.sidebar === 'function') {
      const result = this.options.sidebar()
      if (result && typeof (result as any).then === 'function') {
        throw new Error('Cannot use async sidebar source with generateSidebarSync. Please use generateSidebar instead.')
      }
      return result as SidebarItem[]
    }
    
    // 对于同步数据源，直接处理
    try {
      let originalSidebar: SidebarItem[] = []
      
      if (this.options.sidebar) {
        if (Array.isArray(this.options.sidebar)) {
          originalSidebar = this.options.sidebar
        } else if (typeof this.options.sidebar === 'string') {
          originalSidebar = this.loadSidebarFromFile(this.options.sidebar, locale)
        }
      } else if (this.options.vitepressConfig) {
        originalSidebar = this.getSidebarFromConfig(locale)
      } else if (this.options.sidebarPath) {
        originalSidebar = this.loadSidebarFromFile(this.options.sidebarPath, locale)
      }
      
      // 如果没有标签配置，直接返回原始数据
      if (!this.tagConfigs || this.tagConfigs.length === 0) {
        if (this.options.debug) {
          console.log(`No tag configs found for ${locale}, returning original sidebar`)
        }
        return originalSidebar
      }
      
      const shouldInject = this.options.injectInProduction || process.env.NODE_ENV !== 'production'
      
      if (shouldInject) {
        return this.injectTags(originalSidebar, '', locale)
      }
      
      return originalSidebar
    } catch (error) {
      console.error(`Error generating sidebar for ${locale}:`, error)
      return []
    }
  }
} 
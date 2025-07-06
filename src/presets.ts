import type { TagConfig, TagPresets } from './types'

/**
 * 预设标签配置
 */
export const tagPresets: TagPresets = {
  /**
   * HTTP 方法标签预设
   */
  httpMethods: {
    field: 'method',
    position: 'after',
    size: 'xs',
    variant: 'solid',
    color: 'primary',
    rounded: 'sm',
    transform: (value) => value.toUpperCase(),
    valueStyles: {
      'GET': { color: 'success' },
      'POST': { color: 'info' },
      'PUT': { color: 'warning' },
      'DELETE': { color: 'error' },
      'PATCH': { color: 'purple' },
      'HEAD': { color: 'gray' },
      'OPTIONS': { color: 'gray' }
    }
  },

  /**
   * 版本标签预设
   */
  version: {
    field: 'version',
    position: 'after',
    size: 'xs',
    variant: 'outline',
    color: 'blue',
    rounded: 'md',
    prefix: 'v',
    transform: (value) => value.replace(/^v?/, ''),
    show: (value) => Boolean(value)
  },

  /**
   * 状态标签预设
   */
  status: {
    field: 'status',
    position: 'after',
    size: 'xs',
    variant: 'soft',
    color: 'gray',
    rounded: 'lg',
    valueStyles: {
      'new': { color: 'green' },
      'updated': { color: 'blue' },
      'deprecated': { color: 'orange' },
      'removed': { color: 'red' },
      'experimental': { color: 'purple' },
      'stable': { color: 'success' },
      'beta': { color: 'warning' },
      'alpha': { color: 'error' }
    },
    transform: (value) => value.toUpperCase()
  },

  /**
   * 更新标签预设
   */
  update: {
    field: 'update',
    position: 'before',
    size: 'xs',
    variant: 'solid',
    color: 'success',
    rounded: 'full',
    valueStyles: {
      'new': { color: 'success' },
      'updated': { color: 'info' },
      'hot': { color: 'error' }
    },
    transform: (value) => value.toUpperCase(),
    show: (value) => ['new', 'updated', 'hot'].includes(value.toLowerCase())
  }
}

/**
 * 快速配置函数
 */
export function createHttpMethodsTag(overrides?: Partial<TagConfig>): TagConfig {
  return { ...tagPresets.httpMethods, ...overrides }
}

export function createVersionTag(overrides?: Partial<TagConfig>): TagConfig {
  return { ...tagPresets.version, ...overrides }
}

export function createStatusTag(overrides?: Partial<TagConfig>): TagConfig {
  return { ...tagPresets.status, ...overrides }
}

export function createUpdateTag(overrides?: Partial<TagConfig>): TagConfig {
  return { ...tagPresets.update, ...overrides }
} 
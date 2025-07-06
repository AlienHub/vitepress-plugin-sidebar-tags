import { TagConfig, TagPresets } from './types';

/**
 * 预设标签配置
 */
export declare const tagPresets: TagPresets;
/**
 * 快速配置函数
 */
export declare function createHttpMethodsTag(overrides?: Partial<TagConfig>): TagConfig;
export declare function createVersionTag(overrides?: Partial<TagConfig>): TagConfig;
export declare function createStatusTag(overrides?: Partial<TagConfig>): TagConfig;
export declare function createUpdateTag(overrides?: Partial<TagConfig>): TagConfig;
//# sourceMappingURL=presets.d.ts.map
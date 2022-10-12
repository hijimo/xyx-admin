import type { PaginationParams, SSDBase } from './common';

export interface DictSSD extends SSDBase {
  /**
   * 字典名称
   */
  dictName: string;
  /**
   * 标签类型
   */
  dictType: number;
  /**
   * 主键id
   */
  dictId?: number;
}
export interface DictItemSSD extends SSDBase, DictAddParams {
  /**
   * code
   */
  dictCode: number;
  /**
   * 是否禁用 0=正常,1=停用
   */
  status: string;
}

export interface DictAddParams {
  /**
   * 字典项名称
   */
  dictLabel: string;
  /**
   * 排序
   */
  dictSort?: number;
  /**
   * 类型
   */
  dictType: string;
  /**
   * 字典项值
   */
  dictValue: string;
  /**
   * 备注
   */
  remark?: string;
}
export interface DictListParams extends PaginationParams {
  dictName?: string;
  dictType?: string;
}

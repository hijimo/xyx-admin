import type { PaginationParams } from './common';
import type { File } from '@/types';

export interface ComboListParams extends PaginationParams {
  /**
   * 套餐名
   */
  comboName?: string;
  /**
   * 套餐编号
   */
  comboNo?: string;
}

export interface ComboCpEditData {
  /**
   * 线路编号
   */
  cpCode: '';
  /**
   * 费用项
   */
  expenseItem: 0;
  /**
   * 价格等级
   */
  priceLevel: number;
}
export interface ComboPostData {
  /**
   * 线路费用项列表
   */
  comboCpEditVoList: ComboCpEditData[];
  /**
   * 套餐名称
   */
  comboName: '';
  /**
   * 套餐图
   */
  comboPic: File;
  /**
   * 线路编号列表
   */
  cpCodeList: string[];
  id?: number;
}

interface ComboCpDetailBase {
  /**
   * 线路编号
   */
  cpCode: string;
  /**
   * 线路名称
   */
  cpName: string;
  /**
   * 费用项id
   */
  expenseItem: number;
  /**
   * 费用项名称
   */
  expenseItemName: string;
  id: number;
}
export interface ComboCpDetailSSD extends ComboCpDetailBase {
  /**
   * 价格等级
   */
  priceLevel: number;
  /**
   * 价格等级名称
   */
  priceLevelName: string;
}
interface PriceLevelListItemData {
  id: number;
  paramVal: string;
}
export interface ComboCpPostData extends ComboCpDetailBase {
  /**
   * 价格等级列表
   */
  priceLevelList: PriceLevelListItemData[];
}
export interface ComboDetailSSD {
  /**
   * 线路套餐价格等级列表
   */
  comboCpDetails: ComboCpDetailSSD[];
  /**
   * 线路套餐名称
   */
  comboName: string;
  /**
   * 线路套餐报价图
   */
  comboPic: File;
  /**
   * 线路编号列表
   */
  cpCodeList: string[];
  id: number;
}

export interface ComboItemSSD {
  /**
   * 线路套餐名称
   */
  comboName: string;
  /**
   * 线路套餐编号
   */
  comboNo: string;
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 更新时间
   */
  gmtModified: string;
  id: number;
}

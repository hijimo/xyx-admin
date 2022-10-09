import type { PaginationParams } from './common';

export interface FreightListItemSSD {
  billingDimension: number;
  billingDimensionText: string;
  billingNode: number;
  billingNodeText: string;
  castRatio: number;
  expenseItem: number;
  expenseCode: string;
  expenseItemName: string;
  productId: number;
  productType: number;
  settleCurrency: number;
  settleCurrencyText: string;
  valueType: number;
  valueTypeText: number;
  weightRatio: number;
  weightType: number;
  weightTypeText: number;
  weightTypeValue: number;
  id?: number;
}

export interface FreightDetailSSD extends FreightListItemSSD {}

export interface BillingOfferWeightSSD {
  castRatio: number;
  weightType: number;
  weightTypeText: string;
  weightTypeValue: number;
}

export interface AddFreightParams {
  billingDimension: number;
  billingNode: number;
  castRatio: number;
  expenseItem: number;
  productId: number;
  productType: number;
  settleCurrency: number;
  valueType: number;
  weightRatio: number;
  weightType: number;
  weightTypeValue: number;
  billingOfferWeight: BillingOfferWeightSSD;
}
export interface AddMiscellaneousFeesParams {
  /**
   * 计费节点
   */
  billingNode: number;
  /**
   * 费用项ID
   */
  expenseItem: number;
  /**
   * 杂项报价id
   */
  id: number;
  /**
   * 服务渠道id/线路产品id
   */
  productId: number;
}

export interface MiscellaneousFeesByProductIdParams extends PaginationParams {
  id: number | string;
}
export interface MiscellaneousFeesSSD {
  /**
   * 计费节点
   */
  billingNode: number;
  /**
   * 费用项ID
   */
  expenseItem: number;
  /**
   * 费用项名
   */
  expenseItemName: string;
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 主键id
   */
  id: number;
  /**
   * 杂项报价编号
   */
  offerNo: string;
  /**
   * 服务渠道id
   */
  productId: number;
  /**
   * 产品类型
   */
  productType: number;
}

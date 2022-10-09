import type { Moment } from 'moment';
import type { BooleanEnum, ChannelProductType, UnitType, ProjectType } from '@/enum';
import type { OptionItemSSD, SettingTypeSSD, PaginationParams } from './common';

export interface QuoteInvalidDateParams {
  /**
   * 生效时间
   */
  gmtValid: string;
  /**
   * 费用项ID
   */
  offerId: number;
  /**
   * 	价格等级(1普通 2VIP)
   */
  priceLevel?: number;
  /**
   * 服务渠道id/线路产品id
   */
  productId: number;
  /**
   * 产品类型（1服务渠道 2线路产品）
   */
  productType?: ChannelProductType;
  /**
   * 是否添加
   */
  isAdded?: BooleanEnum;
}

export interface OtherInvalidDateParams {
  /**
   * 生效时间
   */
  gmtValid: string;
  /**
   * 杂费费用项ID
   */
  id: number;
  /**
   * 报价id
   */
  otherId: number | string;
}

export interface ChannelOfferDetailListParams {
  /**
   * 费用项Id
   */
  expenseItem: number | string;
  /**
   * 创建结束时间
   */
  gmtCreateEnd?: string;
  /**
   * 创建开始时间
   */
  gmtCreateStart?: string;
  /**
   * 有效开始时间
   */
  gmtValid?: string;
  /**
   * 价格等级
   */
  priceLevel?: number;
  /**
   * 产品id
   */
  productId?: number | string;
  /**
   * 产品类型（1服务商 2客户）	query	false
   */
  productType?: number;
}

export interface ChannelOfferDetailListItemSSD {
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 失效时间
   */
  gmtUnvalid: string;
  /**
   * 生效时间
   */
  gmtValid: string;

  id: number;
  /**
   * 报价编号
   */
  offerNo: string;

  /**
   * 价格等级
   */
  priceLevel: number;
  /**
   * 价格等级名称
   */
  priceLevelName: string;
  /**
   * 是否生效
   */
  validFlag: BooleanEnum;
  /**
   * 是否启用
   */
  offerValidFlag: BooleanEnum;
}

export interface PartitionCountryData {
  /**
   * 本地生成的 rowKey 用于标示table 唯一值
   */
  rowKey: number;
  /**
   * 新增时是时间戳，编辑时是服务器返回的id, 做为table的 rowKey
   */
  id: number;
  /**
   * 国家Id
   */
  countryId: number;
  /**
   * 国家名称
   */
  countryName: string;
  /**
   * 国家编码
   */
  countryCode: string;
  /**
   * 分区方案类型
   */
  projectType: ProjectType;
  /**
   * 分区方案类型
   */
  projectTypeText: string;
  /**
   * 城市/邮编
   */
  projectVal?: (number | string)[];
  /**
   * 城市/邮编
   */
  projectValText?: string[];
}

export interface PartitionData {
  /**
   * 本地生成的 rowKey 用于标示table 唯一值
   */
  rowKey: number;
  /**
   * 分区id
   */
  id: number;
  /**
   * 前端生成的唯一id
   */
  partitionCode: string;
  /**
   * 分区名称
   */
  partitionName: string;
  /**
   * 分区地区/国家列表
   */
  countryList: PartitionCountryData[];

  partitionId?: number;
}

export interface PricePriedData {
  /**
   * 区间单位
   */
  priedUnit: number;
  /**
   * 区间单位文案
   */
  priedUnitText?: string;
  /**
   * 区间开始值
   */
  priedStartVal?: number;
  /**
   * 区间结束值
   */
  priedEndVal: number;
}

export interface FirstContinueData {
  /**
   * 首重单位
   */
  firstUnit: number;
  /**
   * 首重单位
   */
  firstUnitText?: string;
  /**
   * 首重数值
   */
  firstVal: number;
  /**
   * 首重价格
   */
  firstPrice: number;
  /**
   * 续重单位
   */
  continueUnit: number;
  /**
   * 续重单位
   */
  continueUnitText?: string;
  /**
   * 续重数值
   */
  continueVal: number;
  /**
   * 续重价格
   */
  continuePrice: number;
}
export interface PartitionAreaData extends PricePriedData {
  /**
   * 首重续重配置
   */
  partitionFirstContinueInfo: FirstContinueData;
}

export interface PartitionInfoData {
  /**
   * 分区id,弃用，这个一定为null = - =.
   */
  partitionId?: null;
  /**
   * 前端生成的唯一id
   */
  partitionCode: string;
  /**
   * 分区名称
   */
  partitionName: string;
  /**
   * 分区报价设置
   */
  partitionAreaList: PartitionAreaData[];
}

export interface QuoteResponseData {
  // 是否新增
  isAdded?: BooleanEnum;
  /**
   * 是否所有区域一口价
   */
  defaultPriceFlag: BooleanEnum;
  /**
   * 失效时间
   */
  gmtUnvalid: null | string | Moment;
  /**
   * 生效时间
   */
  gmtValid: null | string | Moment;
  /**
   * 计费单位 1重量 2包裹件数 3提单
   */
  offerType: UnitType;
  /**
   * 费用项id
   */
  offerId: number;
  /**
   * 价格等级
   */
  priceLevel: number;
  /**
   * 价格等级列表
   */
  priceLevelList?: SettingTypeSSD[];
  /**
   * 产品类型（1服务渠道 2线路产品）
   */
  productType?: ChannelProductType;
  /**
   * 服务渠道id/线路产品id
   */
  productId: number;
  /**
   * 分区方案名称
   */
  projectName: string;
  /**
   * 分区列表
   */
  partitionList: PartitionData[];
  /**
   * 价格区间
   */
  pricePriedList: PricePriedData[];
  /**
   * 报价设置表格
   */
  partitionInfoList: PartitionInfoData[];
  /**
   * 币种
   */
  settleCurrency: number;
  /**
   * 币种
   */
  settleCurrencyText?: string;
  /**
   * 报价编号
   */
  offerNo?: string;
}

/**
 * 客户端新增/编辑分区时的接口，因为要同时上传id/name所以需要labelInValue
 */
export interface PartitionEditTableData {
  /**
   * 新增时是时间戳，编辑时是服务器返回的id, 做为table的 rowKey
   */
  id: number;
  rowKey: number;
  countryId: OptionItemSSD;
  countryCode: string;
  projectType: OptionItemSSD;
  projectVal?: OptionItemSSD[] | string[] | string;
}

/**
 * 客户端新增/编辑分区时的接口
 */
export interface PartitionEditData {
  /**
   * 分区id
   */
  id: number;
  /**
   * 前端生成的唯一id
   */
  partitionCode: string;
  /**
   * 分区名称
   */
  partitionName: string;
  /**
   * 分区地区/国家列表
   */
  countryList: PartitionEditTableData[];
}

/**
 * 客户端新增/编辑 报价设置
 */
export interface QuoteEditData extends QuoteResponseData {
  partitionUnitList?: UnitValueData[];
  partitionValueList?: ValValueData[];
}

export interface UnitValueData {
  firstUnit: number;
  continueUnit: number;
}

export interface ValValueData {
  firstVal: number;
  continueVal: number;
}

export interface AddMiscellaneousFeesQuoteParams {
  /**
   * 报价公式
   */
  expression: string;
  /**
   * 公式中使用到的变量列表
   */
  variables: string[];
  /**
   * 报价公式-显示内容
   */
  expressionText: string;
  /**
   * 	生效时间
   */
  gmtValid: string;
  /**
   * 失效时间
   */
  gmtUnvalid: string;
  /**
   * 杂项报价明细的ID
   */
  id?: number;
  /**
   * 杂项报价id
   */
  otherId: number | string;
}

export interface MiscellaneousFeesQuotesParams extends PaginationParams {
  id: number | string;
  gmtCreate?: string;
}

export interface MiscellaneousFeesQuoteSSD {
  /**
   * 报价公式-显示内容
   */
  expressionText: string;
  expression: string;
  variables: string[];
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 失效时间
   */
  gmtUnvalid: string;
  /**
   * 生效时间
   */
  gmtValid: string;
  /**
   * 主键id
   */
  id: number;
  /**
   * 报价明细编号
   */
  itemNo: string;
  /**
   * 杂费报价id
   */
  otherId: number | string;
  /**
   * 是否生效
   */
  validFlag: BooleanEnum;
  /**
   * 是否启用
   */
  offerValidFlag: BooleanEnum;
}

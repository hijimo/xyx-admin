import type { PaginationParams } from './common';
import type { FreightListItemSSD } from './freight';
export interface RouteProductListParams extends PaginationParams {
  cpCode?: string;
  cpName?: string;
  keyword?: string;
  logisticsMode?: number;
  whNo?: string;
  state?: number;
  id?: number;
  comboId?: number;
  cpType?: number;
}

export interface RouteProductListItemSSD {
  cpCode: string;
  cpName: string;
  cpType: number;
  id: number;
  logisticsMode: number;
  productName: string;
  state: number;
  sensitiveFlag: number;
  deliveryCode: string;
  lineNo: string;
}

export interface BaseDtoSSD {
  id?: number;
  ccIdList: number[] | string;
  cpCode: string;
  cpName: string;
  cpType: number;
  cpTypeText: string;
  whServiceText: string;
  ccServiceText: string;
  tlServiceText: string;
  lcServiceText: string;
  lcIdList: number[] | string;
  logisticsMode: number;
  logisticsModeText: number;
  tlIdList: number[] | string;
  whIdList: number[] | string;
  cpShortName: string;
  sectionFlag: number;
  sectionFlagText: string;
}
export interface AddBaseParams {
  vo: BaseDtoSSD;
}

export interface RuleDtoSSD {
  id: number;
  categoryName: string;
  cpId?: number;
  fullLink: string;
  mailLimitGoods: string;
  productBacklist: string;
  tariffCurrency: number | null;
  tariffCurrencyText: number;
  tariffPoint: string;
  trilteralNum: number;
  unilateralLong: number;
  weightDown: number;
  weightUp: number;
}

export interface AreaDtoListSSD {
  caCountryId: number;
  countryCode: string;
  countryName: string;
  projectValText: string;
  id: number;
  projectType: number;
  projectValList: string[] | number[];
  projectTypeText: string;
}

export interface AddRouteProductCoverageParams {
  areaVoList: AreaDtoListSSD[];
  cpId?: number;
}

export interface RouteProductDetailSSD {
  id: number;
  baseDto: BaseDtoSSD;
  ruleDto: RuleDtoSSD;
  areaDtoList: AreaDtoListSSD[];
  billingOffers: FreightListItemSSD[];
}

export interface ProducetTypeSSD {
  name: string;
  id: number;
}

export interface LogisticsTypeSSD {
  name: string;
  id: number;
}

export interface CustomerRouteProductListParams {
  id?: number;
  countryId?: number;
}

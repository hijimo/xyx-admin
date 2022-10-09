import type { PaginationParams, Attachment } from './common';
import type { File } from '@/types';

export interface PackageStatisticsParams {
  waybillNo?: string;
  batchNo?: string;
  whNo?: string;
  abnormalFlag?: number;
  customerName?: string;
  lineNo?: string;
  oldShipNo?: number;
  stateList?: number[];
  gmtCreateBegin?: string;
  gmtCreateEnd?: string;
  whNoList?: string[];
  trackStateList?: number[];
  electFlag?: number;
}

export interface PackageListParams extends PackageStatisticsParams, PaginationParams {}

export interface PackageAbnormalListParams extends PackageListParams {
  gmtHandleBegin?: string;
  gmtHandleEnd?: string;
  outFlag?: number;
}

export interface PackageAbnormalParams {
  id?: number;
  changeFlag?: number;
  lineNo?: string;
  waybillNo?: string;
  remark?: string;
  /**
   * 附加费
   */
  surcharge?: string | number;
  resultType?: number;
}

export interface PackageListItemSSD {
  abnormalFlag: number;
  consigneeName: string;
  contactTel: string;
  customerName: string;
  companyName: string;
  destinationCountry: string;
  forecastHeight: number;
  forecastLength: number;
  forecastVolume: string;
  forecastWeight: number;
  forecastWidth: number;
  fullAddress: string;
  gmtCreate: string;
  id: number;
  cpName: string;
  cpCode: string;
  packageHeight: number;
  packageLength: number;
  packageVolume: string;
  packageWeight: number;
  packageWidth: number;
  postCode: string;
  receiverCity: string;
  receiverDistrict: string;
  receiverProvince: string;
  shengShiQu: string;
  state: number;
  countryId: number;
  uniqueNo: string;
  waybillNo: string;
  returnFlag: number;
  trackStateText: string;
  deliveryCode: string;
  electFlag: number;
  customerId: number;
}

export interface IntPackNodeSSD {
  currentFlag: number;
  nodeName: string;
  time: string;
}

export interface LogisticsTrackSSD {
  happenPlace: string;
  happenTime: string;
  trackNodeText: string;
  trackComment: string;
  remark: null | string;
  trackNode: number;
}

export interface OperatorLogSSD {
  businessNo: string;
  gmtCreate: string;
  id: number;
  operatorName: string;
  operatorNode: string;
  operatorData: string;
}

export interface RemarkInfoSSD {
  remark: string;
  remarkName: string;
  gmtCreate: string;
  id: number;
}

export interface PackageDetailSSD extends PackageListItemSSD {
  abnormalFlag: number;
  abnormalFlagText: string;
  batchNo: string;
  contactTel: string;
  cpCode: string;
  cpType: number;
  customerId: number;
  customerName: string;
  countryName: string;
  flightNo: string;
  forecastHeight: number;
  forecastLength: number;
  forecastVolume: string;
  forecastWeight: number;
  forecastWeightText: string;
  forecastWidth: number;
  gmtCreate: string;
  id: number;
  packagePic: string;
  ladingNo: string;
  oldShipNo: string;
  packageHeight: number;
  packageLength: number;
  packageVolume: string;
  packageWeight: number;
  packageWidth: number;
  state: number;
  stateText: number;
  uniqueNo: string;
  waybillNo: string;
  whNo: string;
  intPackNodeDtos: IntPackNodeSSD[];
  itemDtos: GoodsInfoSSD[];
  operatorLogDtos: OperatorLogSSD[];
  receiverInfoDto: EditReceiverInfoParams;
  trackDtos: LogisticsTrackSSD[];
  remarkDtos: RemarkInfoSSD[];
}

export interface PackageAbnormalListItemSSD extends PackageListItemSSD {
  abnormalType: number;
  abnormalTypeName: string;
  changeFlag: number;
  cpId: number;
  cpName: string;
  gmtHandle: string;
  handleRemark: string;
  oldCpCode: string;
  oldCpName: string;
  oldDeliveryCode: string;
  otherReason: string;
  packageId: number;
  resultType: number;
  statisticsArea: number;
}

export interface PackageAbnormalParams {
  idList: number[];
  lineFlag?: number;
  lineNo?: string;
  waybillNo?: string;
  remark?: string;
  /**
   * 附加费
   */
  surcharge?: string | number;
  resultType?: number;
  file?: File;
}

export interface PackageAbnormalTabListItemSSD {
  count: number;
  name: string;
  value: number;
}

export interface RouteListParams extends PaginationParams {
  keyword?: string;
}

export interface RouteListItemSSD {
  endName: string;
  fullLink: string;
  id: number;
  lineName: string;
  lineNo: string;
  startName: string;
  trilteralNum: number;
  unilateralLong: number;
  weightDown: number;
  weightUp: number;
}
export interface EditParamsDataBase {
  intPackageIds: number[];
}

export interface FastenerParams {
  packIdList: number[];
  abnormalType: number;
  otherReason: string;
  remark: string;
}

export interface AddRemarkParams {
  uniqueNoList: string[];
  remark: string;
}

export interface EditRouteProductParams extends EditParamsDataBase {
  changeFlag: number;
  cpCode: string;
  remark: string;
  twoCode: string;
}

export interface EditGoodsInfoParams extends EditParamsDataBase {
  goodsNameCn: string;
  goodsNameEn: string;
  goodsNum?: number;
  goodsPrice?: number;
  remark: string;
}

export interface GoodsInfoSSD extends EditGoodsInfoParams {
  packagePic: string;
  goodsPic: string;
  goodsCurrency: string;
}

export interface EditReceiverInfoParams extends EditParamsDataBase {
  cityId: number;
  consigneeName: string;
  contactTel: string;
  countryId?: number;
  destinationCountry?: string;
  countryName?: string;
  fullAddress: string;
  postCode: string;
  provinceId: number;
  remark: string;
  shenShiQu?: string;
}

export interface EditCountryParams extends EditParamsDataBase {
  changeFlag: number;
  cpCode: string;
  remark: string;
  twoCode: string;
}

export interface EditOrderNoParams extends EditParamsDataBase {
  oldShipNo: string;
  remark: string;
}

export interface BindCustomerParams {
  customerId: string;
  cpId: string;
  packageIdList: number[];
}

export interface PackageInfoSSD {
  expressNo: string;
  forecastWeight: number;
  id: number;
  packageHeight: string;
  packageLength: string;
  packagePic: string;
  packageWidth: string;
  uniqueNo: string;
  volume: string;
  weight: string;
  stateText?: string;
}

export interface PackageStatisticsSSD {
  forecastWeight: string;
  packageTotalWeight: string;
  totalPiece: string;
  volumeWeight: string;
}

export interface AbnormalPackageRouteProductSSD {
  deliveryCode: string;
  lineName: string;
  lineNo: string;
  sameFlag: number;
  sensitiveFlag: number;
  statisticsArea: number;
  id: number;
}

export interface HandleAbnormalHistoryItemSSD {
  creator: string;
  gmtCreate: string;
  handleFileList: Attachment[];
  remark: string;
  id: number;
  resultType: number;
}

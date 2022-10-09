import type { UnitType } from '@/enum';
import type { PaginationParams } from './common';
export interface BillListParamsBase {
  /**
   * 订单号/包裹号
   */
  bizNo?: string;
  /**
   * 费用项名称
   */
  expenseItemName?: string;
  /**
   * 计费结束时间
   */
  gmtCreateEnd?: string;
  /**
   * 计费开始时间
   */
  gmtCreateStart?: string;
  creditedFlag?: number;
}
export interface CustomerBillListParams extends BillListParamsBase, PaginationParams {
  /**
   * 客户产品编号
   */
  cpCode?: string;
  /**
   * 客户产品名称
   */
  cpName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
}
export interface CompanyBillListParams extends BillListParamsBase, PaginationParams {
  /**
   * 服务商产品编码
   */
  cmpNo?: string;
  /**
   * 服务商名称
   */
  companyName?: string;
  /**
   * 服务产品编码
   */
  spNo?: string;
}
export interface BillListSSDBase {
  /**
   * 报价编号。
   */
  offerNo: string;
  /**
   * 订单号/包裹号
   */
  bizNo: string;
  /**
   * 金额
   */
  amountText: string;
  /**
   * 计费值
   */
  calVal: string;
  /**
   * 计费时间
   */
  gmtCreate: string;
  id: number;
  /**
   * 费用项名称
   */
  expenseItemName: string;
  /**
   * 计费单位 1重量 2包裹件数
   */
  offerType: UnitType;
  offerTypeText?: string;
  /**
   * 结算货币
   */
  settleCurrency: number;
  settleCurrencyText?: string;
  offerVal?: string;
  billingNo?: string;
  creditedFlag?: number;
  billAmount?: string;
  billNo?: string;
  customerName?: string;
  gmtSettleEnd?: string;
  gmtSettleStart?: string;
  settleType?: number;
  gmtInStore?: string;
  oldShipNo?: string;
  offerChanged?: number;
}
export interface CustomerBillListSSD extends BillListSSDBase {
  /**
   * 客户产品编号
   */
  cpCode: string;
  /**
   * 客户产品名称
   */
  cpName: string;
  /**
   * 客户名称
   */
  customerName: string;
}
export interface CompanyBillListSSD extends BillListSSDBase {
  /**
   * 业务单号类型 1包裹号 2提单号
   */
  bizType: 1 | 2;
  /**
   * 服务商名称
   */
  companyName: string;
  /**
   * 服务产品名称
   */
  spName: string;
  /**
   * 服务产品编号
   */
  spNo: string;
  /**
   * 杂项公式
   */
  otherFormula?: string;
}

export interface AuditFeeParams {
  failReason: string;
  ids?: number[];
  reviewResult: number;
}

export interface CreateBillParams {
  customerIds?: number[];
  gmtSettleEnd?: string;
  gmtSettleStart?: string;
  waybillNo?: string;
}

export interface EditPackageCustomerParams {
  customerNo: string;
  waybillNoList: string[] | string;
}
export interface EditBillingAmountParams {
  /**
   * 计费金额
   */
  calAmount?: number;
  /**
   * 计费值
   */
  calVal?: string;
  /**
   * 计费明细id
   */
  id: number | string;
}

export interface BillingFailedListParams extends PaginationParams {
  targetType?: number;
  waybillNo?: string;
  bizNode?: string;
  gmtEnd?: string;
  gmtStart?: string;
}

export interface BillingFailedListItemSSD {
  bizData: string;
  bizNode: number;
  gmtCreate: string;
  gmtRealCost: string;
  id: number;
  remark: string;
  targetType: number;
  waybillNo: string;
}

export interface ResetCompanyBillParams {
  billingIds: number[];
  bizType: number;
}

import type { PaginationParams } from './common';

export interface ProviderFeeListParams extends PaginationParams {
  auditState?: number;
  bizNo?: string;
  companyId?: number;
  customerName?: string;
  gmtCreateEnd?: string;
  gmtCreateStart?: string;
  expenseItem?: number;
  tabKey?: string;
}

export interface ProviderFeeListItemSSD {
  actionType: number;
  amount: number;
  amountText: string;
  auditState: number;
  billingDimensionText: string;
  bizNo: string;
  companyName: string;
  customerName: string;
  createName: string;
  expenseItem: number;
  expenseItemName: string;
  failReason: string;
  gmtAudit: string;
  gmtCreate: string;
  id: number;
  remark: string;
  settleCurrencyText: string;
}

export interface AddProviderFeeParams {
  amount: number;
  billingDimension: number;
  bizNo: string;
  companyId: number;
  companyName: string;
  expenseItem: number;
  remark?: string;
  settleCurrency: number;
}

export interface CustomerFeeListParams extends ProviderFeeListParams {}

export interface CustomerFeeListItemSSD extends ProviderFeeListItemSSD {}

export interface AddCustomerFeeParams {
  amount: number;
  bizNo: string;
  expenseItem: number;
  remark?: string;
  settleCurrency: number;
}

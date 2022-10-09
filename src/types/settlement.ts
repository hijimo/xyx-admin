import type { PaginationParams } from './common';

export interface SettlementListParams extends PaginationParams {
  businessType?: number;
  beginDate?: string;
  endDate?: string;
  companyId?: number;
  freightType?: number;
}

export interface SettlementListItemSSD {
  billingCost: number;
  billingMethod: number;
  billingVal: string;
  companyName: string;
  companyNo: string;
  freightType: number;
  gmtCreate: string;
  id: number;
  orderId: number;
  orderNo: string;
  resourceId: number;
  resourceName: string;
  waybillNo: string;
  whInvoiceNo: string;
}

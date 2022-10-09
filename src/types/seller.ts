import type { PaginationParams } from './common';

export interface SellerListParams extends PaginationParams {
  userName?: string;
  userNo?: string;
  userTel?: string;
}

export interface SellerListItemSSD extends SellerListParams {
  commissionMonth: number;
  commissionMonthStr: string;
  commissionTotal: number;
  commissionTotalStr: string;
  customerNos: string[];
  customerCount: number;
  gmtCreate: string;
  gmtModified: string;
  state: number;
  userEmail: string;
}

export interface SellUserListParams extends PaginationParams {
  userName?: string;
  userStatus?: number;
  opType?: number;
}
export interface SellUserListItemSSD extends SellUserListParams {
  userId: number;
  userNo: string;
}

export interface AddSellerParams {
  customerNos: string[];
  userNo?: string;
}

export interface CommissionListParams {
  customerNo?: string;
  userNo?: string;
  waybillNo?: string;
  gmtOutboundEnd?: string;
  gmtOutboundStart?: string;
}

export interface CommissionListItemSSD {
  comboName: string;
  comboNo: string;
  commissionTotal: number;
  commissionTotalStr: string;
  customerName: string;
  customerNo: string;
  gmtCreate: string;
  gmtOutbound: string;
  id: number;
  packageWeight: string;
  userName: string;
  userNo: string;
  waybillNo: string;
  packageStatus: number;
}

export interface EditCommissionParams extends CommissionListItemSSD {
  editedCommissionTotal: number;
  id: number;
}

export interface ComboCommissionListParams extends PaginationParams {
  comboNo?: string;
}

export interface ComboCommissionListItemSSD {
  afterCommission: number;
  afterCommissionStr: string;
  beforeCommission: number;
  beforeCommissionStr: string;
  comboName: string;
  comboNo: string;
  gmtModified: string;
  id: number;
}

export interface AddComboCommissionParams {
  afterCommission: number;
  beforeCommission: number;
  comboNo: string;
  id?: number;
}

export interface SellerCustomerListParams extends PaginationParams {
  userNo?: string;
}

export interface SellerCustomerListItemSSD {
  companyName: string;
  companyNo: string;
}

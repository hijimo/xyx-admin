import type { PaginationParams } from './common';

export interface SystemParams {
  packageMax?: string;
  orderMax?: string;
}

export interface CustomerLevelSSD {
  name?: string;
  discountRate?: string;
}

export interface SystemSSD extends SystemParams {
  abnormalTypes: string[];
  billingItems: string[];
  trackNodes: string[];
  priceLevels: string[];
}

export interface OperatingOrganizationsParams extends PaginationParams {
  account?: string;
  alipayAccount?: string;
  companyName?: string;
}

export interface AddOperatingOrganizationParams {
  account: string;
  alipayAccount: string;
  companyName: string;
  id?: number;
  openingBank: string;
  orgCode: string;
  payeeName: string;
}

export interface OperatingOrganizationsItemSSD extends AddOperatingOrganizationParams {
  gmtCreate: string;
  gmtUpdate: string;
}

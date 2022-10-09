import type { PaginationParams, AccountDtoSSD, TakeDtoSSD } from './common';

export interface ProviderListParams extends PaginationParams {
  companyNo?: string;
  companyName?: string;
  keyword?: string;
  contactTel?: string;
  settleType?: number;
  state?: number;
  companyType?: number;
  bizType?: number;
  tabType: number;
  comboId?: number;
}

export interface ProviderListItemSSD {
  accountDto: AccountDtoSSD;
  companyEmail: string;
  companyName: string;
  userAccount: string;
  companyNo: string;
  companyType: string;
  contactAddress: string;
  contactAddressPath: string;
  contactPerson: string;
  contactTel: string;
  bizTypeText: string;
  id: number;
  lineNum?: number;
  roleGroup: number[];
  ownerId: number[];
  state: number;
  takeDto: TakeDtoSSD;
  roleGroupCodeList: string[];
  settleTypeText: string;
}

export interface CompanyTypesSSD {
  id: number;
  name: string;
}

export interface WhTakeVoSSD {
  whContactAddress: string;
  whContactAddressPaths: number[];
  whContactPerson: string;
  whContactTel: string;
}

export interface ProviderDetailSSD {
  accountDto?: AccountDtoSSD;
  companyEmail?: string;
  userAccount?: string;
  companyName?: string;
  companyNo?: string;
  contactAddress?: string;
  contactAddressPaths?: number[];
  contactPerson?: string;
  contactTel?: string;
  settleType?: number;
  id?: number;
  ownerId?: number[];
  state?: number;
  takeDto?: TakeDtoSSD;
  companyTypes: number[];
  roleGroup: number[];
  whTakeDto: WhTakeVoSSD;
  bizType: number;
  simpleCode?: string;
  comboId?: number;
  belongSaler?: string;
}

export interface AddOrEditProviderParams extends ProviderDetailSSD {
  orgId: number;
}

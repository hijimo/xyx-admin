import type { BooleanEnum } from '@/enum';

export interface PaginationParams {
  total?: number;
  totalCount?: number;
  pageSize?: number;
  pageNo?: number;
  current?: number;
}
export interface SSDBase {
  /**
   * 删除标识
   */
  delFlag?: BooleanEnum;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
}
export interface Attachment {
  cover?: string;
  name?: string;
  size?: string;
  status?: string;
  type?: string;
  uid?: string;
  url?: string;
}
export interface TabStatisticsItemSSD {
  count: number;
  name: string;
  value: number;
  outFlag?: number;
}

export interface Mappable {
  resourceKey?: string | null;
}

export interface AddressListParams {
  /**
   * 是否中国 0否 1是
   */
  cnFlag?: number;
  level?: number;
  keyword?: string;
}
export interface GlobalAddressListparams {
  pid?: string | number;
  /**
   * 层级 1国家 2省 3市
   */
  level?: number;
  transferFlag?: BooleanEnum;
}

export interface Flattenable<T> {
  children?: T[] | null;
}

export type DictionaryListItemSSD = Record<string, SelectItemSSD[]>;

// 品类限制
export interface SelectItemSSD {
  value: number | string;
  text: string;
}

export interface UserAddressSSD {
  username: string;
  phoneNo: string;
  address: string;
  fullAddress: string;
}

export interface PaymentAccountSSD {
  username: string;
  account: string;
  bankName: string;
}

export interface InvoiceInfoSSD {
  campanyName: string;
  code: string;
}

export interface AccountDtoSSD {
  accountName: string;
  accountNo: string;
  bankName: string;
  chargePerson: string;
  chargeTel: string;
  companyId: number;
  id: number;
  invoiceTitle: string;
  remark: string;
  taxpayerNo: string;
  contactAddressPaths: number[];
  contactAddress: string;
}
export interface TakeDtoSSD {
  contactAddress: string;
  contactAddressPaths: number[];
  contactPerson: string;
  contactTel: string;
  signLineList: number[];
}

export interface AddressCityItemSSD {
  /**
   * 国家/城市代码
   */
  code: string;
  id: number;
  /**
   * 是否叶子节点
   */
  isLeaf: number;
  /**
   * 层级 1国家 2省 3市
   */
  level: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 名称英文
   */
  nameEn: string;
  /**
   * 本地语言名称
   */
  nameLocal: string;
  /**
   * 拼音
   */
  namePinyin: string;
  /**
   * 父节点id
   */
  pid: number;
  path: string;
  /**
   * 	邮政编码
   */
  zipCode: string;
  /**
   * 国家二字code
   */
  twoCode: string;
}

export interface OptionItemSSD {
  value: number | string;
  label: string;
  disabled?: boolean;
}

export type MapFlattenable<T> = Mappable & Flattenable<T>;

export interface RoleInfoItemSSD {
  appNo: string;
  companyNo: string;
  roleDescription: string;
  roleId: number;
  roleName: string;
  roleNo: string;
  roleStatus: number;
}

export interface RoleGroupListParams extends PaginationParams {
  groupName?: string;
  groupCode?: string;
}

export interface RoleGroupListItemSSD {
  groupCode: string;
  groupName: string;
  id: number;
  remark: string;
  roleInfoItem: RoleInfoItemSSD[];
  roleNos: string[];
}

export interface SettingTypeSSD {
  id: number;
  paramType: number;
  paramVal: string;
  valCode: string;
}

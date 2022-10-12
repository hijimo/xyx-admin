import type { PaginationParams, SSDBase } from './common';
import type { BooleanEnum, SwitchEnum, CompanyLicenseType, CompanyCardType } from '@/enum';

export interface CompanyListParams extends PaginationParams {
  companyNo?: string;
  companyName?: string;
  companyEmail?: string;
  companyType?: number;
  contactPerson?: number;
  contactTel?: number;
  simpleCode?: number;
  state?: SwitchEnum;
}

export interface CompanyQualificationSSD extends SSDBase {
  /**
   * 证件反面图片
   */
  backPhoto: string;
  /**
   * 营业结束日期
   */
  businessEndDate: string;
  /**
   * 营业是否长期
   */
  businessFlag: BooleanEnum;
  /**
   * 经营范围
   */
  businessScope: string;
  /**
   * 营业开始日期
   */
  businessStartDate: string;
  /**
   * 证件结束日期
   */
  cardEndDate: string;
  /**
   * 证件是否长期 0否1是
   */
  cardFlag: BooleanEnum;
  /**
   * 证件人名称
   */
  cardName: string;
  /**
   * 证件编号
   */
  cardNo: string;
  /**
   * 证件开始日期
   */
  cardStartDate: string;
  /**
   * 企业法人证件类型 1身份证 2护照
   */
  cardType: CompanyCardType;
  /**
   * 企业id
   */
  companyId: number;
  /**
   * 证件正面图片
   */
  frontPhoto: string;
  id: number;
  /**
   * 营业执照注册号
   */
  licenseNo: string;
  /**
   * 营业执照图片
   */
  licensePhoto: string;
  /**
   * 	营业执照类型 1三证非合一 2三证合一
   */
  licenseType: CompanyLicenseType;

  /**
   * 有效期结束日期
   */
  orgEndDate: string;
  /**
   * 组织机构代码是否长期
   */
  orgFlag: BooleanEnum;
  /**
   * 组织机构代码
   */
  orgNo: string;
  /**
   * 组织机构代码证图片
   */
  orgPhoto: string;
  /**
   * 有效期开始日期
   */
  orgStartDate: string;
  /**
   * 注册地址
   */
  registAddress: string;
}

export interface CompanySSD extends SSDBase {
  /**
   * 企业邮箱
   */
  companyEmail: string;
  /**
   * 企业名称
   */
  companyName: string;
  /**
   * 企业编号
   */
  companyNo: string;
  /**
   * 企业类型 0平台运营商 1发改局 2财政局 3建设单位
   */
  companyType: string;
  /**
   * companyType文本
   */
  companyTypeText?: string;
  /**
   * 联系地址（详细地址）
   */
  contactAddress: string;
  /**
   * 联系地址（省市区）
   */
  contactAddressPath: string;
  /**
   * 联系人
   */
  contactPerson: string;
  /**
   * 联系电话
   */
  contactTel: string;
  /**
   * 归属企业
   */
  ownerId: null | string;
  /**
   * 企业资质信息
   */
  qualificationDto: CompanyQualificationSSD | null;
  /**
   * 角色组编号
   */
  roleGroupCode: string;
  /**
   * 企业简码
   */
  simpleCode: string;
  /**
   * 状态 0禁用 1启用
   */
  state: SwitchEnum;
  /**
   * 所属区域代理 No
   */
  seller?: string;
  /**
   * 所属区域代理Name
   */
  sellerName?: string;
  /**
   * stateText
   */
  stateText?: string;
  id: number;
}

export interface CompanyTypesSSD {
  id: number;
  name: string;
}

export interface AddOrEditCompanyParams {
  /**
   * 企业邮箱
   */
  companyEmail: string;
  /**
   * 企业名称
   */
  companyName: string;
  /**
   * 企业类型 0平台运营商 1发改局 2财政局 3建设单位
   */
  companyType: string;
  /**
   * 联系地址（详细地址）
   */
  contactAddress: string;
  /**
   * 联系地址（省市区）
   */
  contactAddressPath: string;
  /**
   * 联系人
   */
  contactPerson: string;
  /**
   * 联系电话
   */
  contactTel: string;
  /**
   * 企业简码
   */
  simpleCode: string;
  /**
   * 状态 0禁用 1启用
   */
  state: SwitchEnum;
}

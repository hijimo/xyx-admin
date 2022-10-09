import type { PaginationParams, SSDBase } from './common';

/**
 * 1未认证 2已认证
 */
export type AuthType = 1 | 2; // 1未认证 2已认证

export interface User extends SSDBase {
  userId: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 80	用户类型（00系统用户）
   */
  userType: number;
  /**
   * 用户邮箱
   */
  email?: string;
  /**
   * 手机号码
   */
  phone?: string;
  /**
   * 身份证
   */
  idCard?: string;
  /**
   * 用户性别（0男1女2未知）
   */
  sex?: number;
  /**
   * 头像地址
   */
  avatar?: string;
  /**
   * 帐号状态（0正常1停用）
   */
  status?: number;
  /**
   * 最后登录IP
   */
  loginIp?: string;
  /**
   * 最后登录时间
   */
  loginDate?: string;
  wxOpenId?: string;
  wxSessionKey?: string;
  wxUninonId?: string;
}

export interface UserRuleMenuParams {
  resourceType: number;
}

export interface UserRuleMenuItemSSD {
  resourceId: number;
  value: number;
  resourceIcon: string | null;
  resourceKey: string;
  resourceName: string;
  title: string;
  resourceStatus: number;
  resourceStatusText: string;
  resourceUrl: string;
  orderNum: number;
  parentId: number;
  children: UserRuleMenuItemSSD[] | null;
  resourceType: number;
  resourceTypeText: string;
}

export interface LoginInfoSSD {
  appNo: string;
  loginUri: string;
  registerUri: string;
}

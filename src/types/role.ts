import type { PaginationParams } from './common';
import { BooleanEnum, SwitchEnum } from '@/enum';

import type { SSDBase } from '@/types';

export interface RoleSSD extends SSDBase {
  /**
   * 是否删除 0=否 1=是
   */
  deleteFlag: BooleanEnum;
  /**
   * 企业编号
   */
  companyNo: string;
  id: number;
  /**
   * 角色描述
   */
  roleDescription: string;
  /**
   * 角色名
   */
  roleName: string;
  /**
   * 角色编号
   */
  roleNo?: string;
  /**
   * 启用/禁用
   */
  roleStatus: SwitchEnum;
  /**
   * 是否系统
   */
  systemFlag: BooleanEnum;
}

export interface RoleListParams extends PaginationParams {
  companyNo?: string;
  roleName?: string;
  roleStatus?: SwitchEnum;
  systemFlag?: BooleanEnum;
}

interface RoleDataBase {
  /**
   * 企业编号
   */
  companyNo: string;
  /**
   * 角色描述
   */
  roleDescription: string;
  /**
   * 角色名称
   */
  roleName: string;
  /**
   * 角色No
   */
  roleNo: string;
}

export interface RoleResourceSSD {
  resourceId: number;
  resourceHalf: number;
  resourceName: string;
}

export interface RoleListItemSSD extends RoleDataBase, SSDBase {
  /**
   * 企业名称
   */
  companyName: string;
  id: number;
  /**
   * 资源id集合
   */
  resourceIdList: number[];
  roleResourceDtos?: RoleResourceSSD[];
  /**
   * 角色状态(0-正常1-禁用)
   */
  roleStatus: SwitchEnum;
  /**
   * 是否系统角色(0-否，1-是)
   */
  systemFlag: BooleanEnum;
}

export interface AddRoleParams extends RoleDataBase {
  id?: number;
  resourceIdList: number[];
}

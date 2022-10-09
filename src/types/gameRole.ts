import type { PaginationParams, SSDBase } from './common';

export interface GameRoleListParams extends PaginationParams {}
export interface GameRoleListSSD extends SSDBase {
  /**
   * id
   */
  gameRoleId: number;
  /**
   * 角色名
   */
  gameRoleName: string;
  /**
   * 角色系列
   */
  gameRoleSeries: string;
  /**
   * 角色介绍
   */
  gameRoleInfo: string;
  /**
   * 角色任务
   */
  gameRoleMission: string;
  /**
   * 半秘钥
   */
  gameRoleHalfKey: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 创建者
   */
  createUserId: string;
}

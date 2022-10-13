import type { PaginationParams, SSDBase } from './common';

export interface FigureListParams extends PaginationParams {}
export interface AddFigureParams {
  // 头像
  avatar: string;
  /**
   * 线索
   */
  clue?: string;
  /**
   * 半密钥
   */
  gameRoleHalfKey: string;
  /**
   * 角色id
   */
  gameRoleId?: number;
  /**
   * 角色介绍
   */
  gameRoleInfo: string;
  /**
   * 角色任务
   */
  gameRoleMission: string;
  /**
   * 角色名称
   */
  gameRoleName: string;
  /**
   * 角色系列
   */
  gameRoleSeries: string;
}
export interface FigureSSD extends SSDBase, Omit<AddFigureParams, 'gameRoleId'> {
  /**
   * id
   */
  gameRoleId: number;
}

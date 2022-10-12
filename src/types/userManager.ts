import type { PaginationParams } from './common';
import type { SwitchEnum, SexEnum } from '@/enum';

export interface UserListParams extends PaginationParams {
  /**
   * 企业编号
   */
  companyNo: string;
  /**
   * 组织编号
   */
  deptNo?: string;
  /**
   * 用户注册来源 0后台添加 1微信注册	query	false
   */
  registerSource?: number;
  /**
   * 手机号
   */
  userMobile?: string;
  /**
   * 用户名
   */
  userName?: string;
  /**
   * 用户No
   */
  userNo?: string;
  /**
   * 用户性别
   */
  userSex?: SexEnum;
  /**
   * 状态 0=禁用 1=启用
   */
  userStatus?: SwitchEnum;
  /**
   * 用户类型(-99-权限管理员、1-企业员工)	query	false
   */
  userType?: number;
}

export interface AddUserParams {
  /**
   * 企业编号
   */
  companyNo: string;
  /**
   * 组织编号
   */
  deptNo: string;
  id: number;
  /**
   * 上级No
   */
  parentNo: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 角色编号集合
   */
  roleNoList: string[];
  /**
   * 用户账号（手机号）
   */
  userAccount: string;
  /**
   * 用户生日
   */
  userBirthday: string;
  /**
   * 邮箱
   */
  userEmail: string;
  /**
   * 手机号
   */
  userMobile: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 用户编号
   */
  userNo: string;
  /**
   * 密码
   */
  userPassword?: string;
  /**
   * 头像
   */
  userPhoto: string;
  /**
   * 用户性别 1男2女		false
   */
  userSex: SexEnum;
}

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import type { Dictionary } from 'lodash';
import _values from 'lodash/values';

export const AuthorityMap = {
  /**
   * 企业实例
   */
  IOTC_HOME: 'IOTC_HOME',
  /**
   * 企业实例列表
   */
  IOTC_INDEX: 'IOTC_INDEX',
  /**
   * 企业实例添加
   */
  IOTC_ADD: 'IOTC_ADD',
  /**
   * 企业实例编辑
   */
  IOTC_EDIT: 'IOTC_EDIT',
  /**
   * 企业实例详情
   */
  IOTC_DETAIL: 'IOTC_DETAIL',
  /**
   * 企业实例配置
   */
  IOTC_CONFIG_INDEX: 'IOTC_CONFIG_INDEX',
  /**
   * 企业实例配置添加
   */
  IOTC_CONFIG_ADD: 'IOTC_CONFIG_ADD',
  /**
   * 企业实例配置编辑
   */
  IOTC_CONFIG_EDIT: 'IOTC_CONFIG_EDIT',

  // -------------------------------------分割线---------------------------------------------------

  /**
   * 通讯数据
   */
  DEVICE_DEAL_DATA_HOME: 'DEVICE_DEAL_DATA_HOME',
  /**
   * 通讯数据列表
   */
  DEVICE_DEAL_DATA_INDEX: 'DEVICE_DEAL_DATA_INDEX',

  // -------------------------------------分割线---------------------------------------------------

  /**
   * 物模型
   */
  DEVICE_MODEL_HOME: 'DEVICE_MODEL_HOME',
  /**
   * 物模型列表
   */
  DEVICE_MODEL_INDEX: 'DEVICE_MODEL_INDEX',

  // -------------------------------------分割线---------------------------------------------------

  /**
   * 设备分组
   */
  DEVICE_GROUP_HOME: 'DEVICE_GROUP_HOME',
  /**
   * 设备分组列表
   */
  DEVICE_GROUP_INDEX: 'DEVICE_GROUP_INDEX',
  /**
   * 设备分组添加
   */
  DEVICE_GROUP_ADD: 'DEVICE_GROUP_ADD',
  /**
   * 设备分组编辑
   */
  DEVICE_GROUP_EDIT: 'DEVICE_GROUP_EDIT',

  // -------------------------------------分割线---------------------------------------------------

  /**
   * 设备管理
   */
  DEVICE_HOME: 'DEVICE_HOME',
  /**
   * 设备管理列表
   */
  DEVICE_INDEX: 'DEVICE_INDEX',
  /**
   * 设备详情
   */
  DEVICE_DETAIL: 'DEVICE_DETAIL',

  // -------------------------------------分割线---------------------------------------------------

  /**
   * 角色
   */
  ROLE_HOME: 'ROLE_HOME',
  /**
   * 角色列表
   */
  ROLE_INDEX: 'ROLE_INDEX',
  /**
   * 角色添加
   */
  ROLE_ADD: 'ROLE_ADD',
  /**
   * 角色编辑
   */
  ROLE_EDIT: 'ROLE_EDIT',

  // -------------------------------------分割线---------------------------------------------------

  /**
   * 用户
   */
  USER_HOME: 'USER_HOME',
  /**
   * 用户列表
   */
  USER_INDEX: 'USER_INDEX',
  /**
   * 用户添加
   */
  USER_ADD: 'USER_ADD',
  /**
   * 用户编辑
   */
  USER_EDIT: 'USER_EDIT',

  // -------------------------------------分割线---------------------------------------------------

  /**
   * 企业
   */
  COMPANY_HOME: 'COMPANY_HOME',
  /**
   * 企业列表
   */
  COMPANY_INDEX: 'COMPANY_INDEX',
  /**
   * 企业添加
   */
  COMPANY_ADD: 'COMPANY_ADD',
  /**
   * 企业编辑
   */
  COMPANY_EDIT: 'COMPANY_EDIT',
  /**
   * 企业详情
   */
  COMPANY_DETAIL: 'COMPANY_DETAIL',

  // -------------------------------------分割线---------------------------------------------------

  /**
   * 组织
   * */
  DEPT_HOME: 'DEPT_HOME',
  /**
   * 组织列表
   */
  DEPT_INDEX: 'DEPT_INDEX',
  /**
   * 组织添加
   */
  DEPT_ADD: 'DEPT_ADD',
  /**
   * 组织编辑
   */
  DEPT_EDIT: 'DEPT_EDIT',

  // -------------------------------------分割线---------------------------------------------------

  /**
   * 操作日志
   */
  LOG_HOME: 'LOG_HOME',
  /**
   * 操作日志列表
   */
  LOG_INDEX: 'LOG_INDEX',
};

const allAuthorities = _values(AuthorityMap);

export default function access(initialState: { authorities?: Dictionary<boolean> }) {
  const { authorities } = initialState || {};

  const finalAuthorities = allAuthorities.reduce((memo, auth) => {
    memo[auth] = authorities?.[auth] ?? false;
    return memo;
  }, {});

  console.log('finalAuthorities', finalAuthorities);

  return {
    ...finalAuthorities,
  };
}

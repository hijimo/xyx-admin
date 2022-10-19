/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import type { Dictionary } from 'lodash';
import _values from 'lodash/values';

export const AuthorityMap = {
  BANNER_INDEX: 'BANNER_INDEX',
  BANNER_ADD: 'BANNER_ADD',
  BANNER_EDIT: 'BANNER_EDIT',

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
    memo[auth] = true;
    return memo;
  }, {});

  console.log('finalAuthorities', finalAuthorities);

  return {
    ...finalAuthorities,
  };
}

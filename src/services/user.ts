import type { User, UserRuleMenuParams, UserRuleMenuItemSSD } from '@/types';
import type { ResponseData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取我的信息
 * @returns
 */
export async function getMyProfile() {
  return request<ResponseData<User>>('/api/hera/user/my_user_info/query', {
    skipErrorHandler: true,
  });
}

// 登出
export async function logout() {
  return request<ResponseData>('/api/hera/user/logout');
}

// 获取用户的菜单
export async function getUserRoleMenu(params?: UserRuleMenuParams) {
  return request<ResponseData<UserRuleMenuItemSSD[]>>('/api/hera/resource/role_menu/query', {
    params,
  });
}

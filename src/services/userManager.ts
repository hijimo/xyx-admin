import type { UserListParams, AddUserParams, UserSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取用户列表
 * @param UserListParams
 * @returns User[]
 */
export async function getUserList(params: UserListParams) {
  return request<ResponseData<PaginationData<UserSSD[]>>>('/api/user/page', {
    params,
  });
}

/**
 * 添加用户
 * @param AddUserParams
 * @returns
 */
export async function addUser(data: AddUserParams) {
  return request<ResponseData>('/api/user/edit', {
    method: 'POST',
    data,
  });
}

/**
 * 删除用户
 * @param id number|string
 * @returns
 */
export async function deleteUser(id: number | string) {
  return request<ResponseData>('/api/user/del', {
    method: 'POST',
    data: { id },
  });
}

/**
 * 更新用户状态
 * @param data
 * @returns
 */
export async function updateUserStatus(id: number | string) {
  return request<ResponseData>('/api/user/state', {
    method: 'POST',
    data: { id },
  });
}

/**
 * 获取用户信息
 * @param params
 * @returns User
 */
export async function getUserInfo(id: number | string) {
  return request<ResponseData<UserSSD>>('/api/user/info', {
    params: { id },
  });
}
/**
 * 重置用户密码
 * @param id
 * @returns
 */
export async function resetUserPassword(id: number | string) {
  return request<ResponseData>('/api/user/pwd/reset', {
    method: 'POST',
    data: { id },
  });
}

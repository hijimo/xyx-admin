import type { UserListParams, AddUserParams, UserSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取用户列表
 * @param UserListParams
 * @returns User[]
 */
export async function getUserList(params: UserListParams) {
  return request<ResponseData<PaginationData<UserSSD[]>>>('/api/system/user/list', {
    params,
  });
}

/**
 * 添加用户
 * @param AddUserParams
 * @returns
 */
export async function addUser(data: AddUserParams) {
  return request<ResponseData>('/api/system/user/add', {
    method: 'POST',
    data,
  });
}

/**
 * 编辑用户
 * @param AddUserParams
 * @returns
 */
export async function editUser(data: AddUserParams) {
  return request<ResponseData>('/api/system/user/edit', {
    method: 'POST',
    data,
  });
}
/**
 * 删除用户
 * @param userId number|string
 * @returns
 */
export async function deleteUser(userId: number | string) {
  return request<ResponseData>(`/api/system/user/delete/${userId}`);
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
export async function getUserInfo(userId: number | string) {
  return request<ResponseData<UserSSD>>(`/api/system/user/${userId}`);
}
/**
 * 重置用户密码
 * @param id
 * @returns
 */
export async function resetUserPassword(userId: number | string) {
  return request<ResponseData>(`/api/system/user/resetPassword/${userId}`);
}

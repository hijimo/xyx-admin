import type {
  UserSSD,
  UserLoginData,
  UserLoginResponseData,
  UpdateUserPasswordParams,
} from '@/types';
import type { ResponseData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取我的信息
 * @returns User
 */
export async function getMyProfile() {
  return request<ResponseData<UserSSD>>('/api/getInfo', {
    skipErrorHandler: true,
    skipMiddleware: true,
  });
}

/**
 * 登录
 * @param UserLoginData
 * @returns UserLoginResponseData
 */
export async function login(data: UserLoginData) {
  return request<ResponseData<UserLoginResponseData>>('/api/login', {
    data,
    method: 'POST',
  });
}

/**
 * 登出
 * @returns
 */
export async function logout() {
  return request<ResponseData>('/api/userlogin/logout');
}
/**
 * 更新密码
 * @param UpdateUserPasswordParams
 * @returns
 */
export async function updateUserPassword(data: UpdateUserPasswordParams) {
  return request<ResponseData>('/api/userlogin/changepwd', {
    method: 'POST',
    data,
  });
}

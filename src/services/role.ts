import type { RoleListParams, RoleListItemSSD, AddRoleParams, ResourceSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取角色列表
 * @param RoleListParams
 * @returns RoleListItemSSD[]
 */
export async function getRoleList(params: RoleListParams) {
  return request<ResponseData<PaginationData<RoleListItemSSD[]>>>('/api/role/page', {
    params,
  });
}

/**
 * 添加角色
 * @param AddRoleParams
 * @returns
 */
export async function addRole(data: AddRoleParams) {
  return request<ResponseData>('/api/role/edit', {
    method: 'POST',
    data,
  });
}

/**
 * 删除角色
 * @param data
 * @returns
 */
export async function deleteRole(id: number | string) {
  return request<ResponseData>('/api/role/del', {
    method: 'POST',
    data: { id },
  });
}

/**
 * 更新角色状态
 * @param data
 * @returns
 */
export async function updateRoleStatus(id: number | string) {
  return request<ResponseData>('/api/role/state', {
    method: 'POST',
    data: { id },
  });
}

/**
 * 获取角色信息
 * @param params
 * @returns RoleListItemSSD
 */
export async function getRoleInfo(id: number | string) {
  return request<ResponseData<RoleListItemSSD>>('/api/role/info', {
    params: { id },
  });
}

/**
 * 获取企业下所有角色信息
 * @param params
 * @returns RoleListItemSSD
 */
export async function getCompanyRoleList(companyNo: string) {
  return request<ResponseData<RoleListItemSSD>>('/api/role/select', {
    params: { companyNo },
  });
}

/**
 * 查询资源树
 * @param data
 * @returns
 */
export async function getResourceList() {
  return request<ResponseData<ResourceSSD[]>>('/api/role/resource/tree');
}

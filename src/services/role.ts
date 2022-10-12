import type { RoleListParams, RoleListItemSSD, AddRoleParams, ResourceSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取角色列表
 * @param RoleListParams
 * @returns RoleListItemSSD[]
 */
export async function getRoleList(params: RoleListParams) {
  return request<ResponseData<PaginationData<RoleListItemSSD[]>>>('/api/system/role/list', {
    params,
  });
}

/**
 * 添加角色
 * @param AddRoleParams
 * @returns
 */
export async function addRole(data: AddRoleParams) {
  return request<ResponseData>('/api/system/role/add', {
    method: 'POST',
    data,
  });
}
/**
 * 编辑角色
 * @param AddRoleParams
 * @returns
 */
export async function editRole(data: AddRoleParams) {
  return request<ResponseData>('/api/system/role/edit', {
    method: 'POST',
    data,
  });
}
/**
 * 删除角色
 * @param data
 * @returns
 */
export async function deleteRole(roleId: number | string) {
  return request<ResponseData>(`/api/system/role/delete/${roleId}`);
}

/**
 * 获取角色信息
 * @param params
 * @returns RoleListItemSSD
 */
export async function getRoleInfo(roleId: number | string) {
  return request<ResponseData<RoleListItemSSD>>(`/api/system/role/${roleId}`);
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
  return request<ResponseData<ResourceSSD[]>>('/api/system/menu/treeselect');
}

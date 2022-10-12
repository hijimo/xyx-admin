import type {
  ResourceListParams,
  ResourceListItemSSD,
  AddResourceParams,
  ResourceInfoSSD,
  UserResourceInfoSSD,
  ResourceRoleListParams,
  ResourceRoleListItemSSD,
} from '@/types';
import type { ResponseData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取资源列表
 * @param ResourceListParams
 * @returns ResourceListItemSSD[]
 */
export async function getResourceList(data: ResourceListParams) {
  return request<ResponseData<ResourceListItemSSD[]>>('/api/hera/resource/resource_list/query', {
    method: 'POST',
    data,
  });
}

/**
 * 根据模块获取资源列表
 * @param ResourceRoleListParams
 * @returns ResourceListItemSSD[]
 */
export async function getResourceRoleList(data: ResourceRoleListParams) {
  return request<ResponseData<ResourceRoleListItemSSD[]>>(
    '/api/hera/resource/module/resource_list/query',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * 添加资源
 * @param AddResourceParams
 * @returns
 */
export async function addResource(data: AddResourceParams) {
  return request<ResponseData>('/api/hera/resource/add', {
    method: 'POST',
    data,
  });
}

/**
 * 删除资源
 * @param data
 * @returns
 */
export async function deleteResource(data: { resourceId: number }) {
  return request<ResponseData>('/api/hera/resource/delete', {
    method: 'POST',
    data,
  });
}

/**
 * 更新资源状态
 * @param data
 * @returns
 */
export async function updateResourceStatus(data: { resourceId: number }) {
  return request<ResponseData>('/api/hera/resource/resource_status/update', {
    method: 'POST',
    data,
  });
}

/**
 * 获取资源信息
 * @param params
 * @returns ResourceInfoSSD
 */
export async function getResourceInfo(params: { resourceId: number | undefined }) {
  return request<ResponseData<ResourceInfoSSD>>('/api/hera/resource/resource_info/query', {
    params,
  });
}

/**
 * 获取当前用户的资源
 * @param params
 * @returns UserResourceInfoSSD
 */
export async function getUserResource(params: { appNo: string }) {
  return request<ResponseData<UserResourceInfoSSD>>('/api/hera/resource/role_menu/query', {
    params,
  });
}

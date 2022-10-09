import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';
import type {
  SystemSSD,
  SystemParams,
  OperatingOrganizationsParams,
  OperatingOrganizationsItemSSD,
  AddOperatingOrganizationParams,
} from '@/types';

/**
 * 获取系统设置信息
 * @returns
 */
export async function getSystemInfo() {
  return request<ResponseData<SystemSSD>>('/api/kpost/back/system_param/list');
}

/**
 * 系统信息设置
 * @param SystemParams
 * @returns
 */
export async function setSystemInfo(data: SystemParams) {
  return request<ResponseData>('/api/wms/systemParam/edit', { method: 'POST', data });
}

/**
 * 运营组织机构列表分页查询
 * @param OperatingOrganizationsParams
 * @returns
 */
export async function getOperatingOrganizationList(params: OperatingOrganizationsParams) {
  return request<ResponseData<PaginationData<OperatingOrganizationsItemSSD[]>>>(
    '/api/kpost/org/page',
    {
      params,
    },
  );
}

/**
 * 获取运营组织机构列表
 * @param OperatingOrganizationsParams
 * @returns
 */
export async function getOperatingOrganizations(params: OperatingOrganizationsParams) {
  return request<ResponseData<OperatingOrganizationsItemSSD[]>>('/api/kpost/org/list', {
    params,
  });
}

/**
 * 新增运营组织机构
 * @param AddOperatingOrganizationParams
 * @returns
 */
export async function addOperatingOrganization(data: AddOperatingOrganizationParams) {
  return request<ResponseData>('/api/kpost/org/edit', {
    method: 'post',
    data,
  });
}

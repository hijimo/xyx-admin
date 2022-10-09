import type {
  ProviderListItemSSD,
  ProviderListParams,
  AddOrEditProviderParams,
  ProviderDetailSSD,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取服务商/客户列表
 * @param ProviderListParams
 * @returns
 */
export async function getProviderList(params: ProviderListParams) {
  return request<ResponseData<PaginationData<ProviderListItemSSD[]>>>('/api/kpost/company/page', {
    params,
  });
}

/**
 * 更新服务商/客户状态
 * @param params
 * @returns
 */
export const updateProviderState = (params: { id: number }) =>
  request<ResponseData>('/api/warhawk/sc/back/update/state', { params });

/**
 * 获取服务商/客户详情
 * @param params
 * @returns
 */
export async function getProviderDetail(params: { id: any }) {
  return request<ResponseData<ProviderDetailSSD>>('/api/kpost/company/detail', {
    params,
  });
}

/**
 * 新增或编辑服务商/客户
 * @param AddOrEditProviderParams
 * @returns
 */
export async function addOrEditProvider(data: AddOrEditProviderParams) {
  return request<ResponseData>('/api/kpost/company/edit', { method: 'POST', data });
}

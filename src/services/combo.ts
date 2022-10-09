import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';
import type {
  ComboListParams,
  ComboItemSSD,
  ComboPostData,
  ComboCpPostData,
  ComboDetailSSD,
} from '@/types';

/**
 * 套餐-分页查询
 * @param ProviderFeeListParams
 * @returns
 */
export async function getComboList(params?: ComboListParams) {
  return request<ResponseData<PaginationData<ComboItemSSD[]>>>('/api/kpost/combo/page', {
    params,
  });
}

/**
 * 套餐-列表查询
 * @param ProviderFeeListParams
 * @returns
 */
export async function getComboSelectList(params?: ComboListParams) {
  return request<ResponseData<ComboItemSSD[]>>('/api/kpost/combo/list', {
    params,
  });
}

/**
 * 获取套餐详情
 * @param id
 * @returns
 */
export async function getComboDetail(id: number | string) {
  return request<ResponseData<ComboDetailSSD>>('/api/kpost/combo/detail', {
    params: { id },
  });
}
/**
 * 套餐-新增编辑
 * @param data  ComboPostData
 * @returns
 */
export async function addCombo(data: ComboPostData) {
  return request<ResponseData>('/api/kpost/combo/edit', {
    method: 'POST',
    data,
  });
}
/**
 * 根据线路查询价格等级设置列表
 * @param cpCodeList
 * @returns
 */
export async function fetchComboCPList(cpCodeList: string[]) {
  return request<ResponseData<ComboCpPostData[]>>('/api/kpost/combo/cp/list', {
    method: 'POST',
    data: { cpCodeList },
  });
}

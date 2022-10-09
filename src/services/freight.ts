import type {
  AddFreightParams,
  AddMiscellaneousFeesParams,
  MiscellaneousFeesByProductIdParams,
  MiscellaneousFeesSSD,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 编辑费用项
 * @param AddFreightParams
 * @returns
 */
export async function addOrEditFreight(params?: AddFreightParams) {
  return request<ResponseData>('/api/kpost/serviceChannel/base/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 启用或禁用费用项
 * @param params
 * @returns
 */
export async function enableFreightItem(params: { id: number }) {
  return request<ResponseData>('/api/kpost/serviceChannel/offer/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取杂费费用项列表
 * @param params
 * @returns
 */
export async function getMiscellaneousFeesByProductId(params: MiscellaneousFeesByProductIdParams) {
  return request<ResponseData<PaginationData<MiscellaneousFeesSSD[]>>>(
    '/api/kpost/serviceChannel/other/page',
    {
      params,
    },
  );
}

/**
 * 添加杂费费用项
 * @param params
 * @returns
 */
export async function addOrEditMiscellaneousFees(params?: AddMiscellaneousFeesParams) {
  return request<ResponseData>('/api/kpost/serviceChannel/other/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
/**
 * 删除杂费费用项
 * @param id
 * @returns
 */
export async function deleteMiscellaneousFees(id: number) {
  return request<ResponseData>('/api/kpost/serviceChannel/other/del', {
    method: 'POST',
    data: {
      id,
    },
  });
}

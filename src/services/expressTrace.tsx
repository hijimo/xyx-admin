import type {
  ExpressTraceListParams,
  ExpressTraceListItemSSD,
  AddExpressTraceParams,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取轨迹录入列表
 * @param ExpressTraceListParams
 * @returns
 */
export async function getExpressTraceList(params: ExpressTraceListParams) {
  return request<ResponseData<PaginationData<ExpressTraceListItemSSD[]>>>(
    '/api/kpost/back/track/record/page',
    {
      params,
    },
  );
}

/**
 * 新增轨迹录入
 * @param AddExpressTraceParams
 * @returns
 */
export async function addExpressTrace(data: AddExpressTraceParams) {
  return request<ResponseData>('/api/kpost/back/track/record/add', { method: 'POST', data });
}

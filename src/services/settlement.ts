import type { SettlementListParams, SettlementListItemSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取计费明细列
 * @param CustomerSettlementListParams
 * @returns
 */
export async function getSettlementList(params: SettlementListParams) {
  return request<ResponseData<PaginationData<SettlementListItemSSD[]>>>(
    '/api/kpost/back/bill/page/query',
    {
      params,
    },
  );
}

// 计费明细列表导出
export const exportBill = '/api/kpost/admin/intPackage/export';

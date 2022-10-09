import type {
  BatchListItemSSD,
  BatchBindData,
  BatchListParams,
  BatchStatisticsParams,
  BatchStatisticsSSD,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 装袋批次分页查询
 * @param params SearchPackageListParams
 * @returns
 */
export async function getBatchList(params: BatchListParams) {
  return request<ResponseData<PaginationData<BatchListItemSSD[]>>>(
    '/api/kpost/back/batch_info/page',
    {
      params,
    },
  );
}

/**
 * 装袋批次统计信息查询
 * @returns
 */
export async function getBatchStatistics(params?: BatchStatisticsParams) {
  return request<ResponseData<BatchStatisticsSSD>>('/api/kpost/back/batchInfo/statistics', {
    params,
  });
}

/**
 * 装袋批次关联提单
 * @param data SearchPackageBindData
 * @returns
 */
export async function batchBind(data: BatchBindData) {
  return request<ResponseData>('/api/kpost/back/batch_info/bind', {
    method: 'POST',
    data,
  });
}

/**
 * 装袋批次解绑提单
 * @param data SearchPackageBindData
 * @returns
 */
export async function batchUnbind(batchNos: string[]) {
  return request<ResponseData>('/api/kpost/back/batch_info/unbind', {
    method: 'POST',
    data: { batchNos },
  });
}

/**
 * 装袋批次导出
 */
export const exportBatch = '/api/kpost/back/batch_info/export';

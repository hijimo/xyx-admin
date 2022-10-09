import type { OperationLogListParams, OperationLogListItemSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取操作日志列表
 * @param OperationLogListParams
 * @returns
 */
export async function getOperationLogList(params: OperationLogListParams) {
  return request<ResponseData<PaginationData<OperationLogListItemSSD[]>>>(
    '/api/kpost/back/op_log/page',
    {
      params,
    },
  );
}

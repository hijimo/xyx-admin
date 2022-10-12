import type { DeviceDealDataSSD, DeviceDealDataListParams } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 1-通讯数据记录-分页查询
 * @param DeviceDealDataListParams
 * @returns DeviceDealDataSSD[]
 */
export async function getDeviceDealDataList(params: DeviceDealDataListParams) {
  return request<ResponseData<PaginationData<DeviceDealDataSSD[]>>>('/api/deviceDealData/page', {
    params,
  });
}

import type {
  ServiceChannelListParams,
  ServiceChannelDetailSSD,
  ServiceChannelListItemSSD,
  AddServiceChannelParams,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取服务渠道列表
 * @param ServiceChannelListParams
 * @returns
 */
export async function getServiceChannelList(params?: ServiceChannelListParams) {
  return request<ResponseData<PaginationData<ServiceChannelListItemSSD[]>>>(
    '/api/kpost/serviceChannel/page',
    {
      params,
    },
  );
}

/**
 * 更新服务渠道状态
 * @param params
 * @returns
 */
export async function updateServiceChannelState(params: { id: number; state: number }) {
  return request<ResponseData>('/api/kpost/serviceChannel/state/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取服务渠道详情
 * @param params
 * @returns
 */
export async function getServiceChannelDetail(params?: { id: number | undefined | string }) {
  return request<ResponseData<ServiceChannelDetailSSD>>('/api/kpost/serviceChannel/detail', {
    params,
  });
}

/**
 * 编辑服务渠道
 * @param AddServiceChannelParams
 * @returns
 */
export async function addOrEditServiceChannel(params?: AddServiceChannelParams) {
  return request<ResponseData>('/api/kpost/serviceChannel/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

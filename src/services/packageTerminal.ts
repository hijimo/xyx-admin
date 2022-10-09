import type { PackageListParams, PackageListItemSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取尾程包裹列表
 * @param PackageListParams
 * @returns
 */
export async function getPackageTerminalList(params?: PackageListParams) {
  return request<ResponseData<PaginationData<PackageListItemSSD[]>>>('/api/kpost/last/pack/page', {
    params,
  });
}

/**
 * 废弃尾程包裹
 * @returns
 */
export async function abandonPackageTerminal(params: { idList: number[] }) {
  return request<ResponseData>('/api/kpost/last/pack/cancel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 批量签出
 * @returns
 */
export async function outPackageTerminal(params: { idList: number[] }) {
  return request<ResponseData>('/api/kpost/last/pack/out', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 批量撤销签出
 * @returns
 */
export async function cancelOutPackageTerminal(params: { idList: number[] }) {
  return request<ResponseData>('/api/kpost/last/pack/cancel/out', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

import type {
  ShipmentManifestListParams,
  ShipmentManifestListItemSSD,
  AddShipmentManifestParams,
  RouteProductListItemSSD,
  FilterChannelListParams,
  DeptListItemSSD,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取总单列表
 * @param ShipmentManifestListParams
 * @returns
 */
export async function getShipmentManifestList(params: ShipmentManifestListParams) {
  return request<ResponseData<PaginationData<ShipmentManifestListItemSSD[]>>>(
    '/api/kpost/back/pack/total/page',
    {
      params,
    },
  );
}

/**
 * 查询仓库
 * @returns
 */
export async function getDeptList() {
  return request<ResponseData<DeptListItemSSD[]>>('/api/kpost/back/dept/list');
}

/**
 * 通过仓库查询渠道
 * @param FilterChannelListParams
 * @returns
 */
export async function filterChannelList(params: FilterChannelListParams) {
  return request<ResponseData<RouteProductListItemSSD[]>>('/api/kpost/back/channel/list', {
    params,
  });
}

/**
 * 新增总单
 * @param AddShipmentManifestParams
 * @returns
 */
export async function addShipmentManifest(data: AddShipmentManifestParams) {
  return request<ResponseData>('/api/kpost/back/pack/total/add', { method: 'POST', data });
}

/**
 * 批量删除总单
 * @returns
 */
export async function deleteShipmentManifest(data: { ids: number[] }) {
  return request<ResponseData>('/api/kpost/back/pack/total/delete', { method: 'POST', data });
}

/**
 * 总单导出
 */
export const exportShipmentManifest = '/api/kpost/back/pack_total/out/export';

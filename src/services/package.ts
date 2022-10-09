import type {
  PackageListParams,
  PackageDetailSSD,
  PackageListItemSSD,
  PackageInfoSSD,
  TabStatisticsItemSSD,
  PackageAbnormalListItemSSD,
  EditRouteProductParams,
  PackageAbnormalListParams,
  EditGoodsInfoParams,
  PackageAbnormalParams,
  EditReceiverInfoParams,
  EditCountryParams,
  FastenerParams,
  EditOrderNoParams,
  BindCustomerParams,
  AddRemarkParams,
  PackageStatisticsParams,
  PackageStatisticsSSD,
  AbnormalPackageRouteProductSSD,
  HandleAbnormalHistoryItemSSD,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取包裹列表
 * @param PackageListParams
 * @returns
 */
export async function getPackageList(params?: PackageListParams) {
  return request<ResponseData<PaginationData<PackageListItemSSD[]>>>(
    '/api/kpost/back/intPackage/page',
    {
      params,
    },
  );
}

/**
 * 获取转运包裹统计信息
 * @param PackageListParams
 * @returns
 */
export async function getTransportPackageStatistics(params?: PackageStatisticsParams) {
  return request<ResponseData<PackageStatisticsSSD>>('/api/kpost/back/intPackage/statistics', {
    params,
  });
}

/**
 * 获取无主包裹列表
 * @param PackageListParams
 * @returns
 */
export async function getPackageDerelictionList(params?: PackageListParams) {
  return request<ResponseData<PaginationData<PackageListItemSSD[]>>>(
    '/api/kpost/back/unowned/intPackage/page',
    {
      params,
    },
  );
}

/**
 * 删除无主包裹
 * @returns
 */
export async function deletePackageDereliction(params: { ids: number[] }) {
  return request<ResponseData>('/api/kpost/back/unknown/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 关联客户和线路
 * @param BindCustomerParams
 * @returns
 */
export async function bindCustomer(params: BindCustomerParams) {
  return request<ResponseData>('/api/kpost/back/unknown/bind', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 修改目的国
 * @param EditCountryParams
 * @returns
 */
export async function editCountry(params: EditCountryParams) {
  return request<ResponseData>('/api/kpost/back/edit/country', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 修改商品品名
 * @param EditCountryParams
 * @returns
 */
export async function editGoodsName(params: EditGoodsInfoParams) {
  return request<ResponseData>('/api/kpost/back/edit/name', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 修改收件人信息
 * @param EditReceiverInfoParams
 * @returns
 */
export async function editReceiverInfo(params: EditReceiverInfoParams) {
  return request<ResponseData>('/api/kpost/back/edit/receiver', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 修改商品信息
 * @param EditGoodsInfoParams
 * @returns
 */
export async function editGoodsInfo(params: EditGoodsInfoParams) {
  return request<ResponseData>('/api/kpost/back/edit/goods', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 修改线路产品
 * @param EditRouteProductParams
 * @returns
 */
export async function editRouteProduct(params: EditRouteProductParams) {
  return request<ResponseData>('/api/kpost/back/edit/cp', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 修改原始单号
 * @param EditOrderNoParams
 * @returns
 */
export async function editOrderNo(params: EditOrderNoParams) {
  return request<ResponseData>('/api/kpost/back/edit/ship', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 扣件
 * @param FastenerParams
 * @returns
 */
export async function fastener(params: FastenerParams) {
  return request<ResponseData>('/api/kpost/back/fastening/pack', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 添加备注
 * @param AddRemarkParams
 * @returns
 */
export async function addRemark(params: AddRemarkParams) {
  return request<ResponseData>('/api/kpost/back/csd/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取包裹详情
 * @param params
 * @returns
 */
export async function getPackageDetail(params?: { id: number | undefined }) {
  return request<ResponseData<PackageDetailSSD>>('/api/kpost/back/intPackage/detail', {
    params,
  });
}

// 包裹列表导出URL
export const exportPackage = '/api/kpost/back/intPackage/export';

/**
 * 获取异常包裹表头统计
 */
export async function getPackageAbnormalTabList() {
  return request<ResponseData<TabStatisticsItemSSD[]>>('/api/kpost/back/ab_pack/tabcount');
}

/**
 * 获取异常包裹列表
 * @param PackageAbnormalListParams
 * @returns
 */
export async function getPackageAbnormalList(params: PackageAbnormalListParams) {
  return request<ResponseData<PaginationData<PackageAbnormalListItemSSD[]>>>(
    '/api/kpost/back/ab_pack/page',
    {
      params,
    },
  );
}

/**
 * 获取处理历史详情
 * @returns
 */
export async function getHandleAbnormalHistory(id?: number) {
  return request<ResponseData<HandleAbnormalHistoryItemSSD[]>>('/api/kpost/back/ab_pack/history', {
    params: { id },
  });
}

// 异常包裹列表导出URL
export const exportPackageAbnormal = '/api/kpost/back/intPackage/ab/export';

/**
 * 处理异常包裹
 * @param PackageAbnormalParams
 * @returns
 */
export async function packageAbnormalHandle(data: PackageAbnormalParams) {
  return request<ResponseData>('/api/kpost/back/ab_pack/handle', {
    method: 'POST',
    data,
  });
}

/**
 * 获取包裹信息
 * @param params
 * @returns
 */
export async function getPackageInfo(params: { id: number }) {
  return request<ResponseData<PackageInfoSSD[]>>('/api/kpost/back/batch_info/list', {
    params,
  });
}

/**
 * 删除包裹
 * @returns
 */
export async function deletePackage(params: { idList: number[] }) {
  return request<ResponseData>('/api/kpost/back/pack/batch/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 根据包裹唯一号获取线路列表
 * @param params
 * @returns
 */
export async function getAbnormalPackageRouteProductList(uniqueNo?: string) {
  return request<ResponseData<AbnormalPackageRouteProductSSD[]>>('/api/kpost/back/ab_pack/line', {
    params: { uniqueNo },
  });
}

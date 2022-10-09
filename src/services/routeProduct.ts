import type {
  RouteProductListParams,
  RouteProductDetailSSD,
  BaseDtoSSD,
  RouteProductListItemSSD,
  RuleDtoSSD,
  AddRouteProductCoverageParams,
  CustomerRouteProductListParams,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取线路产品列表
 * @param RouteProductListParams
 * @returns
 */
export async function getRouteProductList(params?: RouteProductListParams) {
  return request<ResponseData<PaginationData<RouteProductListItemSSD[]>>>('/api/kpost/cp/page', {
    params,
  });
}

/**
 * 获取客户签约线路产品列表
 * @param RouteProductListParams
 * @returns
 */
export async function getCustomerRouteProductList(params: CustomerRouteProductListParams) {
  return request<ResponseData<RouteProductListItemSSD[]>>('/api/kpost/back/customer/sign', {
    params,
  });
}

/**
 * 更新线路产品状态
 * @param params
 * @returns
 */
export async function updateRouteProductState(params: { id: number }) {
  return request<ResponseData>('/api/kpost/cp/state/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取线路产品详情
 * @param params
 * @returns
 */
export async function getRouteProductDetail(params?: { id: number | undefined }) {
  return request<ResponseData<RouteProductDetailSSD>>('/api/kpost/cp/detail', {
    params,
  });
}

/**
 * 编辑线路产品基本信息
 * @param BaseDtoSSD
 * @returns
 */
export async function addOrEditRouteProduct(params?: BaseDtoSSD) {
  return request<ResponseData>('/api/kpost/cp/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 编辑线路产品覆盖区域
 * @param AddRouteProductCoverageParams
 * @returns
 */
export async function editRouteProductCoverage(params?: AddRouteProductCoverageParams) {
  return request<ResponseData>('/api/kpost/cp/area/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 查询线路产品限制详情
 * @param params
 * @returns
 */
export async function getRouteProductLimitedDetail(params: { id?: number }) {
  return request<ResponseData<RuleDtoSSD>>('/api/kpost/cp/rule/detail', {
    params,
  });
}

/**
 * 编辑线路产品限制
 * @param RuleDtoSSD
 * @returns
 */
export async function editRouteProductLimited(params?: RuleDtoSSD) {
  return request<ResponseData>('/api/kpost/cp/offer/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

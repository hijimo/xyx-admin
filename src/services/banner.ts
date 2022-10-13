import type { BannerListParams, AddBannerParams, BannerSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取banners列表
 * @param BannerListParams
 * @returns bannerssd[]
 */
export async function getBannerList(params: BannerListParams) {
  return request<ResponseData<PaginationData<BannerSSD[]>>>('/api/x1x/banner', {
    params,
  });
}

/**
 * 添加用户
 * @param AddBannerParams
 * @returns
 */
export async function addBanner(data: AddBannerParams) {
  return request<ResponseData>('/api/x1x/banner/add', {
    method: 'POST',
    data,
  });
}

/**
 * 编辑用户
 * @param AddBannerParams
 * @returns
 */
export async function editBanner(data: AddBannerParams) {
  return request<ResponseData>('/api/x1x/banner/edit', {
    method: 'POST',
    data,
  });
}
/**
 * 删除用户
 * @param BannerId number|string
 * @returns
 */
export async function deleteBanner(bannerId: number | string) {
  return request<ResponseData>(`/api/x1x/banner/delete/${bannerId}`);
}

/**
 * 获取用户信息
 * @param params
 * @returns Banner
 */
export async function getBannerInfo(bannerId: number | string) {
  return request<ResponseData<BannerSSD>>(`/api/x1x/banner/${bannerId}`);
}

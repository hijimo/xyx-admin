import type { PaginationParams, SSDBase } from './common';

export interface BannerListParams extends PaginationParams {}
export interface AddBannerParams {
  // 图片地址
  bannerPath: string;
  /**
   * 链接
   */
  bannerUrl?: string;
  /**
   * 排序
   */
  bannerRank?: number;
}
export interface BannerSSD extends SSDBase, AddBannerParams {
  /**
   * id
   */
  bannerId: number;
}

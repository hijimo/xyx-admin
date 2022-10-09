import type { PaginationParams, SSDBase } from './common';

export interface BannerListParams extends PaginationParams {}
export interface BannerSSD extends SSDBase {
  /**
   * id
   */
  bannerId: number;
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

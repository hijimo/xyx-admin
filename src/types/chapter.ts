import type { PaginationParams, SSDBase } from './common';

export interface ChapterListParams extends PaginationParams {}
export interface AddChapterParams {}

export interface ChapterSSD {}
export interface ChapterListSSD extends SSDBase {
  /**
   * id
   */
  chapterId: number;
  /**
   * 攻略编号
   */
  strategyId: number;
  // 标题
  chapterTitle: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 背景介绍
   */
  chapterBackground?: string;
  /**
   * 排序
   */
  chapter_sort?: number;
}

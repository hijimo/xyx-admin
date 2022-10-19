import type { ChapterListParams, AddChapterParams, ChapterSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取列表
 * @param ChapterListParams
 * @returns ChapterSSD[]
 */
export async function getChapterList(params: ChapterListParams) {
  const { strategyId, ...others } = params;
  return request<ResponseData<PaginationData<ChapterSSD[]>>>(
    `/api/x1x/chapter/list/${strategyId}`,
    {
      params: others,
    },
  );
}

/**
 * 添加用户
 * @param AddChapterParams
 * @returns
 */
export async function addChapter(data: AddChapterParams) {
  return request<ResponseData>('/api/x1x/chapter/add', {
    method: 'POST',
    data,
  });
}

/**
 * 编辑用户
 * @param AddChapterParams
 * @returns
 */
export async function editChapter(data: AddChapterParams) {
  return request<ResponseData>('/api/x1x/chapter/edit', {
    method: 'POST',
    data,
  });
}
/**
 * 删除用户
 * @param chapterId number|string
 * @returns
 */
export async function deleteChapter(chapterId: number | string) {
  return request<ResponseData>(`/api/x1x/chapter/delete/${chapterId}`);
}

/**
 * 获取用户信息
 * @param params
 * @returns Chapter
 */
export async function getChapterInfo(chapterId: number | string) {
  return request<ResponseData<ChapterSSD>>(`/api/x1x/chapter/get/${chapterId}`);
}

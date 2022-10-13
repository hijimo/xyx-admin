import type { FigureListParams, AddFigureParams, FigureSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取Figures列表
 * @param FigureListParams
 * @returns Figuressd[]
 */
export async function getFigureList(data: FigureListParams) {
  return request<ResponseData<PaginationData<FigureSSD[]>>>('/api/x1x/game/role/list', {
    data,
    method: 'POST',
  });
}

/**
 * 添加用户
 * @param AddFigureParams
 * @returns
 */
export async function addFigure(data: AddFigureParams) {
  return request<ResponseData>('/api/x1x/game/role/add', {
    method: 'POST',
    data,
  });
}

/**
 * 编辑用户
 * @param AddFigureParams
 * @returns
 */
export async function editFigure(data: AddFigureParams) {
  return request<ResponseData>('/api/x1x/game/role/edit', {
    method: 'POST',
    data,
  });
}
/**
 * 删除用户
 * @param gameRoleId number|string
 * @returns
 */
export async function deleteFigure(gameRoleId: number | string) {
  return request<ResponseData>(`/api/x1x/game/role/delete/${gameRoleId}`);
}

/**
 * 获取用户信息
 * @param params
 * @returns Figure
 */
export async function getFigureInfo(gameRoleId: number | string) {
  return request<ResponseData<FigureSSD>>(`/api/x1x/game/role/${gameRoleId}`);
}

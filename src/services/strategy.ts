import type { StrategyListParams, AddStrategyParams, StrategySSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';
/**
 * Strategy
 * 获取Strategys列表
 * @param StrategyListParams
 * @returns Strategyssd[]
 */
export async function getStrategyList(data: StrategyListParams) {
  return request<ResponseData<PaginationData<StrategySSD[]>>>('/api/x1x/strategy/list', {
    data,
    method: 'POST',
  });
}

/**
 * 添加用户
 * @param AddStrategyParams
 * @returns
 */
export async function addStrategy(data: AddStrategyParams) {
  return request<ResponseData>('/api/x1x/strategy/add', {
    method: 'POST',
    data,
  });
}

/**
 * 编辑用户
 * @param AddStrategyParams
 * @returns
 */
export async function editStrategy(data: AddStrategyParams) {
  return request<ResponseData>('/api/x1x/strategy/edit', {
    method: 'POST',
    data,
  });
}
/**
 * 删除用户
 * @param strategyId number|string
 * @returns
 */
export async function deleteStrategy(strategyId: number | string) {
  return request<ResponseData>(`/api/x1x/strategy/delete/${strategyId}`);
}

/**
 * 获取用户信息
 * @param params
 * @returns Strategy
 */
export async function getStrategyInfo(strategyId: number | string) {
  return request<ResponseData<StrategySSD>>(`/api/x1x/strategy/get/${strategyId}`);
}

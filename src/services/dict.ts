import type { DictSSD, DictListParams, DictAddParams, DictItemSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 数据字典表-分页查询
 * @param DictListParams
 * @returns DictSSD[]
 */
export async function getDictList(params: DictListParams) {
  return request<ResponseData<PaginationData<DictSSD[]>>>('/api/system/dict/type/list', {
    params,
  });
}
/**
 * 获取某个字典类型下的列表
 * @param dictType
 * @returns
 */
export async function getDictItemList(dictType: string) {
  return request<ResponseData<PaginationData<DictItemSSD[]>>>(
    `/api/system/dict/data/type/${dictType}`,
    {},
  );
}
/**
 * 获取某个字典项值
 * @param dictCode
 * @returns
 */
export async function getDictItemByCode(dictCode: string | number) {
  return request<ResponseData<PaginationData<DictItemSSD>>>(
    `/api/system/dict/data/${dictCode}`,
    {},
  );
}
/**
 * 数据字典表-新增
 * @param DictAddParams
 * @returns
 */
export async function addDict(data: DictAddParams) {
  return request<ResponseData>('/api/system/dict/data', {
    method: 'POST',
    data,
  });
}
/**
 * 数据字典表-修改
 * @param DictAddParams
 * @returns
 */
export async function editDict(data: DictAddParams) {
  return request<ResponseData>('/api/system/dict/data', {
    method: 'PUT',
    data,
  });
}
/**
 * 删除字典
 * @param data
 * @returns
 */
export async function deleteDict(dictCode: number | string) {
  return request<ResponseData>(`/api/system/dict/data/delete/${dictCode}`);
}

import type { WarningsSSD, WarningsListParams, AddWarningsParams } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 1-告警规则配置-分页查询
 * @param WarningsListParams
 * @returns WarningsSSD[]
 */
export async function getDeviceWarnList(params: WarningsListParams) {
  return request<ResponseData<PaginationData<WarningsSSD[]>>>('/api/deviceWarnPo/page', {
    params,
  });
}

/**
 * 2-告警规则配置-新增-修改
 * @param AddWarningsParams
 * @returns
 */
export async function addDeviceWarn(data: AddWarningsParams) {
  return request<ResponseData>('/api/deviceWarnPo/edit', {
    method: 'POST',
    data,
  });
}

/**
 * 3-阿里云IOT企业实例配置-根据主键ID删除
 * @param data
 * @returns
 */
export async function deleteDeviceWarn(id: number | string) {
  return request<ResponseData>('/api/deviceWarnPo/del', {
    method: 'POST',
    data: { id },
  });
}

/**
 * 4-阿里云IOT企业实例配置-根据主键ID查看详情
 * @param params
 * @returns WarningsSSD
 */
export async function getDeviceWarnInfo(id: number | string) {
  return request<ResponseData<WarningsSSD>>('/api/deviceWarnPo/info', {
    params: { id },
  });
}

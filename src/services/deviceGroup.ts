import type { DeviceGroupSSD, DeviceGroupListParams, AddDeviceGroupParams } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 1-根据企业编号查询分组树
 * @param DeviceGroupListParams
 * @returns DeviceSSD[]
 */
export async function getDeviceGroupTree(params: DeviceGroupListParams) {
  return request<ResponseData<PaginationData<DeviceGroupSSD[]>>>('/api/deviceGroup/tree', {
    params,
  });
}

/**
 * 2-新增编辑设备分组
 * @param DictAddParams
 * @returns
 */
export async function addDeviceGroup(data: AddDeviceGroupParams) {
  return request<ResponseData>('/api/deviceGroup/edit', {
    method: 'POST',
    data,
  });
}

/**
 * 3-逻辑删除分组
 * @param data
 * @returns
 */
export async function deleteDeviceGroup(id: number | string) {
  return request<ResponseData>('/api/deviceGroup/del', {
    method: 'POST',
    data: { id },
  });
}

/**
 * 4-根据id查询分组详情信息
 * @param params
 * @returns DeviceSSD
 */
export async function getDeviceGroupInfo(id: number | string) {
  return request<ResponseData<DeviceGroupSSD>>('/api/deviceGroup/info', {
    params: { id },
  });
}

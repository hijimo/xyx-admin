import type {
  DeviceSSD,
  DeviceListParams,
  ShowFlagUpdateData,
  EditDeviceInfoParams,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 1-1-设备信息-分页查询
 * @param DeviceSSDListParams
 * @returns DeviceSSD[]
 */
export async function getDeviceList(params: DeviceListParams) {
  return request<ResponseData<PaginationData<DeviceSSD[]>>>('/api/devicePo/page', {
    params,
  });
}

/**
 * 2-设备信息-批量修改属性是否展示
 * @param data
 * @returns
 */
export async function bulkUpdateShowFlag(data: ShowFlagUpdateData) {
  return request<ResponseData>('/api/devicePo/edit', {
    data: data,
    method: 'POST',
  });
}

/**
 * 设备基础信息表-根据主键ID查看详情
 * @param params
 * @returns DeviceSSD
 */
export async function getDeviceInfo(id: number | string) {
  return request<ResponseData<DeviceSSD>>('/api/devicePo/info', {
    params: { id },
  });
}

/**
 * 编辑设备信息
 * @param data
 * @returns
 */
export async function editDeviceInfo(data: EditDeviceInfoParams) {
  return request<ResponseData>('/api/applet/device/edit', {
    method: 'POST',
    data,
  });
}

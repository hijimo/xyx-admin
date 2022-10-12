import type {
  DashboardSSD,
  DeviceSSD,
  ProvinceDeviceCountSSD,
  CityDeviceListParams,
  ProvinceDeviceCountListParams,
  SendDeviceInstructionParams,
  DashboardSearchParams,
  DashboardAllParams,
} from '@/types';
import type { ResponseData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 1-大屏
 * @param params
 * @returns
 */
export async function getDashboardData(params?: DashboardAllParams) {
  return request<ResponseData<DashboardSSD>>('/api/bigview/all', {
    params,
  });
}
export async function getDashboardDataOthers(params?: DashboardAllParams) {
  return request<ResponseData<DashboardSSD>>('/api/bigview/all/other', {
    params,
  });
}

/**
 * 2-根据Token和省份查询城市的设备分布
 * @param params
 * @returns
 */
export async function getProvinceDeviceCount(params: ProvinceDeviceCountListParams) {
  return request<ResponseData<ProvinceDeviceCountSSD[]>>('/api/bigview/city/count', {
    params,
  });
}

/**
 * 3-根据城市查询设备分布
 * @param params
 * @returns
 */
export async function getCityDeviceList(params: CityDeviceListParams) {
  return request<ResponseData<DeviceSSD[]>>('/api/bigview/city/devices', {
    params,
  });
}

/**
 * 4-关键词(编号、别名)搜索设备
 * @param token
 * @returns
 */
export async function searchDashboardDeviceByKeyword(params?: DashboardSearchParams) {
  return request<ResponseData<DeviceSSD[]>>('/api/bigview/devices/keyword', {
    params,
  });
}

/**
 * 5-指令下发
 * @param data
 * @returns
 */
export async function sendDeviceInstruction(data: SendDeviceInstructionParams) {
  return request<ResponseData>('/api/bigview/order/send', {
    method: 'POST',
    data,
  });
}

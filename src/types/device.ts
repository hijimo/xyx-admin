import type { PaginationParams, SSDBase } from './common';
import type { SwitchEnum, BooleanEnum, ReadWriteFlag } from '@/enum';

export interface ShowFlagUpdateData {
  deviceCode: string;
  showFlagVos: ShowFlagUpdateSSD[];
}
export interface ShowFlagUpdateSSD {
  metaKey: string;
  showFlag: BooleanEnum;
}
export interface DeviceMetaSSD extends SSDBase {
  deviceCode: string;
  formType: null;
  id: number;
  metaKey: string;
  metaName: string;
  metaValue: null | string;
  metaUnit: null | string;
  parentKey: null | string;
  showFlag: BooleanEnum;
  showFlagText: string;
  status: SwitchEnum;
  rwFlag: ReadWriteFlag;
  statusText: string;
}
export interface DeviceSSD extends SSDBase {
  /**
   * 省市区编号全路径
   */
  addressPath: string;
  groupCodePath: string;
  /**
   * 地区
   */
  areaName: string;
  /**
   * 城市
   */
  cityName: string;
  /**
   * 设备编号
   */
  code: string;
  /**
   * 所属企业名称 */
  companyName: string;
  /**
   * 所属企业编号
   */
  companyNo: string;
  /**
   * 坐标
   */
  coordinate: string;
  /**
   * 别名
   */
  aliasName?: string;
  /**
   * 纬度
   */
  latitude: string;
  /**
   * 经度
   */
  longitude: string;
  onlineStatus: string;
  onlineStatusText?: string;
  id: number;
  /**
   * 所属企业实例ID
   */
  instanceId: number;
  /**
   * 所属企业实例名称
   */
  instanceName: string;

  /**
   * 设备名称
   */
  name: string;
  /**
   * 省份
   */
  provinceName: string;
  /**
   * 有效状态1=有效0=无效
   */
  status: SwitchEnum;
  statusText?: string;
  /**
   * meta信息
   */
  metaDtos?: DeviceMetaSSD[];
  orderDtos?: DeviceMetaSSD[];
}

export interface DeviceListParams extends PaginationParams {
  addressPath?: string;
  companyNo?: string;
  status?: SwitchEnum;
  name?: string;
  modelFlag?: BooleanEnum;
}
export interface EditDeviceInfoParams {
  /**
   * 设备别名
   */
  aliasName: string;
  /**
   * 所属分组编号
   */
  groupCode: string;
  id: number;
}
export interface SendDeviceInstructionParams {
  /**
   * 设备编号
   */
  deviceCode: string;
  /**
   * 设备id
   */
  id: number;
  /**
   * 设备属性key
   */
  metaKey: string;
  /**
   * 设备属性设置值
   */
  metaValue: string;
}

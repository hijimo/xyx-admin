import type { PaginationParams, SSDBase } from './common';
import type { BooleanEnum } from '@/enum';

export interface DeviceGroupSSD extends SSDBase {
  children: DeviceGroupSSD[];
  /**
   * 分组编号
   */
  code: string;
  codePath: string;
  /**
   * 所属企业名称
   */
  companyName: string;
  /**
   * 所属企业编号
   */
  companyNo: string;
  /**
   * 是否有子集
   */
  hasChildren: BooleanEnum;
  /**
   * 主键ID
   */
  id: number;
  /**
   * 分组名称
   */
  name: string;
}
export interface AddDeviceGroupParams {
  companyNo: string;
  id?: number;
  name: string;
  parentCode: string;
}

export interface DeviceGroupListParams extends PaginationParams {
  strVal?: string;
}

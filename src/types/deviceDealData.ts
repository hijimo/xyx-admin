import type { PaginationParams } from './common';

export interface DeviceDealDataSSD {
  /**
   * 城市
   */
  cityName: string;
  /**
   * 所属企业名称
   */
  companyName: string;
  /**
   * 所属企业编号
   */
  companyNo: string;
  /**
   * 设备编号
   */
  deviceCode: string;
  /**
   * 设备名称
   */
  deviceName: string;
  /**
   * 记录产生时间
   */
  gmtCreate: string;
  /**
   * 协议传输数据
   */
  metaData: string;
  /**
   * 产品唯一标识
   */
  productKey: string;
  /**
   * 省份
   */
  provinceName: string;
}

export interface DeviceDealDataListParams extends PaginationParams {
  companyNo?: string;
}

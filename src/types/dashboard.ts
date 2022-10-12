import type { DeviceGroupSSD } from '@/types';

export interface ActiveRankData {
  /**
   * 月日
   */
  monthDay: string;
  /**
   * 设备数
   */
  totalCount: number;
}
export interface DeviceCountData {
  /**
   * 设备离线数
   */
  offlineCount: number;
  /**
   * 设备在线数
   */
  onlineCount: number;
  /**
   * 设备在线率
   */
  onlineRatio: number;
  /**
   * 设备总数
   */
  totalCount: number;
}
export interface GroupRankData {
  /**
   * 分组编号
   */
  groupCode: string;
  /**
   * 分组名称
   */
  groupName: string;
  /**
   * 设备数
   */
  totalCount: number;
}
export interface ProductCountData {
  /**
   * 产品名称
   */
  productName: string;
  /**
   * 设备总数
   */
  totalCount: number;
}
export interface ProvinceCountData {
  /**
   * 设备在线数
   */
  onlineCount: number;
  /**
   * 省份
   */
  provinceName: string;
  /**
   * 设备总数
   */
  totalCount: number;
}
export interface RankMontData {
  /**
   * 设备数据
   */
  dataCount: number;
  /**
   * 设备编号
   */
  deviceCode: string;
  /**
   * 设备名称
   */
  deviceName: string;
}
export interface RankDayData {
  /**
   * 设备数据
   */
  dataCount: number;
  /**
   * 设备编号
   */
  deviceCode: string;
  /**
   * 设备名称
   */
  deviceName: string;
}
export interface DashboardSSD {
  /**
   * 日激活设备数趋势-左下
   */
  activeRankDtos: ActiveRankData;
  /**
   * 设备数统计-左上
   */
  deviceCountDto: DeviceCountData;
  /**
   * 设备分组树结构-中1
   */
  deviceGroupDtos: DeviceGroupSSD[];
  /**
   * 设备分组排名-左中
   */
  groupRankDtos: GroupRankData[];
  /**
   * 产品设备数分布-右上
   */
  productCountDtos: ProductCountData[];
  /**
   * 按省份统计设备数-中2
   */
  provinceCountDtos: ProvinceCountData[];
  /**
   * 设备数据日排名Top5-右中
   */
  rankDay: RankDayData[];
  /**
   * 设备数据月排名Top5-右下
   */
  rankMonth: RankMontData[];
  deviceWarnDtos: DeviceWarnSSD[];
}

export interface DeviceWarnSSD {
  /**
   * 设备名称
   */
  deviceCode: string;
  /**
   * 设备名称
   */
  deviceName: string;
  /**
   * 省市
   */
  cityName: string;
  /**
   * 所在组
   */
  groupName: string;
  /**
   * 告警信息
   */
  metaName: string;
  /**
   * 告警值
   */
  metaValue: number;
  /**
   * 是否解除告警文案
   */
  warnText: string;
}
export interface ProvinceDeviceCountSSD {
  /**
   * 城市
   */
  cityName: string;
  /**
   * 	设备在线数
   */
  onlineCount: number;
  /**
   * 设备总数
   */
  totalCount: number;
}
export interface ProvinceDeviceCountListParams {
  /**
   * 省份名称
   */
  provinceName: string;
  /**
   * 会话TOKEN
   */
  token?: string;
}

export interface CityDeviceListParams {
  /**
   * 城市名称
   */
  cityName: string;
  /**
   * 会话TOKEN
   */
  token?: string;
}
export interface DashboardAllParams {
  groupCode?: string;
  token?: string;
}

export interface DashboardSearchParams {
  /**
   * 城市名称
   */
  cityName?: string;
  /**
   * 关键字，设备编号或别名
   */
  keyWords?: string;
  /**
   * 省份名称
   */
  provinceName?: string;
  /**
   * 省份名称
   */
  token?: string;
}

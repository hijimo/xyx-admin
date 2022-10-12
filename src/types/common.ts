import { NormalStatusEnum, BusinessTypeEnum } from '@/enum';

export interface SSDBase {
  /**
   * 创建时间
   */
  gmtCreate?: string;
  /**
   * 创建人
   */
  creator?: string;
  /**
   * 修改人
   */
  modifier?: string;
  /**
   * 最后变更时间
   */
  gmtModified?: string;
}

export interface PaginationParams {
  total?: number;
  totalCount?: number;
  pageSize?: number;
  pageNo?: number;
  current?: number;
}

export interface Attachment {
  cover?: string;
  name?: string;
  size?: string;
  status?: string;
  type?: string;
  uid?: string;
  url?: string;
}
export interface TabStatisticsItemSSD {
  count: number;
  name: string;
  value: number;
}

export interface AddressSSD {
  children: AddressSSD[];
  id: number;
  level: number;
  /**
   * 英文名
   */
  name: string;
  /**
   * 英文名 */
  nameEn: string;
  /**
   * 当地语言名称
   *  */
  nameLocal: string;
  pid: number;
}

export interface LogSSD extends SSDBase {
  /**
   * 业务类型0=其它1=新增2=修改3=删除
   */
  businessType: BusinessTypeEnum;
  businessTypeText?: string;
  /**
   * 企业名称
   */
  companyName: string;
  /**
   * 组织名称
   */
  deptName: string;
  /**
   * 错误信息
   */
  errorMsg: string;
  /**
   * 返回参数
   */
  jsonResult: string;
  /**
   * 请求方法
   */
  method: string;
  /**
   * 请求IP */
  operIp: string;
  /**
   * 请求参数
   */
  operParam: string;
  /**
   * 请求地址
   */
  operUrl: string;
  /**
   * 操作人类别 */
  operatorType: number;
  /**
   * 请求方式
   */
  requestMethod: string;
  /**
   * 状态0=异常1=正常
   */
  status: NormalStatusEnum;
  /**
   * 操作模块
   */
  title: string;
}

export interface OptionItemSSD {
  value: number | string;
  label: string;
}

export interface Mappable {
  resourceKey?: string | null;
}

export interface Flattenable<T> {
  children?: T[] | null;
}

export type MapFlattenable<T> = Mappable & Flattenable<T>;

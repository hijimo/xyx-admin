import { BooleanEnum } from '@/enum';
import type { PaginationParams, SSDBase } from './common';

export interface IOTCompanySSD extends SSDBase {
  /**
   * 授权key
   */
  accessKey: string;
  /**
   * 授权密钥
   */
  accessSecret: string;
  /**
   * 所属企业编号
   */
  companyNo: string;
  /**
   * 企业名称
   */
  companyName: string;
  /**
   * 单个进程启动的连接数，最大64个连接
   */
  connectCount: number;
  /**
   * 订阅组ID
   */
  consumerGroupId: string;
  /**
   * 主键ID
   */
  id?: number;
  /**
   * 实例自定义名称
   */
  instanceName: string;
  /**
   * IOT连接域名
   */
  iotHost: string;
  /**
   * 企业实例ID
   */
  iotInstanceId: string;
  /**
   * 产品唯一标识
   */
  productKey: string;
  /**
   * 产品名称
   */
  productName: string;
}

export interface IOTCompanyListParams extends PaginationParams {
  companyNo?: string;
  instanceName?: string;
}
export interface AddIOTCompanyParams extends Omit<IOTCompanySSD, 'companyName'> {}

export interface IOTCompanyConfigListParams {
  /**
   * 是否默认配置
   */
  defaultFlag?: BooleanEnum;
  /**
   * 文件名
   */
  fileName?: string;
  /**
   * 是否强制升级 1=是 0=否
   */
  forceFlag?: BooleanEnum;
  /**
   * 实例id
   */
  instanceId: number | string;
  /**
   * 包版本号
   */
  packageName?: string;
  /**
   * 包版本号
   */
  packageVersion?: string;
  /**
   * 是否重启 1=是 0=否
   */
  restartFlag?: BooleanEnum;
}

export interface IOTCompanyConfigSSD extends AddIOTCompanyConfigParams, SSDBase {
  /**
   * 所属企业编号
   */
  companyNo: string;

  /**
   * 产品唯一标识
   */
  productKey: string;
  /**
   * 产品名称
   */
  productName: string;
  id: number;
}

export interface AddIOTCompanyConfigParams {
  /**
   * 是否为默认配置文件
   */
  defaultFlag: BooleanEnum;
  /**
   * 文件名
   */
  fileName: string;
  /**
   * 文件存放路径
   */
  filePath: string;
  /**
   * 是否强制升级 1=是 0=否
   */
  forceFlag: number;
  id?: number;
  /**
   * 企业实例id
   */
  instanceId: number | string;
  /**
   * 	包ID
   */
  packageId: string;
  /**
   * 	包名 */
  packageName: string;
  /**
   * 包版本号
   */
  packageVersion: string;

  /**
   * 升级说明
   */
  remark: string;
  /**
   * 是否重启 1=是 0=否
   */
  restartFlag: BooleanEnum;
}

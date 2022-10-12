import request from '@/utils/request';
import type { ResponseData } from '@/utils/request';
import type { AddressSSD, PaginationParams } from '@/types';
import type { NormalStatusEnum, BusinessTypeEnum } from '@/enum';

// 获取阿里云OSS的上传token
export async function getOssSign() {
  return request('/api/wms/common/oss_token/query');
}

/**
 * 获取当前服务器时间
 * @returns 时间戳 number(int64)
 */
export async function getServerTime() {
  return request<ResponseData<number>>('/api/wms/system/time');
}

interface GlobalAddressListparams {
  pid?: number;
  level?: number;
}
/**
 * 获取全球国家地址列表   .. 获取国际城市列表， 现在只用这个接口，下周一记得改
 * @param AddressListParams
 * @returns
 */
export async function getGolbalAddressList(params?: GlobalAddressListparams) {
  return request<ResponseData<AddressSSD[]>>('/api/common/country/listbylevelpid', {
    params,
  });
}

interface LogListParams extends PaginationParams {
  /**
   * 业务类型0=登录1=新增2=修改3=删除4=登出5=其它
   */
  businessType?: BusinessTypeEnum;
  /**
   * 状态0=异常1=正常
   */
  status?: NormalStatusEnum;
  /**
   * 操作模块
   */
  title?: string;
}
/**
 * 操作日志分页查询
 * @param params
 * @returns
 */
export async function getLogList(params?: LogListParams) {
  return request<ResponseData<AddressSSD[]>>('/api/operlog/page', {
    params,
  });
}

/**
 * ✅ 9-公共-根据地区编号查询行政边界坐标集
 * @param strVal
 * @returns
 */
export async function getMapArea(strVal?: string | number) {
  return request<ResponseData<string>>('/api/common/map/area', {
    params: { strVal },
  });
}

export const UPLOAD_URL = '/api/common/upload';

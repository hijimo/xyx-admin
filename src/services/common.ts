import type {
  GlobalAddressListparams,
  DictionaryListItemSSD,
  RoleGroupListParams,
  RoleGroupListItemSSD,
  SettingTypeSSD,
  AddressCityItemSSD,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取阿里云OSS的上传token
 * @returns
 */
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

/**
 * 获取全球国家地址列表   .. 获取国际城市列表， 现在只用这个接口，下周一记得改
 * @param AddressListParams
 * @returns
 */
export async function getGolbalAddressList(params?: GlobalAddressListparams) {
  return request<ResponseData<AddressCityItemSSD[]>>('/api/kpost/common/query/country/address', {
    params,
  });
}

/**
 * 获取字典列表
 * @param params
 * @returns
 */
export async function getDictionaryList(params?: { keys: string[] }) {
  return request<ResponseData<DictionaryListItemSSD>>('/api/kpost/common/dict_list/query', {
    params,
  });
}

/**
 * 获取电子面单录入国家列表
 * @param params
 * @returns
 */
export async function getCpCountryList(id: number) {
  return request<ResponseData<AddressCityItemSSD[]>>('/api/kpost/admin/cp/country/select', {
    params: {
      id,
    },
  });
}

/**
 * 获取角色组列表
 * @param RoleGroupListParams
 * @returns
 */
export async function getRoleGroupList(params: RoleGroupListParams) {
  return request<ResponseData<PaginationData<RoleGroupListItemSSD[]>>>(
    '/api/hera/role/role_group/page',
    { params },
  );
}

/**
 * 获取系统设置类型枚举
 * @param params
 * @returns
 */
export async function getSettingTypeList(paramTypeList: number | number[]) {
  return request<ResponseData<SettingTypeSSD[]>>('/api/kpost/back/sp/list', {
    params: {
      paramTypeList: Array.isArray(paramTypeList) ? paramTypeList : [paramTypeList],
    },
  });
}

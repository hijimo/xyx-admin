import type {
  IOTCompanySSD,
  IOTCompanyListParams,
  IOTCompanyConfigListParams,
  AddIOTCompanyConfigParams,
  AddIOTCompanyParams,
  IOTCompanyConfigSSD,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 1-阿里云IOT企业实例配置-分页查询
 * @param IOTCompanyListParams
 * @returns IOTCompanySSD[]
 */
export async function getIOTCompanyList(params: IOTCompanyListParams) {
  return request<ResponseData<PaginationData<IOTCompanySSD[]>>>('/api/companyInstancePo/page', {
    params,
  });
}

/**
 * 2-阿里云IOT企业实例配置-新增-修改
 * @param AddIOTCompanyParams
 * @returns
 */
export async function addIOTCompany(data: AddIOTCompanyParams) {
  return request<ResponseData>('/api/companyInstancePo/edit', {
    method: 'POST',
    data,
  });
}

/**
 * 3-阿里云IOT企业实例配置-根据主键ID删除
 * @param data
 * @returns
 */
export async function deleteIOTCompany(id: number | string) {
  return request<ResponseData>('/api/companyInstancePo/del', {
    method: 'POST',
    data: { id },
  });
}

/**
 * 4-阿里云IOT企业实例配置-根据主键ID查看详情
 * @param params
 * @returns IOTCompanySSD
 */
export async function getIOTCompanyInfo(id: number | string) {
  return request<ResponseData<IOTCompanySSD>>('/api/companyInstancePo/info', {
    params: { id },
  });
}

/**
 * 6-阿里云IOT企业实例配置-上传配置文件
 * @param data
 * @returns
 */
export async function addIOTCompanyConfig(data: AddIOTCompanyConfigParams) {
  return request<ResponseData>('/api/companyInstancePo/file/upload', {
    method: 'POST',
    data,
  });
}
/**
 * 7-阿里云IOT企业实例配置-配置文件查询
 * @param params
 * @returns
 */
export async function getIOTCompanyConfigList(params: IOTCompanyConfigListParams) {
  return request<ResponseData<PaginationData<IOTCompanyConfigSSD[]>>>(
    '/api/companyInstancePo/file/page',
    {
      params,
    },
  );
}
/**
 * 8-阿里云IOT企业实例配置-配置文件详情
 * @param id
 * @returns
 */
export async function getIOTCompanyConfigInfo(id: number | string) {
  return request<ResponseData<IOTCompanyConfigSSD>>('/api/companyInstancePo/file/info', {
    params: { id },
  });
}
/**
 * 9-阿里云IOT企业实例配置-根据主键ID删除
 * @param id
 * @returns
 */
export async function deleteIOTCompanyConfig(id: number | string) {
  return request<ResponseData>('/api/companyInstancePo/file/del', {
    method: 'POST',
    data: { id },
  });
}

import type { CompanySSD, CompanyListParams, AddOrEditCompanyParams } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取企业列表
 * @param CompanyListParams
 * @returns
 */
export async function getCompanyList(params: CompanyListParams) {
  return request<ResponseData<PaginationData<CompanySSD[]>>>('/api/company/base/page', {
    params,
  });
}

/**
 * 更新企业状态
 * @param params
 * @returns
 */
export const updateCompanyState = (id: number | string) =>
  request<ResponseData>('/api/company/state', { data: { id }, method: 'POST' });

/**
 * 获取企业详情
 * @param params
 * @returns
 */
export async function getCompanyDetail(id: number | string) {
  return request<ResponseData<CompanySSD>>('/api/company/base/info', {
    params: { id },
  });
}

/**
 * 新增或编辑企业
 * @param AddOrEditCompanyParams
 * @returns
 */
export async function addOrEditCompany(data: AddOrEditCompanyParams) {
  return request<ResponseData>('/api/company/base/edit', { method: 'POST', data });
}
/**
 * 通过id删除企业
 * @param id string | number
 * @returns
 */
export async function deleteCompany(id: number | string) {
  return request<ResponseData>('/api/company/base/del', { method: 'POST', data: { id } });
}

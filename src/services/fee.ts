import type {
  ProviderFeeListParams,
  ProviderFeeListItemSSD,
  AddProviderFeeParams,
  CustomerFeeListParams,
  CustomerFeeListItemSSD,
  AddCustomerFeeParams,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取服务商费用录入列表
 * @param ProviderFeeListParams
 * @returns
 */
export async function getProviderFeeList(params?: ProviderFeeListParams) {
  return request<ResponseData<PaginationData<ProviderFeeListItemSSD[]>>>(
    '/api/kpost/back/company/cost_record/page',
    {
      params,
    },
  );
}

/**
 * 新增服务商费用录入
 * @param AddProviderFeeParams
 * @returns
 */
export async function addProviderFee(params: AddProviderFeeParams) {
  return request<ResponseData>('/api/kpost/back/company/cost_record/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取客户费用录入列表
 * @param CustomerListParams
 * @returns
 */
export async function getCustomerFeeList(params?: CustomerFeeListParams) {
  return request<ResponseData<PaginationData<CustomerFeeListItemSSD[]>>>(
    '/api/kpost/back/customer/cost_record/page',
    {
      params,
    },
  );
}

/**
 * 新增客户费用录入
 * @param AddCustomerFeeParams
 * @returns
 */
export async function addCustomerFee(params: AddCustomerFeeParams) {
  return request<ResponseData>('/api/kpost/back/customer/cost_record/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

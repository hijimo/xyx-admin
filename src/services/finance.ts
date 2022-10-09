import type {
  CustomerBillListParams,
  CustomerBillListSSD,
  CompanyBillListParams,
  CompanyBillListSSD,
  QuoteResponseData,
  TabStatisticsItemSSD,
  CustomerFeeListItemSSD,
  CustomerFeeListParams,
  AuditFeeParams,
  CreateBillParams,
  EditPackageCustomerParams,
  EditBillingAmountParams,
  BillingFailedListParams,
  BillingFailedListItemSSD,
  ResetCompanyBillParams,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取客户计费明细列表
 * @param params
 * @returns
 */
export async function getCustomerBillDetailList(params: CustomerBillListParams) {
  return request<ResponseData<PaginationData<CustomerBillListSSD[]>>>(
    '/api/kpost/customerBilling/page',
    {
      params,
    },
  );
}

/**
 * 客户计费明细列表导出
 */
export const exportCustomerBillDetailList = '/api/kpost/customerBilling/export';

/**
 * 获取服务商计费明细列表
 * @param params
 * @returns
 */
export async function getCompanyBillList(params: CompanyBillListParams) {
  return request<ResponseData<PaginationData<CompanyBillListSSD[]>>>(
    '/api/kpost/companyBilling/page',
    {
      params,
    },
  );
}

/**
 * 客户计费明细报价设置查询
 */
export async function getCustomerFinanceOfferDetail(id: number | string) {
  return request<ResponseData<QuoteResponseData>>('/api/kpost/customerBilling/offerVal', {
    params: {
      id,
    },
  });
}

/**
 * 服务商计费明细报价设置查询
 */
export async function getCompanyFinanceOfferDetail(id: number | string) {
  return request<ResponseData<QuoteResponseData>>('/api/kpost/companyBilling/offerVal', {
    params: {
      id,
    },
  });
}

/**
 * 服务商计费明细列表导出
 */
export const exportCompanyBillList = '/api/kpost/companyBilling/export';

/**
 * 获取客户费用审核表头统计
 */
export async function getCustomerAuditTabList() {
  return request<ResponseData<TabStatisticsItemSSD[]>>('/api/kpost/back/customer/cost_record/tab');
}

/**
 * 获取客户费用审核列表
 * @param CustomerFeeListParams
 * @returns
 */
export async function getCustomerAuditList(params: CustomerFeeListParams) {
  return request<ResponseData<PaginationData<CustomerFeeListItemSSD[]>>>(
    '/api/kpost/back/customer/cost_record/review',
    {
      params,
    },
  );
}

/**
 * 费用审核
 * @param AuditFeeParams
 * @returns
 */
export async function auditFee(params: AuditFeeParams) {
  return request<ResponseData>('/api/kpost/back/cost_record/review', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取服务商费用审核表头统计
 */
export async function getProviderAuditTabList() {
  return request<ResponseData<TabStatisticsItemSSD[]>>('/api/kpost/back/company/cost_record/tab');
}

/**
 * 获取服务商费用审核列表
 * @param CustomerFeeListParams
 * @returns
 */
export async function getProviderAuditList(params: CustomerFeeListParams) {
  return request<ResponseData<PaginationData<CustomerFeeListItemSSD[]>>>(
    '/api/kpost/back/company/cost_record/review',
    {
      params,
    },
  );
}

/**
 * 生成客户账单
 * @param CreateBillParams
 * @returns
 */
export async function createCustomerBill(params: CreateBillParams) {
  return request<ResponseData>('/api/kpost/cb/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取客户账单
 * @param params
 * @returns
 */
export async function getCustomerBillList(params: CustomerBillListParams) {
  return request<ResponseData<PaginationData<CustomerBillListSSD[]>>>('/api/kpost/cb/list', {
    params,
  });
}

/**
 * 账单作废
 * @param params
 * @returns
 */
export async function voidCustomerBill(params: { id: number }) {
  return request<ResponseData>('/api/kpost/cb/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 客户账单导出
 */
export const exportCustomerBillList = '/api/kpost/cb/export';

/**
 * 包裹客户修改
 * @param EditPackageCustomerParams
 * @returns
 */
export async function editPackageCustomer(params: EditPackageCustomerParams) {
  return request<ResponseData>('/api/kpost/back/changecustomer/batch', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 客户计费明细-修改计费值或计费金额
 * @param params
 * @returns
 */
export async function editBillingAmount(params: EditBillingAmountParams) {
  return request<ResponseData>('/api/kpost/customerBilling/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 客户计费明细-重新计费
 * @param ResetCompanyBillParams
 * @returns
 */
export async function resetCustomerBill(params: ResetCompanyBillParams) {
  return request<ResponseData>('/api/kpost/customerBilling/again/cal', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 服务商计费明细-重新计费
 * @param ResetCompanyBillParams
 * @returns
 */
export async function resetProviderBill(params: ResetCompanyBillParams) {
  return request<ResponseData>('/api/kpost/companyBilling/again/cal', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取计费失败列表
 * @param BillingFailedListParams
 * @returns
 */
export async function getBillingFailedList(params: BillingFailedListParams) {
  return request<ResponseData<PaginationData<BillingFailedListItemSSD[]>>>(
    '/api/kpost/billing/fail/page',
    {
      params,
    },
  );
}

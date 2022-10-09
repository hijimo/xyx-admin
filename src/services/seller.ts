import request from '@/utils/request';
import type { ResponseData, PaginationData } from '@/utils/request';
import type {
  SellerListParams,
  SellerListItemSSD,
  AddSellerParams,
  CommissionListParams,
  CommissionListItemSSD,
  EditCommissionParams,
  ComboCommissionListParams,
  AddComboCommissionParams,
  ComboCommissionListItemSSD,
  SellUserListParams,
  SellUserListItemSSD,
  SellerCustomerListParams,
  SellerCustomerListItemSSD,
} from '@/types';

/**
 * 获取销售员列表
 * @param params
 * @returns
 */
export async function getSellerList(params: SellerListParams) {
  return request<ResponseData<PaginationData<SellerListItemSSD[]>>>('/api/kpost/salerInfo/page', {
    params,
  });
}

/**
 * 获取销售用户下拉列表
 * @param SellUserListParams
 * @returns
 */
export async function getSellUserList(params: SellUserListParams) {
  return request<ResponseData<PaginationData<SellUserListItemSSD[]>>>('/api/kpost/salerInfo/list', {
    params,
  });
}

/**
 * 销售员-新增
 * @param AddSellerParams
 * @returns
 */
export async function addSeller(params: AddSellerParams) {
  return request<ResponseData>('/api/kpost/salerInfo/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 销售员-编辑
 * @param AddSellerParams
 * @returns
 */
export async function editSeller(params: AddSellerParams) {
  return request<ResponseData>('/api/kpost/salerInfo/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取销售佣金明细列表
 * @param CommissionListParams
 * @returns
 */
export async function getCommissionList(params: CommissionListParams) {
  return request<ResponseData<PaginationData<CommissionListItemSSD[]>>>(
    '/api/kpost/salerCommission/page',
    {
      params,
    },
  );
}

/**
 * 修改佣金
 * @param EditCommissionParams
 * @returns
 */
export async function editCommission(params: EditCommissionParams) {
  return request<ResponseData>('/api/kpost/salerCommission/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 销售佣金明细导出URL
export const exportCommissionList = '/api/kpost/salerCommission/export';

/**
 * 获取佣金设置列表
 * @param CommissionListParams
 * @returns
 */
export async function getComboCommissionList(params: ComboCommissionListParams) {
  return request<ResponseData<PaginationData<ComboCommissionListItemSSD[]>>>(
    '/api/kpost/commissionConfig/page',
    {
      params,
    },
  );
}

/**
 * 佣金设置-新增编辑
 * @param AddComboCommissionParams
 * @returns
 */
export async function addCommission(params: AddComboCommissionParams) {
  return request<ResponseData>('/api/kpost/commissionConfig/addOrEdit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取销售员客户列表
 * @param SellerCustomerListParams
 * @returns
 */
export async function getSellerCustomerList(params: SellerCustomerListParams) {
  return request<ResponseData<SellerCustomerListItemSSD[]>>(
    '/api/kpost/salerInfo/queryBindingSaler',
    {
      params,
    },
  );
}

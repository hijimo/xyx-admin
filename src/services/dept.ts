import type { DeptListParams, AddDeptParams, DeptSSD } from '@/types';
import type { ResponseData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取组织列表
 * @param DeptListParams
 * @returns DeptSSD[]
 */
export async function getDeptList(params: DeptListParams) {
  return request<ResponseData<DeptSSD[]>>('/api/dept/page', {
    params,
  });
}
/**
 * 获取组织信息
 * @param params
 * @returns User
 */
export async function getDeptInfo(id: number | string) {
  return request<ResponseData<DeptSSD>>('/api/dept/info', {
    params: { id },
  });
}
/**
 * 根据企业编号查询部门下拉选项
 * @param DeptListParams
 * @returns DeptSSD[]
 */
export async function getDeptListByCompanyNo(companyNo: string) {
  return request<ResponseData<DeptSSD[]>>('/api/dept/selectlist', {
    params: {
      companyNo,
    },
  });
}
/**
 * 根企业编号查询部门树
 * @param DeptListParams
 * @returns DeptSSD[]
 */
export async function getDeptTreeByCompanyNo(companyNo: string) {
  return request<ResponseData<DeptSSD[]>>('/api/dept/tree', {
    params: {
      companyNo,
    },
  });
}
/**
 * 添加组织
 * @param AddDeptParams
 * @returns
 */
export async function addDept(data: AddDeptParams) {
  return request<ResponseData>('/api/dept/edit', {
    method: 'POST',
    data,
  });
}

/**
 * 删除组织
 * @param id number|string
 * @returns
 */
export async function deleteDept(id: number | string) {
  return request<ResponseData>('/api/dept/del', {
    method: 'POST',
    data: { id },
  });
}

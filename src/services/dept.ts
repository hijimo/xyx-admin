import type { DeptListParams, AddDeptParams, DeptSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取组织列表
 * @param DeptListParams
 * @returns DeptSSD[]
 */
export async function getDeptList() {
  return request<ResponseData<DeptSSD[]>>('/api/system/dept/list');
}
/**
 * 获取组织列表树
 * @param DeptListParams
 * @returns DeptSSD[]
 */
export async function getDeptTree() {
  return request<ResponseData<PaginationData<DeptSSD[]>>>('/api/system/dept/treeselect');
}
/**
 * 获取组织信息
 * @param params
 * @returns User
 */
export async function getDeptInfo(deptId: number | string) {
  return request<ResponseData<DeptSSD>>(`/api/system/dept/${deptId}`);
}
/**
 * 添加组织
 * @param AddDeptParams
 * @returns
 */
export async function addDept(data: AddDeptParams) {
  return request<ResponseData>('/api/system/dept/add', {
    method: 'POST',
    data,
  });
}
/**
 * 编辑组织
 * @param AddDeptParams
 * @returns
 */
export async function editDept(data: AddDeptParams) {
  return request<ResponseData>('/api/system/dept/edit', {
    method: 'POST',
    data,
  });
}
/**
 * 删除组织
 * @param id number|string
 * @returns
 */
export async function deleteDept(deptId: number | string) {
  return request<ResponseData>(`/api/system/dept/delete/${deptId}`);
}

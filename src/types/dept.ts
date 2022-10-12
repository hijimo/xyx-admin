import type { PaginationParams } from './common';

export interface DeptListParams extends PaginationParams {
  /**
   * 部门名称
   */
  deptName?: string;
}

export interface AddDeptParams {
  /**
   * 企业编号
   */
  companyNo: string;
  /**
   * 组织描述
   */
  deptDesc: string;
  /**
   * 组织名称
   */
  deptName: string;
  /**
   * 组织代码路径
   */
  deptPath: string | null;
  id: number;
  /**
   * 上级组织Id
   */
  parentId: number;
}
export interface DeptSSD {
  /**
   * 子节点类目
   */
  children?: DeptSSD[];
  /**
   * 子节点集合大小
   */
  childrenSize: number;
  /**
   * 企业名称
   */
  companyName: string;
  /**
   * 企业编号
   */
  companyNo: string;
  /**
   * 组织描述
   */
  deptDesc: string;
  /**
   * 部门路径id,中间用 "," 分隔
   */
  deptPath: string;
  /**
   * 组织级别
   */
  deptLevel: number;
  /**
   * 组织名称
   */
  deptName: string;
  /**
   * 组织编号
   */
  deptNo: string;
  /**
   * 是否有字节点
   */
  hasChildren: boolean;
  id: number;
  /**
   * 父节点id
   */
  parentId: number;
  value: number;
}

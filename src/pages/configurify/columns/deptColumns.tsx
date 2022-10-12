import type { ProColumns } from '@ant-design/pro-table';
import type { DeptSSD } from '@/types';
import { key, option, companyName, companyNo } from './baseColumns';

const deptName: ProColumns<any> = {
  title: '组织名称',
  dataIndex: 'deptName',
  className: 'nowrap',
};

const deptDesc: ProColumns<any> = {
  title: '组织描述',
  dataIndex: 'deptDesc',
  className: 'nowrap',
  search: false,
};

const deptNo: ProColumns<any> = {
  title: '组织编号',
  dataIndex: 'deptNo',
  className: 'nowrap',
  search: false,
};

export const deptColumns: Record<string, ProColumns<DeptSSD>> = {
  key,
  companyNo,
  companyName,
  deptNo,
  deptName,
  deptDesc,
  option,
};

import type { ProColumns } from '@ant-design/pro-table';
import type { DeptSSD } from '@/types';
import { key, option, companyName, companyNo } from './baseColumns';

const deptName: ProColumns<any> = {
  title: '组织名称',
  dataIndex: 'label',
  className: 'nowrap',
};

// const remark: ProColumns<any> = {
//   title: '组织描述',
//   dataIndex: 'remark',
//   className: 'nowrap',
//   search: false,
// };

const deptId: ProColumns<any> = {
  title: '组织编号',
  dataIndex: 'id',
  className: 'nowrap',
  search: false,
};

export const deptColumns: Record<string, ProColumns<DeptSSD>> = {
  // key,
  // deptId,
  deptName,
  // remark,
  option,
};

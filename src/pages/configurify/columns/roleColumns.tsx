import { SwitchDesc } from '@/enum';
import type { ProColumns } from '@ant-design/pro-table';
import type { RoleListItemSSD } from '@/types';
import { key, option, companyNo, status } from './baseColumns';

const roleNo: ProColumns<RoleListItemSSD> = {
  title: '角色编号',
  dataIndex: 'roleNo',
  className: 'nowrap',
};

const roleName: ProColumns<RoleListItemSSD> = {
  title: '角色名称',
  dataIndex: 'roleName',
  className: 'nowrap',
};

const remark: ProColumns<RoleListItemSSD> = {
  title: '角色描述',
  dataIndex: 'remark',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

//

export const roleColumns: Record<string, ProColumns<RoleListItemSSD>> = {
  key,
  // companyNo,
  // companyName,
  // roleNo,
  roleName,
  remark,
  status,
  option,
};

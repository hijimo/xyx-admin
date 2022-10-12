import { SwitchDesc } from '@/enum';
import type { ProColumns } from '@ant-design/pro-table';
import type { RoleListItemSSD } from '@/types';
import { key, option, companyNo, companyName } from './baseColumns';

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

const roleDescription: ProColumns<RoleListItemSSD> = {
  title: '角色描述',
  dataIndex: 'roleDescription',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

export const roleStatusText: ProColumns<RoleListItemSSD> = {
  title: '角色状态',
  dataIndex: 'roleStatus',
  className: 'nowrap',
  valueEnum: SwitchDesc,
};

export const roleColumns: Record<string, ProColumns<RoleListItemSSD>> = {
  key,
  companyNo,
  companyName,
  roleNo,
  roleName,
  roleDescription,
  roleStatusText,
  option,
};

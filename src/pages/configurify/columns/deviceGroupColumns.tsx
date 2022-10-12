import type { ProColumns } from '@ant-design/pro-table';
import type { DeviceGroupSSD } from '@/types';
import { key, option, companyNo, companyName } from './baseColumns';

const code: ProColumns = {
  title: '分组编号',
  dataIndex: 'code',
  className: 'nowrap',
  search: false,
};
const name: ProColumns = {
  title: '分组名称',
  dataIndex: 'name',
  className: 'nowrap',
  search: false,
};

export const deviceGroupColumns: Record<string, ProColumns<DeviceGroupSSD>> = {
  key,
  code,
  name,
  companyNo,
  companyName,
  // status,
  option,
};

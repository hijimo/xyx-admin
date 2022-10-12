import type { ProColumns } from '@ant-design/pro-table';
import { SwitchDesc, BooleanDesc, ResourceTypeDesc } from '@/enum';
import { option } from './baseColumns';

const resourceName: ProColumns<any> = {
  title: '资源名称',
  dataIndex: 'resourceName',
  className: 'nowrap',
};

const resourceUrl: ProColumns<any> = {
  title: '资源地址',
  dataIndex: 'resourceUrl',
  className: 'nowrap',
};

const resourceKey: ProColumns<any> = {
  title: '资源Key',
  dataIndex: 'resourceKey',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

const resourceType: ProColumns<any> = {
  title: '资源类型',
  className: 'nowrap',
  dataIndex: 'resourceType',
  valueEnum: ResourceTypeDesc,
};

const orderNum: ProColumns<any> = {
  title: '排序',
  dataIndex: 'orderNum',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

export const resourceStatusText: ProColumns<any> = {
  title: '资源状态',
  dataIndex: 'resourceStatus',
  className: 'nowrap',
  valueEnum: SwitchDesc,
  hideInForm: true,
  search: false,
};

export const extendFlag: ProColumns<any> = {
  title: '可继承',
  dataIndex: 'extendFlag',
  className: 'nowrap',
  valueEnum: BooleanDesc,
  hideInForm: true,
  search: false,
};

export const moduleNo: ProColumns<any> = {
  title: '模块',
  dataIndex: 'moduleNo',
  className: 'nowrap',
  hideInTable: true,
  order: 100,
};

export const resourceColumns: Record<string, ProColumns<any>> = {
  resourceName,
  resourceUrl,
  resourceKey,
  resourceType,
  orderNum,
  resourceStatusText,
  moduleNo,
  extendFlag,
  option,
};

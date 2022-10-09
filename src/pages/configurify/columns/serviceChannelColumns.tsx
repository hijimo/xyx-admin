import type { ProColumns } from '@ant-design/pro-table';
import { key, option, state } from './commonColumns';

const channelCode: ProColumns<any> = {
  title: '服务渠道编码',
  dataIndex: 'channelCode',
  fixed: 'left',
  className: 'nowrap',
  order: 98,
};

const channelName: ProColumns<any> = {
  title: '服务渠道名称',
  dataIndex: 'channelName',
  className: 'nowrap',
  order: 101,
};

const resourceType: ProColumns<any> = {
  title: '资源类型',
  dataIndex: 'resourceType',
  className: 'nowrap',
  search: false,
  renderText: (_, record) => record.resourceTypeText,
};

const companyId: ProColumns<any> = {
  title: '所属服务商',
  dataIndex: 'companyId',
  className: 'nowrap',
  hideInForm: true,
  order: 100,
  renderText: (_, record) => record.companyName,
};

export const serviceChannelColumns = {
  key,
  channelCode,
  channelName,
  resourceType,
  companyId,
  state,
  option,
};

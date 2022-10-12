import type { ProColumns } from '@ant-design/pro-table';
import { BusinessTypeDesc, NormalStatusDesc } from '@/enum';

import ColumnEllipsisWrap from '@/components/CommonTable/ColumnEllipsisWrap';

import { key, option, companyName, gmtCreate } from './baseColumns';
import type { LogSSD } from '@/types';

const businessType: ProColumns<LogSSD> = {
  title: '	业务类型',
  dataIndex: 'businessType',
  className: 'nowrap',
  valueEnum: BusinessTypeDesc,
  renderText: (_, record) => record.businessTypeText,
};

const title: ProColumns<LogSSD> = {
  title: '操作模块',
  dataIndex: 'title',
  className: 'nowrap',
};

const requestMethod: ProColumns<LogSSD> = {
  title: '请求方式',
  dataIndex: 'requestMethod',
  className: 'nowrap',
  search: false,
};

const operUrl: ProColumns<LogSSD> = {
  title: '请求地址',
  dataIndex: 'operUrl',
  className: 'nowrap',
  search: false,
};

const operParam: ProColumns<LogSSD> = {
  title: '请求参数	',
  dataIndex: 'operParam',
  className: 'nowrap',
  width: 120,
  ellipsis: true,
  render: (_) => <ColumnEllipsisWrap width={120}>{_}</ColumnEllipsisWrap>,
  search: false,
};

export const status: ProColumns<LogSSD> = {
  title: '状态',
  dataIndex: 'status',
  className: 'nowrap',
  valueEnum: NormalStatusDesc,
};

export const logColumns: Record<string, ProColumns<LogSSD>> = {
  key,
  title,
  businessType,
  companyName,
  requestMethod,
  operUrl,
  operParam,
  status,
  gmtCreate,
  option,
};

import type { ProColumns } from '@ant-design/pro-table';
import { key, rangeTime, gmtCreate, createName } from './commonColumns';
import { whNoList } from './packageColumns';

const bizNo: ProColumns<any> = {
  title: '出货总单编号',
  dataIndex: 'bizNo',
  className: 'nowrap',
};

const tcChannelName: ProColumns<any> = {
  title: '头程渠道',
  dataIndex: 'tcChannelName',
  className: 'nowrap',
};

export const ldpChannelName: ProColumns<any> = {
  title: '落地配渠道',
  dataIndex: 'ldpChannelName',
  className: 'nowrap',
};

const tcChannelCode: ProColumns<any> = {
  title: '头程渠道编码',
  dataIndex: 'tcChannelCode',
  className: 'nowrap',
};

const ldpChannelCode: ProColumns<any> = {
  title: '落地配渠道编码',
  dataIndex: 'ldpChannelCode',
  className: 'nowrap',
};

const totalTicket: ProColumns<any> = {
  title: '总票数',
  dataIndex: 'totalTicket',
  className: 'nowrap',
  search: false,
};

const totalNum: ProColumns<any> = {
  title: '总件数',
  dataIndex: 'totalNum',
  className: 'nowrap',
  search: false,
};

export const totalWeight: ProColumns<any> = {
  title: '总实重(KG)',
  dataIndex: 'totalWeight',
  className: 'nowrap',
  search: false,
};

const gmtStart: ProColumns<any> = {
  title: '起始时间',
  dataIndex: 'gmtStart',
  className: 'nowrap',
  search: false,
};

const gmtEnd: ProColumns<any> = {
  title: '截止时间',
  dataIndex: 'gmtEnd',
  className: 'nowrap',
  search: false,
};

export const shipmentManifestColumns = {
  key,
  bizNo,
  whNoList,
  tcChannelName,
  ldpChannelName,
  tcChannelCode,
  ldpChannelCode,
  totalTicket,
  totalNum,
  totalWeight,
  createName,
  gmtStart,
  gmtEnd,
  gmtCreate,
  rangeTime,
};

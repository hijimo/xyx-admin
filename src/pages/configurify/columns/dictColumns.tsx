import type { ProColumns } from '@ant-design/pro-table';
import type { DictItemSSD, DictSSD } from '@/types';
import { key, option, gmtCreate } from './baseColumns';

const dictName: ProColumns = {
  title: '字典名称',
  dataIndex: 'dictName',
  className: 'nowrap',
};
const dictLabel: ProColumns = {
  title: '字典项名称',
  dataIndex: 'dictLabel',
  className: 'nowrap',
  search: false,
};
const dictType: ProColumns = {
  title: '标签类型',
  dataIndex: 'dictType',
  className: 'nowrap',
  search: false,
};

const dictSort: ProColumns = {
  title: '排序',
  dataIndex: 'dictSort',
  className: 'nowrap',
  search: false,
};
const remark: ProColumns = {
  title: '备注',
  dataIndex: 'remark',
  className: 'nowrap',
  search: false,
};

export const dictColumns: Record<string, ProColumns<DictSSD>> = {
  key,
  dictName,
  dictType,
  gmtCreate,
  option,
};
export const dictItemColumns: Record<string, ProColumns<DictItemSSD>> = {
  key,
  dictType,
  dictLabel,
  dictSort,
  gmtCreate,
  remark,
  option,
};

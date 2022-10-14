import type { ProColumns } from '@ant-design/pro-table';
import type { DictItemSSD, DictSSD } from '@/types';
import _last from 'lodash/last';
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

const image: ProColumns = {
  title: '缩略图',
  dataIndex: 'image',
  className: 'nowrap',
  search: false,
  render: (_, record) => {
    const url = _last(JSON.parse(record.dictValue)?.image)?.url;
    return <img src={url} style={{ width: 80, height: 80 }} />;
  },
};
const price: ProColumns = {
  title: '额度',
  dataIndex: 'price',
  className: 'nowrap',
  search: false,
  renderText: (_, record) => {
    const text = JSON.parse(record.dictValue)?.price || '--';
    return text;
  },
};
const remark2: ProColumns = {
  title: '说明',
  dataIndex: 'remark',
  className: 'nowrap',
  search: false,
  renderText: (_, record) => {
    const text = JSON.parse(record.dictValue)?.remark || '--';
    return text;
  },
};

export const configStrategyColumns = {
  key,
  dictLabel: {
    ...dictLabel,
    title: '名称',
  },
  remark2,
  dictSort,
  gmtCreate,
  option,
};
export const configRewardColumns = {
  key,
  dictLabel: {
    ...dictLabel,
    title: '名称',
  },
  image,
  price,
  remark2,
  dictSort,
  gmtCreate,
  option,
};

export const configImageColumns = {
  key,
  dictLabel: {
    ...dictLabel,
    title: '名称',
  },
  image,
  dictSort,
  gmtCreate,
  option,
};

export const configAudioColumns = {
  key,
  dictLabel: {
    ...dictLabel,
    title: '名称',
  },
  dictSort,
  gmtCreate,
  option,
};

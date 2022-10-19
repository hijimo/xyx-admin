import type { ProColumns } from '@ant-design/pro-table';
import type { StrategySSD } from '@/types';

import { key, option, status } from './baseColumns';

const strategyName: ProColumns = {
  title: '主题',
  dataIndex: 'strategyName',
  className: 'nowrap',
  search: false,
};

export const strategyColumns: Record<string, ProColumns<StrategySSD & { option: any }>> = {
  key,
  strategyName,
  status: {
    ...status,
    dataIndex: 'strategyStatus',
  },
  option,
};

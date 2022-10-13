import type { ProColumns } from '@ant-design/pro-table';
import type { StrategySSD } from '@/types';

import { key, option, status } from './baseColumns';

const strategyTitle: ProColumns = {
  title: '主题',
  dataIndex: 'strategyTitle',
  className: 'nowrap',
  search: false,
};

export const strategyColumns: Record<string, ProColumns<StrategySSD & { option: any }>> = {
  key,
  strategyTitle,
  status: {
    ...status,
    dataIndex: 'strategyStatus',
  },
  option,
};

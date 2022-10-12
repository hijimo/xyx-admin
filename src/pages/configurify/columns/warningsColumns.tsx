import type { ProColumns } from '@ant-design/pro-table';
import type { WarningsSSD } from '@/types';
import { key, option, status } from './baseColumns';

const context: ProColumns = {
  title: '规则表达式',
  dataIndex: 'context',
  className: 'nowrap',
};

const copyTemp: ProColumns = {
  title: '告警文案模板',
  dataIndex: 'copyTemp',
  className: 'nowrap',
  search: false,
};

const deviceCode: ProColumns = {
  title: '物模型编号',
  dataIndex: 'deviceCode',
  className: 'nowrap',
};

const warnCode: ProColumns = {
  title: '告警规则编号',
  dataIndex: 'warnCode',
  className: 'nowrap',
};

const warnName: ProColumns = {
  title: '告警规则名称',
  dataIndex: 'warnName',
  className: 'nowrap',
};

export const warningsRuleColumns: Record<string, ProColumns<WarningsSSD>> = {
  key,
  warnName,
  warnCode,
  context,
  copyTemp,
  deviceCode,
  status,
  option,
};

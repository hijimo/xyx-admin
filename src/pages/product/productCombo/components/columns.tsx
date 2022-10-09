import type { ProColumns } from '@ant-design/pro-table';

const cpName: ProColumns<any> = {
  title: '线路',
  dataIndex: 'cpName',
  className: 'nowrap',
};
const expenseItemName: ProColumns<any> = {
  title: '费用项',
  dataIndex: 'expenseItemName',
  className: 'nowrap',
};

const priceLevelName: ProColumns<any> = {
  title: '价格等级',
  dataIndex: 'priceLevelName',
  className: 'nowrap',
};

export default {
  cpName,
  expenseItemName,
  priceLevelName,
};

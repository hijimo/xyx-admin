import type { ProColumns } from '@ant-design/pro-table';
import { option, expenseItem, expenseCode } from './commonColumns';

const billingNodeText: ProColumns<any> = {
  title: '计费节点',
  dataIndex: 'billingNodeText',
  className: 'nowrap',
};

const settleCurrencyText: ProColumns<any> = {
  title: '结算币种',
  dataIndex: 'settleCurrencyText',
  className: 'nowrap',
};

const billingDimensionText: ProColumns<any> = {
  title: '计费维度',
  dataIndex: 'billingDimensionText',
  className: 'nowrap',
};

const offerTypeText: ProColumns<any> = {
  title: '计费单位',
  dataIndex: 'offerTypeText',
  className: 'nowrap',
};

export const freightColumns: Record<string, ProColumns<any>> = {
  expenseItem,
  expenseCode,
  billingNodeText,
  settleCurrencyText,
  billingDimensionText,
  offerTypeText,
  option,
};

export const miscellaneousFeesColumns: Record<string, ProColumns<any>> = {
  expenseItem: {
    ...expenseItem,
    search: false,
  },
  billingNodeText: {
    ...billingNodeText,
    search: false,
  },
  option,
};

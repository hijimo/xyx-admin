import type { ProColumns } from '@ant-design/pro-table';
import { ColumnEllipsisWrap } from '@/components/CommonTable';
import { key, option } from './commonColumns';

const orgCode: ProColumns<any> = {
  title: '编号',
  dataIndex: 'orgCode',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

const companyName: ProColumns<any> = {
  title: '机构名称',
  dataIndex: 'companyName',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  ellipsis: true,
  width: 200,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

const openingBank: ProColumns<any> = {
  title: '开户行',
  dataIndex: 'openingBank',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  ellipsis: true,
  width: 200,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

const payeeName: ProColumns<any> = {
  title: '收款单位名称',
  dataIndex: 'payeeName',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  ellipsis: true,
  width: 200,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

const account: ProColumns<any> = {
  title: '账户',
  dataIndex: 'account',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  ellipsis: true,
  width: 200,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

const alipayAccount: ProColumns<any> = {
  title: '支付宝账户',
  dataIndex: 'alipayAccount',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  ellipsis: true,
  width: 200,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

export const operatingOrganizationsColumns = {
  key,
  orgCode,
  companyName,
  openingBank,
  payeeName,
  account,
  alipayAccount,
  option,
};

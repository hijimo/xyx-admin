import type { ProColumns } from '@ant-design/pro-table';
import { SwitchDesc } from '@/enum';
import { key, option, gmtCreate, companyNo, companyName } from './baseColumns';

const keyword: ProColumns<any> = {
  title: '关键词',
  dataIndex: 'keyword',
  className: 'nowrap',
  hideInForm: true,
  hideInTable: true,
  order: 100,
  fieldProps: {
    placeholder: '请输入企业名称/编号',
  },
};

const companyEmail: ProColumns<any> = {
  title: '邮箱',
  dataIndex: 'companyEmail',
  className: 'nowrap',
};

const contactPerson: ProColumns<any> = {
  title: '联系人',
  dataIndex: 'contactPerson',
  search: false,
  className: 'nowrap',
};
const contactTel: ProColumns<any> = {
  title: '联系电话',
  dataIndex: 'contactTel',
  className: 'nowrap',
  search: false,
};
const contactAddress: ProColumns<any> = {
  title: '企业地址',
  dataIndex: 'address',
  search: false,
  className: 'nowrap',
  width: 200,
  ellipsis: true,
  render: (_) => (
    <div style={{ width: 200, wordWrap: 'break-word', wordBreak: 'break-word' }}>{_ || '--'}</div>
  ),
};
const state: ProColumns<any> = {
  title: '状态',
  dataIndex: 'state',
  valueEnum: SwitchDesc,
  className: 'nowrap',
};
export const userColumns: Record<string, ProColumns<any>> = {
  key,
  keyword,
  companyNo,
  companyName,
  companyEmail,
  contactPerson,
  contactTel,
  contactAddress,
  state,
  gmtCreate,
  option,
};

import produce from 'immer';
import type { ProColumns } from '@ant-design/pro-table';
import { SettlementTypeDesc, EnableTypeDesc, ServiceTypeDesc } from '@/enum';
import EmptyWrap from '@/components/EmptyWrap';
import ColumnEllipsisWrap from '@/components/CommonTable/ColumnEllipsisWrap';
import EnumSelect from '@/pages/components/EnumSelect';
import SellerSelect from '@/pages/components/SellerSelect';
import ProductComboSelect from '@/pages/components/ProductComboSelect';
import { key, option, gmtCreate, keyword } from './commonColumns';

const companyNo: ProColumns<any> = {
  title: '服务商编号',
  dataIndex: 'companyNo',
  className: 'nowrap',
  fixed: 'left',
  search: false,
};

export const comboName: ProColumns<any> = {
  title: '签约线路套餐',
  dataIndex: 'comboId',
  className: 'nowrap',
  renderFormItem: () => <ProductComboSelect placeholder="请输入或选择" />,
  render: (_, record) => <EmptyWrap value={record?.comboName} />,
};

const companyName: ProColumns<any> = {
  title: '服务商名称',
  dataIndex: 'companyName',
  className: 'nowrap',
  search: false,
};

const bizType: ProColumns<any> = {
  title: '业务类型',
  dataIndex: 'bizType',
  className: 'nowrap',
  renderFormItem: () => <EnumSelect enumKey="companyBizTypeEnum" placeholder="请选择" />,
  render: (_, record) => <EmptyWrap value={record?.bizTypeText} />,
};

export const companyEmail: ProColumns<any> = {
  title: '邮箱',
  dataIndex: 'companyEmail',
  className: 'nowrap',
  hideInForm: true,
};

const settleType: ProColumns<any> = {
  title: '结算方式',
  dataIndex: 'settleType',
  className: 'nowrap',
  valueEnum: SettlementTypeDesc,
};

const state: ProColumns<any> = {
  title: '状态',
  dataIndex: 'state',
  className: 'nowrap',
  valueEnum: EnableTypeDesc,
};

//客户
const customerKeywordCloumn = produce(keyword, (draft) => {
  draft.fieldProps = {
    placeholder: '客户编号/公司名称',
  };
});

const customerNoCloumn = produce(companyNo, (draft) => {
  draft.title = '客户编号';
});

const customerNameCloumn = produce(companyName, (draft) => {
  draft.title = '公司名称';
});

export const belongSaler: ProColumns<any> = {
  title: '销售员名称',
  dataIndex: 'belongSaler',
  className: 'nowrap',
  renderFormItem: () => <SellerSelect />,
  render: (_, record) => <EmptyWrap value={record?.belongSalerText} />,
};

const thresholdValue: ProColumns<any> = {
  title: '重量阈值(KG)',
  dataIndex: 'thresholdValue',
  className: 'nowrap',
  search: false,
};

export const customerColumns = {
  key,
  customerKeywordCloumn,
  customerNoCloumn,
  customerNameCloumn,
  bizType,
  belongSaler,
  comboName,
  thresholdValue,
  companyEmail,
  settleType,
  state,
  gmtCreate,
  option,
};

export const customerFilterColumns = {
  key,
  customerKeywordCloumn,
  customerNameCloumn,
  customerNoCloumn,
  settleType,
};

//服务商
const companyKeywordCloumn = produce(keyword, (draft) => {
  draft.fieldProps = {
    placeholder: '服务商名称/编号',
  };
});

const companyType: ProColumns<any> = {
  title: '服务商类型',
  dataIndex: 'companyType',
  valueEnum: ServiceTypeDesc,
  className: 'nowrap',
  renderText: (_, record) => <EmptyWrap value={`${record.companyType}`} />,
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
  title: '公司地址',
  dataIndex: 'address',
  search: false,
  className: 'nowrap',
  width: 200,
  ellipsis: true,
  render: (_) => <ColumnEllipsisWrap width={200}>{_}</ColumnEllipsisWrap>,
};

export const companyColumns = {
  key,
  companyKeywordCloumn,
  companyNo,
  companyName,
  companyEmail,
  companyType,
  settleType,
  contactPerson,
  contactTel,
  contactAddress,
  state,
  gmtCreate,
  option,
};

const companyNoSearchCloumn = produce(companyNo, (draft) => {
  draft.search = undefined;
});

const companyNameSearchCloumn = produce(companyName, (draft) => {
  draft.search = undefined;
});

export const companyFilterColumns = {
  key,
  companyNoSearchCloumn,
  companyNameSearchCloumn,
  settleType,
};

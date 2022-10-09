import produce from 'immer';
import type { ProColumns } from '@ant-design/pro-table';
import EmptyWrap from '@/components/EmptyWrap';
import ProductComboSelect from '@/pages/components/ProductComboSelect';
import {
  key,
  option,
  gmtCreate,
  state,
  waybillNo,
  customerNo,
  customerName,
} from './commonColumns';
import { companyEmail, comboName, belongSaler } from './companyColumns';
import { gmtOutbound, stateMultiple } from './packageColumns';

const userNo: ProColumns<any> = {
  title: '销售员编号',
  dataIndex: 'userNo',
  className: 'nowrap',
};

const userName: ProColumns<any> = {
  title: '销售员名称',
  dataIndex: 'userName',
  className: 'nowrap',
};

const userTel: ProColumns<any> = {
  title: '手机号',
  dataIndex: 'userTel',
  className: 'nowrap',
};

const customerCount: ProColumns<any> = {
  title: '客户数',
  dataIndex: 'customerCount',
  className: 'nowrap',
  search: false,
};

const commissionTotalStr: ProColumns<any> = {
  title: '累计业绩(￥)',
  dataIndex: 'commissionTotalStr',
  className: 'nowrap',
  search: false,
};

const commissionMonthStr: ProColumns<any> = {
  title: '当月业绩(￥)',
  dataIndex: 'commissionMonthStr',
  className: 'nowrap',
  search: false,
};

const userEmail = produce(companyEmail, (draft) => {
  draft.dataIndex = 'userEmail';
});

export const sellerColumns = {
  key,
  userNo,
  userName,
  userEmail,
  userTel,
  customerCount,
  commissionTotalStr,
  commissionMonthStr,
  state,
  gmtCreate,
  option,
};

// 销售佣金明细
const packageWeight: ProColumns<any> = {
  title: '包裹实重(KG)',
  dataIndex: 'packageWeight',
  className: 'nowrap',
  search: false,
};

const commissionTotalColumn = produce(commissionTotalStr, (draft) => {
  draft.title = '佣金金额(￥)';
});

const commissionSellerNo = produce(userNo, (draft) => {
  draft.search = false;
});

const customerNoColumn = produce(customerNo, (draft) => {
  draft.search = false;
});

const commissionComboNameColumn = produce(comboName, (draft) => {
  draft.search = false;
});

const packageStatus = produce(stateMultiple, (draft) => {
  draft.dataIndex = 'packageStatus';
});

const commissionBelongSalerColumn = produce(belongSaler, (draft) => {
  draft.dataIndex = 'userNo';
  draft.render = (_, record) => <EmptyWrap value={record.userName} />;
});

export const commissionColumns = {
  key,
  waybillNo,
  customerNoColumn,
  customerName,
  commissionComboNameColumn,
  commissionSellerNo,
  commissionBelongSalerColumn,
  packageWeight,
  commissionTotalColumn,
  packageStatus,
  gmtOutbound,
  option,
};

// 佣金设置
const comboNo: ProColumns<any> = {
  title: '线路套餐编号',
  dataIndex: 'comboNo',
  className: 'nowrap',
  search: false,
};

const comboNameColumn = produce(comboName, (draft) => {
  draft.title = '线路套餐名称';
  draft.search = undefined;
  draft.dataIndex = 'comboNo';
  draft.renderFormItem = () => (
    <ProductComboSelect placeholder="请输入或选择" valueType="comboNo" />
  );
});

const beforeCommission: ProColumns<any> = {
  title: '前三个月销售佣金',
  dataIndex: 'beforeCommission',
  className: 'nowrap',
  search: false,
  render: (_, record) => <EmptyWrap value={record.beforeCommissionStr} />,
};

const afterCommission: ProColumns<any> = {
  title: '后三个月销售佣金',
  dataIndex: 'afterCommission',
  className: 'nowrap',
  search: false,
  render: (_, record) => <EmptyWrap value={record.afterCommissionStr} />,
};

export const gmtModified: ProColumns<any> = {
  title: '更新时间',
  dataIndex: 'gmtModified',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  fixed: 'right',
};

export const comboCommissionColumns = {
  key,
  comboNo,
  comboNameColumn,
  beforeCommission,
  afterCommission,
  gmtModified,
  option,
};

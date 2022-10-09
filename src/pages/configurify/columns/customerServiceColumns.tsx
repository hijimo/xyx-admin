import _omit from 'lodash/omit';
import produce from 'immer';
import type { ProColumns } from '@ant-design/pro-table';
import { BatchStateDesc /* , DefaultTypeDesc */ } from '@/enum';
import EmptyWrap from '@/components/EmptyWrap';
import EnumSelect from '@/pages/components/EnumSelect';
import MultiLineInput from '@/components/MultiLineInput';
import {
  key,
  option,
  waybillNo,
  gmtCreate,
  rangeTime,
  remark,
  auditState,
  companyId,
  customerId,
  expenseItem,
  createName,
} from './commonColumns';
import { countryId, ladingNo, gmtOutbound, whNoList, batchNo, uniqueNo } from './packageColumns';
import { DATE_FORMAT_DATETIME_MINUTES, DATE_FORMAT_TIME_MINUTES } from '@/utils/variables';

const ladingNoColumn = _omit(ladingNo, ['order']);

export const bizNo: ProColumns<any> = {
  title: '业务号',
  dataIndex: 'bizNo',
  className: 'nowrap',
  renderFormItem: (_, config, form) => <MultiLineInput onSearch={form.submit} />,
  order: 100,
};

export const waybillNoColumn = produce(bizNo, (draft: any) => {
  draft.title = '运单号';
});

const deliveryCode: ProColumns<any> = {
  title: '落地配编码',
  dataIndex: 'deliveryCode',
  className: 'nowrap',
  renderFormItem: (_, config, form) => <MultiLineInput onSearch={form.submit} />,
};

const packageNum: ProColumns<any> = {
  title: '包裹数量',
  dataIndex: 'packageNum',
  className: 'nowrap',
  search: false,
};

const packageWeight: ProColumns<any> = {
  title: '包裹总重(KG)',
  dataIndex: 'packageWeight',
  className: 'nowrap',
  search: false,
};

const state: ProColumns<any> = {
  title: '状态',
  dataIndex: 'state',
  className: 'nowrap',
  hideInForm: true,
  valueEnum: BatchStateDesc,
};

/* const sensitive: ProColumns<any> = {
  title: '是否敏感',
  dataIndex: 'sensitive',
  valueEnum: DefaultTypeDesc,
  className: 'nowrap',
}; */

const flightNo: ProColumns<any> = {
  title: '航班号',
  dataIndex: 'flightNo',
  className: 'nowrap',
  search: false,
};

const gmtBag: ProColumns<any> = {
  title: '装袋时间',
  dataIndex: 'gmtBag',
  className: 'nowrap',
  valueType: 'dateTimeRange',
  fieldProps: {
    showTime: { format: DATE_FORMAT_TIME_MINUTES },
    format: DATE_FORMAT_DATETIME_MINUTES,
  },
  render: (_, record) => <EmptyWrap value={record.gmtBag} />,
};

export const batchNoColumn = produce(batchNo, (draft: any) => {
  draft.title = '袋牌号';
});

export const searchPackColumns: Record<string, ProColumns<any>> = {
  key,
  batchNoColumn,
  uniqueNo: {
    ...uniqueNo,
    hideInTable: true,
    renderFormItem: undefined,
  },
  whNoList,
  deliveryCode,
  packageNum,
  countryId,
  packageWeight,
  state,
  // sensitive,
  ladingNoColumn,
  flightNo,
  gmtBag,
  gmtOutbound,
  option,
};

// 轨迹录入
const trackNode: ProColumns<any> = {
  title: '轨迹节点',
  dataIndex: 'trackNode',
  className: 'nowrap',
  renderFormItem: () => <EnumSelect placeholder="请选择轨迹节点" enumKey={['newTrackNodeEnum']} />,
  render: (_, record) => <EmptyWrap value={record.trackNodeText} />,
};

const shipmentNo: ProColumns<any> = {
  title: '出货总单编号',
  dataIndex: 'shipmentNo',
  className: 'nowrap',
};

const happenTime: ProColumns<any> = {
  title: '发生时间',
  dataIndex: 'happenTime',
  className: 'nowrap',
  valueType: 'dateTimeRange',
  fieldProps: {
    showTime: { format: DATE_FORMAT_TIME_MINUTES },
    format: DATE_FORMAT_DATETIME_MINUTES,
  },
  render: (_, record) => <EmptyWrap value={record.happenTime} />,
};

const happenPlace: ProColumns<any> = {
  title: '发生地点',
  dataIndex: 'happenPlace',
  className: 'nowrap',
  search: false,
};
const trackRemark: ProColumns<any> = {
  title: '轨迹描述',
  dataIndex: 'remark',
  ellipsis: true,
  width: 200,
  className: 'nowrap',
  search: false,
};
export const expressTraceColumns: Record<string, ProColumns<any>> = {
  key,
  waybillNo,
  shipmentNo,
  ladingNoColumn,
  trackNode,
  happenPlace,
  happenTime,
  trackRemark,
  gmtCreate,
};

export const amountText: ProColumns<any> = {
  title: '金额(￥)',
  dataIndex: 'amountText',
  className: 'nowrap',
  search: false,
};

export const amount: ProColumns<any> = {
  title: '金额',
  dataIndex: 'amountText',
  className: 'nowrap',
  search: false,
};

export const settleCurrencyText: ProColumns<any> = {
  title: '币制',
  dataIndex: 'settleCurrencyText',
  className: 'nowrap',
  search: false,
};

export const failReason: ProColumns<any> = {
  title: '不通过原因',
  dataIndex: 'failReason',
  className: 'nowrap',
  search: false,
};
export const gmtAudit: ProColumns<any> = {
  title: '审核时间',
  dataIndex: 'gmtAudit',
  className: 'nowrap',
  search: false,
};

export const customerFeeColumns: Record<string, ProColumns<any>> = {
  key,
  waybillNoColumn,
  expenseItem,
  amountText,
  customerId,
  remark,
  auditState,
  failReason,
  createName,
  gmtCreate,
  rangeTime,
  gmtAudit,
};

export const billingDimensionText: ProColumns<any> = {
  title: '费用维度',
  dataIndex: 'billingDimensionText',
  className: 'nowrap',
  search: false,
};

export const providerFeeColumns: Record<string, ProColumns<any>> = {
  key,
  bizNo,
  billingDimensionText,
  expenseItem,
  amount,
  settleCurrencyText,
  companyId,
  remark,
  auditState,
  failReason,
  createName,
  gmtCreate,
  rangeTime,
  gmtAudit,
};

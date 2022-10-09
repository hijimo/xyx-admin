import produce from 'immer';
import type { ProColumns } from '@ant-design/pro-table';
import {
  UnitTypeDesc,
  CreditedTypeDesc,
  SettlementTypeDesc,
  DefaultTypeDesc,
  CompanyType,
} from '@/enum';
import EmptyWrap from '@/components/EmptyWrap';
import MultiLineInput from '@/components/MultiLineInput';
import EnumSelect from '@/pages/components/EnumSelect';
import CompanySelect from '@/pages/components/CompanySelect';
import SettingTypeSelect from '@/pages/components/SettingTypeSelect';
import {
  key,
  gmtCreate,
  option,
  rangeTime,
  customerId,
  companyId,
  auditState,
  remark,
  expenseItem,
  expenseItemAll,
  createName,
  waybillNo,
} from './commonColumns';
import {
  forecastWeight,
  realWeight,
  volumeWeight,
  oldShipNo,
  gmtInStore,
  ladingNo,
  cpCode,
} from './packageColumns';
import {
  amount,
  amountText,
  waybillNoColumn,
  billingDimensionText,
  settleCurrencyText,
  failReason,
  gmtAudit,
  bizNo,
} from './customerServiceColumns';
import { DATE_FORMAT_DATETIME_MINUTES, DATE_FORMAT_TIME_MINUTES } from '@/utils/variables';

export const auditName = produce(createName, (draft: any) => {
  draft.title = '审核人';
});

const offerTypeText: ProColumns<any> = {
  title: '计费单位',
  dataIndex: 'offerTypeText',
  search: false,
  className: 'nowrap',
};

const bizTypeText: ProColumns<any> = {
  title: '计费维度',
  dataIndex: 'bizTypeText',
  className: 'nowrap',
  search: false,
};

const billingMethodText: ProColumns<any> = {
  title: '计费方式',
  dataIndex: 'billingMethodText',
  className: 'nowrap',
  search: false,
};

const billingVal: ProColumns<any> = {
  title: '计费值',
  dataIndex: 'billingVal',
  className: 'nowrap',
  search: false,
  render: (text, record) => <EmptyWrap value={text} suffix={UnitTypeDesc[record.billingMethod]} />,
};

const offerChanged: ProColumns<any> = {
  title: '有效报价变更',
  dataIndex: 'offerChanged',
  className: 'nowrap',
  valueEnum: DefaultTypeDesc,
  render: (_, record) => (
    <EmptyWrap
      type={record?.offerChanged === 1 ? 'danger' : undefined}
      value={DefaultTypeDesc[record?.offerChanged]?.text}
    />
  ),
};

// 客户计费明细
const cpName: ProColumns<any> = {
  title: '客户产品',
  dataIndex: 'cpName',
  className: 'nowrap',
};

const calVal: ProColumns<any> = {
  title: '计费值',
  dataIndex: 'calVal',
  className: 'nowrap',
  search: false,
  render: (text, record) => <EmptyWrap value={text} suffix={UnitTypeDesc[record?.offerType]} />,
};

const creditedFlag: ProColumns<any> = {
  title: '状态',
  dataIndex: 'creditedFlag',
  className: 'nowrap',
  valueEnum: CreditedTypeDesc,
};

const billNo: ProColumns<any> = {
  title: '账单编号',
  dataIndex: 'billNo',
  className: 'nowrap',
  renderFormItem: (_, config, form) => <MultiLineInput onSearch={form.submit} />,
};
export const customerChargeDetailColumns: Record<string, ProColumns<any>> = {
  key,
  bizNo,
  oldShipNo: {
    ...oldShipNo,
    search: false,
  },
  bizTypeText,
  customerId,
  cpName,
  cpCode: {
    ...cpCode,
    title: '客户产品编号',
    renderFormItem: undefined,
    renderText: undefined,
  },
  expenseItem,
  amount,
  settleCurrencyText,
  offerTypeText,
  calVal,
  creditedFlag,
  offerChanged,
  billNo,
  forecastWeight,
  realWeight,
  volumeWeight,
  gmtCreate,
  gmtInStore: {
    ...gmtInStore,
    search: false,
  },
  rangeTime,
  option,
};
// 服务商计费明细

const spName: ProColumns<any> = {
  title: '服务产品',
  dataIndex: 'spName',
  className: 'nowrap',
};
const spNo: ProColumns<any> = {
  title: '服务产品编号',
  dataIndex: 'spNo',
  className: 'nowrap',
};
const postCode: ProColumns<any> = {
  title: '邮编',
  dataIndex: 'postCode',
  className: 'nowrap',
  search: false,
};

export const serviceChargeDetailColumns: Record<string, ProColumns<any>> = {
  key,
  bizNo,
  ladingNo,
  bizTypeText,
  companyId: {
    ...companyId,
    renderFormItem: () => (
      <CompanySelect
        companyType={CompanyType.COMPANY}
        placeholder="请输入或选择"
        maxTagCount="responsive"
        mode="multiple"
      />
    ),
  },
  spName,
  spNo,
  postCode,
  expenseItemAll: {
    ...expenseItemAll,
    renderFormItem: () => (
      <SettingTypeSelect
        paramType={[1, 6]}
        placeholder="请选择"
        labelInValue={false}
        mode="multiple"
        maxTagCount="responsive"
      />
    ),
  },
  amount,
  settleCurrencyText,
  offerTypeText,
  forecastWeight,
  realWeight,
  volumeWeight,
  calVal,
  offerChanged,
  gmtCreate,
  rangeTime,
  option,
};

// 成本分析
const customerNo: ProColumns<any> = {
  title: '客户编号',
  dataIndex: 'orderNo',
  className: 'nowrap',
};
const cost: ProColumns<any> = {
  title: '成本',
  dataIndex: 'cost',
  search: false,
  className: 'nowrap',
};
const sale: ProColumns<any> = {
  title: '销售额',
  dataIndex: 'sale',
  search: false,
  className: 'nowrap',
};
const stockOutTime: ProColumns<any> = {
  title: '出库日期',
  dataIndex: 'stockOutTime',
  className: 'nowrap',
  valueType: 'dateTimeRange',
  fieldProps: {
    showTime: { format: DATE_FORMAT_TIME_MINUTES },
    format: DATE_FORMAT_DATETIME_MINUTES,
  },
  render: (_, record) => <EmptyWrap value={record.stockOutTime} />,
};
const profit: ProColumns<any> = {
  title: '利润',
  dataIndex: 'profit',
  className: 'nowrap',
  search: false,
};

export const financeCostAnalyzeColumns: Record<string, ProColumns<any>> = {
  key,
  customerNo,
  bizNo,
  cost,
  sale,
  profit,
  stockOutTime,
  option,
};

const tNo: ProColumns<any> = {
  title: '提单号',
  dataIndex: 'tNo',
  search: false,
  className: 'nowrap',
};
const billingVal2: ProColumns<any> = {
  title: '分摊计费值',
  dataIndex: 'billingVal2',
  search: false,
  className: 'nowrap',
};
const totalAmount: ProColumns<any> = {
  title: '总金额',
  dataIndex: 'totalAmount',
  search: false,
  className: 'nowrap',
};
const totalAmount2: ProColumns<any> = {
  title: '分摊金额',
  dataIndex: 'totalAmount',
  search: false,
  className: 'nowrap',
};
const exchangeRate: ProColumns<any> = {
  title: '汇率',
  dataIndex: 'exchangeRate',
  search: false,
  className: 'nowrap',
};

// 成本明细
export const financeCostColumns: Record<string, ProColumns<any>> = {
  key,
  tNo,
  spName,
  expenseItem,
  billingMethodText,
  billingVal,
  billingVal2,
  totalAmount,
  totalAmount2,
  exchangeRate,
  cost,
};
// 销售明细
export const financeSaleColumns: Record<string, ProColumns<any>> = {
  key,
  cpName,
  expenseItem,
  billingMethodText,
  billingVal,
  amount,
};

// 客户费用审核
export const customerAuditColumns: Record<string, ProColumns<any>> = {
  key,
  waybillNoColumn,
  expenseItem,
  amountText,
  customerId,
  remark,
  auditState,
  failReason,
  auditName,
  gmtCreate,
  rangeTime,
  gmtAudit,
  option,
};

// 服务商费用审核
export const providerAuditColumns: Record<string, ProColumns<any>> = {
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
  auditName,
  gmtCreate,
  rangeTime,
  gmtAudit,
  option,
};

// 客户账单
const settleType: ProColumns<any> = {
  title: '结算方式',
  dataIndex: 'settleType',
  className: 'nowrap',
  valueEnum: SettlementTypeDesc,
};

const gmtSettleStart: ProColumns<any> = {
  title: '结算周期起',
  dataIndex: 'gmtSettleStart',
  className: 'nowrap',
  search: false,
};

const gmtSettleEnd: ProColumns<any> = {
  title: '结算周期止',
  dataIndex: 'gmtSettleEnd',
  className: 'nowrap',
  search: false,
};

const billAmount: ProColumns<any> = {
  title: '账单金额(￥)',
  dataIndex: 'billAmount',
  className: 'nowrap',
  search: false,
};

export const BillGmtCreate: ProColumns<any> = {
  title: '出账日期',
  dataIndex: 'gmtCreate',
  className: 'nowrap',
  valueType: 'dateRange',
  hideInForm: true,
  fixed: 'right',
  render: (_, record) => <EmptyWrap value={record.gmtCreate} />,
};

export const customerBillColumns: Record<string, ProColumns<any>> = {
  key,
  billNo,
  customerId: {
    ...customerId,
    renderFormItem: () => (
      <CompanySelect
        companyType={CompanyType.CUSTOMER}
        placeholder="请输入或选择"
        maxTagCount="responsive"
        mode="multiple"
      />
    ),
  },
  settleType,
  billAmount,
  gmtSettleStart,
  gmtSettleEnd,
  BillGmtCreate,
  option,
};

// 计费失败记录
const gmtRealCost = produce(rangeTime, (draft: any) => {
  draft.title = '计费时间';
  draft.hideInTable = false;
  draft.render = (_: any, record: any) => <EmptyWrap value={record.gmtRealCost} />;
});

const targetType: ProColumns<any> = {
  title: '对象类型',
  dataIndex: 'targetType',
  className: 'nowrap',
  renderFormItem: () => (
    <EnumSelect placeholder="请选择操作对象类型" enumKey={['targetTypeEnum']} />
  ),
  render: (_, record) => <EmptyWrap value={record.targetTypeText} />,
};

const bizNode: ProColumns<any> = {
  title: '业务节点',
  dataIndex: 'bizNode',
  className: 'nowrap',
  renderFormItem: () => (
    <EnumSelect placeholder="请选择操作对象类型" enumKey={['billingNodeEnum']} />
  ),
  render: (_, record) => <EmptyWrap value={record.bizNodeText} />,
};

export const billingFailedListColumns: Record<string, ProColumns<any>> = {
  key,
  waybillNo: {
    ...waybillNo,
    renderFormItem: undefined,
  },
  cpCode: {
    ...cpCode,
    title: '线路/渠道编码',
    renderFormItem: undefined,
    renderText: undefined,
    search: false,
  },
  targetType,
  bizNode,
  remark,
  gmtCreate,
  gmtRealCost,
};

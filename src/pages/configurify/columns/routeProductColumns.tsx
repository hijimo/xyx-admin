import type { ProColumns } from '@ant-design/pro-table';
import { EnableTypeDesc } from '@/enum';
import { ColumnEllipsisWrap } from '@/components/CommonTable';
import EmptyWrap from '@/components/EmptyWrap';
import SettingTypeSelect from '@/pages/components/SettingTypeSelect';
import { cpCode } from './packageColumns';
import { key, option, state, gmtCreate } from './commonColumns';

const cpName: ProColumns<any> = {
  title: '线路产品名称',
  dataIndex: 'cpName',
  className: 'nowrap',
  order: 98,
};

const cpShortName: ProColumns<any> = {
  title: '线路简称',
  dataIndex: 'cpShortName',
  className: 'nowrap',
  search: false,
};

const cpType: ProColumns<any> = {
  title: '产品类型',
  dataIndex: 'cpType',
  className: 'nowrap',
  search: false,
  renderText: (_, record) => record.cpTypeText,
};

const logisticsMode: ProColumns<any> = {
  title: '物流模式',
  dataIndex: 'logisticsMode',
  className: 'nowrap',
  order: 101,
  renderText: (_, record) => record.logisticsModeText,
};

const productName: ProColumns<any> = {
  title: '关联服务产品',
  dataIndex: 'productName',
  className: 'nowrap',
  hideInForm: true,
  order: 100,
  search: false,
  ellipsis: true,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

export const routeProductColumns = {
  key,
  cpCode: {
    ...cpCode,
    title: '线路编码',
    renderFormItem: undefined,
    renderText: undefined,
  },
  cpName,
  cpShortName,
  cpType,
  logisticsMode,
  productName,
  state,
  option,
};

const offerNo: ProColumns<any> = {
  title: '报价编号',
  dataIndex: 'offerNo',
  className: 'nowrap',
};

const priceLevel: ProColumns<any> = {
  title: '价格等级',
  dataIndex: 'priceLevel',
  className: 'nowrap',
  renderFormItem: () => (
    <SettingTypeSelect paramType={5} placeholder="请选择" labelInValue={false} />
  ),
  render: (_, record) => <EmptyWrap value={record.priceLevelName} />,
};

const gmtValid: ProColumns<any> = {
  title: '生效时间',
  dataIndex: 'gmtValid',
  valueType: 'date',
  className: 'nowrap',
  render: (_, record) => <EmptyWrap value={record.gmtValid} />,
};

const expressionText: ProColumns<any> = {
  title: '报价公式',
  dataIndex: 'expressionText',
  className: 'nowrap',
  search: false,
};

const gmtInvalid: ProColumns<any> = {
  title: '失效时间',
  dataIndex: 'gmtUnvalid',
  valueType: 'dateTimeRange',
  className: 'nowrap',
  search: false,
  render: (_, record) => <EmptyWrap value={record.gmtUnvalid} />,
};

const validFlag: ProColumns<any> = {
  title: '状态',
  dataIndex: 'offerValidFlag',
  className: 'nowrap',
  valueEnum: EnableTypeDesc,
  search: false,
};

export const quoteColumns = {
  offerNo,
  priceLevel,
  gmtValid,
  gmtInvalid,
  validFlag,
  gmtCreate,
  option,
};
export const channelQuoteColumns = {
  offerNo,
  gmtValid,
  gmtInvalid,
  validFlag,
  gmtCreate,
  option,
};
export const miscellaneousFeeChannelQuoteColumns = {
  offerNo: {
    ...offerNo,
    dataIndex: 'itemNo',
  },
  expressionText,
  gmtValid,
  gmtInvalid,
  validFlag,
  gmtCreate,
  option,
};

const comboNo: ProColumns<any> = {
  title: '线路套餐编号',
  dataIndex: 'comboNo',
  className: 'nowrap',
};

const comboName: ProColumns<any> = {
  title: '线路套餐名称',
  dataIndex: 'comboName',
  className: 'nowrap',
};

const gmtModified: ProColumns<any> = {
  title: '更新时间',
  dataIndex: 'gmtModified',
  search: false,
  className: 'nowrap',
};

export const productComboColumns = {
  key,
  comboNo,
  comboName,
  gmtCreate,
  gmtModified,
  option,
};

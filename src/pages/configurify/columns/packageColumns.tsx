import produce from 'immer';
import type { ProColumns } from '@ant-design/pro-table';
import {
  PackageStateDesc,
  AbnormalTypeDesc,
  BooleanEnum,
  PackageDerelictionStateList,
  PackageTerminalStateList,
  ProductType,
  ElectFlagTypeDesc,
  DefaultTypeDesc,
} from '@/enum';
import { ColumnEllipsisWrap } from '@/components/CommonTable';
import EmptyWrap from '@/components/EmptyWrap';
import MultiLineInput from '@/components/MultiLineInput';
import type { PackageAbnormalListItemSSD } from '@/types';
import GlobalCitySelect from '@/pages/components/GlobalCitySelect';
import SettingTypeSelect from '@/pages/components/SettingTypeSelect';
import RouteProductSelect from '@/pages/components/RouteProductSelect';
import PackageStateSelect from '@/pages/components/PackageStateSelect';
import ServiceChannelSelect from '@/pages/components/ServiceChannelSelect';
import EnumSelect from '@/pages/components/EnumSelect';
import {
  key,
  waybillNo,
  option,
  commonCloumns,
  rangeTime,
  gmtCreate,
  customerName,
  customerId,
} from './commonColumns';
import { DATE_FORMAT_DATETIME_MINUTES, DATE_FORMAT_TIME_MINUTES } from '@/utils/variables';

const newCommonCloumns = produce(commonCloumns, (draft) => {
  draft.gmtCreate!.title = '异常时间';
  draft.rangeTime!.title = '异常时间';
});

const billNoColumn = produce(waybillNo, (draft: any) => {
  draft.fixed = 'left';
});

export const uniqueNo: ProColumns<any> = {
  title: '包裹唯一号',
  dataIndex: 'uniqueNo',
  className: 'nowrap',
  renderFormItem: (_, config, form) => <MultiLineInput onSearch={form.submit} />,
};

/* const state: ProColumns<any> = {
  title: '包裹状态',
  dataIndex: 'state',
  className: 'nowrap',
  hideInForm: true,
  valueEnum: PackageTypeDesc,
  order: 99,
  renderFormItem: () => <PackageStateSelect placeholder="请选择" />,
}; */

export const stateMultiple: ProColumns<any> = {
  title: '包裹状态',
  dataIndex: 'state',
  className: 'nowrap',
  hideInForm: true,
  valueEnum: PackageStateDesc,
  order: 99,
  renderFormItem: () => <PackageStateSelect mode="multiple" placeholder="请选择" />,
};

const packageDerelictionState: ProColumns<any> = {
  title: '包裹状态',
  dataIndex: 'state',
  className: 'nowrap',
  hideInForm: true,
  order: 99,
  valueEnum: PackageStateDesc,
  renderFormItem: () => (
    <PackageStateSelect data={PackageDerelictionStateList} placeholder="请选择" />
  ),
};

const packageTerminalState: ProColumns<any> = {
  title: '包裹状态',
  dataIndex: 'state',
  className: 'nowrap',
  hideInForm: true,
  order: 99,
  valueEnum: PackageStateDesc,
  renderFormItem: () => (
    <PackageStateSelect data={PackageTerminalStateList} placeholder="请选择" mode="multiple" />
  ),
};

export const trackStateList: ProColumns<any> = {
  title: '物流轨迹状态',
  dataIndex: 'trackStateList',
  className: 'nowrap',
  renderFormItem: () => (
    <EnumSelect
      placeholder="请选择物流轨迹状态"
      enumKey={['morebuyOrderTrackStateEnum']}
      mode="multiple"
    />
  ),
  render: (_, record) => <EmptyWrap value={record.trackStateText} />,
  order: 99,
};

const abnormalFlag: ProColumns<any> = {
  title: '是否异常',
  dataIndex: 'abnormalFlag',
  className: 'nowrap',
  hideInForm: true,
  valueEnum: AbnormalTypeDesc,
  order: 97,
  render: (_, record) => (
    <EmptyWrap
      type={record?.abnormalFlag === 1 ? 'danger' : undefined}
      value={AbnormalTypeDesc[record?.abnormalFlag]?.text}
    />
  ),
};

export const oldShipNo: ProColumns<any> = {
  title: '原始单号',
  dataIndex: 'oldShipNo',
  className: 'nowrap',
  renderFormItem: (_, config, form) => <MultiLineInput onSearch={form.submit} />,
  order: 98,
};

const electFlag: ProColumns<any> = {
  title: '面单类型',
  dataIndex: 'electFlag',
  className: 'nowrap',
  valueEnum: ElectFlagTypeDesc,
};

export const ladingNo: ProColumns<any> = {
  title: '提单号',
  dataIndex: 'ladingNo',
  className: 'nowrap',
  renderFormItem: (_, config, form) => <MultiLineInput onSearch={form.submit} />,
  order: 98,
};

export const forecastWeight: ProColumns<any> = {
  title: '预报重量(KG)',
  dataIndex: 'forecastWeight',
  className: 'nowrap',
  search: false,
};
export const volumeWeight: ProColumns<any> = {
  title: '体积重(KG)',
  dataIndex: 'volumeWeight',
  className: 'nowrap',
  search: false,
};
export const realWeight: ProColumns<any> = {
  title: '实际重(KG)',
  dataIndex: 'realWeight',
  className: 'nowrap',
  search: false,
};
const forecastVolume: ProColumns<any> = {
  title: '预报体积[长*宽*高(cm)]',
  dataIndex: 'forecastVolume',
  className: 'nowrap',
  search: false,
};

export const packageWeight: ProColumns<any> = {
  title: '重量(KG)',
  dataIndex: 'packageWeight',
  className: 'nowrap',
  search: false,
};

export const packageVolume: ProColumns<any> = {
  title: '体积[长*宽*高(cm)]',
  dataIndex: 'packageVolume',
  className: 'nowrap',
  search: false,
};

export const countryId: ProColumns<any> = {
  title: '目的国',
  dataIndex: 'countryId',
  className: 'nowrap',
  renderFormItem: () => (
    <GlobalCitySelect transferFlag={BooleanEnum.TRUE} placeholder="请输入或选择" />
  ),
  renderText: (_, record) => record?.countryName,
};

export const cpCode: ProColumns<any> = {
  title: '线路',
  dataIndex: 'cpCode',
  className: 'nowrap',
  renderFormItem: () => (
    <RouteProductSelect
      maxTagCount="responsive"
      mode="multiple"
      labelInValue={false}
      selectByCpCode
      cpType={ProductType.ALL}
      placeholder="请输入或选择"
    />
  ),
  renderText: (_, record) => record?.cpName,
};

export const terminalCpCode: ProColumns<any> = {
  title: '线路',
  dataIndex: 'cpCode',
  className: 'nowrap',
  renderFormItem: () => (
    <RouteProductSelect
      maxTagCount="responsive"
      mode="multiple"
      labelInValue={false}
      selectByCpCode
      cpType={ProductType.TERMINAL}
      placeholder="请输入或选择"
    />
  ),
  renderText: (_, record) => record?.cpName,
};

export const batchNo: ProColumns<any> = {
  title: '批次号',
  dataIndex: 'batchNo',
  className: 'nowrap',
  renderFormItem: (_, config, form) => <MultiLineInput onSearch={form.submit} />,
  order: 94,
};

export const gmtInStore: ProColumns<any> = {
  title: '入库时间',
  dataIndex: 'gmtInStore',
  className: 'nowrap',
  valueType: 'dateTimeRange',
  hideInForm: true,
  fieldProps: {
    showTime: { format: DATE_FORMAT_TIME_MINUTES },
    format: DATE_FORMAT_DATETIME_MINUTES,
  },
  render: (_, record) => <EmptyWrap value={record.gmtInStore} />,
};

export const gmtOutbound: ProColumns<any> = {
  title: '出库时间',
  dataIndex: 'gmtOutbound',
  className: 'nowrap',
  valueType: 'dateTimeRange',
  fieldProps: {
    showTime: { format: DATE_FORMAT_TIME_MINUTES },
    format: DATE_FORMAT_DATETIME_MINUTES,
  },
  render: (_, record) => <EmptyWrap value={record.gmtOutbound} />,
  // fixed: 'right',
};

export const whNoList: ProColumns<any> = {
  title: '仓储渠道',
  dataIndex: 'whNoList',
  className: 'nowrap',
  render: (_, record) => <EmptyWrap value={record.whNo} />,
  renderFormItem: () => (
    <ServiceChannelSelect
      resourceType={1}
      mode="multiple"
      placeholder="请输入或选择"
      allState
      valueType="channelCode"
    />
  ),
};

export const packageColumns = {
  key,
  billNoColumn,
  uniqueNo,
  oldShipNo,
  ladingNo,
  electFlag,
  whNoList,
  customerName,
  stateMultiple,
  trackStateList,
  abnormalFlag,
  cpCode,
  countryId,
  forecastWeight,
  forecastVolume,
  packageWeight,
  packageVolume,
  batchNo,
  gmtInStore,
  gmtOutbound,
  gmtCreate,
  rangeTime,
  option,
};

export const packageDerelictionColumns = {
  key,
  billNoColumn,
  uniqueNo,
  whNoList,
  packageDerelictionState,
  abnormalFlag,
  packageWeight,
  packageVolume,
  gmtCreate,
  rangeTime,
  option,
};

const handleRemark: ProColumns<PackageAbnormalListItemSSD> = {
  title: '处理备注',
  dataIndex: 'handleRemark',
  className: 'nowrap',
  search: false,
  ellipsis: true,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

export const gmtHandle: ProColumns<any> = {
  title: '处理时间',
  dataIndex: 'gmtHandle',
  className: 'nowrap',
  hideInForm: true,
  valueType: 'dateTimeRange',
  fieldProps: {
    showTime: { format: DATE_FORMAT_TIME_MINUTES },
    format: DATE_FORMAT_DATETIME_MINUTES,
  },
  render: (_, record) => <EmptyWrap value={record.gmtHandle} />,
};

const abnormalType: ProColumns<any> = {
  title: '异常类型',
  dataIndex: 'abnormalType',
  className: 'nowrap',
  renderFormItem: () => (
    <SettingTypeSelect paramType={2} placeholder="请选择" labelInValue={false} />
  ),
  render: (_, record) => <EmptyWrap value={record?.abnormalTypeName} />,
};

const changeFlag: ProColumns<any> = {
  title: '是否更换线路',
  dataIndex: 'changeFlag',
  className: 'nowrap',
  search: false,
  render: (_, record) => (
    <EmptyWrap
      value={DefaultTypeDesc[record?.changeFlag]?.text}
      type={record?.changeFlag === BooleanEnum.FALSE ? undefined : 'danger'}
    />
  ),
};

const cpName: ProColumns<any> = {
  title: '更换线路',
  dataIndex: 'cpName',
  className: 'nowrap',
  search: false,
  ellipsis: true,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

const resultTypeText: ProColumns<any> = {
  title: '处理结果',
  dataIndex: 'resultTypeText',
  className: 'nowrap',
  search: false,
};

export const otherReason: ProColumns<any> = {
  title: '备注',
  dataIndex: 'otherReason',
  className: 'nowrap',
  search: false,
  ellipsis: true,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

export const transportPackageAbnormalColumns: Record<
  string,
  ProColumns<PackageAbnormalListItemSSD>
> = {
  key,
  uniqueNo,
  customerId,
  cpCode: {
    ...cpCode,
    dataIndex: 'oldCpName',
    renderText: undefined,
  },
  abnormalType,
  changeFlag,
  cpName,
  otherReason,
  resultTypeText,
  handleRemark,

  ...newCommonCloumns,
  gmtHandle,
};

export const packageTerminalColumns = {
  key,
  billNoColumn,
  uniqueNo,
  oldShipNo,
  customerName,
  packageTerminalState,
  terminalCpCode,
  countryId,
  forecastWeight,
  forecastVolume,
  packageWeight,
  packageVolume,
  gmtInStore,
  gmtOutbound,
  gmtCreate,
  rangeTime,
  option,
};

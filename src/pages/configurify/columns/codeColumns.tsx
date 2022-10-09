import { produce } from 'immer';
import type { ProColumns } from '@ant-design/pro-table';
import { DefaultTypeDesc } from '@/enum';
import EmptyWrap from '@/components/EmptyWrap';
import { key, option, companyNo, customerNo, waybillNo } from './commonColumns';

const waybillNoCloumns = produce(waybillNo, (draft) => {
  draft.renderFormItem = undefined;
  draft.search = false;
});

const companyNoCloumns = produce(companyNo, (draft) => {
  draft.renderFormItem = undefined;
});

const customerNoCloumns = produce(customerNo, (draft) => {
  draft.renderFormItem = undefined;
});

const electScope: ProColumns<any> = {
  title: '号码段',
  dataIndex: 'electScope',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

const codePrefix: ProColumns<any> = {
  title: '号段前缀',
  dataIndex: 'codePrefix',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

const codeMiddle: ProColumns<any> = {
  title: '号段标识',
  dataIndex: 'codeMiddle',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

const codeLength: ProColumns<any> = {
  title: '号段长度',
  dataIndex: 'codeLength',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

const electCurrentCode: ProColumns<any> = {
  title: '当前使用值',
  dataIndex: 'electCurrentCode',
  className: 'nowrap',
  hideInForm: true,
  search: false,
};

const electState: ProColumns<any> = {
  title: '是否使用完',
  dataIndex: 'electState',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  valueEnum: DefaultTypeDesc,
  render: (_, record) => (
    <EmptyWrap
      type={record?.electState === 1 ? 'danger' : undefined}
      value={DefaultTypeDesc[record?.electState]?.text}
    />
  ),
};

const usedFlag: ProColumns<any> = {
  title: '是否使用',
  dataIndex: 'usedFlag',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  valueEnum: DefaultTypeDesc,
  render: (_, record) => (
    <EmptyWrap
      type={record?.usedFlag === 1 ? 'danger' : undefined}
      value={DefaultTypeDesc[record?.usedFlag]?.text}
    />
  ),
};

export const codeSegmentsColumns = {
  key,
  companyNoCloumns,
  // customerNo,
  electScope,
  codePrefix,
  codeMiddle,
  codeLength,
  electCurrentCode,
  electState,
  option,
};

export const codePoolColumns = {
  key,
  companyNoCloumns,
  customerNoCloumns,
  waybillNoCloumns,
  usedFlag,
};

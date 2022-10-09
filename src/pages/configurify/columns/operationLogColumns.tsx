import produce from 'immer';
import type { ProColumns } from '@ant-design/pro-table';
import EmptyWrap from '@/components/EmptyWrap';
import EnumSelect from '@/pages/components/EnumSelect';
import ColumnEllipsisWrap from '@/components/CommonTable/ColumnEllipsisWrap';
import { key, rangeTime, gmtCreate, businessNo } from './commonColumns';
import { uniqueNo } from './packageColumns';

export const operatorName: ProColumns<any> = {
  title: '操作人',
  dataIndex: 'operatorName',
  className: 'nowrap',
  search: false,
};

export const operatorData: ProColumns<any> = {
  title: '备注',
  dataIndex: 'operatorData',
  className: 'nowrap',
  search: false,
  ellipsis: true,
  width: 200,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

const optionGmtCreate = produce(gmtCreate, (draft) => {
  draft.title = '操作时间';
  draft.fixed = false;
});

const optionRangeTime = produce(rangeTime, (draft) => {
  draft.title = '操作时间';
});

const operateType: ProColumns<any> = {
  title: '操作类型',
  dataIndex: 'operateType',
  className: 'nowrap',
  renderFormItem: () => <EnumSelect placeholder="请选择操作类型" enumKey={['operateTypeEnum']} />,
  render: (_, record) => <EmptyWrap value={record.operateTypeText} />,
};

const objectType: ProColumns<any> = {
  title: '操作对象类型',
  dataIndex: 'objectType',
  className: 'nowrap',
  renderFormItem: () => (
    <EnumSelect placeholder="请选择操作对象类型" enumKey={['objectTypeEnum']} />
  ),
  render: (_, record) => <EmptyWrap value={record.objectTypeText} />,
};

export const operationLogColumns = {
  key,
  businessNo,
  operateType,
  objectType,
  operatorData,
  operatorName,
  optionGmtCreate,
  optionRangeTime,
};

export const operationLogInfoColumns = {
  uniqueNo: {
    ...uniqueNo,
    dataIndex: 'businessNo',
    fixed: 'left',
    renderFormItem: undefined,
  },
  operateType,
  objectType,
  operatorData,
  operatorName,
  optionGmtCreate,
};

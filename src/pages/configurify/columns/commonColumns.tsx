import produce from 'immer';
import type { ProColumns } from '@ant-design/pro-table';
import { EnableTypeDesc, AuditTypeDesc, CompanyType } from '@/enum';
import { ColumnEllipsisWrap } from '@/components/CommonTable';
import EmptyWrap from '@/components/EmptyWrap';
import MultiLineInput from '@/components/MultiLineInput';
import CompanySelect from '@/pages/components/CompanySelect';
import SettingTypeSelect from '@/pages/components/SettingTypeSelect';
import { DATE_FORMAT_DATETIME_MINUTES, DATE_FORMAT_TIME_MINUTES } from '@/utils/variables';

export const key: ProColumns<any> = {
  title: '序号',
  dataIndex: 'key',
  fixed: 'left',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  width: 10,
  renderText(text, record, index, action: any) {
    return `${(action?.pageInfo?.current - 1) * action?.pageInfo?.pageSize + index + 1}`;
  },
};

export const keyword: ProColumns<any> = {
  title: '关键词',
  dataIndex: 'keyword',
  className: 'nowrap',
  hideInForm: true,
  hideInTable: true,
  order: 100,
  fieldProps: {
    placeholder: '',
  },
};

export const waybillNo: ProColumns<any> = {
  title: '运单号',
  dataIndex: 'waybillNo',
  fixed: 'left',
  className: 'nowrap',
  renderFormItem: (_, config, form) => <MultiLineInput onSearch={form.submit} />,
  order: 100,
};

export const businessNo: ProColumns<any> = {
  title: '业务号',
  dataIndex: 'businessNo',
  className: 'nowrap',
  ellipsis: true,
  width: 200,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

export const state: ProColumns<any> = {
  title: '状态',
  dataIndex: 'state',
  className: 'nowrap',
  hideInForm: true,
  order: 99,
  valueEnum: EnableTypeDesc,
};

export const customerId: ProColumns<any> = {
  title: '客户名称',
  dataIndex: 'customerId',
  className: 'nowrap',
  hideInForm: true,
  renderFormItem: () => (
    <CompanySelect companyType={CompanyType.CUSTOMER} placeholder="请输入或选择" />
  ),
  render: (_, record) => <EmptyWrap value={record.customerName} />,
};

export const customerNo: ProColumns<any> = {
  title: '客户编号',
  dataIndex: 'customerNo',
  className: 'nowrap',
  hideInForm: true,
  renderFormItem: () => (
    <CompanySelect
      companyType={CompanyType.CUSTOMER}
      placeholder="请输入或选择"
      valueType="companyNo"
    />
  ),
};

export const customerName = produce(customerNo, (draft: any) => {
  draft.title = '客户名称';
  draft.render = (_: any, record: any) => <EmptyWrap value={record.customerName} />;
});

export const companyName: ProColumns<any> = {
  title: '服务商名称',
  dataIndex: 'companyName',
  className: 'nowrap',
  hideInForm: true,
  renderFormItem: () => (
    <CompanySelect
      companyType={CompanyType.COMPANY}
      valueType="companyName"
      placeholder="请输入或选择"
    />
  ),
};

export const companyId: ProColumns<any> = {
  title: '服务商名称',
  dataIndex: 'companyId',
  className: 'nowrap',
  hideInForm: true,
  renderFormItem: () => (
    <CompanySelect companyType={CompanyType.COMPANY} placeholder="请输入或选择" />
  ),
  render: (_, record) => <EmptyWrap value={record.companyName} />,
};

export const companyNo: ProColumns<any> = {
  title: '服务商编号',
  dataIndex: 'companyNo',
  className: 'nowrap',
  hideInForm: true,
  renderFormItem: () => (
    <CompanySelect
      companyType={CompanyType.COMPANY}
      placeholder="请输入或选择"
      valueType="companyNo"
    />
  ),
};

export const expenseCode: ProColumns<any> = {
  title: '费用项编号',
  dataIndex: 'expenseCode',
  className: 'nowrap',
};
export const expenseItem: ProColumns<any> = {
  title: '费用项名称',
  dataIndex: 'expenseItem',
  className: 'nowrap',
  renderFormItem: () => (
    <SettingTypeSelect paramType={1} placeholder="请选择" labelInValue={false} />
  ),
  renderText: (_, record) => record?.expenseItemName,
};
export const expenseItemAll: ProColumns<any> = {
  title: '费用项名称',
  dataIndex: 'expenseItem',
  className: 'nowrap',
  renderFormItem: () => (
    <SettingTypeSelect paramType={[1, 6]} placeholder="请选择" labelInValue={false} />
  ),
  renderText: (_, record) => record?.expenseItemName,
};
export const auditState: ProColumns<any> = {
  title: '状态',
  dataIndex: 'auditState',
  className: 'nowrap',
  valueEnum: AuditTypeDesc,
};

export const remark: ProColumns<any> = {
  title: '备注',
  dataIndex: 'remark',
  className: 'nowrap',
  search: false,
  ellipsis: true,
  render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
};

export const option: ProColumns<any> = {
  title: '操作',
  dataIndex: 'option',
  valueType: 'option',
  width: 10,
  fixed: 'right',
  className: 'nowrap',
};

export const gmtCreate: ProColumns<any> = {
  title: '创建时间',
  dataIndex: 'gmtCreate',
  className: 'nowrap',
  valueType: 'dateTimeRange',
  hideInForm: true,
  search: false,
  fixed: 'right',
  render: (_, record) => <EmptyWrap value={record.gmtCreate} />,
};

export const rangeTime: ProColumns<any> = {
  title: '创建时间',
  dataIndex: 'rangeTime',
  className: 'nowrap',
  hideInForm: true,
  hideInTable: true,
  valueType: 'dateTimeRange',
  fieldProps: {
    showTime: { format: DATE_FORMAT_TIME_MINUTES },
    format: DATE_FORMAT_DATETIME_MINUTES,
  },
};

export const createName: ProColumns<any> = {
  title: '创建人',
  dataIndex: 'createName',
  className: 'nowrap',
  search: false,
};

export const commonCloumns = {
  gmtCreate,
  rangeTime,
  option,
};

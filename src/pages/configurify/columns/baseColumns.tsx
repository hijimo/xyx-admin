import { DatePicker } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { SwitchDesc } from '@/enum';
import CompanySelect from '@/components/DataSelect/CompanySelect';
import MoldSelect from '@/components/DataSelect/MoldSelect';

export const key: ProColumns<any> = {
  title: '序号',
  dataIndex: 'key',
  fixed: 'left',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  width: 10,
  renderText(text, record, idx, action: any) {
    return `${(action?.pageInfo?.current - 1) * action?.pageInfo?.pageSize + idx + 1}`;
  },
};

export const companyNo: ProColumns<any> = {
  title: '所属企业',
  dataIndex: 'companyNo',
  className: 'nowrap',
  renderFormItem: () => <CompanySelect placeholder="请输入名称搜索" />,
  renderText: (_, record) => record?.companyNo,
};
export const deviceModal: ProColumns<any> = {
  title: '所属物模型',
  dataIndex: 'moldCode',
  className: 'nowrap',
  renderFormItem: () => <MoldSelect />,
  renderText: (_, record) => record?.moldName,
};

//
export const companyName: ProColumns<any> = {
  title: '企业名称',
  dataIndex: 'companyName',
  search: false,
  className: 'nowrap',
};

export const status: ProColumns<any> = {
  title: '状态',
  dataIndex: 'status',
  className: 'nowrap',
  valueEnum: SwitchDesc,
  search: false,
};

export const gmtCreate: ProColumns<any> = {
  title: '创建时间',
  dataIndex: 'createTime',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  fixed: 'right',
};

export const rangeTime: ProColumns<any> = {
  title: '创建起止日期',
  dataIndex: 'rangeTime',
  className: 'nowrap',
  hideInForm: true,
  hideInTable: true,
  renderFormItem: () => (
    <DatePicker.RangePicker showTime placeholder={['请选择', '请选择']} style={{ width: '100%' }} />
  ),
};

export const option: ProColumns<any> = {
  title: '操作',
  dataIndex: 'option',
  valueType: 'option',
  className: 'nowrap',
  fixed: 'right',
  width: 10,
};

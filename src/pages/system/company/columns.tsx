import type { ProColumns } from '@ant-design/pro-table';
import CompanyTypeSelect from '@/components/DataSelect/CompanyTypeSelect';
import { SwitchDesc } from '@/enum';
import type { CompanySSD } from '@/types';

const defaultColumns: Record<string, ProColumns<CompanySSD>> = {
  key: {
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
  },
  companyNo: {
    title: '企业编号',
    dataIndex: 'companyNo',
    className: 'nowrap',
    fixed: 'left',
  },
  companyName: {
    title: '企业名称',
    dataIndex: 'companyName',
    className: 'nowrap',
  },
  companyType: {
    title: '企业类型',
    dataIndex: 'companyType',
    className: 'nowrap',
    renderFormItem: () => <CompanyTypeSelect placeholder="请输入名称搜索" />,
    renderText: (_, record) => record?.companyTypeText,
  },
  parentCompanyName: {
    title: '上级单位',
    dataIndex: 'parentCompanyName',
    className: 'nowrap',
  },

  // companyEmail: {
  //   title: '邮箱',
  //   dataIndex: 'companyEmail',
  //   className: 'nowrap',
  // },

  contactPerson: {
    title: '联系人',
    dataIndex: 'contactPerson',
    className: 'nowrap',
  },
  contactTel: {
    title: '联系电话',
    dataIndex: 'contactTel',
    className: 'nowrap',
  },
  contactAddress: {
    title: '企业地址',
    dataIndex: 'contactAddress',
    search: false,
    className: 'nowrap',
    width: 200,
    ellipsis: true,
    render: (_) => (
      <div style={{ width: 200, wordWrap: 'break-word', wordBreak: 'break-word' }}>{_ || '--'}</div>
    ),
  },
  state: {
    title: '状态',
    dataIndex: 'state',
    valueEnum: SwitchDesc,
    className: 'nowrap',
  },
  gmtCreate: {
    title: '创建时间',
    dataIndex: 'gmtCreate',
    search: false,
    className: 'nowrap',
  },
  option: {
    title: '操作',
    dataIndex: 'option',
    search: false,
    valueType: 'option',
    className: 'nowrap',
    fixed: 'right',
  },
};

export default defaultColumns;

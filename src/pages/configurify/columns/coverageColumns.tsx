import type { ProColumns } from '@ant-design/pro-table';

const countryName: ProColumns<any> = {
  title: '国家名称',
  dataIndex: 'countryName',
  className: 'nowrap',
};

const countryCode: ProColumns<any> = {
  title: '国家代码',
  dataIndex: 'countryCode',
  className: 'nowrap',
};

const projectTypeText: ProColumns<any> = {
  title: '方案类型',
  dataIndex: 'projectTypeText',
  className: 'nowrap',
};

const projectValText: ProColumns<any> = {
  title: '城市/邮编',
  dataIndex: 'projectValText',
  className: 'nowrap',
  ellipsis: true,
  renderText: (_, record) =>
    record?.projectType === 3 ? record?.projectVal : record?.projectValText?.join(','),
};

export const coverageColumns = {
  countryName,
  countryCode,
  projectTypeText,
  projectValText,
};

export const coverageEditColumns = {
  countryName,
  countryCode,
  projectTypeText,
  projectValText,
};

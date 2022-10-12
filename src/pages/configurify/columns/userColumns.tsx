import type { ProColumns } from '@ant-design/pro-table';
import type { UserSSD } from '@/types';
import { SwitchDesc, SexDesc } from '@/enum';
import { key, option, companyNo } from './baseColumns';

const userName: ProColumns<UserSSD> = {
  title: '昵称',
  dataIndex: 'userName',
  className: 'nowrap',
};

const userAccount: ProColumns<UserSSD> = {
  title: '账号',
  dataIndex: 'userAccount',
  className: 'nowrap',
};
const companyName: ProColumns<UserSSD> = {
  title: '企业名称',
  dataIndex: 'companyName',
  className: 'nowrap',
  search: false,
};
const userMobile: ProColumns<UserSSD> = {
  title: '手机号',
  dataIndex: 'userMobile',
  className: 'nowrap',
};

const userSex: ProColumns<UserSSD> = {
  title: '性别',
  dataIndex: 'userSex',
  className: 'nowrap',
  search: false,
  hideInTable: true,
  valueEnum: SexDesc,
};

export const userStatusText: ProColumns<UserSSD> = {
  title: '状态',
  dataIndex: 'userStatus',
  className: 'nowrap',
  valueEnum: SwitchDesc,
};
const registerSourceText: ProColumns<UserSSD> = {
  title: '账号来源',
  dataIndex: 'registerSourceText',
  className: 'nowrap',
  // valueEnum: SwitchDesc,
  search: false,
};

export const userColumns: Record<string, ProColumns<UserSSD>> = {
  key,
  userName,
  userAccount,
  userMobile,
  companyNo,
  companyName,
  userSex,
  registerSourceText,
  userStatusText,
  option,
};

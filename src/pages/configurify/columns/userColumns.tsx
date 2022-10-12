import type { ProColumns } from '@ant-design/pro-table';
import type { UserSSD } from '@/types';
import { SwitchDesc, SexDesc } from '@/enum';
import DictSelect from '@/components/DictSelect';
import { key, option, status } from './baseColumns';

const nickName: ProColumns<UserSSD> = {
  title: '昵称',
  dataIndex: 'nickName',
  className: 'nowrap',
};

const userName: ProColumns<UserSSD> = {
  title: '账号',
  dataIndex: 'userName',
  className: 'nowrap',
};

const phone: ProColumns<UserSSD> = {
  title: '手机号',
  dataIndex: 'phone',
  search: false,
  className: 'nowrap',
};

const sex: ProColumns<UserSSD> = {
  title: '性别',
  dataIndex: 'sex',
  className: 'nowrap',
  hideInTable: true,
  search: false,
  renderFormItem: () => <DictSelect enumKey="sys_user_sex" />,
};

const remark: ProColumns<UserSSD> = {
  title: '备注',
  dataIndex: 'remark',
  className: 'nowrap',
  // valueEnum: SwitchDesc,
  search: false,
};

export const userColumns: Record<string, ProColumns<UserSSD>> = {
  key,
  nickName,
  userName,
  phone,
  sex,
  remark,
  status,
  option,
};

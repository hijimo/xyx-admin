import type { ProColumns } from '@ant-design/pro-table';
import type { FigureSSD } from '@/types';

import { key, option, gmtCreate } from './baseColumns';

const avatar: ProColumns = {
  title: '头像',
  dataIndex: 'avatar',
  className: 'nowrap',
  search: false,
  render: (_) => <img src={_} style={{ width: 80, height: 80 }} />,
};

const gameRoleName: ProColumns = {
  title: '角色名',
  dataIndex: 'gameRoleName',

  search: false,
  className: 'nowrap',
};

const gameRoleSeries: ProColumns = {
  title: '系列',
  dataIndex: 'gameRoleSeries',
  search: false,
  className: 'nowrap',
};
const gameRoleInfo: ProColumns = {
  title: '角色介绍',
  dataIndex: 'gameRoleInfo',
  ellipsis: true,
  search: false,
  className: 'nowrap',
};

export const figureColumns: Record<string, ProColumns<FigureSSD & { option: any }>> = {
  key,
  avatar,
  gameRoleName,
  gameRoleSeries,
  gameRoleInfo,
  gmtCreate,
  option,
};

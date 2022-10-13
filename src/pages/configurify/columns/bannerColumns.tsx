import type { ProColumns } from '@ant-design/pro-table';
import type { BannerSSD } from '@/types';

import { key, option, status } from './baseColumns';

const bannerPath: ProColumns = {
  title: '图片地址',
  dataIndex: 'bannerPath',
  className: 'nowrap',
  search: false,
  render: (_) => <img src={_} style={{ width: 80, height: 80 }} />,
};

const bannerUrl: ProColumns = {
  title: '链接',
  dataIndex: 'bannerUrl',
  ellipsis: true,
  search: false,
  className: 'nowrap',
};

const bannerRank: ProColumns = {
  title: '排序',
  dataIndex: 'bannerRank',
  search: false,
  className: 'nowrap',
};

export const bannerColumns: Record<string, ProColumns<BannerSSD & { option: any }>> = {
  key,
  bannerPath,
  bannerUrl,
  bannerRank,
  option,
};

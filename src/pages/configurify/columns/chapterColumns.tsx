import type { ProColumns } from '@ant-design/pro-table';
import type { ChapterSSD } from '@/types';

import { key, option, status, gmtCreate } from './baseColumns';

const chapterTitle: ProColumns = {
  title: '章节',
  dataIndex: 'chapterTitle',
  className: 'nowrap',
  search: false,
};

export const chapterColumns: Record<string, ProColumns<ChapterSSD & { option: any }>> = {
  key,
  chapterTitle,
  gmtCreate,
  option,
};

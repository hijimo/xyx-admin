import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import type { ResponseData } from '@/utils/request';
import type { TabStatisticsItemSSD } from '@/types';

const defaultTabList: TabStatisticsItemSSD[] = [
  {
    count: 0,
    name: '全部',
    value: -1,
  },
];

const initialData: ResponseData<TabStatisticsItemSSD[]> = {
  data: defaultTabList,
  success: true,
  retCode: '200',
  retMsg: '',
};

const usePageTab = (
  key: string,
  dataLoader: () => Promise<ResponseData<TabStatisticsItemSSD[]>>,
  initTabKey: string = '-1',
) => {
  const [tabKey, setTabKey] = useState<string>(initTabKey);

  const { data, refetch } = useQuery(['tabStatistics', key], dataLoader, {
    select: (d) => d.data,
    initialData,
  });

  const tabList = useMemo(() => {
    return data?.map((d) => ({ key: `${d.value}`, tab: `${d.name}(${d.count})` }));
  }, [data]);

  return {
    tabList,
    tabKey,
    refetch,
    setTabKey,
  };
};

export default usePageTab;

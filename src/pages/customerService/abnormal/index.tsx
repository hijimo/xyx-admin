import React, { useEffect, useMemo, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import type { TabStatisticsItemSSD } from '@/types';
import { getPackageAbnormalTabList } from '@/services/package';
import usePageTab from '@/hooks/usePageTab';
import Page from './Page';

const PackageAbnormalListIndex: React.FC<Record<string, never>> = () => {
  const [tab, setTab] = useState<TabStatisticsItemSSD>();

  const { tabKey, setTabKey, refetch, data } = usePageTab(
    'abnormalTabList',
    getPackageAbnormalTabList,
    '0',
  );

  const tabList = useMemo(() => {
    return data?.map((d, index) => ({ key: index, tab: `${d.name}(${d.count})` }));
  }, [data]);

  useEffect(() => {
    setTab(data?.[tabKey]);
  }, [tabKey, data]);

  return (
    <PageHeaderWrapper tabList={tabList} tabActiveKey={tabKey} onTabChange={setTabKey}>
      <Page tab={tab} refreshTabList={refetch} />
    </PageHeaderWrapper>
  );
};

export default PackageAbnormalListIndex;

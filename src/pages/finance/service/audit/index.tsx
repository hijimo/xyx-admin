import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getProviderAuditTabList } from '@/services/finance';
import usePageTab from '@/hooks/usePageTab';
import Page from './Page';

const ProviderAuditIndex: React.FC<Record<string, never>> = () => {
  const { tabKey, tabList, setTabKey, refetch } = usePageTab(
    'providerAuditTabList',
    getProviderAuditTabList,
    '0',
  );

  return (
    <PageHeaderWrapper
      tabList={tabList}
      tabActiveKey={tabKey}
      onTabChange={(activeKey) => setTabKey(activeKey)}
    >
      <Page tabKey={tabKey} refreshTabList={refetch} />
    </PageHeaderWrapper>
  );
};

export default ProviderAuditIndex;

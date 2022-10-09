import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getCustomerAuditTabList } from '@/services/finance';
import usePageTab from '@/hooks/usePageTab';
import Page from './Page';

const CustomerAuditIndex: React.FC<Record<string, never>> = () => {
  const { tabKey, tabList, setTabKey, refetch } = usePageTab(
    'customerAuditTabList',
    getCustomerAuditTabList,
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

export default CustomerAuditIndex;

import React from 'react';
import { useParams } from 'umi';
import { useQuery } from 'react-query';
import { Card, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getServiceChannelDetail } from '@/services/serviceChannel';
import BasicInfo from './components/BasicInfo';
import FreightInfo from './components/FreightInfo';
import MiscellaneousFeesInfo from './components/MiscellaneousFeesInfo';
import styles from './index.less';

const ServiceChannelDetail: React.FC = () => {
  const { channelId }: any = useParams();

  const { data, isLoading, refetch } = useQuery(
    ['serviceChannelDetail', { channelId }],
    () => getServiceChannelDetail({ id: channelId }),
    {
      enabled: !!channelId,
      select: (d) => d.data,
    },
  );

  return (
    <PageContainer className={styles.content}>
      <Card loading={isLoading}>
        <Space direction="vertical">
          <BasicInfo data={data} onSuccess={refetch} />
          <FreightInfo data={data} onSuccess={refetch} channelId={channelId} />
          <MiscellaneousFeesInfo channelId={channelId} />
        </Space>
      </Card>
    </PageContainer>
  );
};

export default ServiceChannelDetail;

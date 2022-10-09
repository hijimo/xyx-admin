import React from 'react';
import { useParams } from 'umi';
import { useQuery } from 'react-query';
import { Card, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getRouteProductDetail } from '@/services/routeProduct';
import BasicInfo from './components/BasicInfo';
import FreightInfo from './components/FreightInfo';
import ProductLimitedInfo from './components/ProductLimitedInfo';
import CoverageInfo from './components/CoverageInfo';
import styles from './index.less';

const RouteProductDetail: React.FC = () => {
  const { routeId }: any = useParams();

  const { data, isLoading, refetch } = useQuery(
    ['routeProductDetail', { routeId }],
    () => getRouteProductDetail({ id: routeId }),
    {
      enabled: !!routeId,
      select: (d) => d.data,
    },
  );

  return (
    <PageContainer className={styles.content}>
      <Card loading={isLoading}>
        <Space direction="vertical">
          <BasicInfo data={data} onSuccess={refetch} />
          <ProductLimitedInfo data={data} onSuccess={refetch} />
          <CoverageInfo data={data} onSuccess={refetch} />
          <FreightInfo data={data} onSuccess={refetch} routeId={routeId} />
        </Space>
      </Card>
    </PageContainer>
  );
};

export default RouteProductDetail;

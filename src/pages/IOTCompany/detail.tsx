import React from 'react';
import { Card, Descriptions } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useQuery } from 'react-query';
import { useParams } from 'umi';
import EmptyWrap from '@/components/EmptyWrap';
import { getIOTCompanyInfo } from '@/services/iotc';
import styles from './detail.less';

const CompanyDetailIndex: React.FC = () => {
  const { id }: { id: string } = useParams();

  const { data } = useQuery(['IOTCCompanyDetail', id], () => getIOTCompanyInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  return (
    <PageContainer>
      <Card className={styles.card}>
        <Descriptions title="基本信息">
          <Descriptions.Item label="企业名称">
            <EmptyWrap value={data?.companyName} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className={styles.card}>
        <Descriptions title="实例信息">
          <Descriptions.Item label="实例ID">
            <EmptyWrap value={data?.iotInstanceId} />
          </Descriptions.Item>

          <Descriptions.Item label="实例名称">
            <EmptyWrap value={data?.instanceName} />
          </Descriptions.Item>
          <Descriptions.Item label="IOT连接域名">
            <EmptyWrap value={data?.iotHost} />
          </Descriptions.Item>
          <Descriptions.Item label="产品唯一标识">
            <EmptyWrap value={data?.productKey} />
          </Descriptions.Item>
          <Descriptions.Item label="产品名称">
            <EmptyWrap value={data?.productName} />
          </Descriptions.Item>
          <Descriptions.Item label="订阅组ID">
            <EmptyWrap value={data?.consumerGroupId} />
          </Descriptions.Item>
          <Descriptions.Item label="进程连接数">
            <EmptyWrap value={data?.connectCount} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className={styles.card}>
        <Descriptions title="安全信息">
          <Descriptions.Item label="AccessKey">
            <EmptyWrap value={data?.accessKey} />
          </Descriptions.Item>
          <Descriptions.Item label="AccessSecret">
            <EmptyWrap value={data?.accessSecret} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default CompanyDetailIndex;

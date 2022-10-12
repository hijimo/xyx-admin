import React from 'react';
import { Card, Descriptions } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useQuery } from 'react-query';
import { useParams } from 'umi';
import EmptyWrap from '@/components/EmptyWrap';
import { getCompanyDetail } from '@/services/company';

const CompanyDetailIndex: React.FC = () => {
  const { id }: { id: string } = useParams();

  const { data } = useQuery(['CompanyDetail', id], () => getCompanyDetail(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  return (
    <PageContainer>
      <Card>
        <Descriptions title="基本信息">
          <Descriptions.Item label="企业名称">
            <EmptyWrap value={data?.companyName} />
          </Descriptions.Item>
          <Descriptions.Item label="企业类型">
            <EmptyWrap value={data?.companyTypeText} />
          </Descriptions.Item>
          <Descriptions.Item label="企业编号">
            <EmptyWrap value={data?.companyNo} />
          </Descriptions.Item>
          <Descriptions.Item label="企业邮箱">
            <EmptyWrap value={data?.companyEmail} />
          </Descriptions.Item>
          <Descriptions.Item label="联系人">
            <EmptyWrap value={data?.contactPerson} />
          </Descriptions.Item>
          <Descriptions.Item label="联系电话">
            <EmptyWrap value={data?.contactTel} />
          </Descriptions.Item>
          <Descriptions.Item label="地址">
            <EmptyWrap value={data?.contactAddress} />
          </Descriptions.Item>
          <Descriptions.Item label="所属区域代理">
            <EmptyWrap value={data?.sellerName} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default CompanyDetailIndex;

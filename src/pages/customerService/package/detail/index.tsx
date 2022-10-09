import React, { useCallback, useState } from 'react';
import { useParams } from 'umi';
import { useQuery } from 'react-query';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ProductType } from '@/enum';
import { getPackageDetail } from '@/services/package';
import OperationLogInfo from '@/pages/customerService/components/OperationLogInfo';
import ButtonList from '../components/ButtonList';
import BasicInfo from './components/BasicInfo';
import ReceiverInfo from './components/ReceiverInfo';
import GoodsInfo from './components/GoodsInfo';
import LogisticsTrack from './components/LogisticsTrack';
import RemarkInfo from './components/RemarkInfo';

const PackageDetail: React.FC = () => {
  const [tabKey, setTabKey] = useState('1');
  const { id }: any = useParams();

  const { data, refetch } = useQuery(['packageDetail', { id }], () => getPackageDetail({ id }), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const tabList = [
    {
      tab: '收件人',
      key: '1',
    },
    {
      tab: '商品信息',
      key: '2',
    },
    {
      tab: '物流轨迹',
      key: '3',
    },
    {
      tab: '操作日志',
      key: '4',
    },
    {
      tab: '备注',
      key: '5',
    },
  ];

  const handleTabChange = useCallback((activeKey: string) => {
    setTabKey(activeKey);
  }, []);

  return (
    <PageContainer
      extra={
        data?.cpType !== ProductType.TERMINAL && (
          <>
            <ButtonList
              ellipsis
              selectedRows={data ? [data] : []}
              onSuccess={refetch}
              disabled={!data?.abnormalFlag}
            />
          </>
        )
      }
      content={<BasicInfo data={data} />}
      tabList={tabList}
      onTabChange={(activeKey) => handleTabChange(activeKey)}
    >
      <Card>
        {tabKey === '1' && <ReceiverInfo data={data?.receiverInfoDto} />}
        {tabKey === '2' && <GoodsInfo data={data} />}
        {tabKey === '3' && <LogisticsTrack data={data?.trackDtos || []} />}
        {tabKey === '4' && <OperationLogInfo data={data?.operatorLogDtos || []} />}
        {tabKey === '5' && <RemarkInfo data={data} onSuccess={refetch} />}
      </Card>
    </PageContainer>
  );
};

export default PackageDetail;

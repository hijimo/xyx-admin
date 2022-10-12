import React, { useCallback } from 'react';
import { Card, Descriptions } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'umi';
import EmptyWrap from '@/components/EmptyWrap';
import { getDeviceInfo } from '@/services/device';
import MetaItem from '@/components/ListItem/MetaItem';
import styles from './detail.less';

const CompanyDetailIndex: React.FC = () => {
  const { id }: { id: string } = useParams();

  const queryClient = useQueryClient();

  const { data } = useQuery(['getDeviceModelInfo', id], () => getDeviceInfo(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const handleUpdateSuccess = useCallback(() => {
    queryClient.invalidateQueries(['getDeviceModelInfo', id]);
  }, []);

  return (
    <PageContainer>
      <Card className={styles.card}>
        <Descriptions title="企业信息">
          <Descriptions.Item label="企业编号">
            <EmptyWrap value={data?.companyNo} />
          </Descriptions.Item>
          <Descriptions.Item label="企业名称">
            <EmptyWrap value={data?.companyName} />
          </Descriptions.Item>
          <Descriptions.Item label="实例名称">
            <EmptyWrap value={data?.instanceName} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className={styles.card}>
        <Descriptions title="基本信息">
          <Descriptions.Item label="设备编号">
            <EmptyWrap value={data?.name} />
          </Descriptions.Item>
          <Descriptions.Item label="设备名称">
            <EmptyWrap value={data?.aliasName} />
          </Descriptions.Item>
          <Descriptions.Item label="省/市">
            <EmptyWrap
              value={[
                data?.provinceName || '--',
                data?.cityName || '--',
                // data?.areaName || '--',
              ].join('/')}
            />
          </Descriptions.Item>
          <Descriptions.Item label="坐标">
            <a
              target="_blank"
              rel="noreferrer"
              href={`http://api.map.baidu.com/marker?location=${[
                data?.latitude || '--',
                data?.longitude || '--',
              ].join(',')}&output=html&src=webapp.baidu.openAPIdemo   
`}
            >
              {[data?.latitude || '--', data?.longitude || '--'].join(',')}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            <EmptyWrap value={data?.statusText} />
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            <EmptyWrap value={data?.gmtCreate} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className={styles.card}>
        <Descriptions title="运行状态" />
        {/* <Descriptions title="运行状态">
          {data?.metaDtos
            ?.filter((it) => it.showFlag === BooleanEnum.TRUE)
            ?.map((it) => (
              <Descriptions.Item key={it.id} label={it.metaName}>
                <EmptyWrap value={it.metaValue} />
              </Descriptions.Item>
            ))}
        </Descriptions> */}
        <div
          className={styles.list}
          style={{
            gridTemplateRows: `repeat(${Math.ceil((data?.metaDtos?.length || 0) / 4)}, 100px)`,
          }}
        >
          {data?.metaDtos?.map((it) => (
            <MetaItem key={it.id} data={it} onSuccess={handleUpdateSuccess} />
          ))}
        </div>
      </Card>
    </PageContainer>
  );
};

export default CompanyDetailIndex;

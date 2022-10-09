import _map from 'lodash/map';
import { Descriptions, Steps, Space, Row, Col } from 'antd';
import type { Status } from 'rc-steps/lib/interface';
import type { IntPackNodeSSD, PackageDetailSSD } from '@/types';
import EmptyWrap from '@/components/EmptyWrap';

interface BasicInfoProps {
  data?: PackageDetailSSD;
}

const { Step } = Steps;

const BasicInfo = ({ data }: BasicInfoProps) => {
  return (
    <>
      {data?.intPackNodeDtos && data?.intPackNodeDtos?.length > 0 && (
        <Descriptions style={{ marginBottom: 32 }}>
          <Descriptions.Item span={2}>
            <Steps>
              {_map(data?.intPackNodeDtos, (item: IntPackNodeSSD, idx) => {
                let status: Status = 'wait';
                if (item.time) {
                  status = 'finish';
                  if (item.currentFlag) {
                    status = 'process';
                  }
                }
                return (
                  <Step key={idx} description={item.time} title={item.nodeName} status={status} />
                );
              })}
            </Steps>
          </Descriptions.Item>
        </Descriptions>
      )}
      <Row wrap={false}>
        <Col flex={1}>
          <Descriptions title={<EmptyWrap value={`运单号：${data?.waybillNo ?? '--'}`} />}>
            <Descriptions.Item label="包裹唯一号">
              <EmptyWrap value={data?.uniqueNo} />
            </Descriptions.Item>
            <Descriptions.Item label="原始面单号">
              <EmptyWrap value={data?.oldShipNo} />
            </Descriptions.Item>
            <Descriptions.Item label="物流轨迹状态">
              <EmptyWrap value={data?.trackStateText} />
            </Descriptions.Item>
            <Descriptions.Item label="客户名称">
              <EmptyWrap value={data?.customerName} />
            </Descriptions.Item>
            <Descriptions.Item label="客户ID">
              <EmptyWrap value={data?.customerId} />
            </Descriptions.Item>
            <Descriptions.Item label="联系方式">
              <EmptyWrap value={data?.contactTel} />
            </Descriptions.Item>
            <Descriptions.Item label="线路">
              <EmptyWrap value={data?.cpName} />
            </Descriptions.Item>
            <Descriptions.Item label="目的国">
              <EmptyWrap value={data?.countryName} />
            </Descriptions.Item>
            <Descriptions.Item label="预报重量(KG)">
              <EmptyWrap value={data?.forecastWeight} />
            </Descriptions.Item>
            <Descriptions.Item label="预报体积[长*宽*高(cm)]">
              <EmptyWrap value={data?.forecastVolume} />
            </Descriptions.Item>
            <Descriptions.Item label="重量(KG)">
              <EmptyWrap value={data?.packageWeight} />
            </Descriptions.Item>
            <Descriptions.Item label="体积[长*宽*高(cm)]">
              <EmptyWrap value={data?.packageVolume} />
            </Descriptions.Item>
            <Descriptions.Item label="仓储渠道">
              <EmptyWrap value={data?.whNo} />
            </Descriptions.Item>
            <Descriptions.Item label="批次号">
              <EmptyWrap value={data?.batchNo} />
            </Descriptions.Item>
            <Descriptions.Item label="提单号">
              <EmptyWrap value={data?.ladingNo} />
            </Descriptions.Item>
            <Descriptions.Item label="航班号">
              <EmptyWrap value={data?.flightNo} />
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              <EmptyWrap value={data?.gmtCreate} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col flex="200px" style={{ textAlign: 'right' }}>
          <Space size={20}>
            <div>
              是否异常
              <h2>
                <EmptyWrap value={data?.abnormalFlagText} />
              </h2>
            </div>
            <div>
              包裹状态
              <h2>
                <EmptyWrap value={data?.stateText} />
              </h2>
            </div>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default BasicInfo;

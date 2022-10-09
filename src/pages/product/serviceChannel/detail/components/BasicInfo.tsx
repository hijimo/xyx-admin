import _includes from 'lodash/includes';
import { useCallback, useRef } from 'react';
import { Descriptions, Button, Card } from 'antd';
import type { ServiceChannelDetailSSD } from '@/types';
import { EditOutlined } from '@ant-design/icons';
import EmptyWrap from '@/components/EmptyWrap';
import type { RefAddModalProps } from '../../components/AddModal';
import AddModal from '../../components/AddModal';

interface BasicInfoProps {
  data?: ServiceChannelDetailSSD;
  onSuccess: () => void;
}

const BasicInfo = ({ data, onSuccess }: BasicInfoProps) => {
  const addModalRef = useRef<RefAddModalProps>(null);

  const handleAddOrEdit = useCallback(() => {
    addModalRef.current?.show(data);
  }, [addModalRef, data]);

  return (
    <Card>
      <Descriptions
        title={<EmptyWrap value={data?.channelName} />}
        extra={
          <Button type="primary" onClick={handleAddOrEdit}>
            <EditOutlined />
            编辑基本信息
          </Button>
        }
      >
        <Descriptions.Item label="所属服务商">
          <EmptyWrap value={data?.companyName} />
        </Descriptions.Item>
        <Descriptions.Item label="资源类型">
          <EmptyWrap value={data?.resourceTypeText} />
        </Descriptions.Item>
        <Descriptions.Item label="服务渠道编码">
          <EmptyWrap value={data?.channelCode} />
        </Descriptions.Item>
        <Descriptions.Item label="地区">
          <EmptyWrap value={data?.statisticsAreaText} />
        </Descriptions.Item>
        <Descriptions.Item label="是否敏感">
          <EmptyWrap value={data?.sensitiveFlagText} />
        </Descriptions.Item>
        {/* <Descriptions.Item label="落地配编码">
          <EmptyWrap value={data?.channelCode} />
        </Descriptions.Item> */}
      </Descriptions>
      {(_includes(data?.resourceTypes, 1) || _includes(data?.resourceTypes, 2)) && (
        <Descriptions title="渠道地址信息">
          <Descriptions.Item label="收件人">
            <EmptyWrap value={data?.consigneeName} />
          </Descriptions.Item>
          <Descriptions.Item label="联系方式">
            <EmptyWrap value={data?.consigneePhone} />
          </Descriptions.Item>
          <Descriptions.Item label="省市区">
            <EmptyWrap value={data?.addressPathText} />
          </Descriptions.Item>
          <Descriptions.Item label="详细地址">
            <EmptyWrap value={data?.addressDetail} />
          </Descriptions.Item>
          <Descriptions.Item label="邮编">
            <EmptyWrap value={data?.postcode} />
          </Descriptions.Item>
        </Descriptions>
      )}
      <AddModal
        ref={addModalRef}
        onSuccess={() => {
          onSuccess?.();
        }}
        title="编辑基本信息"
      />
    </Card>
  );
};

export default BasicInfo;

import { useCallback, useRef, useMemo } from 'react';
import { Descriptions, Button, Card } from 'antd';
import { ProductType } from '@/enum';
import type { RouteProductDetailSSD } from '@/types';
import { EditOutlined } from '@ant-design/icons';
import EmptyWrap from '@/components/EmptyWrap';
import type { RefAddModalProps } from '../../components/AddModal';
import AddModal from '../../components/AddModal';

interface BasicInfoProps {
  data?: RouteProductDetailSSD;
  onSuccess: () => void;
}

const BasicInfo = ({ data, onSuccess }: BasicInfoProps) => {
  const addModalRef = useRef<RefAddModalProps>(null);

  const detail = useMemo(() => data?.baseDto, [data]);

  const handleAddOrEdit = useCallback(() => {
    addModalRef.current?.show(data);
  }, [addModalRef, data]);

  return (
    <Card>
      <Descriptions
        title={<EmptyWrap value={detail?.cpName} />}
        extra={
          <Button type="primary" onClick={handleAddOrEdit}>
            <EditOutlined />
            编辑基本信息
          </Button>
        }
      >
        <Descriptions.Item label="线路产品编号">
          <EmptyWrap value={detail?.cpCode} />
        </Descriptions.Item>
        <Descriptions.Item label="线路简称">
          <EmptyWrap value={detail?.cpShortName} />
        </Descriptions.Item>
        <Descriptions.Item label="产品类型">
          <EmptyWrap value={detail?.cpTypeText} />
        </Descriptions.Item>
        <Descriptions.Item label="物流模式">
          <EmptyWrap value={detail?.logisticsModeText} />
        </Descriptions.Item>
        {detail?.cpType !== ProductType.TERMINAL && (
          <Descriptions.Item label="是否分段产品">
            <EmptyWrap value={detail?.sectionFlagText} />
          </Descriptions.Item>
        )}
      </Descriptions>
      <Descriptions title="服务商品">
        {detail?.cpType !== ProductType.TERMINAL && (
          <>
            <Descriptions.Item label="仓储">
              <EmptyWrap value={detail?.whServiceText} />
            </Descriptions.Item>
            <Descriptions.Item label="头程">
              <EmptyWrap value={detail?.tlServiceText} />
            </Descriptions.Item>
            <Descriptions.Item label="清关">
              <EmptyWrap value={detail?.ccServiceText} />
            </Descriptions.Item>
          </>
        )}
        <Descriptions.Item label="落地配">
          <EmptyWrap value={detail?.lcServiceText} />
        </Descriptions.Item>
      </Descriptions>
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

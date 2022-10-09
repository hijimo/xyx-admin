import { useCallback, useRef, useMemo } from 'react';
import { Descriptions, Button, Card } from 'antd';
import type { RouteProductDetailSSD } from '@/types';
import { EditOutlined } from '@ant-design/icons';
import EmptyWrap from '@/components/EmptyWrap';
import type { RefAddProductLimitedModalProps } from './AddProductLimitedModal';
import AddProductLimitedModal from './AddProductLimitedModal';

interface ProductLimitedInfoProps {
  data?: RouteProductDetailSSD;
  onSuccess: () => void;
}

const ProductLimitedInfo = ({ data, onSuccess }: ProductLimitedInfoProps) => {
  const addModalRef = useRef<RefAddProductLimitedModalProps>(null);

  const handleAddOrEdit = useCallback(() => {
    addModalRef.current?.show();
  }, [addModalRef]);

  const detail = useMemo(() => data?.ruleDto, [data]);

  return (
    <Card>
      <Descriptions
        title={<EmptyWrap value="产品限制" />}
        extra={
          <Button type="primary" onClick={() => handleAddOrEdit()}>
            <EditOutlined />
            编辑产品限制
          </Button>
        }
      >
        <Descriptions.Item label="仓储邮寄商品限制">
          <EmptyWrap value={detail?.mailLimitGoods} />
        </Descriptions.Item>
        <Descriptions.Item label="重量上限(KG)">
          <EmptyWrap value={detail?.weightUp} />
        </Descriptions.Item>
        <Descriptions.Item label="重量下限(KG)">
          <EmptyWrap value={detail?.weightDown} />
        </Descriptions.Item>
        <Descriptions.Item label="三边和限制(cm)">
          <EmptyWrap value={detail?.trilteralNum} />
        </Descriptions.Item>
        <Descriptions.Item label="单边和限制(cm)">
          <EmptyWrap value={detail?.unilateralLong} />
        </Descriptions.Item>
        <Descriptions.Item label="关税免征点">
          <EmptyWrap value={detail?.tariffPoint} />
          {detail?.tariffCurrencyText}
        </Descriptions.Item>
        <Descriptions.Item label="时效">
          <EmptyWrap value={detail?.fullLink ? `${detail?.fullLink}个工作日` : null} />
        </Descriptions.Item>
        <Descriptions.Item label="品类限制">
          <EmptyWrap value={detail?.categoryName} />
        </Descriptions.Item>
        <Descriptions.Item label="头程商品黑名单">
          <EmptyWrap value={detail?.productBacklist} />
        </Descriptions.Item>
      </Descriptions>
      <AddProductLimitedModal
        data={data}
        ref={addModalRef}
        onSuccess={() => {
          onSuccess?.();
        }}
      />
    </Card>
  );
};

export default ProductLimitedInfo;

import { Form } from 'antd';
import type { EditReceiverInfoParams } from '@/types';
import EmptyWrap from '@/components/EmptyWrap';

interface ReceiverInfoProps {
  data?: EditReceiverInfoParams;
}

const ReceiverInfo = ({ data }: ReceiverInfoProps) => {
  return (
    <Form>
      <Form.Item label="收件人">
        <EmptyWrap value={data?.consigneeName} />
      </Form.Item>
      <Form.Item label="联系电话">
        <EmptyWrap value={data?.contactTel} />
      </Form.Item>
      <Form.Item label="国家城市">
        <EmptyWrap
          value={
            data?.shenShiQu
              ? `${data?.countryName ?? ''}${data?.shenShiQu ?? ''}`
              : `${data?.countryName ?? ''}`
          }
        />
      </Form.Item>
      <Form.Item label="详细地址">
        <EmptyWrap value={data?.fullAddress} />
      </Form.Item>
      <Form.Item label="邮编">
        <EmptyWrap value={data?.postCode} />
      </Form.Item>
    </Form>
  );
};

export default ReceiverInfo;

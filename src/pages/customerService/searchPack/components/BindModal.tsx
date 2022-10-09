import React, { useRef, useCallback, useImperativeHandle, useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useMutation } from 'react-query';
import { batchBind } from '@/services/batch';
import type { BatchBindData } from '@/types';
import BillNoInfo from '@/pages/components/BillNoInfo';

interface BindModalProps {
  onSuccess?: () => void;
}
export interface RefBindModalProps {
  show: (data: string[]) => void;
  hide: () => void;
}

const InternalBindModal = ({ onSuccess }: BindModalProps, ref: React.Ref<RefBindModalProps>) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);
  const formRef = useRef<FormInstance>(null);

  const { mutate, isLoading } = useMutation((values: BatchBindData) => batchBind(values), {
    onSuccess: () => {
      setVisible(false);
      message.success('关联提单成功');
      onSuccess?.();
    },
  });

  useImperativeHandle(ref, () => ({
    show: (d) => {
      setData(d);
      setVisible(true);
    },
    hide: () => {},
  }));

  const handleOk = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const hadnleFinish = useCallback(
    (v) => {
      mutate({
        ...v,
        batchNos: data,
      });
    },
    [data, mutate],
  );

  return (
    <Modal
      title="关联提单"
      onOk={handleOk}
      visible={visible}
      destroyOnClose
      okButtonProps={{
        loading: isLoading,
      }}
      onCancel={handleCancel}
    >
      <BillNoInfo data={data} />
      <Form ref={formRef} preserve={false} onFinish={hadnleFinish}>
        <Form.Item
          label="提单号"
          name="ladingNo"
          rules={[
            {
              required: true,
              message: '提单号必填',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="航班号"
          name="flightNo"
          rules={[
            {
              required: true,
              message: '航班号必填',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const BindModal = React.forwardRef(InternalBindModal) as (
  props: BindModalProps & { ref?: React.Ref<RefBindModalProps> },
) => React.ReactElement;

export default BindModal;

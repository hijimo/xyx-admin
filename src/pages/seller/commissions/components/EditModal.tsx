import React, { useRef, useCallback, useState, useImperativeHandle } from 'react';
import { useMutation } from 'react-query';
import { Modal, Form, message, InputNumber } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { EditCommissionParams, CommissionListItemSSD } from '@/types';
import EmptyWrap from '@/components/EmptyWrap';
import { editCommission } from '@/services/seller';

interface EditModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefEditModalProps {
  show: (data: CommissionListItemSSD) => void;
  hide: () => void;
}

const InternalEditModal = (
  { onCancel, onSuccess, ...otherProps }: EditModalProps,
  ref: React.Ref<RefEditModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecordId] = useState<CommissionListItemSSD>();

  useImperativeHandle(ref, () => ({
    show: (data) => {
      setVisible(true);
      if (data) {
        setRecordId(data);
      } else {
        setRecordId(undefined);
      }
    },
    hide: () => setVisible(false),
  }));

  const { mutate, isLoading: addLoading } = useMutation(
    (params: EditCommissionParams) => editCommission(params),
    {
      onSuccess: () => {
        message.success('修改成功');
        setVisible(false);
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    (values) => {
      mutate({
        id: record?.id,
        ...values,
      });
    },
    [mutate, record],
  );

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  return (
    <Modal
      title="修改佣金"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      destroyOnClose
      confirmLoading={addLoading}
    >
      <Form
        preserve={false}
        ref={formRef}
        onFinish={handleFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        autoComplete="off"
      >
        <Form.Item label="运单号">
          <EmptyWrap value={record?.waybillNo} />
        </Form.Item>
        <Form.Item label="客户线路套餐">
          <EmptyWrap value={record?.comboName} />
        </Form.Item>
        <Form.Item label="包裹实重(KG)">
          <EmptyWrap value={record?.packageWeight} />
        </Form.Item>
        <Form.Item label="佣金金额(￥)">
          <EmptyWrap value={record?.commissionTotalStr} />
        </Form.Item>
        <Form.Item
          label="修改后佣金金额"
          name="editedCommissionTotal"
          rules={[{ required: true, message: '请输入改后佣金金额' }]}
        >
          <InputNumber prefix="￥" precision={2} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditModal = React.forwardRef(InternalEditModal) as (
  props: EditModalProps & { ref?: React.Ref<RefEditModalProps> },
) => React.ReactElement;

export default EditModal;

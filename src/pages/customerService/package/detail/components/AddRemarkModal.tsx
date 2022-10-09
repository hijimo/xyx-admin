import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input } from 'antd';
import type { AddRemarkParams } from '@/types';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { addRemark } from '@/services/package';

interface AddRemarkModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
  uniqueNo?: string;
}

export interface RefAddRemarkModalProps {
  show: () => void;
  hide: () => void;
}

const InternalAddRemarkModal = (
  { uniqueNo, onCancel, onSuccess, ...otherProps }: AddRemarkModalProps,
  ref: React.Ref<RefAddRemarkModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddRemarkParams) => addRemark(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('添加成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values) => {
      mutate({ ...values, uniqueNoList: [uniqueNo] });
    },
    [mutate, uniqueNo],
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
      title="添加备注"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <Form ref={formRef} onFinish={handleFinish} autoComplete="off">
        <Form.Item label="备注" name="remark" rules={[{ required: true, message: '请输入备注' }]}>
          <Input.TextArea placeholder="请输入备注" maxLength={200} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRemarkModal = React.forwardRef(InternalAddRemarkModal) as (
  props: AddRemarkModalProps & { ref?: React.Ref<RefAddRemarkModalProps> },
) => React.ReactElement;

export default AddRemarkModal;

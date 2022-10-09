import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, InputNumber, Input } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { CustomerBillListSSD, EditBillingAmountParams } from '@/types';
import { editBillingAmount } from '@/services/finance';
import BillInfo from './BillInfo';
import styles from './EditAmoutModal.less';

interface EditAmoutModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefEditAmoutModalProps {
  show: (item?: CustomerBillListSSD) => void;
  hide: () => void;
}

const InternalEditAmoutModal = (
  { onCancel, onSuccess, ...otherProps }: EditAmoutModalProps,
  ref: React.Ref<RefEditAmoutModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<CustomerBillListSSD>();
  useImperativeHandle(ref, () => ({
    show: (item) => {
      if (item) {
        setRecord(item);
      }
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const initialValues = record ? { id: record?.id } : undefined;

  const { mutate, isLoading: addLoading } = useMutation(
    (values: EditBillingAmountParams) => editBillingAmount(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success(record?.id ? '修改成功' : '新增成功');
        onSuccess?.();
      },
    },
  );
  const handleFinish = useCallback(
    async (params: any) => {
      // submit edit amount
      mutate(params);
    },
    [mutate],
  );

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      setRecord(undefined);
      onCancel?.(e);
    },
    [onCancel],
  );

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  return (
    <Modal
      title="修改金额"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      width={600}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <BillInfo data={record} />
      <Form
        className={styles.form}
        ref={formRef}
        initialValues={initialValues}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item hidden name="id">
          <Input placeholder="这是一个隐藏起来的表单域" />
        </Form.Item>

        <Form.Item
          label="修改后金额"
          name="calAmount"
          rules={[{ required: true, message: '请输入修改后金额' }]}
        >
          <InputNumber
            placeholder="请输入修改后金额"
            addonAfter={record?.settleCurrencyText}
            style={{ width: 300 }}
            min={0}
            precision={3}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditAmoutModal = React.forwardRef(InternalEditAmoutModal) as (
  props: EditAmoutModalProps & { ref?: React.Ref<RefEditAmoutModalProps> },
) => React.ReactElement;

export default EditAmoutModal;

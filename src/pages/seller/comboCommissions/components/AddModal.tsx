import React, { useRef, useCallback, useState, useImperativeHandle } from 'react';
import { useMutation } from 'react-query';
import { Modal, Form, message, InputNumber } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { AddComboCommissionParams, ComboCommissionListItemSSD } from '@/types';
import ProductComboSelect from '@/pages/components/ProductComboSelect';
import { addCommission } from '@/services/seller';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (data?: ComboCommissionListItemSSD) => void;
  hide: () => void;
}

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<ComboCommissionListItemSSD>();

  useImperativeHandle(ref, () => ({
    show: (data) => {
      setVisible(true);
      if (data) {
        setRecord(data);
      } else {
        setRecord(undefined);
      }
    },
    hide: () => setVisible(false),
  }));

  const { mutate, isLoading: addLoading } = useMutation(
    (params: AddComboCommissionParams) => addCommission(params),
    {
      onSuccess: () => {
        message.success('设置成功');
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
      title="佣金设置"
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
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        autoComplete="off"
        initialValues={record ? record : undefined}
      >
        <Form.Item
          label="签约线路套餐"
          name="comboNo"
          rules={[{ required: true, message: '请选择签约线路套餐' }]}
        >
          <ProductComboSelect placeholder="请输入或选择" valueType="comboNo" />
        </Form.Item>
        <Form.Item
          label="前三个月销售佣金设置"
          name="beforeCommission"
          rules={[{ required: true, message: '请输入前三个月销售佣金' }]}
        >
          <InputNumber precision={2} style={{ width: '100%' }} addonAfter="元/KG" />
        </Form.Item>
        <Form.Item
          label="后三个月销售佣金设置"
          name="afterCommission"
          rules={[{ required: true, message: '请输入后三个月销售佣金' }]}
        >
          <InputNumber precision={2} style={{ width: '100%' }} addonAfter="元/KG" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;

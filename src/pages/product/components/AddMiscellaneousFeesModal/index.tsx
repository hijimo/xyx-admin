import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { FreightListItemSSD, AddMiscellaneousFeesParams } from '@/types';
import { addOrEditMiscellaneousFees } from '@/services/freight';
import EnumSelect from '@/pages/components/EnumSelect';
import SettingTypeSelect from '@/pages/components/SettingTypeSelect';

interface AddMiscellaneousFeesModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
  productId?: number | string;
}

export interface RefAddMiscellaneousFeesModalProps {
  show: (item?: FreightListItemSSD) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const InternalAddMiscellaneousFeesModal = (
  { onCancel, onSuccess, productId, ...otherProps }: AddMiscellaneousFeesModalProps,
  ref: React.Ref<RefAddMiscellaneousFeesModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<FreightListItemSSD>();

  const isEdit = record?.id !== undefined;

  useImperativeHandle(ref, () => ({
    show: (item) => {
      if (item) {
        setRecord(item);
      } else {
        setRecord(undefined);
      }
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const initialValues = isEdit
    ? {
        ...record,
      }
    : {};

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddMiscellaneousFeesParams) => addOrEditMiscellaneousFees(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success(isEdit ? '修改成功' : '新增成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddMiscellaneousFeesParams) => {
      const params: AddMiscellaneousFeesParams = {
        ...values,
        productId: productId!,
      };
      mutate(params);
    },
    [mutate, productId],
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
      title={isEdit ? '编辑杂费' : '新增杂费'}
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      width={620}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <Form
        ref={formRef}
        initialValues={initialValues}
        onFinish={handleFinish}
        autoComplete="off"
        {...layout}
      >
        <Form.Item hidden name="id">
          <Input placeholder="这是一个隐藏起来的表单域" />
        </Form.Item>

        <Form.Item
          label="费用项名称"
          name="expenseItem"
          rules={[{ required: true, message: '请选择费用项名称' }]}
        >
          <SettingTypeSelect
            disabled={isEdit}
            paramType={6}
            placeholder="请选择"
            labelInValue={false}
          />
        </Form.Item>
        <Form.Item
          label="计费节点"
          name="billingNode"
          rules={[{ required: true, message: '请选择计费节点' }]}
        >
          <EnumSelect enumKey="billingNodeEnum" placeholder="请选择" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddMiscellaneousFeesModal = React.forwardRef(InternalAddMiscellaneousFeesModal) as (
  props: AddMiscellaneousFeesModalProps & { ref?: React.Ref<RefAddMiscellaneousFeesModalProps> },
) => React.ReactElement;

export default AddMiscellaneousFeesModal;

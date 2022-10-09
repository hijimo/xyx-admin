import React, { useCallback, useState, useImperativeHandle, useRef, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal, message, Form, Input } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { AddOperatingOrganizationParams, OperatingOrganizationsItemSSD } from '@/types';
import { addOperatingOrganization } from '@/services/setting';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (data?: OperatingOrganizationsItemSSD) => void;
  hide: () => void;
}

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const queryClient = useQueryClient();
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<OperatingOrganizationsItemSSD>();

  useImperativeHandle(ref, () => ({
    show: (data) => {
      if (data) {
        setRecord(data);
      } else {
        setRecord(undefined);
      }
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const initialValues = useMemo(() => {
    return record ? record : undefined;
  }, [record]);

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddOperatingOrganizationParams) =>
      addOperatingOrganization({ ...values, id: record?.id }),
    {
      onSuccess: () => {
        setVisible(false);
        queryClient.invalidateQueries(['numberSegmentsDetail']);
        message.success(record ? '修改成功' : '新增成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddOperatingOrganizationParams) => {
      mutate({ ...values });
    },
    [mutate],
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
      title={record ? '编辑' : '新增'}
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        ref={formRef}
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <Form.Item
          label="机构名称"
          name="companyName"
          rules={[{ required: true, message: '请输入机构名称' }]}
        >
          <Input placeholder="请输入机构名称" maxLength={30} />
        </Form.Item>
        <Form.Item
          label="开户行"
          name="openingBank"
          rules={[{ required: true, message: '请输入开户行' }]}
        >
          <Input placeholder="请输入开户行" maxLength={30} />
        </Form.Item>
        <Form.Item
          label="收款单位名称"
          name="payeeName"
          rules={[{ required: true, message: '请输入收款单位名称' }]}
        >
          <Input placeholder="请输入收款单位名称" maxLength={30} />
        </Form.Item>
        <Form.Item label="账户" name="account" rules={[{ required: true, message: '请输入账户' }]}>
          <Input placeholder="请输入账户" maxLength={30} />
        </Form.Item>
        <Form.Item label="支付宝账户" name="alipayAccount">
          <Input placeholder="请输入支付宝账户" maxLength={30} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;

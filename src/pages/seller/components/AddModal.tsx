import React, { useRef, useCallback, useState, useImperativeHandle, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Modal, Form, message } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { AddSellerParams, SellerListItemSSD } from '@/types';
import SellerCustomerSelect from '@/pages/components/SellerCustomerSelect';
import SellUserSelect from '@/pages/components/SellUserSelect';
import { addSeller, editSeller } from '@/services/seller';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (data?: SellerListItemSSD) => void;
  hide: () => void;
}

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<SellerListItemSSD>();
  const isEdit = record?.userNo !== undefined && record?.userNo !== null;

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
    (params: AddSellerParams) => (isEdit ? editSeller(params) : addSeller(params)),
    {
      onSuccess: () => {
        message.success(isEdit ? '修改成功' : '新增成功');
        setVisible(false);
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    (values: AddSellerParams) => {
      mutate({
        userNo: record?.userNo,
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

  const initialValues = useMemo(() => {
    return isEdit
      ? { customerNos: record.customerNos ?? [], userNo: record?.userNo }
      : { customerNos: [] };
  }, [record, isEdit]);

  return (
    <Modal
      title={isEdit ? '编辑销售员' : '添加销售员'}
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
        initialValues={initialValues}
      >
        {!isEdit && (
          <Form.Item
            label="选择销售用户"
            name="userNo"
            rules={[{ required: true, message: '请选择销售用户' }]}
          >
            <SellUserSelect placeholder="请输入或选择" />
          </Form.Item>
        )}
        <Form.Item noStyle dependencies={['userNo']}>
          {({ getFieldValue }) => (
            <Form.Item label="选择客户" name="customerNos">
              <SellerCustomerSelect
                userNo={getFieldValue('userNo')}
                placeholder="请输入或选择"
                mode="multiple"
              />
            </Form.Item>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;

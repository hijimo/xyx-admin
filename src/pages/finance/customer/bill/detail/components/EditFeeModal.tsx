import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, InputNumber, Input } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { CustomerBillListSSD, EditBillingAmountParams } from '@/types';
import { editBillingAmount } from '@/services/finance';
import { UnitTypeDesc, UnitType } from '@/enum';
import BillInfo from './BillInfo';
import styles from './EditAmoutModal.less';

interface EditFeeModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefEditFeeModalProps {
  show: (item?: CustomerBillListSSD) => void;
  hide: () => void;
}

const InternalEditFeeModal = (
  { onCancel, onSuccess, ...otherProps }: EditFeeModalProps,
  ref: React.Ref<RefEditFeeModalProps>,
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
      <BillInfo data={record} type={2} />
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
          label="修改后计费值"
          name="calVal"
          rules={[{ required: true, message: '请输入修改后计费值' }]}
        >
          <InputNumber
            placeholder="请输入修改后计费值"
            addonAfter={UnitTypeDesc[record?.offerType || UnitType.WEIGHT]}
            style={{ width: 300 }}
            min={0.001}
            precision={record?.offerType === UnitType.PIECES ? 0 : 3}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditFeeModal = React.forwardRef(InternalEditFeeModal) as (
  props: EditFeeModalProps & { ref?: React.Ref<RefEditFeeModalProps> },
) => React.ReactElement;

export default EditFeeModal;

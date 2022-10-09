import React, { useRef, useCallback, useState, useImperativeHandle } from 'react';
import { useMutation } from 'react-query';
import { Modal, Form, Input, Radio, InputNumber, message } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { CompanyType } from '@/enum';
import type { AddProviderFeeParams } from '@/types';
import { addProviderFee } from '@/services/fee';
import CompanySelect from '@/pages/components/CompanySelect';
import SettingTypeSelect from '@/pages/components/SettingTypeSelect';
import EnumSelect from '@/pages/components/EnumSelect';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: () => void;
  hide: () => void;
}

const selectAfter = (
  <Form.Item name="settleCurrency" noStyle rules={[{ required: true, message: '请选择币种' }]}>
    <EnumSelect
      enumKey="settleCurrencyEnum"
      style={{ width: 80 }}
      allowClear={false}
      placeholder="币种"
    />
  </Form.Item>
);

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormInstance>(null);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const { mutate, isLoading } = useMutation(
    (params: AddProviderFeeParams) => addProviderFee(params),
    {
      onSuccess: () => {
        message.success('新增成功');
        setVisible(false);
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    (values) => {
      mutate(values);
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
      title="新增"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      destroyOnClose
      confirmLoading={isLoading}
    >
      <Form
        preserve={false}
        ref={formRef}
        onFinish={handleFinish}
        autoComplete="off"
        {...layout}
        initialValues={{ settleCurrency: 1, billingDimension: 1 }}
      >
        <Form.Item
          label="服务商"
          name="companyId"
          rules={[{ required: true, message: '请选择服务商' }]}
        >
          <CompanySelect companyType={CompanyType.COMPANY} placeholder="请输入或选择" />
        </Form.Item>

        <Form.Item
          label="费用维度"
          name="billingDimension"
          rules={[{ required: true, message: '请输入费用流向', type: 'number' }]}
        >
          <Radio.Group>
            <Radio value={1}>按提单</Radio>
            <Radio value={2}>按票</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="业务号"
          name="bizNo"
          rules={[{ required: true, message: '请输入提单号或运单号' }]}
        >
          <Input maxLength={30} placeholder="请输入提单号或运单号" allowClear />
        </Form.Item>
        <Form.Item
          label="费用项"
          name="expenseItem"
          rules={[{ required: true, message: '请选择费用项' }]}
        >
          <SettingTypeSelect paramType={1} placeholder="请选择" labelInValue={false} />
        </Form.Item>

        <Form.Item label="金额" name="amount" rules={[{ required: true, message: '请输入金额' }]}>
          <InputNumber
            placeholder="请输入金额"
            style={{ width: '100%' }}
            addonAfter={selectAfter}
            precision={3}
            onChange={(value) => {
              if (value === 0) {
                formRef.current?.setFieldsValue({ amount: null });
              }
            }}
          />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" maxLength={200} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;

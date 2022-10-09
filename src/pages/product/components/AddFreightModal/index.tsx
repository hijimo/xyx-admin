import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, InputNumber } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { FreightListItemSSD, AddFreightParams, SelectItemSSD } from '@/types';
import { addOrEditFreight } from '@/services/freight';
import EnumSelect from '@/pages/components/EnumSelect';
import SettingTypeSelect from '@/pages/components/SettingTypeSelect';
import EnumRadioGroup from '@/pages/components/EnumRadioGroup';
import { UnitType } from '@/enum';
import WeightTypeForm from './WeightTypeForm';

interface AddFreightModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
  productId?: number;
  dataTransform?: (data: SelectItemSSD[]) => SelectItemSSD[];
  productType: number;
}

export interface RefAddFreightModalProps {
  show: (item?: FreightListItemSSD) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const InternalAddFreightModal = (
  {
    onCancel,
    onSuccess,
    dataTransform,
    productId,
    productType,
    ...otherProps
  }: AddFreightModalProps,
  ref: React.Ref<RefAddFreightModalProps>,
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
        weightType: record?.weightType || 1,
      }
    : {
        offerType: UnitType.PIECES,
        billingDimension: 1,
        weightType: 1,
      };

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddFreightParams) => addOrEditFreight(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success(isEdit ? '修改成功' : '新增成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddFreightParams) => {
      const params: AddFreightParams = {
        ...values,
        productId: productId!,
        productType,
      };
      mutate(params);
    },
    [mutate, productId, productType],
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

  const handleBillingDimensionChange = useCallback(() => {
    const billingDimension = formRef.current?.getFieldValue('billingDimension');
    if (billingDimension === 2) {
      formRef.current?.setFieldsValue({ offerType: UnitType.WEIGHT, weightType: 1 });
    }
  }, [formRef]);

  const handleResetWeightValue = useCallback(() => {
    formRef.current?.setFieldsValue({
      weightTypeDivideValue: null,
      castDivideRatio: null,
      weightTypeMinusValue: null,
      castMinusRatio: null,
    });
  }, [formRef]);

  return (
    <Modal
      title={isEdit ? '编辑费用项' : '新增费用项'}
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
            paramType={1}
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
        <Form.Item
          label="结算币种"
          name="settleCurrency"
          rules={[{ required: true, message: '请选择结算币种' }]}
        >
          <EnumSelect enumKey="settleCurrencyEnum" placeholder="请选择" />
        </Form.Item>
        <Form.Item
          label="计费维度"
          name="billingDimension"
          rules={[{ required: true, message: '请选择计费维度' }]}
        >
          <EnumRadioGroup
            dataTransform={dataTransform}
            enumKey="billingDimensionEnum"
            onChange={handleBillingDimensionChange}
            disabled={isEdit}
          />
        </Form.Item>
        <Form.Item noStyle dependencies={['billingDimension']}>
          {({ getFieldValue }) => (
            <Form.Item
              label="计费单位"
              name="offerType"
              rules={[{ required: true, message: '请选择计费单位' }]}
            >
              <EnumRadioGroup
                enumKey="offerTypeEnum"
                disabled={getFieldValue('billingDimension') === 2 || isEdit}
              />
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item noStyle dependencies={['offerType', 'billingDimension']}>
          {({ getFieldValue }) =>
            getFieldValue('offerType') === UnitType.WEIGHT && (
              <>
                <Form.Item
                  label="计费重量进位规则"
                  name="valueType"
                  rules={[{ required: true, message: '请选择计费重量进位规则' }]}
                >
                  <EnumSelect enumKey="weightValueTypeEnum" placeholder="请选择" />
                </Form.Item>
                <Form.Item
                  extra="体积重(KG)=长(cm)*宽(cm)*高(cm)/泡重系数"
                  label="泡重系数"
                  name="weightRatio"
                  rules={[{ required: true, message: '请输入泡重系数' }]}
                >
                  <InputNumber
                    placeholder="请输入泡重系数"
                    min={1}
                    style={{ width: '100%' }}
                    precision={0}
                  />
                </Form.Item>
                <WeightTypeForm
                  onChange={handleResetWeightValue}
                  disabled={getFieldValue('billingDimension') === 2}
                />
              </>
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddFreightModal = React.forwardRef(InternalAddFreightModal) as (
  props: AddFreightModalProps & { ref?: React.Ref<RefAddFreightModalProps> },
) => React.ReactElement;

export default AddFreightModal;

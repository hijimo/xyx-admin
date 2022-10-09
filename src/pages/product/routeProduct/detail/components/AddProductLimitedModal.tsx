import React, { useCallback, useState, useImperativeHandle, useRef, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, Row, Col, InputNumber } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { RouteProductDetailSSD, RuleDtoSSD } from '@/types';
import EnumSelect from '@/pages/components/EnumSelect';
import { editRouteProductLimited } from '@/services/routeProduct';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
  data?: RouteProductDetailSSD;
}

export interface RefAddProductLimitedModalProps {
  show: () => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const InternalAddModal = (
  { data, onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddProductLimitedModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const initialValues = useMemo(() => data?.ruleDto || { tariffCurrency: 1 }, [data]);

  const { mutate, isLoading: addLoading } = useMutation(
    (values: RuleDtoSSD) => editRouteProductLimited(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('修改成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: RuleDtoSSD) => {
      const params: RuleDtoSSD = {
        ...values,
        tariffCurrency: values?.tariffPoint ? values?.tariffCurrency : null,
        cpId: data?.id,
      };
      mutate(params);
    },
    [mutate, data],
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

  const selectAfter = (
    <Form.Item noStyle dependencies={['tariffPoint']}>
      {({ getFieldValue }) => (
        <Form.Item
          name="tariffCurrency"
          noStyle
          rules={[{ required: !!getFieldValue('tariffPoint'), message: '请选择币种' }]}
        >
          <EnumSelect
            enumKey="settleCurrencyEnum"
            style={{ width: 80 }}
            allowClear={false}
            placeholder="币种"
          />
        </Form.Item>
      )}
    </Form.Item>
  );

  return (
    <Modal
      title="编辑产品限制"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      width={900}
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
        <Row>
          <Col span={12}>
            <Form.Item
              label="仓储邮寄商品限制"
              name="mailLimitGoods"
              rules={[{ required: true, message: '请输入仓储邮寄商品限制' }]}
            >
              <Input placeholder="请输入仓储邮寄商品限制" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="重量上限(KG)"
              name="weightUp"
              rules={[{ required: true, message: '请输入' }]}
            >
              <InputNumber
                min={0.001}
                placeholder="请输入"
                style={{ width: '100%' }}
                precision={3}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="重量下限(KG)"
              name="weightDown"
              rules={[{ required: true, message: '请输入' }]}
            >
              <InputNumber
                min={0.001}
                placeholder="请输入"
                style={{ width: '100%' }}
                precision={3}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="三边和限制(cm)" name="trilteralNum">
              <InputNumber
                min={0.01}
                placeholder="请输入"
                style={{ width: '100%' }}
                precision={2}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="单边和限制(cm)" name="unilateralLong">
              <InputNumber
                min={0.01}
                placeholder="请输入"
                style={{ width: '100%' }}
                precision={2}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="品类限制" name="categoryName">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="头程商品黑名单" name="productBacklist">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="关税免征点" name="tariffPoint">
              <InputNumber
                min={0.01}
                placeholder="请输入"
                addonAfter={selectAfter}
                style={{ width: '100%' }}
                precision={2}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="时效" name="fullLink">
              <Input placeholder="请输入" addonAfter="个工作日" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddProductLimitedModalProps> },
) => React.ReactElement;

export default AddModal;

import _includes from 'lodash/includes';
import React, { useCallback, useState, useImperativeHandle, useRef, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, Row, Col, Radio } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { ProductType } from '@/enum';
import type { RouteProductDetailSSD, BaseDtoSSD } from '@/types';
import { addOrEditRouteProduct } from '@/services/routeProduct';
import EnumSelect from '@/pages/components/EnumSelect';

import ServiceChannelSelect from '@/pages/components/ServiceChannelSelect';
import styles from './AddModal.less';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (item?: RouteProductDetailSSD) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<BaseDtoSSD>();

  const isEdit = record?.id !== undefined;

  useImperativeHandle(ref, () => ({
    show: (item) => {
      if (item) {
        setRecord(item.baseDto);
      } else {
        setRecord(undefined);
      }

      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const initialValues = record ?? { state: 0, sectionFlag: 0 };

  const { mutate, isLoading: addLoading } = useMutation(
    (values: BaseDtoSSD) => addOrEditRouteProduct(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success(record?.id ? '修改成功' : '新增成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: BaseDtoSSD) => {
      const params: BaseDtoSSD = {
        ...values,
      };
      mutate(params);
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

  const required = useMemo(
    () => !_includes(formRef.current?.getFieldValue('resourceType'), 1),
    [formRef],
  );

  return (
    <Modal
      title={record?.id ? '编辑线路产品' : '新增线路产品'}
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
              label="线路产品名称"
              name="cpName"
              rules={[{ required: true, message: '请输入线路产品名称' }]}
            >
              <Input maxLength={30} placeholder="请输入线路产品名称" allowClear disabled={isEdit} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="线路产品编码"
              name="cpCode"
              rules={[{ required: true, message: '请输入线路产品' }]}
            >
              <Input maxLength={30} placeholder="请输入线路产品" allowClear disabled={isEdit} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="线路简称"
              name="cpShortName"
              rules={[{ required: true, message: '请输入线路简称' }]}
            >
              <Input maxLength={50} placeholder="请输入线路简称" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="产品类型"
              name="cpType"
              rules={[{ required, message: '请选择产品类型' }]}
            >
              <EnumSelect
                enumKey="lineProductTypeEnum"
                placeholder="请选择产品类型"
                disabled={isEdit}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="物流模式"
              name="logisticsMode"
              rules={[{ required, message: '请选择物流模式' }]}
            >
              <EnumSelect
                placeholder="请选择物流模式"
                enumKey="logisticsModeEnum"
                disabled={isEdit}
              />
            </Form.Item>
          </Col>
          <Form.Item noStyle dependencies={['cpType']}>
            {({ getFieldValue }) =>
              getFieldValue('cpType') === ProductType.ALL && (
                <Col span={12}>
                  <Form.Item label="是否分段产品" name="sectionFlag" rules={[{ required: true }]}>
                    <Radio.Group>
                      <Radio value={0}>否</Radio>
                      <Radio value={1}>是</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              )
            }
          </Form.Item>

          <Col span={24} className={styles.addressInfo}>
            选择服务产品
          </Col>
          <Form.Item noStyle dependencies={['cpType']}>
            {({ getFieldValue }) => (
              <>
                {getFieldValue('cpType') !== ProductType.TERMINAL && (
                  <>
                    <Col span={12}>
                      <Form.Item
                        label="仓储"
                        name="whIdList"
                        rules={[{ required, message: '请选择仓储' }]}
                      >
                        <ServiceChannelSelect resourceType={1} mode="multiple" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="头程"
                        name="tlIdList"
                        rules={[{ required, message: '请选择头程' }]}
                      >
                        <ServiceChannelSelect resourceType={2} mode="multiple" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="清关"
                        name="ccIdList"
                        rules={[{ required, message: '请选择清关' }]}
                      >
                        <ServiceChannelSelect resourceType={3} mode="multiple" />
                      </Form.Item>
                    </Col>
                  </>
                )}
                <Col span={12}>
                  <Form.Item
                    label="落地配"
                    name="lcIdList"
                    rules={[{ required, message: '请选择落地配' }]}
                  >
                    <ServiceChannelSelect resourceType={4} mode="multiple" />
                  </Form.Item>
                </Col>
              </>
            )}
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;

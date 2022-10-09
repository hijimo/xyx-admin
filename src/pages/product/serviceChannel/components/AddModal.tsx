import _includes from 'lodash/includes';
import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, Row, Col, Radio } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { CompanyType } from '@/enum';
import type { AddServiceChannelParams, ServiceChannelDetailSSD } from '@/types';
import { addOrEditServiceChannel } from '@/services/serviceChannel';
import CompanySelect from '@/pages/components/CompanySelect';
import EnumSelect from '@/pages/components/EnumSelect';
import AddressCascader from '@/pages/components/AddressCascader';
import ResourceTypeSelect from './ResourceTypeSelect';
import styles from './AddModal.less';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (item?: ServiceChannelDetailSSD) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<ServiceChannelDetailSSD>();

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
        id: record?.id,
        addressPaths:
          record?.addressPaths && record?.addressPaths.length > 0 ? record?.addressPaths : null,
      }
    : { sensitiveFlag: 0 };

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddServiceChannelParams) => addOrEditServiceChannel(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success(isEdit ? '修改成功' : '新增成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddServiceChannelParams) => {
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
      title={isEdit ? '编辑服务渠道' : '新增服务渠道'}
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
              label="服务渠道名称"
              name="channelName"
              rules={[{ required: true, message: '请输入服务渠道名称' }]}
            >
              <Input maxLength={30} placeholder="请输入服务渠道名称" allowClear disabled={isEdit} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="所属服务商"
              name="companyId"
              rules={[{ required: true, message: '请选择所属服务商' }]}
            >
              <CompanySelect
                companyType={CompanyType.COMPANY}
                placeholder="请输入或选择"
                onChange={() => formRef.current?.setFieldsValue({ resourceTypes: [] })}
                disabled={isEdit}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item noStyle dependencies={['companyId']}>
              {({ getFieldValue }) => (
                <Form.Item
                  label="资源类型"
                  name="resourceTypes"
                  rules={[{ required: true, message: '请选择资源类型' }]}
                >
                  <ResourceTypeSelect
                    companyId={getFieldValue('companyId')}
                    mode="multiple"
                    disabled={isEdit}
                  />
                </Form.Item>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="服务渠道编码"
              name="channelCode"
              rules={[{ required: true, message: '请输入服务渠道编码' }]}
            >
              <Input maxLength={30} placeholder="请输入服务渠道编码" allowClear disabled={isEdit} />
            </Form.Item>
          </Col>
          {/* <Form.Item dependencies={['resourceTypes']} noStyle>
            {({ getFieldValue }) =>
              _includes(getFieldValue('resourceTypes'), 4) && (
                <Col span={12}>
                  <Form.Item
                    label="落地配编码"
                    name="channelCode"
                    rules={[{ required: true, message: '请输入落地配编码' }]}
                  >
                    <Input
                      maxLength={30}
                      placeholder="请输入落地配编码"
                      allowClear
                      disabled={isEdit}
                    />
                  </Form.Item>
                </Col>
              )
            }
          </Form.Item> */}
          <Form.Item noStyle dependencies={['resourceTypes']}>
            {({ getFieldValue }) =>
              _includes(getFieldValue('resourceTypes'), 2) && (
                <>
                  <Col span={12}>
                    <Form.Item
                      label="地区"
                      name="statisticsArea"
                      rules={[
                        {
                          required: true,
                          message: '请选择地区',
                        },
                      ]}
                    >
                      <EnumSelect
                        enumKey="statisticsAreaEnum"
                        disabled={isEdit}
                        placeholder="请选择地区"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="是否敏感"
                      name="sensitiveFlag"
                      rules={[
                        {
                          required: true,
                          message: '请选择',
                        },
                      ]}
                    >
                      <Radio.Group disabled={isEdit}>
                        <Radio value={0}>否</Radio>
                        <Radio value={1}>是</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </>
              )
            }
          </Form.Item>
          <Form.Item noStyle dependencies={['resourceTypes']}>
            {({ getFieldValue }) =>
              (_includes(getFieldValue('resourceTypes'), 1) ||
                _includes(getFieldValue('resourceTypes'), 2)) && (
                <>
                  <Col span={24} className={styles.addressInfo}>
                    渠道地址信息
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="收件人"
                      name="consigneeName"
                      rules={[
                        {
                          required: _includes(getFieldValue('resourceTypes'), 1),
                          message: '请输入收件人',
                        },
                      ]}
                    >
                      <Input maxLength={30} placeholder="请输入收件人" allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="联系方式"
                      name="consigneePhone"
                      rules={[
                        {
                          required: _includes(getFieldValue('resourceTypes'), 1),
                          message: '请输入联系方式',
                        },
                      ]}
                    >
                      <Input maxLength={30} placeholder="请输入联系方式" allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="省市区"
                      name="addressPaths"
                      rules={[
                        {
                          required: _includes(getFieldValue('resourceTypes'), 1),
                          message: '请选择省市区',
                        },
                      ]}
                    >
                      <AddressCascader placeholder="请选择省市区" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="详细地址"
                      name="addressDetail"
                      rules={[
                        {
                          required: _includes(getFieldValue('resourceTypes'), 1),
                          message: '请输入详细地址',
                        },
                      ]}
                    >
                      <Input maxLength={30} placeholder="请输入详细地址" allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="邮编"
                      name="postcode"
                      rules={[
                        {
                          required: _includes(getFieldValue('resourceTypes'), 1),
                          message: '请输入邮编',
                        },
                      ]}
                    >
                      <Input maxLength={30} placeholder="请输入邮编" allowClear />
                    </Form.Item>
                  </Col>
                </>
              )
            }
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

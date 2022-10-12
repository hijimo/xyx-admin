import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { Form, Input, Row, Col, Card, InputNumber } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddIOTCompanyParams } from '@/types';
import CompanySelect from '@/components/DataSelect/CompanySelect';
import { addIOTCompany } from '@/services/iotc';
import styles from './IOTCompanyForm.less';

interface IOTCompanyFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddIOTCompanyParams>>;
  isEdit?: boolean;
  onSuccess?: () => void;
}

const IOTCompanyForm: React.FC<IOTCompanyFormProps> = ({
  formRef,
  isEdit = false,
  onSuccess,
  ...otherProps
}) => {
  const { mutate } = useMutation((values: AddIOTCompanyParams) => addIOTCompany(values), {
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const handleFinish = useCallback(
    async (values: AddIOTCompanyParams) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Form {...otherProps} ref={formRef} onFinish={handleFinish} layout="vertical">
      <Card className={styles.card}>
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item hidden name="id">
              <Input placeholder="这是一个隐藏起来的表单域" />
            </Form.Item>
            <Form.Item
              label="所属企业"
              name="companyNo"
              rules={[
                {
                  required: true,
                  message: '请选择所属企业',
                },
              ]}
            >
              <CompanySelect />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="实例信息" className={styles.card}>
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item
              label="实例ID"
              name="iotInstanceId"
              rules={[
                {
                  required: true,
                  message: '请输入实例ID',
                },
              ]}
            >
              <Input maxLength={100} placeholder="请输入实例ID" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="实例名称"
              name="instanceName"
              rules={[
                {
                  required: true,
                  message: '请输入实例名称',
                },
              ]}
            >
              <Input maxLength={100} placeholder="请输入实例名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="IOT连接域名"
              name="iotHost"
              rules={[
                {
                  required: true,
                  message: '请输入IOT连接域名',
                },
              ]}
            >
              <Input placeholder="请输入IOT连接域名" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="产品唯一标识"
              name="productKey"
              rules={[
                {
                  required: true,
                  message: '请输入产品唯一标识',
                },
              ]}
            >
              <Input placeholder="请输入产品唯一标识" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="产品名称"
              name="productName"
              rules={[
                {
                  required: true,
                  message: '请输入产品名称',
                },
              ]}
            >
              <Input placeholder="请输入产品名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="订阅组ID"
              name="consumerGroupId"
              rules={[
                {
                  required: true,
                  message: '请输入订阅组ID',
                },
              ]}
            >
              <Input placeholder="请输入订阅组ID" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="进程连接数"
              name="connectCount"
              rules={[
                {
                  required: true,
                  message: '请输入进程连接数',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="单个进程启动的连接数，最大64个连接	"
                max={64}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="设备平台接口地址" name="leShunApi">
              <Input placeholder="请输入设备平台接口地址" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="设备平台访问AK" name="leShunAccessKey">
              <Input placeholder="请输入设备平台访问AK" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="设备平台访问SK" name="leShunSecretKey">
              <Input placeholder="请输入设备平台访问SK" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="安全信息">
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item
              label="AccessKey"
              name="accessKey"
              rules={[
                {
                  required: true,
                  message: '请输入AccessKey',
                },
              ]}
            >
              <Input placeholder="请输入AccessKey" disabled={isEdit} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="AccessSecret"
              name="accessSecret"
              rules={[
                {
                  required: true,
                  message: '请输入AccessSecret',
                },
              ]}
            >
              <Input placeholder="请输入AccessSecret" disabled={isEdit} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default IOTCompanyForm;

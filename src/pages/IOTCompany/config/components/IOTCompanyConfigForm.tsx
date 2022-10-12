import React, { useCallback } from 'react';
import _last from 'lodash/last';
import { useMutation } from 'react-query';
import { Form, Input, Row, Col, Card, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddIOTCompanyConfigParams } from '@/types';
import EnumSelect from '@/components/DataSelect/EnumSelect';
import { BooleanDesc } from '@/enum';
import { UPLOAD_URL } from '@/services/common';
import { addIOTCompanyConfig } from '@/services/iotc';
import styles from './IOTCompanyConfigForm.less';

interface IOTCompanyConfigFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddIOTCompanyConfigParams>>;

  instanceId: string;
  onSuccess?: () => void;
}

const IOTCompanyConfigForm: React.FC<IOTCompanyConfigFormProps> = ({
  formRef,

  instanceId,
  onSuccess,
  ...otherProps
}) => {
  const { mutate } = useMutation(
    (values: AddIOTCompanyConfigParams) => addIOTCompanyConfig(values),
    {
      onSuccess: () => {
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddIOTCompanyConfigParams) => {
      const getFileInfo = (v) => {
        return {
          filePath: _last(values.filePath)?.response?.data?.filePath || _last(v)?.url,
          fileName: _last(values.filePath)?.response?.data?.fileName || _last(v)?.name,
        };
      };
      mutate({
        ...values,
        instanceId,
        ...getFileInfo(values.filePath),
      });
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
              label="包名"
              name="packageName"
              rules={[
                {
                  required: true,
                  message: '请输入包名',
                },
              ]}
            >
              <Input placeholder="请输入包名" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="包版本号"
              name="packageVersion"
              rules={[
                {
                  required: true,
                  message: '请输入包版本号',
                },
              ]}
            >
              <Input placeholder="请输入包版本号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item
              label="是否默认"
              name="defaultFlag"
              rules={[
                {
                  required: true,
                  message: '请选择是否默认',
                  type: 'number',
                },
              ]}
            >
              <EnumSelect enumDesc={BooleanDesc} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="是否强制升级"
              name="forceFlag"
              rules={[
                {
                  required: true,
                  message: '请选择是否强制升级',
                  type: 'number',
                },
              ]}
            >
              <EnumSelect enumDesc={BooleanDesc} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="是否重启"
              name="restartFlag"
              rules={[
                {
                  required: true,
                  message: '请选择是否重启',
                  type: 'number',
                },
              ]}
            >
              <EnumSelect enumDesc={BooleanDesc} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item
              label="升级说明	"
              name="remark"
              rules={[
                {
                  required: true,
                  message: '请输入升级说明',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="请输入升级说明" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="文件信息" className={styles.card}>
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item
              label="配置文件"
              name="filePath"
              rules={[
                {
                  required: true,
                  message: '请上传文件',
                  type: 'array',
                },
              ]}
              getValueFromEvent={({ fileList }) => {
                return fileList;
              }}
              valuePropName="fileList"
            >
              <Upload name="file" action={UPLOAD_URL} maxCount={1}>
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default IOTCompanyConfigForm;

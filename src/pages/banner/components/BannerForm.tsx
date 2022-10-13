import React, { useCallback } from 'react';
import _last from 'lodash/last';
import { useMutation } from 'react-query';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Card, InputNumber } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddBannerParams } from '@/types';

import { addBanner, editBanner } from '@/services/banner';
import Upload from '@/components/Upload';
import styles from './BannerForm.less';

interface BannerFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddBannerParams>>;
  isEdit?: boolean;
  onSuccess?: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({
  formRef,
  isEdit = false,
  onSuccess,
  ...otherProps
}) => {
  const { mutate } = useMutation(
    (values: AddBannerParams) => (isEdit ? editBanner(values) : addBanner(values)),
    {
      onSuccess: () => {
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddBannerParams) => {
      mutate({
        ...values,
        bannerPath: _last(values.bannerPath)?.url,
      });
    },
    [mutate],
  );

  return (
    <Form {...otherProps} ref={formRef} onFinish={handleFinish} layout="vertical">
      <Card className={styles.card}>
        <Row gutter={100}>
          <Col span={24}>
            <Form.Item hidden name="bannerId">
              <Input placeholder="这是一个隐藏起来的表单域" />
            </Form.Item>
            <Form.Item
              label="Banner图"
              name="bannerPath"
              valuePropName="fileList"
              rules={[{ required: true, message: '请上传营业执照' }]}
            >
              <Upload maxLength={1}>
                <PlusOutlined /> 上传
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="网址"
              name="bannerUrl"
              rules={[
                {
                  required: true,
                  message: '请输入网址',
                },
              ]}
            >
              <Input placeholder="请输入网址" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="排序"
              name="bannerRank"
              rules={[
                {
                  required: true,
                  message: '请输入排序',
                  type: 'number',
                },
              ]}
            >
              <InputNumber placeholder="请输入排序" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default BannerForm;

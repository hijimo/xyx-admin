import React, { useCallback } from 'react';
import _last from 'lodash/last';
import { useMutation } from 'react-query';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Card, InputNumber } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddFigureParams } from '@/types';

import { addFigure, editFigure } from '@/services/figure';
import Upload from '@/components/Upload';
import styles from './FigureForm.less';

interface FigureFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddFigureParams>>;
  isEdit?: boolean;
  onSuccess?: () => void;
}

const FigureForm: React.FC<FigureFormProps> = ({
  formRef,
  isEdit = false,
  onSuccess,
  ...otherProps
}) => {
  const { mutate } = useMutation(
    (values: AddFigureParams) => (isEdit ? editFigure(values) : addFigure(values)),
    {
      onSuccess: () => {
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddFigureParams) => {
      mutate({
        ...values,
        avatar: _last(values.avatar)?.url,
      });
    },
    [mutate],
  );

  return (
    <Form {...otherProps} ref={formRef} onFinish={handleFinish} layout="vertical">
      <Card className={styles.card}>
        <Row gutter={100}>
          <Col span={24}>
            <Form.Item hidden name="gameRoleId">
              <Input placeholder="这是一个隐藏起来的表单域" />
            </Form.Item>
            <Form.Item
              label="头像"
              name="avatar"
              valuePropName="fileList"
              rules={[{ required: true, message: '请上传头像' }]}
            >
              <Upload maxLength={1}>
                <PlusOutlined /> 上传
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="角色名称"
              name="gameRoleName"
              rules={[
                {
                  required: true,
                  message: '请输入角色名称',
                },
              ]}
            >
              <Input placeholder="请输入角色名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="系列"
              name="gameRoleSeries"
              rules={[
                {
                  required: true,
                  message: '请输入系列',
                },
              ]}
            >
              <Input placeholder="请输入系列" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="角色介绍"
              name="gameRoleInfo"
              rules={[
                {
                  required: true,
                  message: '请输入角色介绍',
                },
              ]}
            >
              <Input.TextArea rows={3} placeholder="请输入角色介绍" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="任务"
              name="gameRoleMission"
              rules={[
                {
                  required: true,
                  message: '请输入任务',
                },
              ]}
            >
              <Input.TextArea rows={3} placeholder="请输入任务" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="半密钥"
              name="gameRoleHalfKey"
              rules={[
                {
                  required: true,
                  message: '请输入半密钥',
                },
              ]}
            >
              <Input.TextArea rows={3} placeholder="请输入半密钥" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default FigureForm;

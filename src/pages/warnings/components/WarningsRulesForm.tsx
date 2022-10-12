import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { Form, Input, Row, Col, Card } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddWarningsParams } from '@/types';
import CompanySelect from '@/components/DataSelect/CompanySelect';
import { addDeviceWarn } from '@/services/warnings';
import styles from './WarningsRulesForm.less';

interface WarningsRulesFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddWarningsParams>>;

  onSuccess?: () => void;
}

const WarningsRulesForm: React.FC<WarningsRulesFormProps> = ({
  formRef,

  onSuccess,
  ...otherProps
}) => {
  const { mutate } = useMutation((values: AddWarningsParams) => addDeviceWarn(values), {
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const handleFinish = useCallback(
    async (values: AddWarningsParams) => {
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
              label="预警名称"
              name="warnName"
              rules={[
                {
                  required: true,
                  message: '请输入预警名称',
                },
              ]}
            >
              <Input placeholder="请输入预警名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="关联物模型编号"
              name="deviceCode"
              rules={[
                {
                  required: true,
                  message: '请选择关联物模型编号',
                },
              ]}
            >
              <CompanySelect />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="告警规则"
              name="context"
              rules={[
                {
                  required: true,
                  message: '请输入告警规则',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="请输入告警规则" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="提示文案模版"
              name="copyTemp"
              rules={[
                {
                  required: true,
                  message: '请输入提示文案模版',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="请输入提示文案模版" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default WarningsRulesForm;

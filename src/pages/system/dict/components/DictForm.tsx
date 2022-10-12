import React from 'react';
import { Form, Input, Card, InputNumber } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import { DictAddParams } from '@/types';
import styles from './DictForm.less';

interface DictFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<DictAddParams>>;
  onSuccess?: () => void;
}

const DictForm: React.FC<DictFormProps> = ({ formRef, onSuccess, ...otherProps }) => {
  return (
    <Form {...otherProps} ref={formRef} layout="vertical">
      <Card className={styles.card}>
        <Form.Item label="字典编码" name="dictCode" hidden>
          <Input disabled maxLength={50} placeholder="请输入字典编码" />
        </Form.Item>
        <Form.Item
          label="标签类型	"
          name="dictType"
          rules={[
            {
              required: true,
              message: '请输入标签类型',
            },
          ]}
        >
          <Input maxLength={50} disabled placeholder="请输入标签类型" />
        </Form.Item>
        <Form.Item
          label="字典标签名称"
          name="dictLabel"
          rules={[
            {
              required: true,
              message: '请输入字典标签名称',
            },
          ]}
        >
          <Input maxLength={50} placeholder="请输入字典标签名称" />
        </Form.Item>
        <Form.Item
          label="字典值"
          name="dictValue"
          rules={[
            {
              required: true,
              message: '请输入字典值',
            },
          ]}
        >
          <Input maxLength={50} placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item label="排序" name="dictSort">
          <InputNumber placeholder="请输入排序" />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea maxLength={500} placeholder="请输入备注" />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default DictForm;

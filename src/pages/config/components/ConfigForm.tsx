import React, { useCallback } from 'react';
import _last from 'lodash/last';
import { useMutation } from 'react-query';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Card, InputNumber } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import { ConfigTypeEnum } from '@/enum';
import type { DictAddParams } from '@/types';

import { addDict, editDict } from '@/services/dict';
import Upload from '@/components/Upload';
import styles from './ConfigForm.less';

interface ConfigFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<DictAddParams>>;
  isEdit?: boolean;
  type: ConfigTypeEnum;
  onSuccess?: () => void;
}

const ConfigForm: React.FC<ConfigFormProps> = ({
  formRef,
  type,
  isEdit = false,
  onSuccess,
  ...otherProps
}) => {
  const { mutate } = useMutation(
    (values: DictAddParams) => (isEdit ? editDict(values) : addDict(values)),
    {
      onSuccess: () => {
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: DictAddParams) => {
      const { audio, image, price, remark, dictValue, ...others } = values;
      mutate({
        ...others,
        dictValue: dictValue ?? JSON.stringify({ audio, image, price, remark }),
        dictType: type,
      });
    },
    [mutate, type],
  );

  return (
    <Form {...otherProps} ref={formRef} onFinish={handleFinish} layout="vertical">
      <Card className={styles.card}>
        <Row gutter={100}>
          {ConfigTypeEnum.AUDIO === type && (
            <Col span={24}>
              <Form.Item
                label="背景音乐"
                name="audio"
                valuePropName="fileList"
                rules={[{ required: true, message: '请上传背景音乐' }]}
              >
                <Upload maxLength={1} accept=".mp3">
                  <PlusOutlined /> 上传
                </Upload>
              </Form.Item>
            </Col>
          )}
          {[ConfigTypeEnum.IMAGE, ConfigTypeEnum.FIANL_REWARD, ConfigTypeEnum.REWARD].includes(
            type,
          ) && (
            <Col span={24}>
              <Form.Item
                label="背景图片"
                name="image"
                valuePropName="fileList"
                rules={[{ required: true, message: '请上传背景图片' }]}
              >
                <Upload maxLength={1}>
                  <PlusOutlined /> 上传
                </Upload>
              </Form.Item>
            </Col>
          )}
          <Col span={8}>
            <Form.Item hidden name="dictCode">
              <Input placeholder="这是一个隐藏起来的表单域" />
            </Form.Item>
            <Form.Item
              label="名称"
              name="dictLabel"
              rules={[
                {
                  required: true,
                  message: '请输入名称',
                },
              ]}
            >
              <Input placeholder="请输入名称" />
            </Form.Item>
          </Col>
          {[ConfigTypeEnum.TIME_LIMIT].includes(type) && (
            <Col span={8}>
              <Form.Item
                label="配置值"
                name="dictValue"
                rules={[
                  {
                    required: true,
                    message: '请输入配置值',
                    type: 'number',
                  },
                ]}
              >
                <InputNumber placeholder="请输入配置值" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          )}

          {[ConfigTypeEnum.REWARD, ConfigTypeEnum.FIANL_REWARD].includes(type) && (
            <Col span={8}>
              <Form.Item
                label="额度"
                name="price"
                rules={[
                  {
                    required: true,
                    message: '请输入额度',
                    type: 'number',
                  },
                ]}
              >
                <InputNumber placeholder="请输入额度" addonAfter="元" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          )}

          {type !== ConfigTypeEnum.AUDIO && (
            <Col span={8}>
              <Form.Item
                label="说明"
                name="remark"
                rules={[
                  {
                    required: true,
                    message: '请输入说明',
                  },
                ]}
              >
                <Input placeholder="请输入说明" />
              </Form.Item>
            </Col>
          )}
          <Col span={8}>
            <Form.Item
              label="排序"
              name="dictSort"
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

export default ConfigForm;

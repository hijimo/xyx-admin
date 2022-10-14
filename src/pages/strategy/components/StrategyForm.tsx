import React, { useCallback } from 'react';
import _last from 'lodash/last';
import { useMutation } from 'react-query';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Card, InputNumber, DatePicker } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddBannerParams } from '@/types';
import FigureFormList from './FigureFormList';
import { addBanner, editBanner } from '@/services/banner';
import Upload from '@/components/Upload';
import styles from './StrategyForm.less';

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
            <Form.Item hidden name="strategyId">
              <Input placeholder="这是一个隐藏起来的表单域" />
            </Form.Item>
            <Form.Item
              label="背景图"
              name="filesJson"
              valuePropName="fileList"
              rules={[{ required: true, message: '请上传Banner图' }]}
            >
              <Upload maxLength={1}>
                <PlusOutlined /> 上传
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="主题"
              name="strategyTitle"
              rules={[
                {
                  required: true,
                  message: '请输入主题',
                },
              ]}
            >
              <Input placeholder="请输入主题" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="背景介绍"
              name="strategyBackground"
              rules={[
                {
                  required: true,
                  message: '请输入背景介绍',
                },
              ]}
            >
              <Input.TextArea placeholder="请输入背景介绍" rows={3} maxLength={500} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card className={styles.card} title="角色">
        <FigureFormList name="roles" />
      </Card>
      <Card className={styles.card} title="奖品">
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item
              label="个人奖策略"
              name="rewardStrategyId"
              rules={[
                {
                  required: true,
                  message: '请选择个人奖策略',
                },
              ]}
            >
              <Input placeholder="请选择个人奖策略" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="个人奖"
              name="rewardId"
              rules={[
                {
                  required: true,
                  message: '请选择个人奖',
                },
              ]}
            >
              <Input placeholder="请选择个人奖" maxLength={500} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item
              label="总密钥"
              name="finalKey"
              rules={[
                {
                  required: true,
                  message: '请输入总密钥',
                },
              ]}
            >
              <Input placeholder="请输入总密钥" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="总密钥提示"
              name="finalKeyTips"
              rules={[
                {
                  required: true,
                  message: '请输入总密钥提示',
                },
              ]}
            >
              <Input placeholder="请输入总密钥提示" maxLength={500} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="终极宝藏"
              name="finalRewardId"
              rules={[
                {
                  required: true,
                  message: '请选择终极宝藏',
                },
              ]}
            >
              <Input placeholder="请选择终极宝藏" maxLength={500} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="时效"
              name="timeLimitId"
              rules={[
                {
                  required: true,
                  message: '请选择时效',
                },
              ]}
            >
              <DatePicker placeholder="请选择时效" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default BannerForm;

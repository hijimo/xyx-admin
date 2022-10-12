import { useCallback, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { List, Modal, Button, Form, Input, message, Row, Col } from 'antd';
import type { UpdateUserEmailParams, SendEmailCodeParams } from '@/types';
import type { FormInstance } from 'antd/es/form';
import useCountDown from 'ahooks/es/useCountDown';
import EmptyWrap from '@/components/EmptyWrap';
import { updateUserEmail, postSendEmailCode } from '@/services/user';

interface UserEmailProps {
  data?: string;
  onSuccess: () => void;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const rules = [
  {
    required: true,
    min: 8,
    max: 16,
    message: '8-16 字符，必须包含数字和字母',
    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
  },
];

const UserEmail = ({ data, onSuccess }: UserEmailProps) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);

  const [countdown, setTargetDate] = useCountDown();

  const initialValues = undefined;

  const { mutate, isLoading: uploadLoading } = useMutation(
    (values: UpdateUserEmailParams) => updateUserEmail(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('更改成功');
        onSuccess?.();
      },
    },
  );

  const { mutate: getVerifyCode } = useMutation(
    (values: SendEmailCodeParams) => postSendEmailCode(values),
    {
      onSuccess: () => {
        message.success('验证码已发送');
        setTargetDate(Date.now() + 60 * 1000);
      },
    },
  );

  const handleFinish = useCallback(
    async (values: UpdateUserEmailParams) => {
      const params: UpdateUserEmailParams = {
        ...values,
      };
      mutate(params);
    },
    [mutate],
  );

  /*  const handleUpdate = useCallback(() => {
    setVisible(true);
  }, []); */

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  const handleSendVerfyCode = useCallback(() => {
    formRef?.current?.validateFields(['mobile']).then(() => {
      getVerifyCode({
        email: formRef.current?.getFieldValue('userEmail'),
        verifyCodeType: 1,
      });
    });
  }, [formRef, getVerifyCode]);

  return (
    <>
      {/* <List.Item actions={[<a onClick={handleUpdate}>更改</a>]}> */}
      <List.Item>
        <List.Item.Meta
          title="邮箱"
          description={
            <>
              邮箱：
              <EmptyWrap value={data} />
            </>
          }
        />
      </List.Item>
      <Modal
        title="更改邮箱"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        footer={
          <>
            <Button type="default" onClick={() => setVisible(false)}>
              取消
            </Button>
            <Button type="primary" onClick={handleSubmit} loading={uploadLoading}>
              提交
            </Button>
          </>
        }
      >
        <Form
          {...layout}
          ref={formRef}
          initialValues={initialValues}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="邮箱"
            name="userEmail"
            rules={[
              { required: true, message: '请填写邮箱' },
              {
                type: 'email',
                message: '请填写正确的邮箱',
              },
            ]}
          >
            <Input placeholder="请填写邮箱" />
          </Form.Item>
          <Form.Item
            label="验证码"
            name="verifyEmailCode"
            rules={[{ required: true, message: '请填写验证码' }]}
          >
            <Row justify="space-between">
              <Col span={12}>
                <Input placeholder="请填写验证码" />
              </Col>
              <Col span={10} style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={handleSendVerfyCode} block disabled={countdown > 0}>
                  {countdown > 0 ? `${Math.round(countdown / 1000)}秒后重新发送` : '发送验证码'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="密码" name="userPassword" rules={rules}>
            <Input placeholder="请填写密码" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserEmail;

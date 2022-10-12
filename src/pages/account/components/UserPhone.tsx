import { useCallback, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { List, Modal, Button, Form, Input, message, Row, Col } from 'antd';
import type { UpdateUserPhoneParams, SendMobileCodeParams } from '@/types';
import type { FormInstance } from 'antd/es/form';
import useCountDown from 'ahooks/es/useCountDown';
import EmptyWrap from '@/components/EmptyWrap';
import { updateUserPhone, sendMobileCode } from '@/services/user';
import { regPhone } from '@/utils/pattern';

interface UserPhoneProps {
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

const UserPhone = ({ data, onSuccess }: UserPhoneProps) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);

  const [countdown, setTargetDate] = useCountDown();

  const initialValues = undefined;

  const { mutate, isLoading: updateLoading } = useMutation(
    (values: UpdateUserPhoneParams) => updateUserPhone(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('更改成功');
        onSuccess?.();
      },
    },
  );

  const { mutate: getVerifyCode } = useMutation(
    (values: SendMobileCodeParams) => sendMobileCode(values),
    {
      onSuccess: () => {
        message.success('验证码已发送');
        setTargetDate(Date.now() + 60 * 1000);
      },
    },
  );

  const handleFinish = useCallback(
    async (values: UpdateUserPhoneParams) => {
      const params: UpdateUserPhoneParams = {
        ...values,
      };
      console.log(params);
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
        mobile: formRef.current?.getFieldValue('userMobile'),
        verifyCodeType: 1,
      });
    });
  }, [formRef, getVerifyCode]);

  return (
    <>
      {/* <List.Item actions={[<a onClick={handleUpdate}>更改</a>]}> */}
      <List.Item>
        <List.Item.Meta
          title="手机号"
          description={
            <>
              手机号：
              <EmptyWrap value={data} />
            </>
          }
        />
      </List.Item>
      <Modal
        title="更改手机号"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        footer={
          <>
            <Button type="default" onClick={() => setVisible(false)}>
              取消
            </Button>
            <Button type="primary" onClick={handleSubmit} loading={updateLoading}>
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
            label="新手机号"
            name="userMobile"
            rules={[
              { required: true, message: '请填写新手机号' },
              {
                pattern: regPhone,
                message: '请输入正确的手机号码',
              },
            ]}
          >
            <Input placeholder="请填写新手机号" type="tel" />
          </Form.Item>
          <Form.Item
            label="验证码"
            name="verifyMobileCode"
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

export default UserPhone;

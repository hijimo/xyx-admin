import { useCallback, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { List, Modal, Button, Form, Input, message } from 'antd';
import type { UpdateUserPasswordParams } from '@/types';
import type { FormInstance } from 'antd/es/form';
import EmptyWrap from '@/components/EmptyWrap';
import { updateUserPassword } from '@/services/user';

interface UserPasswordProps {
  onSuccess?: () => void;
  userId?: number;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const rules = [
  {
    required: true,
    // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
    // min: 8,
    // max: 16,
    // message: '8-16 字符，必须包含数字和字母',
  },
];

const UserPassword = ({ onSuccess, userId }: UserPasswordProps) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);

  const initialValues = undefined;

  const { mutate, isLoading: uploadLoading } = useMutation(
    (values: UpdateUserPasswordParams) => updateUserPassword({ ...values, id: userId! }),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('更改成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: UpdateUserPasswordParams) => {
      mutate(values);
    },
    [mutate],
  );

  const handleClick = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  return (
    <>
      <List.Item actions={[<a onClick={handleClick}>更改</a>]} key="pwd">
        <List.Item.Meta
          title="密码"
          description={
            <>
              密码：
              <EmptyWrap value="********" />
            </>
          }
        />
      </List.Item>
      <Modal
        key="pwdChangeModal"
        title="更改密码"
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
          <Form.Item label="原密码" name="oldPassword" rules={[{ required: true }]}>
            <Input.Password placeholder="请填写原密码" />
          </Form.Item>
          <Form.Item label="新密码" name="newPassword" rules={rules}>
            <Input.Password placeholder="请填写新密码" />
          </Form.Item>
          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { ...rules[0] },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不相同'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请填写确认新密码" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserPassword;

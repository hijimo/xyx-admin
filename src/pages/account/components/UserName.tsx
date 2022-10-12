import { useCallback, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { List, Modal, Button, Form, Input, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import EmptyWrap from '@/components/EmptyWrap';
import { addUser } from '@/services/userManager';

interface UserNameProps {
  oldName?: string;
  userId?: string | number;
  onSuccess: () => void;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const UserName = ({ oldName, userId, onSuccess }: UserNameProps) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);

  const initialValues = { userName: oldName };

  const { mutate, isLoading: uploadLoading } = useMutation(
    (userName?: string) =>
      addUser({
        userName,
        id: userId,
      }),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('更改成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async ({ userName }: { userName: string }) => {
      mutate(userName);
    },
    [mutate],
  );

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  return (
    <>
      <List.Item /* actions={[<a onClick={handleClick}>更改</a>]} */ key="nick">
        <List.Item.Meta
          title="昵称"
          description={
            <>
              昵称：
              <EmptyWrap value={oldName} />
            </>
          }
        />
      </List.Item>
      <Modal
        key="nickChangeModal"
        title="更改昵称"
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
            label="昵称"
            name="userName"
            rules={[
              {
                required: true,
                message: '请填写昵称',
              },
            ]}
          >
            <Input maxLength={50} placeholder="请输入昵称" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserName;

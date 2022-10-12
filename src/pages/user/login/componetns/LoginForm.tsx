import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useMutation } from 'react-query';
import { Link } from 'umi';
import { Form, Input, Button, Space } from 'antd';
import type { Rule } from 'antd/es/form';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import type { UserLoginData, UserLoginResponseData } from '@/types';
import { login } from '@/services/user';
import { setToken } from '@/utils/ls';
import logo from '@/assets/logo2.png';
import styles from './LoginForm.less';

interface LoginFormProps {
  onSuccess?: (data: UserLoginResponseData, params: UserLoginData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const { mutate, isLoading } = useMutation((params: UserLoginData) => login(params), {
    onSuccess({ data }, variable) {
      setToken(data.token);
      onSuccess?.(data, variable);
    },
  });

  const rules: Record<string, Rule[]> = useMemo(() => {
    return {
      userAccount: [
        {
          required: true,
          type: 'string',
          message: '账号不能为空',
        },
      ],
      password: [
        {
          required: true,
          type: 'string',
          message: '密码不能为空',
        },
      ],
    };
  }, []);

  const handleFinish = useCallback(
    (values) => {
      mutate({
        ...values,
      });
    },
    [mutate],
  );

  return (
    <div className={styles.loginForm}>
      <div className={styles.center}>
        <img src={logo} className={styles.logo} />
      </div>
      <div className={styles.subTitle}>寻一寻</div>
      <Form form={form} onFinish={handleFinish} size="large">
        <Space size={16} direction="vertical" className="space-flex">
          <Form.Item name="username" rules={rules.userAccount} validateFirst>
            <Input
              className={styles.input}
              prefix={<UserOutlined className={styles.prefixIcon} />}
              placeholder="账号"
              maxLength={32}
            />
          </Form.Item>
          <Form.Item name="password" rules={rules.password} validateFirst>
            <Input.Password
              className={styles.input}
              prefix={<LockOutlined type="lock" className={styles.prefixIcon} />}
              placeholder="密码"
              maxLength={32}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className={classNames(styles.loginFormSubmit)}
            loading={isLoading}
          >
            登录
          </Button>
        </Space>

        <div className={styles.loginFormLinkBar}>
          <a href={`/register${window.location.search}`} className={styles.loginFormLink}>
            免费注册
          </a>
          <Link
            to={`/forget${window.location.search}`}
            className={classNames(styles.loginFormLink, styles.loginFormLink2)}
          >
            找回密码
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;

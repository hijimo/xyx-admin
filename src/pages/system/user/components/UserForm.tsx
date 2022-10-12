import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { Form, Input, Row, Col, DatePicker, Card } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import _last from 'lodash/last';
import type { AddUserParams } from '@/types';
import { regPhone } from '@/utils/pattern';
import CompanySelect from '@/components/DataSelect/CompanySelect';
import RoleSelect from '@/components/DataSelect/RoleSelect';
// import SexSelect from '@/components/DataSelect/SexSelect';
import UserTypeSelect from '@/components/DataSelect/UserTypeSelect';
import DictSelect from '@/components/DictSelect';
import DeptCascader from '@/components/DataSelect/DeptCascader';
import { addUser, editUser } from '@/services/userManager';
import styles from './UserForm.less';

interface UserFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddUserParams>>;
  isEdit?: boolean;
  onSuccess?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  formRef,
  isEdit = false,
  onSuccess,
  ...otherProps
}) => {
  const [form] = Form.useForm();
  const { mutate } = useMutation(
    (values: AddUserParams) => (isEdit ? editUser(values) : addUser(values)),
    {
      onSuccess: () => {
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddUserParams & { deptPath: string[]; roleNo: string }) => {
      const { deptId, roleIds, roleNo, ...others } = values;
      // if (values.id) {
      //   delete others.userPassword;
      // }
      mutate({
        ...others,
        roleIds: [roleIds],
        roleNoList: [roleNo],
        deptId: _last(deptId),
      });
    },
    [mutate],
  );

  const handleCompanyChange = (v, option) => {
    form.setFieldsValue({
      companyType: option.extra.companyType,
      userType: undefined,
    });
  };

  return (
    <Form {...otherProps} ref={formRef} form={form} onFinish={handleFinish} layout="vertical">
      <Card title="组织信息" className={styles.card}>
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item
              label="组织	"
              name="deptId"
              // rules={[
              //   {
              //     required: true,
              //     message: '请选择上级组织	',
              //   },
              // ]}
            >
              <DeptCascader changeOnSelect valueType="id" placeholder="请选择上级组织" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="角色"
              name="roleIds"
              rules={[
                {
                  required: true,
                  message: '请选择角色',
                },
              ]}
            >
              <RoleSelect />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="备注" name="remark">
              <Input.TextArea placeholder="请输入备注" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card className={styles.card} title="账号信息">
        <Row gutter={100}>
          {/* <Col span={8}>
            <Form.Item noStyle dependencies={['companyType']}>
              {({ getFieldValue }) => (
                <Form.Item
                  label="账号类型"
                  name="userType"
                  rules={[
                    {
                      required: true,
                      message: '请选择账号类型',
                    },
                  ]}
                >
                  <UserTypeSelect companyType={getFieldValue('companyType')} />
                </Form.Item>
              )}
            </Form.Item>
          </Col> */}

          <Col span={8}>
            <Form.Item hidden name="userId">
              <Input placeholder="这是一个隐藏起来的表单域" />
            </Form.Item>

            <Form.Item
              label="昵称"
              name="nickName"
              rules={[
                {
                  required: true,
                  message: '请输入昵称',
                },
              ]}
            >
              <Input maxLength={50} placeholder="请输入昵称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="账号"
              name="userName"
              rules={[
                {
                  required: true,
                  message: '请输入账号',
                },
              ]}
            >
              <Input disabled={isEdit} maxLength={50} placeholder="请输入账号" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="密码"
              name="password"
              rules={
                isEdit
                  ? undefined
                  : [
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ]
              }
            >
              <Input.Password disabled={isEdit} maxLength={50} placeholder="请输入密码" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="基本信息">
        <Row gutter={100}>
          <Col span={8}>
            <Form.Item
              label="邮箱"
              name="email"
              // rules={[
              //   {
              //     required: true,
              //     message: '请输入邮箱',
              //   },
              //   {
              //     type: 'email',
              //     message: '请输入正确的邮箱',
              //   },
              // ]}
            >
              <Input maxLength={50} placeholder="请输入邮箱" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="手机号"
              name="phonenumber"
              rules={[
                {
                  required: true,
                  message: '请输入手机号',
                },
                {
                  pattern: regPhone,
                  message: '请输入正确的手机号码',
                },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
          </Col>
          {/* <Col span={8}>
            <Form.Item label="生日" name="userBirthday">
              <DatePicker placeholder="请选择生日" allowClear style={{ width: '100%' }} />
            </Form.Item>
          </Col> */}
          <Col span={8}>
            <Form.Item label="性别" name="sex">
              <DictSelect enumKey="sys_user_sex" placeholder="请选择性别" allowClear />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default UserForm;

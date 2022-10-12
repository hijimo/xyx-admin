import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { Form, Input, Row, Col, InputNumber } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddRoleParams } from '@/types';
import ResourceRoleSelect from '@/components/DataSelect/ResourceRoleSelect';
import { addRole, editRole } from '@/services/role';

interface RoleFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddRoleParams>>;
  onSuccess?: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ formRef, onSuccess, ...otherProps }) => {
  const { mutate } = useMutation(
    (values: AddRoleParams) => (values.roleId ? editRole(values) : addRole(values)),
    {
      onSuccess: () => {
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddRoleParams) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Form {...otherProps} ref={formRef} onFinish={handleFinish} layout="vertical">
      <Row gutter={100}>
        <Col span={8}>
          <Form.Item hidden name="roleId">
            <Input placeholder="这是一个隐藏起来的表单域" />
          </Form.Item>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[
              {
                required: true,
                message: '请填写角色名称',
              },
            ]}
          >
            <Input maxLength={50} placeholder="请填写角色名称" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="角色编码"
            name="roleKey"
            rules={[
              {
                required: true,
                message: '请填写角色编码',
              },
            ]}
          >
            <Input maxLength={50} placeholder="请填写角色编码" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="资源权限"
            name="menuIds"
            rules={[
              {
                required: true,
                type: 'array',
                message: '请选择资源权限',
              },
            ]}
          >
            <ResourceRoleSelect />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="排序	"
            name="roleSort"
            rules={[
              {
                required: true,
                message: '请输入排序	',
              },
            ]}
          >
            <InputNumber placeholder="请输入排序" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="角色描述"
            name="remark"
            rules={[
              {
                required: true,
                message: '请填写角色描述',
              },
            ]}
          >
            <Input.TextArea rows={3} maxLength={200} placeholder="请填写角色描述" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default RoleForm;

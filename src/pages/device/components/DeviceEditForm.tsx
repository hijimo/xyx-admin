import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import _last from 'lodash/last';
import { Form, Input, Row, Col } from 'antd';

import type { FormInstance, FormProps } from 'antd/es/form';

import type { EditDeviceInfoParams } from '@/types';
import DeviceGroupCascader from '@/components/DataSelect/DeviceGroupCascader';
import { editDeviceInfo } from '@/services/device';

interface DeviceEditFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<EditDeviceInfoParams>>;
  onSuccess?: () => void;
  companyNo?: string;
}

const DeviceEditForm: React.FC<DeviceEditFormProps> = ({
  formRef,
  companyNo,
  onSuccess,
  initialValues,
  ...otherProps
}) => {
  const { mutate } = useMutation((values: EditDeviceInfoParams) => editDeviceInfo(values), {
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const handleFinish = useCallback(
    async (values: EditDeviceInfoParams & { groupCodePath?: string[] }) => {
      const { groupCodePath, ...others } = values;
      mutate({
        ...others,
        groupCode: _last(groupCodePath),
      });
    },
    [mutate],
  );

  return (
    <Form
      {...otherProps}
      ref={formRef}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <Row gutter={100}>
        <Col span={8}>
          <Form.Item hidden name="id">
            <Input placeholder="这是一个隐藏起来的表单域" />
          </Form.Item>

          <Form.Item
            label="设备别名"
            name="aliasName"
            rules={[
              {
                required: true,
                message: '请输入设备别名',
              },
            ]}
          >
            <Input placeholder="请输入设备别名" />
          </Form.Item>
        </Col>
        {/*  */}
        <Col span={8}>
          <Form.Item
            label="所属分组"
            name="groupCodePath"
            rules={[
              {
                required: true,
                message: '请选择所属分组',
              },
            ]}
          >
            <DeviceGroupCascader
              changeOnSelect
              companyNo={companyNo}
              placeholder="请选择所属分组"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DeviceEditForm;

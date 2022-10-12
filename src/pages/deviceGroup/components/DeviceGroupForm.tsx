import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import _last from 'lodash/last';
import { Form, Input, Row, Col, Button } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddDeviceGroupParams } from '@/types';
import CompanySelect from '@/components/DataSelect/CompanySelect';
import DeviceGroupCascader from '@/components/DataSelect/DeviceGroupCascader';
import { addDeviceGroup } from '@/services/deviceGroup';

interface DeviceGroupFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddDeviceGroupParams>>;
  onSuccess?: () => void;
  companyNo: string;
}

const DeviceGroupForm: React.FC<DeviceGroupFormProps> = ({
  companyNo,
  formRef,
  onSuccess,
  initialValues,
  ...otherProps
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((values: AddDeviceGroupParams) => addDeviceGroup(values), {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(['deviceGroupCascader', companyNo]);
    },
  });

  const handleFinish = useCallback(
    async (values: Omit<AddDeviceGroupParams, 'parentCode'> & { parentCode: number[] }) => {
      const { parentCode, ...others } = values;
      mutate({
        ...others,
        parentCode: parentCode && parentCode.length ? `${_last(parentCode)}` : undefined,
      });
    },
    [mutate],
  );

  return (
    <Form {...otherProps} ref={formRef} preserve onFinish={handleFinish} layout="vertical">
      <Row gutter={100}>
        <Col span={8}>
          <Form.Item hidden name="id">
            <Input placeholder="这是一个隐藏起来的表单域" />
          </Form.Item>

          <Form.Item
            label="所属企业"
            name="companyNo"
            rules={[
              {
                required: true,
                message: '请选择所属企业',
              },
            ]}
          >
            <CompanySelect disabled />
          </Form.Item>
        </Col>
        {/*  */}
        <Col span={8}>
          <Form.Item noStyle dependencies={['parentCode']}>
            {({ getFieldValue }) => {
              return (
                <Form.Item
                  label="父级节点"
                  name="parentCode"
                  rules={
                    getFieldValue('parentCode') === undefined
                      ? undefined
                      : [
                          {
                            required: true,
                            message: '请填写父级节点',
                          },
                        ]
                  }
                >
                  <DeviceGroupCascader
                    companyNo={companyNo}
                    changeOnSelect
                    disabled={getFieldValue('parentCode') === undefined}
                    placeholder={
                      getFieldValue('parentCode') === undefined ? '顶级节点' : '请填写父级节点'
                    }
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="分组名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请填写分组名称',
              },
            ]}
          >
            <Input maxLength={50} placeholder="请填写分组名称" />
          </Form.Item>
        </Col>
      </Row>
      <div
        style={{
          marginTop: 120,
          textAlign: 'center',
        }}
      >
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{
            width: 600,
          }}
        >
          提交
        </Button>
      </div>
    </Form>
  );
};

export default DeviceGroupForm;

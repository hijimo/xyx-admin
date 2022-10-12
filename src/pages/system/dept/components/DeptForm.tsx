import React, { useCallback, useRef } from 'react';
import { useMutation } from 'react-query';
import _last from 'lodash/last';
import { Form, Input, Row, Col } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddDeptParams, DeptSSD } from '@/types';
import CompanySelect from '@/components/DataSelect/CompanySelect';
import DeptCascader from '@/components/DataSelect/DeptCascader';
import { addDept } from '@/services/dept';

interface DeptFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddDeptParams>>;
  // 添加模式下父级组织不必填，不包括添加下级
  isAdd?: boolean;
  isRootDept?: boolean;
  onSuccess?: () => void;
}

const DeptForm: React.FC<DeptFormProps> = ({
  formRef,
  onSuccess,
  isAdd = false,
  isRootDept,
  ...otherProps
}) => {
  const deptPathObjectRef = useRef<DeptSSD[]>([]);
  const { mutate } = useMutation((values: AddDeptParams) => addDept(values), {
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const handleFinish = useCallback(
    async (values: AddDeptParams & { deptNoPath: string[] }) => {
      const { deptNoPath, parentId, ...others } = values;

      mutate({
        ...others,
        deptPath: deptNoPath?.join(',') || null,
        parentId: _last(deptPathObjectRef.current)?.id || parentId,
      });
    },
    [mutate],
  );

  return (
    <Form {...otherProps} ref={formRef} onFinish={handleFinish} layout="vertical">
      <Row gutter={100}>
        <Col span={8}>
          <Form.Item hidden name="id">
            <Input placeholder="这是一个隐藏起来的表单域" />
          </Form.Item>
          <Form.Item hidden name="deptNo">
            <Input placeholder="这是一个隐藏起来的表单域" />
          </Form.Item>
          <Form.Item hidden name="parentId">
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
            <CompanySelect />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item noStyle dependencies={['companyNo']}>
            {({ getFieldValue }) => (
              <Form.Item
                label="上级组织	"
                name="deptNoPath"
                rules={
                  isRootDept || isAdd
                    ? undefined
                    : [
                        {
                          required: true,
                          message: '请选择上级组织	',
                        },
                      ]
                }
              >
                <DeptCascader
                  disabled={isRootDept || isAdd}
                  changeOnSelect
                  valueType="deptNo"
                  onChange={(v: any, selectedOptions: any[]) => {
                    deptPathObjectRef.current = selectedOptions;
                  }}
                  companyNo={getFieldValue('companyNo')}
                  placeholder="请选择上级组织"
                />
              </Form.Item>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="组织名称	"
            name="deptName"
            rules={[
              {
                required: true,
                message: '请输入组织名称	',
              },
            ]}
          >
            <Input maxLength={50} placeholder="请输入组织名称" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="组织描述	" name="deptDesc">
            <Input.TextArea maxLength={50} placeholder="请输入组织描述	" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DeptForm;

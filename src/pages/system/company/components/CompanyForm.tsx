import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useModel } from 'umi';
import { Form, Input, Row, Col } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { AddOrEditCompanyParams } from '@/types';
import { CompanyTypeEnum } from '@/enum/company';
import CompanyTypeSelect from '@/components/DataSelect/CompanyTypeSelect';
import UserSelect from '@/components/DataSelect/UserSelect';
import AddressCascader from '@/pages/components/AddressCascader';
import DisableRadio from '@/pages/components/DisableStatusRadio';
import { addOrEditCompany } from '@/services/company';

interface CompanyFormProps extends FormProps {
  formRef: React.RefObject<FormInstance<AddOrEditCompanyParams>>;
  onSuccess?: () => void;
  isEdit?: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  formRef,
  isEdit = false,
  onSuccess,
  ...otherProps
}) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const { mutate } = useMutation((values: AddOrEditCompanyParams) => addOrEditCompany(values), {
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const handleFinish = useCallback(
    async (values: any) => {
      const { contactAddressPath, ...others } = values;
      mutate({
        contactAddressPath: contactAddressPath.join(','),
        ...others,
      });
    },
    [mutate],
  );

  return (
    <Form {...otherProps} ref={formRef} onFinish={handleFinish} layout="vertical">
      <Row gutter={100}>
        <Col span={8}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="企业编号"
            name="companyNo"
            rules={[{ required: true, message: '请输入企业编号!' }]}
          >
            <Input maxLength={100} placeholder="请输入企业编号" disabled={isEdit} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="企业名称"
            name="companyName"
            rules={[{ required: true, message: '请输入企业名称!' }]}
          >
            <Input maxLength={100} placeholder="请输入企业名称" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="邮箱"
            name="companyEmail"
            // rules={[{ required: true, message: '请输入正确的邮箱', type: 'email' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="企业类型"
            name="companyType"
            rules={[{ required: true, message: '请选择企业类型', type: 'number' }]}
          >
            <CompanyTypeSelect placeholder="请选择企业类型" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="联系人"
            name="contactPerson"
            rules={[{ required: true, message: '请输入联系人' }]}
          >
            <Input maxLength={10} placeholder="联系人" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="联系电话"
            name="contactTel"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input maxLength={20} placeholder="联系电话" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={100}>
        <Col span={8}>
          <Form.Item
            label="企业地址"
            name="contactAddressPath"
            rules={[{ required: true, message: '请选择省市区' }]}
          >
            <AddressCascader placeholder="省市区" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="详细地址"
            name="contactAddress"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <Input maxLength={50} placeholder="详细地址" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="企业简码" name="simpleCode">
            <Input maxLength={10} placeholder="请输入企业简码" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={100}>
        <Col span={8}>
          <Form.Item label="状态" name="state" rules={[{ required: true }]}>
            <DisableRadio />
          </Form.Item>
        </Col>

        <Form.Item noStyle dependencies={['companyType']}>
          {({ getFieldValue }) =>
            getFieldValue('companyType') === CompanyTypeEnum.CUSTOMER ? (
              <Col span={8}>
                <Form.Item label="所属区域代理" name="seller">
                  <UserSelect companyNo={currentUser?.companyDto?.companyNo} />
                </Form.Item>
              </Col>
            ) : null
          }
        </Form.Item>
      </Row>
    </Form>
  );
};

export default CompanyForm;

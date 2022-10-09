import React, { useCallback, useState, useImperativeHandle, useRef, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Modal, message, Form, Input, Row, Col, Skeleton } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { AddOrEditProviderParams } from '@/types';
import CompanyTypeSelect from '@/pages/components/ServiceTypeSelect';
import SettlementSelect from '@/pages/components/SettlementSelect';
import RoleGroupSelect from '@/pages/components/RoleGroupSelect';
import AddressCascader from '@/pages/components/AddressCascader';
import DisableRadio from '@/pages/components/DisableStatusRadio';
import { letter } from '@/utils/pattern';
import { addOrEditProvider, getProviderDetail } from '@/services/provider';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (recordId?: number, check?: boolean) => void;
  hide: () => void;
}

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const queryClient = useQueryClient();
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<number>();
  const [checkDetail, setCheckeDetail] = useState(false);

  const isEdit = id !== undefined || false;

  useImperativeHandle(ref, () => ({
    show: (recordId, check) => {
      if (recordId) {
        setId(recordId);
      } else {
        setId(undefined);
      }
      if (check) {
        setCheckeDetail(check);
      } else {
        setCheckeDetail(false);
      }
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const { data, isLoading } = useQuery(['providerDetail', id], () => getProviderDetail({ id }), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    const contactAddressPaths = data?.contactAddressPaths || null;
    const accountVo = data?.accountDto;
    const values: any = {
      ...data,
      companyTypes: data?.companyTypes || null,
      contactAddressPaths,
      accountVo,
    };
    return isEdit ? values : { state: 1 };
  }, [data, isEdit]);

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddOrEditProviderParams) => addOrEditProvider(values),
    {
      onSuccess: () => {
        setVisible(false);
        queryClient.invalidateQueries(['providerDetail', id]);
        message.success(isEdit ? '修改成功' : '新增成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: any) => {
      const params: AddOrEditProviderParams = {
        ...values,
        id,
      };
      mutate(params);
    },
    [mutate, id],
  );

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  const handleSubmit = useCallback(() => {
    if (checkDetail) {
      setVisible(false);
    } else {
      formRef.current?.submit();
    }
  }, [formRef, checkDetail]);

  const title = useMemo(() => {
    if (checkDetail) {
      return '服务商详情';
    }
    return isEdit ? '编辑服务商' : '新增服务商';
  }, [checkDetail, isEdit]);

  return (
    <Modal
      width={900}
      title={title}
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <Skeleton loading={isLoading}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          ref={formRef}
          initialValues={initialValues}
          onFinish={handleFinish}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="服务商名称"
                name="companyName"
                rules={[{ required: true, message: '请输入服务商名称!' }]}
              >
                <Input maxLength={20} disabled={checkDetail} placeholder="请输入服务商名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="账号"
                name="userAccount"
                rules={[{ required: true, message: '请输入账号' }]}
              >
                <Input disabled={isEdit} placeholder="请输入账号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="邮箱"
                name="companyEmail"
                rules={[{ required: true, message: '请输入正确的邮箱', type: 'email' }]}
              >
                <Input placeholder="请输入邮箱" disabled={checkDetail} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="服务商编号"
                name="companyNo"
                rules={[
                  { required: true, message: '请输入服务商编号' },
                  {
                    pattern: letter,
                    message: '请输入4位字母',
                  },
                ]}
              >
                <Input maxLength={4} disabled={isEdit} placeholder="4位字母" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="服务商类型"
                name="companyTypes"
                rules={[{ required: true, message: '请选择服务商类型' }]}
              >
                <CompanyTypeSelect
                  disabled={checkDetail}
                  mode="multiple"
                  maxTagCount="responsive"
                  disabledSelect={initialValues?.companyTypes}
                  allowClear={!isEdit}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="角色组"
                name="roleGroupCodeList"
                rules={[{ required: true, message: '请选择角色组' }]}
              >
                <RoleGroupSelect
                  mode="multiple"
                  disabled={checkDetail}
                  maxTagCount="responsive"
                  disabledSelect={initialValues?.roleGroupCodeList}
                  allowClear={!isEdit}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="联系人"
                name="contactPerson"
                rules={[{ required: true, message: '请输入联系人' }]}
              >
                <Input maxLength={10} disabled={checkDetail} placeholder="联系人" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="联系电话"
                name="contactTel"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input maxLength={20} disabled={checkDetail} placeholder="联系电话" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Form.Item label="公司地址" style={{ marginBottom: 0 }} required>
                    <Form.Item
                      name="contactAddressPaths"
                      rules={[{ required: true, message: '请选择省市区' }]}
                    >
                      <AddressCascader disabled={checkDetail} placeholder="省市区" />
                    </Form.Item>
                    <Form.Item
                      name="contactAddress"
                      rules={[{ required: true, message: '请输入详细地址' }]}
                    >
                      <Input maxLength={50} disabled={checkDetail} placeholder="详细地址" />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="公司简码" name="simpleCode">
                    <Input maxLength={10} placeholder="请输入公司简码" disabled={checkDetail} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Form.Item label="收款账户" style={{ marginBottom: 0 }}>
                <Form.Item name={['accountVo', 'accountName']}>
                  <Input maxLength={10} disabled={checkDetail} placeholder="户名" />
                </Form.Item>
                <Form.Item name={['accountVo', 'accountNo']}>
                  <Input maxLength={50} disabled={checkDetail} placeholder="账号" />
                </Form.Item>
                <Form.Item name={['accountVo', 'bankName']}>
                  <Input maxLength={50} disabled={checkDetail} placeholder="开户行" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="开票信息" style={{ marginBottom: 0 }}>
                <Form.Item name={['accountVo', 'invoiceTitle']}>
                  <Input maxLength={50} disabled={checkDetail} placeholder="公司名称" />
                </Form.Item>
                <Form.Item name={['accountVo', 'taxpayerNo']}>
                  <Input maxLength={20} disabled={checkDetail} placeholder="纳税人识别号" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="结算方式"
                name="settleType"
                rules={[{ required: true, message: '请选择结算方式' }]}
              >
                <SettlementSelect disabled={checkDetail} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="状态" name="state" rules={[{ required: true }]}>
                <DisableRadio disabled={checkDetail} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Skeleton>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;

import React, { useCallback, useState, useImperativeHandle, useRef, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Modal, message, Form, Input, Row, Col, Skeleton, InputNumber } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { AddOrEditProviderParams } from '@/types';
import { CompanyType } from '@/enum';
import EnumSelect from '@/pages/components/EnumSelect';
import SettlementSelect from '@/pages/components/SettlementSelect';
import RouteProductSelect from '@/pages/components/RouteProductSelect';
import AddressCascader from '@/pages/components/AddressCascader';
import DisableRadio from '@/pages/components/DisableStatusRadio';
import ProductComboSelect from '@/pages/components/ProductComboSelect';
import OperatingOrganizationsSelect from '@/pages/components/OperatingOrganizationsSelect';
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

  const { data, isLoading } = useQuery(['customerDetail', id], () => getProviderDetail({ id }), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const initialValues = useMemo(() => {
    const takeVo = data?.takeDto || null;
    const accountVo = data?.accountDto || null;
    const whTakeVo = data?.whTakeDto || null;
    const contactAddressPaths = data?.contactAddressPaths || null;
    const values: any = {
      ...data,
      contactAddressPaths,
      takeVo: {
        ...takeVo,
        contactAddressPaths: takeVo?.contactAddressPaths || null,
        signLineList:
          takeVo?.signLineList?.map((item: any) => {
            return { value: item, key: item };
          }) || [],
      },
      accountVo: {
        ...accountVo,
        contactAddressPaths: accountVo?.contactAddressPaths || null,
      },
      whTakeVo: {
        ...whTakeVo,
        whContactAddressPaths: whTakeVo?.whContactAddressPaths || null,
      },
    };
    return isEdit ? values : { state: 1 };
  }, [data, isEdit]);

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddOrEditProviderParams) => addOrEditProvider({ ...values }),
    {
      onSuccess: () => {
        setVisible(false);
        queryClient.invalidateQueries(['customerDetail', id]);
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
        takeVo: {
          ...values?.takeVo,
          signLineList: values?.takeVo?.signLineList.map((item: any) => item?.value) || [],
        },
        companyTypes: [CompanyType.CUSTOMER],
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
      return '客户详情';
    }
    return isEdit ? '编辑客户' : '新增客户';
  }, [checkDetail, isEdit]);

  return (
    <Modal
      width={930}
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
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          ref={formRef}
          initialValues={initialValues}
          onFinish={handleFinish}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="客户名称"
                name="companyName"
                rules={[{ required: true, message: '请输入客户名称' }]}
              >
                <Input maxLength={20} disabled={checkDetail} placeholder="请输入客户名称" />
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
                label="客户编号"
                name="companyNo"
                rules={[{ required: true, message: '请输入客户编号' }]}
              >
                <Input disabled={isEdit} placeholder="请输入客户编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="所属运营组织机构"
                    name="orgId"
                    rules={[{ required: true, message: '请选择所属运营组织机构' }]}
                  >
                    <OperatingOrganizationsSelect
                      placeholder="请输入或选择"
                      disabled={checkDetail}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="签约线路套餐"
                    name="comboId"
                    rules={[{ required: true, message: '请选择签约线路套餐' }]}
                  >
                    <ProductComboSelect
                      placeholder="请输入或选择"
                      disabled={checkDetail}
                      onChange={() =>
                        formRef.current?.setFieldsValue({ takeVo: { signLineList: undefined } })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item noStyle dependencies={['comboId']}>
                    {({ getFieldValue }) => (
                      <Form.Item
                        label="签约线路"
                        name={['takeVo', 'signLineList']}
                        rules={[{ required: true, message: '请选择签约线路' }]}
                      >
                        <RouteProductSelect
                          placeholder="请输入或选择"
                          mode="multiple"
                          maxTagCount="responsive"
                          comboId={getFieldValue('comboId')}
                          searchByComboId
                          disabled={checkDetail}
                        />
                      </Form.Item>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="结算方式"
                    name="settleType"
                    rules={[{ required: true, message: '请选择结算方式' }]}
                  >
                    <SettlementSelect disabled={checkDetail} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="业务类型"
                    name="bizType"
                    rules={[{ required: true, message: '请选择业务类型' }]}
                  >
                    <EnumSelect
                      enumKey="companyBizTypeEnum"
                      disabled={isEdit}
                      placeholder="请选择业务类型"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="开票信息" style={{ marginBottom: 0 }}>
                    <Form.Item name={['accountVo', 'invoiceTitle']}>
                      <Input maxLength={50} disabled={checkDetail} placeholder="公司名称" />
                    </Form.Item>
                    <Form.Item name={['accountVo', 'taxpayerNo']}>
                      <Input maxLength={20} disabled={checkDetail} placeholder="纳税人识别号" />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="重量阈值(KG)" name={['takeVo', 'thresholdValue']}>
                    <InputNumber
                      min={0.01}
                      max={0.99}
                      placeholder="请输入"
                      style={{ width: '100%' }}
                      precision={2}
                      disabled={checkDetail}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Form.Item label="收货仓库地址" style={{ marginBottom: 0 }} required>
                <Form.Item
                  name={['whTakeVo', 'whContactPerson']}
                  rules={[{ required: true, message: '请输入联系人' }]}
                >
                  <Input maxLength={10} disabled={checkDetail} placeholder="联系人" />
                </Form.Item>
                <Form.Item
                  name={['whTakeVo', 'whContactTel']}
                  rules={[{ required: true, message: '请输入联系电话' }]}
                >
                  <Input maxLength={20} disabled={checkDetail} placeholder="联系电话" />
                </Form.Item>
                <Form.Item
                  name={['whTakeVo', 'whContactAddressPaths']}
                  rules={[{ required: true, message: '请选择省市区' }]}
                >
                  <AddressCascader disabled={checkDetail} placeholder="省市区" />
                </Form.Item>
                <Form.Item
                  name={['whTakeVo', 'whContactAddress']}
                  rules={[{ required: true, message: '请输入详细地址' }]}
                >
                  <Input maxLength={50} disabled={checkDetail} placeholder="详细地址" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="发货地址" style={{ marginBottom: 0 }} required>
                <Form.Item
                  name="contactPerson"
                  rules={[{ required: true, message: '请输入联系人' }]}
                >
                  <Input maxLength={10} disabled={checkDetail} placeholder="联系人" />
                </Form.Item>
                <Form.Item
                  name="contactTel"
                  rules={[{ required: true, message: '请输入联系电话' }]}
                >
                  <Input maxLength={20} disabled={checkDetail} placeholder="联系电话" />
                </Form.Item>
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
            <Col span={12}>
              <Form.Item label="收货地址" style={{ marginBottom: 0 }}>
                <Form.Item name={['takeVo', 'contactPerson']}>
                  <Input maxLength={10} disabled={checkDetail} placeholder="联系人" />
                </Form.Item>
                <Form.Item name={['takeVo', 'contactTel']}>
                  <Input maxLength={20} disabled={checkDetail} placeholder="联系电话" />
                </Form.Item>
                <Form.Item name={['takeVo', 'contactAddressPaths']}>
                  <AddressCascader disabled={checkDetail} placeholder="省市区" />
                </Form.Item>
                <Form.Item name={['takeVo', 'contactAddress']}>
                  <Input maxLength={50} disabled={checkDetail} placeholder="详细地址" />
                </Form.Item>
              </Form.Item>
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

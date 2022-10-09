import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { CompanyType } from '@/enum';
import type { BindCustomerParams, PackageListItemSSD } from '@/types';
import BillNoInfo from '@/pages/components/BillNoInfo';
import CustomerRouteSelect from '@/pages/components/CustomerRouteSelect';
import CpCountrySelect from '@/pages/components/CpCountrySelect';
import CompanySelect from '@/pages/components/CompanySelect';
import { bindCustomer } from '@/services/package';

interface BindCustomerModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefBindCustomerModalProps {
  show: (data?: PackageListItemSSD[]) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const InternalBindCustomerModal = (
  { onCancel, onSuccess, ...otherProps }: BindCustomerModalProps,
  ref: React.Ref<RefBindCustomerModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [billNoList, setBillNoList] = useState<PackageListItemSSD[]>([]);

  useImperativeHandle(ref, () => ({
    show: (data) => {
      if (data) {
        setBillNoList(data);
      } else {
        setBillNoList([]);
      }
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const { mutate, isLoading: addLoading } = useMutation(
    (values: BindCustomerParams) => bindCustomer(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('关联成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: BindCustomerParams) => {
      const params: BindCustomerParams = {
        ...values,
        packageIdList: billNoList.map((item) => item.id),
      };
      mutate(params);
    },
    [mutate, billNoList],
  );

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  const handleSubmit = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  return (
    <Modal
      title="关联客户和线路"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <BillNoInfo data={billNoList?.map((item) => item.uniqueNo) || []} />
      <Form ref={formRef} onFinish={handleFinish} autoComplete="off" {...layout}>
        <Form.Item
          label="客户"
          name="customerId"
          rules={[{ required: true, message: '请选择客户' }]}
        >
          <CompanySelect
            companyType={CompanyType.CUSTOMER}
            bizType={2}
            placeholder="请输入或选择"
            allState={false}
            onChange={() => {
              formRef?.current?.setFieldsValue({ cpId: null, countryId: null });
            }}
          />
        </Form.Item>
        <Form.Item noStyle dependencies={['customerId']}>
          {({ getFieldValue, setFieldsValue }) => {
            return (
              <Form.Item
                label="线路产品"
                name="cpId"
                rules={[{ required: true, message: '请选择线路产品' }]}
              >
                <CustomerRouteSelect
                  labelInValue={false}
                  onChange={() => {
                    setFieldsValue({ countryId: null });
                  }}
                  customerId={getFieldValue('customerId')}
                  onDataReady={(data) => {
                    setFieldsValue({ countryId: data?.length === 1 ? data?.[0]?.id : undefined });
                  }}
                />
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.Item noStyle dependencies={['cpId']}>
          {({ getFieldValue, setFieldsValue }) => (
            <Form.Item
              label="目的国"
              name="countryId"
              rules={[{ required: true, message: '请选择目的国' }]}
            >
              <CpCountrySelect
                lineId={getFieldValue('cpId')}
                onDataReady={(data) => {
                  setFieldsValue({ countryId: data?.length === 1 ? data?.[0]?.id : undefined });
                }}
              />
            </Form.Item>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const BindCustomerModal = React.forwardRef(InternalBindCustomerModal) as (
  props: BindCustomerModalProps & { ref?: React.Ref<RefBindCustomerModalProps> },
) => React.ReactElement;

export default BindCustomerModal;

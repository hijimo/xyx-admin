import React, { useRef, useCallback, useImperativeHandle, useState } from 'react';
import { useMutation } from 'react-query';
import { Modal, Form, message } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { ResponseData } from '@/utils/request';
import type { ResetCompanyBillParams } from '@/types';

interface ResetBillModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
  api: (params: ResetCompanyBillParams) => Promise<ResponseData<any>>;
  bizType: number;
}

export interface RefResetBillModalProps {
  show: (data: number[]) => void;
  hide: () => void;
}

const InternalResetBillModal = (
  { onCancel, onSuccess, api, bizType, ...otherProps }: ResetBillModalProps,
  ref: React.Ref<RefResetBillModalProps>,
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [billingIds, setBillingIds] = useState<number[]>([]);
  const formRef = useRef<FormInstance>(null);

  useImperativeHandle(ref, () => ({
    show: (data) => {
      setBillingIds(data);
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const handleOk = useCallback(() => {
    formRef.current?.submit();
  }, [formRef]);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const { mutate, isLoading } = useMutation((values: ResetCompanyBillParams) => api(values), {
    onSuccess: () => {
      message.success('操作成功');
      setVisible(false);
      onSuccess?.();
    },
  });

  const handleFinish = useCallback(() => {
    mutate({ bizType, billingIds });
  }, [mutate, bizType, billingIds]);

  return (
    <Modal
      title="重新计费"
      {...otherProps}
      onOk={handleOk}
      visible={visible}
      destroyOnClose
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <Form ref={formRef} preserve={false} onFinish={handleFinish}>
        已选{billingIds?.length}项，确认按新报价重新计费吗？
      </Form>
    </Modal>
  );
};
const ResetBillModal = React.forwardRef(InternalResetBillModal) as (
  props: ResetBillModalProps & { ref?: React.Ref<RefResetBillModalProps> },
) => React.ReactElement;

export default ResetBillModal;

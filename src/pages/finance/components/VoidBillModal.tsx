import React, { useRef, useCallback, useImperativeHandle, useState } from 'react';
import { useMutation } from 'react-query';
import { Modal, Form, Radio, Input, message } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { AuditFeeParams } from '@/types';
import { auditFee } from '@/services/finance';

interface AuditModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  handleSuccess: () => void;
}

export interface RefAuditModalProps {
  show: (id?: number) => void;
  hide: () => void;
}

const InternalAuditModal = (
  { onCancel, handleSuccess, ...otherProps }: AuditModalProps,
  ref: React.Ref<RefAuditModalProps>,
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [recordId, setRecordId] = useState<number>();
  const formRef = useRef<FormInstance>(null);

  useImperativeHandle(ref, () => ({
    show: (id) => {
      setRecordId(id);
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

  const { mutate, isLoading } = useMutation((params: AuditFeeParams) => auditFee(params), {
    onSuccess: () => {
      message.success('审核成功');
      setVisible(false);
      handleSuccess?.();
    },
  });

  const handleFinish = useCallback(
    (values: AuditFeeParams) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Modal
      title="审核"
      {...otherProps}
      onOk={handleOk}
      visible={visible}
      destroyOnClose
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <Form
        ref={formRef}
        preserve={false}
        onFinish={handleFinish}
        initialValues={{ reviewResult: 1, id: recordId }}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="reviewResult"
          label="审核结果"
          rules={[
            {
              required: true,
              message: '审核结果必填',
              type: 'number',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={1}>审核通过</Radio>
            <Radio value={2}>审核不通过</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle dependencies={['reviewResult']}>
          {({ getFieldValue }) =>
            getFieldValue('reviewResult') !== 1 && (
              <Form.Item
                name="failReason"
                label="不通过原因"
                rules={[
                  {
                    required: true,
                    message: '不通过原因必填',
                  },
                ]}
              >
                <Input.TextArea placeholder="请输入" />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item />
      </Form>
    </Modal>
  );
};
const AuditModal = React.forwardRef(InternalAuditModal) as (
  props: AuditModalProps & { ref?: React.Ref<RefAuditModalProps> },
) => React.ReactElement;

export default AuditModal;

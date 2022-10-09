import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { EditOrderNoParams, PackageListItemSSD, PackageDetailSSD } from '@/types';
import BillNoInfo from '@/pages/components/BillNoInfo';
import { editOrderNo } from '@/services/package';

interface EditOrderNoModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefEditOrderNoModalProps {
  show: (data?: (PackageListItemSSD | PackageDetailSSD)[]) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const InternalEditOrderNoModal = (
  { onCancel, onSuccess, ...otherProps }: EditOrderNoModalProps,
  ref: React.Ref<RefEditOrderNoModalProps>,
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
    (values: EditOrderNoParams) => editOrderNo(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('修改成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: EditOrderNoParams) => {
      const params: EditOrderNoParams = {
        ...values,
        intPackageIds: billNoList.map((item) => item.id),
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
      title="修改原始单号"
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
          label="原始单号"
          name="oldShipNo"
          rules={[{ required: true, message: '请输入原始单号' }]}
        >
          <Input placeholder="请输入原始单号" />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" maxLength={200} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditOrderNoModal = React.forwardRef(InternalEditOrderNoModal) as (
  props: EditOrderNoModalProps & { ref?: React.Ref<RefEditOrderNoModalProps> },
) => React.ReactElement;

export default EditOrderNoModal;

import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { EditReceiverInfoParams, PackageListItemSSD, PackageDetailSSD } from '@/types';
import BillNoInfo from '@/pages/components/BillNoInfo';
import GlobalCitySelect from '@/pages/components/GlobalCitySelect';
import { editReceiverInfo } from '@/services/package';

interface EditReceiverInfoModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefEditReceiverInfoModalProps {
  show: (data: (PackageListItemSSD | PackageDetailSSD)[]) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const InternalEditReceiverInfoModal = (
  { onCancel, onSuccess, ...otherProps }: EditReceiverInfoModalProps,
  ref: React.Ref<RefEditReceiverInfoModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [billNoList, setSelectList] = useState<PackageListItemSSD[]>([]);

  useImperativeHandle(ref, () => ({
    show: (data) => {
      setSelectList(data);
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const { mutate, isLoading: addLoading } = useMutation(
    (values: EditReceiverInfoParams) => editReceiverInfo(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('修改成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: EditReceiverInfoParams) => {
      const params: EditReceiverInfoParams = {
        ...values,
        countryId: billNoList?.[0]?.countryId,
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
      title="修改收件人信息"
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
          label="收件人"
          name="consigneeName"
          rules={[{ required: true, message: '请输入收件人' }]}
        >
          <Input maxLength={30} placeholder="请输入收件人" />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="contactTel"
          rules={[{ required: true, message: '请输入联系电话' }]}
        >
          <Input maxLength={20} placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item label="国家城市" name="cityId">
          <GlobalCitySelect
            pid={billNoList?.[0]?.countryId}
            level={3}
            placeholder="请选择国家城市"
          />
        </Form.Item>
        <Form.Item
          label="详细地址"
          name="fullAddress"
          rules={[{ required: true, message: '请输入详细地址' }]}
        >
          <Input maxLength={500} placeholder="请输入详细地址" />
        </Form.Item>
        <Form.Item label="邮编" name="postCode" rules={[{ required: true, message: '请输入邮编' }]}>
          <Input maxLength={50} placeholder="请输入邮编" />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" maxLength={200} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditReceiverInfoModal = React.forwardRef(InternalEditReceiverInfoModal) as (
  props: EditReceiverInfoModalProps & { ref?: React.Ref<RefEditReceiverInfoModalProps> },
) => React.ReactElement;

export default EditReceiverInfoModal;

import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { EditCountryParams, PackageListItemSSD, PackageDetailSSD } from '@/types';
import { BooleanEnum } from '@/enum';
import GlobalCitySelect from '@/pages/components/GlobalCitySelect';
import BillNoInfo from '@/pages/components/BillNoInfo';
import { editCountry } from '@/services/package';

interface EditCountryModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefEditCountryModalProps {
  show: (data?: (PackageListItemSSD | PackageDetailSSD)[]) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const InternalEditCountryModal = (
  { onCancel, onSuccess, ...otherProps }: EditCountryModalProps,
  ref: React.Ref<RefEditCountryModalProps>,
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
    (values: EditCountryParams) => editCountry(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('修改成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: EditCountryParams) => {
      const params: EditCountryParams = {
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
      title="修改目的国"
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
          label="目的国"
          name="twoCode"
          rules={[{ required: true, message: '请输入选择目的国' }]}
        >
          <GlobalCitySelect
            valueType="code"
            transferFlag={BooleanEnum.TRUE}
            placeholder="请输入或选择"
          />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" maxLength={200} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditCountryModal = React.forwardRef(InternalEditCountryModal) as (
  props: EditCountryModalProps & { ref?: React.Ref<RefEditCountryModalProps> },
) => React.ReactElement;

export default EditCountryModal;

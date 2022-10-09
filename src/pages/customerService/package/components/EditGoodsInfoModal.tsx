import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, InputNumber } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { EditGoodsInfoParams, PackageListItemSSD, PackageDetailSSD } from '@/types';
import BillNoInfo from '@/pages/components/BillNoInfo';
import { editGoodsInfo } from '@/services/package';

interface EditGoodsInfoModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefEditGoodsInfoModalProps {
  show: (data?: (PackageListItemSSD | PackageDetailSSD)[]) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const InternalEditGoodsInfoModal = (
  { onCancel, onSuccess, ...otherProps }: EditGoodsInfoModalProps,
  ref: React.Ref<RefEditGoodsInfoModalProps>,
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
    (values: EditGoodsInfoParams) => editGoodsInfo(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('修改成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: EditGoodsInfoParams) => {
      const params: EditGoodsInfoParams = {
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
      title="修改商品信息"
      {...otherProps}
      width={500}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <BillNoInfo data={billNoList?.map((item) => item.uniqueNo) || []} />
      <Form ref={formRef} onFinish={handleFinish} autoComplete="off" {...layout}>
        <Form.Item
          label="中文品名"
          name="goodsNameCn"
          rules={[{ required: true, message: '请输入中文品名' }]}
        >
          <Input maxLength={50} placeholder="请输入中文品名" />
        </Form.Item>
        <Form.Item
          label="英文品名"
          name="goodsNameEn"
          rules={[{ required: true, message: '请输入英文品名' }]}
        >
          <Input maxLength={50} placeholder="请输入英文品名" />
        </Form.Item>
        <Form.Item
          label="申报价值"
          name="goodsPrice"
          rules={[{ required: true, message: '请输入申报价值' }]}
        >
          <InputNumber min={0.01} style={{ width: '100%' }} precision={2} />
        </Form.Item>
        <Form.Item
          label="件数"
          name="goodsNum"
          tooltip="如果暂时不知道商品件数，填入0，若不修改原有件数，不要填写件数。"
        >
          <InputNumber min={0} precision={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" maxLength={200} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditGoodsInfoModal = React.forwardRef(InternalEditGoodsInfoModal) as (
  props: EditGoodsInfoModalProps & { ref?: React.Ref<RefEditGoodsInfoModalProps> },
) => React.ReactElement;

export default EditGoodsInfoModal;

import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, Radio } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { EditRouteProductParams, PackageListItemSSD, PackageDetailSSD } from '@/types';
import BillNoInfo from '@/pages/components/BillNoInfo';
import RouteProductSelect from '@/pages/components/RouteProductSelect';
import { editRouteProduct } from '@/services/package';

interface EditRouteProductModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefEditRouteProductModalProps {
  show: (data?: (PackageListItemSSD | PackageDetailSSD)[]) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const InternalEditRouteProductModal = (
  { onCancel, onSuccess, ...otherProps }: EditRouteProductModalProps,
  ref: React.Ref<RefEditRouteProductModalProps>,
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
    (values: EditRouteProductParams) => editRouteProduct(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('修改成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: EditRouteProductParams & { cpCode: { value: string } }) => {
      const params: EditRouteProductParams = {
        ...values,
        cpCode: values?.cpCode?.value,
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
      title="修改线路产品"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <BillNoInfo data={billNoList?.map((item) => item.uniqueNo) || []} />
      <Form
        ref={formRef}
        onFinish={handleFinish}
        autoComplete="off"
        {...layout}
        initialValues={{ changeFlag: 0 }}
      >
        <Form.Item
          label="线路产品"
          name="cpCode"
          rules={[{ required: true, message: '请选择线路产品' }]}
        >
          <RouteProductSelect selectByCpCode placeholder="请输入或选择" />
        </Form.Item>
        <Form.Item
          label="是否更换面单"
          name="changeFlag"
          rules={[{ required: true, message: '请选择' }]}
        >
          <Radio.Group>
            <Radio value={0}>不更换</Radio>
            <Radio value={1}>更换</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" maxLength={200} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditRouteProductModal = React.forwardRef(InternalEditRouteProductModal) as (
  props: EditRouteProductModalProps & { ref?: React.Ref<RefEditRouteProductModalProps> },
) => React.ReactElement;

export default EditRouteProductModal;

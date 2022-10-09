import _find from 'lodash/find';
import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, Radio } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { BooleanEnum } from '@/enum';
import type { FastenerParams, PackageListItemSSD, PackageDetailSSD } from '@/types';
import BillNoInfo from '@/pages/components/BillNoInfo';
import SettingTypeSelect from '@/pages/components/SettingTypeSelect';
import AbnormalPackageRouteSelect from '@/pages/components/AbnormalPackageRouteSelect';
import { fastener } from '@/services/package';

interface FastenerModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
  editRouteProduct?: boolean;
}

export interface RefFastenerModalProps {
  show: (data?: (PackageListItemSSD | PackageDetailSSD)[]) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const InternalFastenerModal = (
  { onCancel, onSuccess, editRouteProduct, ...otherProps }: FastenerModalProps,
  ref: React.Ref<RefFastenerModalProps>,
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
    (values: FastenerParams) => fastener(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('扣件成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: FastenerParams & { abnormalType: { value: number } }) => {
      const params: FastenerParams = {
        ...values,
        abnormalType: values?.abnormalType?.value,
        packIdList: billNoList.map((item) => item.id),
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
      title="扣件"
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
        initialValues={{ type: 0, lineFlag: 0 }}
      >
        <Form.Item
          label="异常类型"
          name="abnormalType"
          rules={[{ required: true, message: '请选择异常类型' }]}
        >
          <SettingTypeSelect paramType={2} placeholder="请选择" />
        </Form.Item>
        <Form.Item
          label="是否更换线路"
          name="lineFlag"
          rules={[{ required: true }]}
          extra="批量扣件时不同运单号包裹不能更换线路"
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1} disabled={!editRouteProduct}>
              是
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle dependencies={['lineFlag']}>
          {({ getFieldValue, setFieldsValue }) =>
            getFieldValue('lineFlag') === BooleanEnum.TRUE && (
              <Form.Item
                label="选择线路"
                name="cpId"
                rules={[{ required: true, message: '请选择线路' }]}
              >
                <AbnormalPackageRouteSelect
                  uniqueNo={billNoList?.[0]?.uniqueNo}
                  onDataReady={(data) => {
                    setFieldsValue({
                      cpId:
                        _find(data, (item) => item.sameFlag === BooleanEnum.TRUE)?.id ?? undefined,
                    });
                  }}
                />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item noStyle dependencies={['abnormalType']}>
          {({ getFieldValue }) => {
            return (
              <Form.Item
                label="备注"
                name="otherReason"
                rules={[
                  {
                    required: getFieldValue('abnormalType')?.label === '其它' ?? false,
                    message: '请输入备注',
                  },
                ]}
              >
                <Input.TextArea placeholder="请输入备注" maxLength={200} allowClear />
              </Form.Item>
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const FastenerModal = React.forwardRef(InternalFastenerModal) as (
  props: FastenerModalProps & { ref?: React.Ref<RefFastenerModalProps> },
) => React.ReactElement;

export default FastenerModal;

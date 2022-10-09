import React, { useRef, useCallback, useImperativeHandle, useState } from 'react';
import { useMutation } from 'react-query';
import { Modal, Form, message, DatePicker, Radio } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { ResponseData } from '@/utils/request';
import type { CreateBillParams } from '@/types';
import { convertRangeToStartEnd } from '@/utils/helper';
import MultiLineInput from '@/components/MultiLineInput';
import CompanyFilterSelect from './CompanyFilterSelect';

interface CreateBillModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
  api: (params: CreateBillParams) => Promise<ResponseData<any>>;
}

export interface RefCreateBillModalProps {
  show: () => void;
  hide: () => void;
}

const { RangePicker } = DatePicker;

const InternalCreateBillModal = (
  { onCancel, onSuccess, api, ...otherProps }: CreateBillModalProps,
  ref: React.Ref<RefCreateBillModalProps>,
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const formRef = useRef<FormInstance>(null);

  useImperativeHandle(ref, () => ({
    show: () => {
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

  const { mutate, isLoading } = useMutation((params: CreateBillParams) => api(params), {
    onSuccess: () => {
      message.success('成功');
      setVisible(false);
      onSuccess?.();
    },
  });

  const handleFinish = useCallback(
    (
      values: CreateBillParams & {
        rangeTime: [string, string];
      },
    ) => {
      const { rangeTime } = values;
      mutate({
        ...values,
        ...(rangeTime &&
          (convertRangeToStartEnd(rangeTime, 'gmtSettle', undefined, 'second') as {
            gmtSettleStart: string;
            gmtSettleEnd: string;
          })),
      });
    },
    [mutate],
  );

  return (
    <Modal
      title="生成客户账单"
      {...otherProps}
      onOk={handleOk}
      visible={visible}
      destroyOnClose
      width={600}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <Form
        ref={formRef}
        onFinish={handleFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ type: 0 }}
      >
        <Form.Item label="按运单号生成账单" name="type" required>
          <Radio.Group
            onChange={() =>
              formRef.current?.setFieldsValue({
                customerIds: undefined,
                rangeTime: undefined,
                waybillNo: undefined,
              })
            }
          >
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle dependencies={['type']}>
          {({ getFieldValue }) =>
            getFieldValue('type') === 0 ? (
              <>
                <Form.Item
                  label="选择客户"
                  name="customerIds"
                  rules={[{ required: true, message: '请选择客户' }]}
                >
                  <CompanyFilterSelect />
                </Form.Item>
                <Form.Item
                  label="结算周期起止日期"
                  name="rangeTime"
                  rules={[{ required: true, message: '请选择起止日期' }]}
                >
                  <RangePicker showTime style={{ width: '100%' }} />
                </Form.Item>
              </>
            ) : (
              <Form.Item
                label="运单号"
                name="waybillNo"
                rules={[{ required: true, message: '请输入运单号' }]}
              >
                <MultiLineInput maxLine={200} />
              </Form.Item>
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};
const CreateBillModal = React.forwardRef(InternalCreateBillModal) as (
  props: CreateBillModalProps & { ref?: React.Ref<RefCreateBillModalProps> },
) => React.ReactElement;

export default CreateBillModal;

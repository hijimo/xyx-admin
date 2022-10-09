import React, { useCallback, useState, useImperativeHandle, useRef, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useMutation, useQueryClient } from 'react-query';
import { Modal, message, Form, Input, InputNumber, Skeleton } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { CompanyType } from '@/enum';
import type { AddCodeSegmentsParams } from '@/types';
import { regNumber } from '@/utils/pattern';
import CompanySelect from '@/pages/components/CompanySelect';
import { addCodeSegments, getCodeSegmentsDetail } from '@/services/codeSetting';

interface AddCodeModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddCodeModalProps {
  show: (recordId?: number) => void;
  hide: () => void;
}

const InternalAddCodeModal = (
  { onCancel, onSuccess, ...otherProps }: AddCodeModalProps,
  ref: React.Ref<RefAddCodeModalProps>,
) => {
  const queryClient = useQueryClient();
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<number>();

  useImperativeHandle(ref, () => ({
    show: (recordId) => {
      if (recordId) {
        setId(recordId);
      } else {
        setId(undefined);
      }
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const isEdit = id !== undefined;

  const { data, isLoading } = useQuery(
    ['numberSegmentsDetail', id],
    () => getCodeSegmentsDetail({ id }),
    {
      enabled: !!id,
      select: (d) => d.data,
    },
  );

  const initialValues = useMemo(() => {
    return isEdit ? data : { electCurrentCode: 1, electStart: 1 };
  }, [data, isEdit]);

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddCodeSegmentsParams) => addCodeSegments({ ...values }),
    {
      onSuccess: () => {
        setVisible(false);
        queryClient.invalidateQueries(['numberSegmentsDetail']);
        message.success(isEdit ? '修改成功' : '新增成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: AddCodeSegmentsParams) => {
      mutate({ ...values, id });
    },
    [mutate, id],
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
      title={isEdit ? '编辑号码段' : '新增号码段'}
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <Skeleton loading={isLoading}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          ref={formRef}
          initialValues={initialValues}
          onFinish={handleFinish}
        >
          <Form.Item
            label="服务商"
            name="companyNo"
            rules={[{ required: true, message: '请选择服务商' }]}
          >
            <CompanySelect
              allState={false}
              valueType="companyNo"
              companyType={CompanyType.COMPANY}
              placeholder="请输入或选择"
            />
          </Form.Item>
          <Form.Item
            label="号码开始值"
            name="electStart"
            rules={[{ required: true, message: '请输入号码开始值' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="号码结束值"
            name="electEnd"
            rules={[{ required: true, message: '请输入号码结束值' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item noStyle dependencies={['electStart', 'electEnd']}>
            {({ getFieldValue }) => (
              <Form.Item
                label="当前使用值"
                name="electCurrentCode"
                rules={[{ required: true, message: '当前使用值范围在号码开始值与号码结束值之间' }]}
              >
                <InputNumber
                  min={getFieldValue('electStart')}
                  max={getFieldValue('electEnd')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            )}
          </Form.Item>
          <Form.Item
            label="号段前缀"
            name="codePrefix"
            rules={[
              { required: true, message: '请输入号段前缀' },
              {
                pattern: regNumber,
                message: '请输入数字、字母',
              },
            ]}
          >
            <Input placeholder="请输入数字、字母" maxLength={50} />
          </Form.Item>
          <Form.Item
            label="号段标识 "
            name="codeMiddle"
            rules={[
              { required: true, message: '请输入号段标识 ' },
              {
                pattern: regNumber,
                message: '请输入数字、字母',
              },
            ]}
          >
            <Input placeholder="请输入数字、字母" maxLength={50} />
          </Form.Item>
          <Form.Item
            label="号段长度"
            name="codeLength"
            rules={[{ required: true, message: '请输入号段长度' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};

const AddCodeModal = React.forwardRef(InternalAddCodeModal) as (
  props: AddCodeModalProps & { ref?: React.Ref<RefAddCodeModalProps> },
) => React.ReactElement;

export default AddCodeModal;

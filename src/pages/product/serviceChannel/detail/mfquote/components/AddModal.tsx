import React, { useCallback, useState, useImperativeHandle, useRef, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, Input, DatePicker, Button } from 'antd';
import moment from 'moment';
import { DATE_FORMAT_FULL_TIME } from '@/utils/variables';
import type { Moment } from 'moment';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { MiscellaneousFeesQuoteSSD, AddMiscellaneousFeesQuoteParams } from '@/types';
import { addOrEditMiscellaneousFeesQuote } from '@/services/quote';
import type { MiscellaneousFeeFormulaInputValue } from './MiscellaneousFeeFormulaInput';
import MiscellaneousFeeFormulaInput from './MiscellaneousFeeFormulaInput';
import InvalidDateInput from './InvalidDateInput';

interface AddFormValues {
  id?: number;
  gmtValid: Moment;
  gmtUnvalid: string;
  expression: MiscellaneousFeeFormulaInputValue;
}

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
  channelId: number | string;
  miscellaneousFeesId: string | number;
}

export interface RefAddModalProps {
  show: (item?: MiscellaneousFeesQuoteSSD) => void;
  hide: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const InternalAddModal = (
  { onCancel, onSuccess, channelId, miscellaneousFeesId, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<MiscellaneousFeesQuoteSSD>();
  const isEdit = record?.id !== undefined;

  useImperativeHandle(ref, () => ({
    show: (item) => {
      if (item) {
        setRecord(item);
      } else {
        setRecord(undefined);
      }

      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const initialValues = useMemo(() => {
    if (record === undefined) {
      return {
        expression: { text: '', value: '', variables: [] },
      };
    }
    const { expression, expressionText, variables, ...others } = record;

    return {
      expression: { text: expressionText, value: expression, variables: variables },
      ...others,
    };
  }, [record]);

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddMiscellaneousFeesQuoteParams) => addOrEditMiscellaneousFeesQuote(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success(record?.id ? '修改成功' : '新增成功');
        onSuccess?.();
      },
    },
  );

  function disabledDate(current: Moment) {
    return current && current < moment().startOf('day');
  }

  const handleFinish = useCallback(
    async (values: AddFormValues) => {
      const { gmtValid, gmtUnvalid, expression, id } = values;
      const params = {
        id,
        expression: expression.value,
        expressionText: expression.text,
        variables: expression.variables,
        otherId: miscellaneousFeesId,
        gmtValid: gmtValid.format(DATE_FORMAT_FULL_TIME),
        gmtUnvalid,
      };
      mutate(params);
    },
    [mutate, miscellaneousFeesId],
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
      title={isEdit ? '编辑报价' : '新增报价'}
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      width={500}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <Form
        ref={formRef}
        initialValues={initialValues}
        onFinish={handleFinish}
        autoComplete="off"
        {...layout}
      >
        <Form.Item hidden name="id">
          <Input placeholder="这是一个隐藏起来的表单域" />
        </Form.Item>
        <Form.Item
          label="生效时间"
          name="gmtValid"
          rules={[{ required: true, message: '请填写生效时间' }]}
        >
          <DatePicker
            disabledDate={isEdit ? disabledDate : undefined}
            style={{ width: '100%' }}
            showTime
          />
        </Form.Item>
        <Form.Item noStyle dependencies={['gmtValid']}>
          {({ getFieldValue }) => (
            <Form.Item
              label="失效时间"
              name="gmtUnvalid"
              validateFirst
              rules={[
                { required: false, message: '请先填写生效时间', type: 'string' },
                {
                  validator(rule, value) {
                    const gmtValid: Moment = getFieldValue('gmtValid');
                    if (value === gmtValid.format(DATE_FORMAT_FULL_TIME)) {
                      return Promise.reject('失效时间不能和生效时间一致');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InvalidDateInput
                gmtValid={
                  getFieldValue('gmtValid')
                    ? getFieldValue('gmtValid').format(DATE_FORMAT_FULL_TIME)
                    : undefined
                }
                itemId={record?.id}
                otherId={miscellaneousFeesId}
              />
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item
          label="公式"
          name="expression"
          rules={[{ required: true, message: '请输入公式' }]}
        >
          <MiscellaneousFeeFormulaInput channelId={channelId} />
        </Form.Item>
      </Form>

      <Button
        style={{ fontSize: 12, marginLeft: 110 }}
        type="link"
        target="_blank"
        href="https://image.alltopbuy.com/default/files/%E5%85%AC%E5%BC%8F%E7%BC%96%E8%BE%91%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.pdf"
      >
        查看公式说明文档
      </Button>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;

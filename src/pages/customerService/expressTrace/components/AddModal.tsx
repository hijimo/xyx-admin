import React, { useRef, useCallback, useState, useImperativeHandle } from 'react';
import _compact from 'lodash/compact';
import moment from 'moment';
import { useMutation } from 'react-query';
import { Modal, Form, Input, Radio, DatePicker, message } from 'antd';
import { addExpressTrace } from '@/services/expressTrace';
import { DATE_FORMAT_FULL_TIME } from '@/utils/variables';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import { ExpressTraceType, ExpressTraceTypeDesc } from '@/enum';
import MultiLineInput from '@/components/MultiLineInput';
import EnumSelect from '@/pages/components/EnumSelect';
import { DATE_FORMAT_TIME } from '@/utils/variables';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (type: number) => void;
  hide: () => void;
}

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const [trackType, setTrackType] = useState(1);
  const formRef = useRef<FormInstance>(null);

  useImperativeHandle(ref, () => ({
    show: (type) => {
      setVisible(true);
      setTrackType(type);
    },
    hide: () => setVisible(false),
  }));

  const { mutate, isLoading } = useMutation((params: any) => addExpressTrace(params), {
    onSuccess: () => {
      message.success('添加成功');
      setVisible(false);
      onSuccess?.();
    },
  });

  const handleFinish = useCallback(
    (values) => {
      const { time, waybillNoList } = values;
      const happenTime = moment(time).format(DATE_FORMAT_FULL_TIME);
      mutate({
        ...values,
        waybillNoList: waybillNoList && _compact(waybillNoList.split(' ')),
        trackType,
        happenTime,
        type: undefined,
        time: undefined,
      });
    },
    [mutate, trackType],
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
      title="添加"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      destroyOnClose
      confirmLoading={isLoading}
    >
      <Form
        preserve={false}
        ref={formRef}
        onFinish={handleFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        autoComplete="off"
        initialValues={{ type: trackType === ExpressTraceType.CAINIAO ? 3 : 0, trackType }}
      >
        <Form.Item
          label="添加维度"
          name="type"
          rules={[{ required: true, message: '请选择添加维度', type: 'number' }]}
        >
          <Radio.Group>
            {trackType !== ExpressTraceType.CAINIAO ? (
              <>
                <Radio value={0}>按运单</Radio>
                <Radio value={1}>按出货总单</Radio>
              </>
            ) : (
              <Radio value={3}>按批次号</Radio>
            )}
            <Radio value={2}>按提单</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle dependencies={['type']}>
          {({ getFieldValue }) => {
            if (getFieldValue('type') === 0) {
              return (
                <Form.Item
                  label="运单号"
                  name="waybillNoList"
                  rules={[{ required: true, message: '请输入运单号' }]}
                >
                  <MultiLineInput />
                </Form.Item>
              );
            } else if (getFieldValue('type') === 1) {
              return (
                <Form.Item
                  label="出货总单编号"
                  name="shipmentNo"
                  rules={[{ required: true, message: '请输入出货总单编号' }]}
                >
                  <Input placeholder="请输入出货总单编号" allowClear />
                </Form.Item>
              );
            } else if (getFieldValue('type') === 2) {
              return (
                <Form.Item
                  label="提单号"
                  name="ladingNo"
                  rules={[{ required: true, message: '请输入提单号' }]}
                >
                  <Input placeholder="请输入提单号" allowClear />
                </Form.Item>
              );
            } else {
              return (
                <Form.Item
                  label="批次号"
                  name="batchNo"
                  rules={[{ required: true, message: '请输入批次号' }]}
                >
                  <Input maxLength={30} placeholder="请输入批次号" allowClear />
                </Form.Item>
              );
            }
          }}
        </Form.Item>
        <Form.Item
          label="轨迹节点"
          name="trackNode"
          rules={[{ required: true, message: '请选择轨迹节点' }]}
        >
          <EnumSelect
            placeholder="请选择轨迹节点"
            enumKey={ExpressTraceTypeDesc[trackType]?.enumKey}
          />
        </Form.Item>
        <Form.Item
          label="发生时间"
          name="time"
          rules={[{ required: true, message: '请选择发生时间' }]}
        >
          <DatePicker
            showTime={{ format: DATE_FORMAT_TIME }}
            format={DATE_FORMAT_FULL_TIME}
            placeholder="请选择发生时间"
            allowClear
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="发生地点" name="happenPlace">
          <Input maxLength={30} placeholder="请输入发生地点" allowClear />
        </Form.Item>
        <Form.Item label="轨迹描述" name="remark">
          <Input.TextArea maxLength={500} placeholder="请输入轨迹描述" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;

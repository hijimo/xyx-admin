import moment from 'moment';
import type { Moment } from 'moment';
import _range from 'lodash/range';
import React, { useCallback, useState, useImperativeHandle, useRef } from 'react';
import { useMutation } from 'react-query';
import { Modal, message, Form, DatePicker } from 'antd';
import { DATE_FORMAT_FULL_TIME, DATE_FORMAT_TIME } from '@/utils/variables';
import { convertRangeToStartEnd } from '@/utils/helper';
import type { ModalProps } from 'antd/es/modal';
import type { FormInstance } from 'antd/es/form';
import type { EventValue, DisabledTimes } from 'node_modules/rc-picker/lib/interface';
import type { AddShipmentManifestParams } from '@/types';
import ServiceChannelSelect from '@/pages/components/ServiceChannelSelect';
import FilterChannelSelect from '@/pages/components/FilterChannelSelect';
import { addShipmentManifest } from '@/services/manifest';

interface AddModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefAddModalProps {
  show: (recordId?: number, check?: boolean) => void;
  hide: () => void;
}

const { RangePicker } = DatePicker;

const InternalAddModal = (
  { onCancel, onSuccess, ...otherProps }: AddModalProps,
  ref: React.Ref<RefAddModalProps>,
) => {
  const formRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);
  const [maxDateTime, setMaxDateTime] = useState<Moment>(moment());

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
      setMaxDateTime(moment());
    },
    hide: () => setVisible(false),
  }));

  const { mutate, isLoading: addLoading } = useMutation(
    (values: AddShipmentManifestParams) => addShipmentManifest(values),
    {
      onSuccess: () => {
        setVisible(false);
        message.success('新增成功');
        onSuccess?.();
      },
    },
  );

  const handleFinish = useCallback(
    async (values: any) => {
      const { rangeTime, ...others } = values;
      mutate({ ...others, ...convertRangeToStartEnd(rangeTime, 'gmt', undefined, 'second') });
    },
    [mutate],
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

  const disabledDate = useCallback((current) => {
    return current && current > moment().endOf('day');
  }, []);

  const disabledDateTime = useCallback(
    (data: EventValue<Moment>): DisabledTimes => {
      if (!data || data?.isSame(maxDateTime, 'day')) {
        return {
          disabledHours: () => _range(maxDateTime.hour() + 1, 24),
          disabledMinutes: (hour) =>
            hour < maxDateTime.hour() ? [] : _range(maxDateTime.minute() + 1, 60),
          disabledSeconds: (hour, minute) =>
            hour < maxDateTime.hour() || minute < maxDateTime.minute()
              ? []
              : _range(maxDateTime.second() + 1, 60),
        };
      }
      return {};
    },
    [maxDateTime],
  );

  return (
    <Modal
      title="新增出货总单"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleSubmit}
      confirmLoading={addLoading}
    >
      <Form ref={formRef} onFinish={handleFinish} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
        <Form.Item label="仓储" name="deptNo" rules={[{ required: true, message: '请选择仓库' }]}>
          <ServiceChannelSelect
            resourceType={1}
            allState
            valueType="channelCode"
            onChange={() =>
              formRef?.current?.setFieldsValue({ ldpChannelCode: [], tcChannelCode: [] })
            }
          />
        </Form.Item>
        <Form.Item noStyle dependencies={['deptNo']}>
          {({ getFieldValue }) => (
            <>
              <Form.Item
                label="头程"
                name="tcChannelCode"
                rules={[{ required: true, message: '请选择头程渠道' }]}
              >
                <FilterChannelSelect queryType={1} deptNo={getFieldValue('deptNo')} />
              </Form.Item>
              <Form.Item
                label="落地配"
                name="ldpChannelCode"
                rules={[{ required: true, message: '请选择落地配渠道' }]}
              >
                <FilterChannelSelect queryType={2} deptNo={getFieldValue('deptNo')} />
              </Form.Item>
            </>
          )}
        </Form.Item>
        <Form.Item
          label="起止时间"
          name="rangeTime"
          rules={[{ required: true, message: '请选择起止时间' }]}
        >
          <RangePicker
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ format: DATE_FORMAT_TIME }}
            format={DATE_FORMAT_FULL_TIME}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddModal = React.forwardRef(InternalAddModal) as (
  props: AddModalProps & { ref?: React.Ref<RefAddModalProps> },
) => React.ReactElement;

export default AddModal;

import React, { useState, useImperativeHandle, useCallback, useRef } from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { PartitionData, PartitionEditData } from '@/types';
import { transportPartitionCountryDataOptionSSD, transportPartitionCountryDataFlat } from './utils';
import PartitionForm from './PartitionForm';
import type { RefPartitionFormProps } from './PartitionForm';

export interface PartitionModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSubmit: (value: any) => void;
  showPartition?: boolean;
}

export interface RefPartitionModalProps {
  show: (item?: PartitionData) => void;
  hide: () => void;
}

const InternalPartitionModal = (
  { onCancel, onSubmit, showPartition, ...otherProps }: PartitionModalProps,
  ref: React.Ref<RefPartitionModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<PartitionEditData>();

  const partitionFormRef = useRef<RefPartitionFormProps>(null);

  useImperativeHandle(ref, () => ({
    show: (item) => {
      if (item !== undefined) {
        setRecord({
          ...item,
          countryList: transportPartitionCountryDataOptionSSD(item.countryList),
        });
      } else {
        setRecord(undefined);
      }

      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  const handleFinish = useCallback(
    (values: PartitionEditData) => {
      onSubmit?.({
        ...values,
        partitionCode: values.partitionCode || `${Date.now()}`,
        countryList: transportPartitionCountryDataFlat(values.countryList),
      });
      setVisible(false);
    },
    [onSubmit],
  );

  const handleOk = useCallback(() => {
    partitionFormRef.current?.submit?.();
  }, []);

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  return (
    <Modal
      title={record === undefined ? '新增分区' : '编辑分区'}
      {...otherProps}
      visible={visible}
      destroyOnClose
      onCancel={handleCancel}
      onOk={handleOk}
      width={800}
    >
      <PartitionForm
        ref={partitionFormRef}
        showPartition={showPartition}
        initialValues={record}
        preserve={false}
        onFinish={handleFinish}
      />
    </Modal>
  );
};

const PartitionModal = React.forwardRef(InternalPartitionModal) as (
  props: PartitionModalProps & { ref?: React.Ref<RefPartitionModalProps> },
) => React.ReactElement;

export default PartitionModal;

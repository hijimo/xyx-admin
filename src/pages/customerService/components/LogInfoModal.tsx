import React, { useState, useCallback, useImperativeHandle } from 'react';
import { useQuery } from 'react-query';
import { Modal } from 'antd';
import { getPackageDetail } from '@/services/package';
import type { ModalProps } from 'antd/es/modal';
import OperationLogInfo from './OperationLogInfo';

interface LogInfoModalProps extends Omit<ModalProps, 'visible' | 'footer'> {}

export interface RefLogInfoModalProps {
  show: (id: number) => void;
  hide: () => void;
}

const InternalLogInfoModal = (
  { onCancel, ...otherProps }: LogInfoModalProps,
  ref: React.Ref<RefLogInfoModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<number>();

  const { data, isLoading } = useQuery(['packageLogInfo', id], () => getPackageDetail({ id }), {
    enabled: !!id,
    select: (d) => d.data,
  });

  useImperativeHandle(ref, () => ({
    show: (d) => {
      setId(d);
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  return (
    <Modal
      title="操作日志"
      width={700}
      {...otherProps}
      onCancel={handleCancel}
      visible={visible}
      footer={null}
      destroyOnClose
    >
      {<OperationLogInfo loading={isLoading} data={data?.operatorLogDtos} />}
    </Modal>
  );
};

const LogInfoModal = React.forwardRef(InternalLogInfoModal) as (
  props: LogInfoModalProps & { ref?: React.Ref<RefLogInfoModalProps> },
) => React.ReactElement;

export default LogInfoModal;

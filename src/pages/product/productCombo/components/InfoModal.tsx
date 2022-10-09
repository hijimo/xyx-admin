import _values from 'lodash/values';
import { useMutation } from 'react-query';
import React, { useCallback, useState, useImperativeHandle } from 'react';
import { Modal, Table, Descriptions, Image } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import EmptyWrap from '@/components/EmptyWrap';
import type { ComboDetailSSD } from '@/types';
import { getComboDetail } from '@/services/combo';
import tableColumns from './columns';

const columns = _values(tableColumns);

interface InfoModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {}

export interface RefInfoModalProps {
  show: (id?: number) => void;
  hide: () => void;
}

const InternalInfoModal = (
  { onCancel, ...otherProps }: InfoModalProps,
  ref: React.Ref<RefInfoModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<ComboDetailSSD>();

  const { mutate } = useMutation((id: number) => getComboDetail(id), {
    onSuccess: (responseData) => {
      setRecord(responseData.data);
    },
  });

  useImperativeHandle(ref, () => ({
    show: (id) => {
      if (id) {
        mutate(id);
      } else {
        setRecord(undefined);
      }

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
      title="查看"
      {...otherProps}
      visible={visible}
      onCancel={handleCancel}
      width={800}
      okButtonProps={{
        style: {
          display: 'none',
        },
      }}
      cancelText="关闭"
      destroyOnClose
      onOk={handleCancel}
    >
      <Descriptions>
        <Descriptions.Item label="线路套餐名称" span={3}>
          <EmptyWrap value={record?.comboName} />
        </Descriptions.Item>
        <Descriptions.Item label="套餐报价图" span={3}>
          <Image width={120} src={record?.comboPic?.url} />
        </Descriptions.Item>
      </Descriptions>
      <Table dataSource={record?.comboCpDetails} rowKey="id" columns={columns} />
    </Modal>
  );
};

const InfoModal = React.forwardRef(InternalInfoModal) as (
  props: InfoModalProps & { ref?: React.Ref<RefInfoModalProps> },
) => React.ReactElement;

export default InfoModal;

import React, { useCallback, useImperativeHandle, useState } from 'react';
import { Modal, message } from 'antd';
import { useMutation } from 'react-query';
import BillNoInfo from '@/pages/components/BillNoInfo';
import { batchUnbind } from '@/services/batch';
import styles from './UnBindModal.less';

interface UnBindModalProps {
  onSuccess?: () => void;
}
export interface RefUnBindModalProps {
  show: (data: string[]) => void;
  hide: () => void;
}

const InternalUnBindModal = (
  { onSuccess }: UnBindModalProps,
  ref: React.Ref<RefUnBindModalProps>,
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);

  const { mutate, isLoading } = useMutation((values: string[]) => batchUnbind(values), {
    onSuccess: () => {
      setVisible(false);
      message.success('解绑提单成功');
      onSuccess?.();
    },
  });

  useImperativeHandle(ref, () => ({
    show: (d) => {
      setData(d);
      setVisible(true);
    },
    hide: () => {},
  }));

  const handleOk = useCallback(() => {
    mutate(data);
  }, [data, mutate]);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Modal
      title="解绑提单"
      onOk={handleOk}
      visible={visible}
      destroyOnClose
      onCancel={handleCancel}
      okButtonProps={{
        loading: isLoading,
      }}
    >
      <BillNoInfo data={data} />
      <div className={styles.desc}>确认解绑以上批次与提单关联关系吗？</div>
    </Modal>
  );
};
const UnBindModal = React.forwardRef(InternalUnBindModal) as (
  props: UnBindModalProps & { ref?: React.Ref<RefUnBindModalProps> },
) => React.ReactElement;

export default UnBindModal;

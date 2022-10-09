import React, { useState, useImperativeHandle } from 'react';
import { Modal, Space } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import { exportHelper } from '@/utils/helper';
import ExportButton from '@/components/ExportButton';
import { exportBatch } from '@/services/batch';

interface DownloadModalProps
  extends Omit<ModalProps, 'visible' | 'footer' | 'destroyOnClose' | 'onCancel'> {}

export interface RefDownloadModalProps {
  show: (parmas: any) => void;
  hide: () => void;
}

const ExportButtonList = [
  { title: '提单号导出明细', tempType: 'temp1' },
  { title: '装袋日常导出', tempType: 'temp2' },
];

const InternalDownloadModal = (
  props: DownloadModalProps,
  ref: React.Ref<RefDownloadModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const [exportParams, setExportParams] = useState<any>();

  useImperativeHandle(ref, () => ({
    show: (parmas) => {
      setExportParams(parmas);
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  return (
    <Modal
      title="导出"
      {...props}
      visible={visible}
      destroyOnClose
      footer={false}
      onCancel={() => setVisible(false)}
    >
      <Space wrap>
        {ExportButtonList.map((item) => (
          <ExportButton
            key={item.tempType}
            onClick={() => exportHelper(exportBatch, { ...exportParams, tempType: item.tempType })}
          >
            {item.title}
          </ExportButton>
        ))}
      </Space>
    </Modal>
  );
};

const DownloadModal = React.forwardRef(InternalDownloadModal) as (
  props: DownloadModalProps & { ref?: React.Ref<RefDownloadModalProps> },
) => React.ReactElement;

export default DownloadModal;

import React, { useState, useImperativeHandle } from 'react';
import { Modal, Space } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import { exportHelper } from '@/utils/helper';
import ExportButton from '@/components/ExportButton';
import { exportPackage } from '@/services/package';

interface DownloadModalProps
  extends Omit<ModalProps, 'visible' | 'footer' | 'destroyOnClose' | 'onCancel'> {}

export interface RefDownloadModalProps {
  show: (parmas: any) => void;
  hide: () => void;
}

const ExportButtonList = [
  { title: '9610清单', tempType: 'qdmb' },
  { title: '国内-出货清单', tempType: 'gnchqd' },
  { title: '提单号 EDI', tempType: 'tdhedi' },
  { title: '提单号 JANIO', tempType: 'tdhjanio' },
  { title: '提单号 manifest', tempType: 'tdhmanifest' },
  { title: '提单号 packinglist', tempType: 'tdhpackinglist' },
  { title: '查件导出', tempType: 'cjdcmb' },
  { title: '清关-明细表', tempType: 'qgmxb' },
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
      title="清单导出"
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
            onClick={() =>
              exportHelper(exportPackage, { ...exportParams, tempType: item.tempType })
            }
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

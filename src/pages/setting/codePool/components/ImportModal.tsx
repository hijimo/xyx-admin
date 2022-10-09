import React, { useCallback, useState, useImperativeHandle } from 'react';
import { useMutation } from 'react-query';
import { Modal, Button, Upload, message, Space } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { RcFile } from 'antd/es/upload';
import type { ResponseData } from '@/utils/request';
import ExportButton from '@/components/ExportButton';
import { importCodePoolExcel } from '@/services/codeSetting';
import styles from './ImportModal.less';

interface ImportModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess?: () => void;
}

export interface RefImportModalProps {
  show: () => void;
  hide: () => void;
}

const InternalImportModal = (
  { onCancel, onSuccess, ...otherProps }: ImportModalProps,
  ref: React.Ref<RefImportModalProps>,
) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  const { error, isLoading, mutate, isError, reset } = useMutation<ResponseData, Error, FormData>(
    (params) => importCodePoolExcel(params),
    {
      onSuccess: () => {
        message.success('导入成功');
        setVisible(false);
        onSuccess?.();
      },
    },
  );

  const beforeUpload = (file: RcFile) => {
    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const formData = new FormData();
      formData.append('file', file);
      mutate(formData);
    } else {
      message.error('文件格式错误!');
      reset();
    }
    return false;
  };

  const handleCancle = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Modal
      title="号码池导入"
      {...otherProps}
      visible={visible}
      destroyOnClose
      onCancel={handleCancle}
      keyboard={false}
      closable={!isLoading}
      afterClose={reset}
      footer={null}
    >
      <Space>
        <Upload accept=".xls,.xlsx" beforeUpload={beforeUpload} maxCount={1} showUploadList={false}>
          <Button loading={isLoading}>{isLoading ? '正在导入' : '选择文件'}</Button>
        </Upload>
        <ExportButton
          href="https://image.alltopbuy.com/default/template/num_pool_import.xlsx"
          download="号码池模板.xlsx"
        >
          下载模板
        </ExportButton>
      </Space>
      {isError && (
        <div className={styles.uploadResult} style={{ marginTop: 30 }}>
          <div className={styles.errorTitle}>导入失败</div>
          <div>{error?.message}</div>
        </div>
      )}
    </Modal>
  );
};

const ImportModal = React.forwardRef(InternalImportModal) as (
  props: ImportModalProps & { ref?: React.Ref<RefImportModalProps> },
) => React.ReactElement;

export default ImportModal;

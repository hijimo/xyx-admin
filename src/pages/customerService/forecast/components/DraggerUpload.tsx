import _every from 'lodash/every';
import React, { useRef } from 'react';
import { useMutation } from 'react-query';
import { Upload, Spin, message } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { InboxOutlined } from '@ant-design/icons';
import type { ResponseData } from '@/utils/request';
import {
  packageForecastExcel,
  paperToElectricityExcel,
  cainiaoForecastExcel,
} from '@/services/forecast';
import type { ExcelImportSuccessSSD } from '@/types';
import ResultModal from './ResultModal';
import type { RefResultModalProps } from './ResultModal';
import styles from './DraggerUpload.less';

export interface DraggerUploadProps {
  customerId?: number;
  forecastType?: number;
}

const { Dragger } = Upload;

const DraggerUpload: React.FC<DraggerUploadProps> = ({ customerId, forecastType }) => {
  const resultModalRef = useRef<RefResultModalProps>(null);
  const { error, data, isLoading, mutate } = useMutation<
    ResponseData<ExcelImportSuccessSSD>,
    Error,
    FormData
  >(
    (params: FormData) => {
      if (forecastType === 5) {
        return cainiaoForecastExcel(params);
      } else if (forecastType === 4) {
        return paperToElectricityExcel(params);
      } else {
        return packageForecastExcel(params);
      }
    },
    {
      onSuccess: (d) => {
        // d.data.
        if (forecastType !== 3) {
          resultModalRef.current?.show(d.data);
        }
      },
    },
  );

  const uploadResult = error
    ? { title: '导入失败', message: error.message, success: false }
    : { title: '导入成功', success: true };

  const beforeUpload = (file: RcFile) => {
    if (!customerId && _every([3, 4, 5], (item) => item !== forecastType)) {
      message.error('请选择客户');
    } else {
      const formData = new FormData();
      formData.append('file', file);
      if (customerId !== undefined) formData.append('companyId', `${customerId}`);
      if (_every([4, 5], (item) => item !== forecastType)) {
        formData.append('forecastType', `${forecastType}`);
      }
      mutate(formData);
    }
    return false;
  };

  return (
    <Spin spinning={isLoading} tip="正在预报...">
      <Dragger
        accept=".xls,.xlsx"
        name="file"
        showUploadList={false}
        maxCount={1}
        beforeUpload={beforeUpload}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击选择或拖拽文件到此区域上传</p>
        <p className="ant-upload-hint">支持XLS和XLSX文件</p>
      </Dragger>
      {(error || data) && (
        <div className={styles.uploadResult} style={{ marginTop: 30 }}>
          <div className={styles[uploadResult.success ? 'successTitle' : 'errorTitle']}>
            {uploadResult.title}
          </div>
          {uploadResult?.message && <div>{uploadResult?.message}</div>}
          {/* {forecastType === 3 && uploadResult.success && data?.data && data.data.length > 0 && (
            <div>未匹配的单号：{data.data.map((it) => it.ydh).join(',')}</div>
          )} */}
        </div>
      )}
      <ResultModal ref={resultModalRef} />
    </Spin>
  );
};

export default DraggerUpload;

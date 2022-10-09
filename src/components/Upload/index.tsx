import React, { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import classNames from 'classnames';
import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { formatFileList, getMaxSize, checkIsSizeOut, inAccpetList } from './utils/utils';
import type { File } from '@/types';
import { FileUploadStateEnums } from '@/types/file';
import UploadItem from './Upload';
import type { UploadProps } from './Upload';
import styles from './index.less';

export interface UploadListProps extends UploadProps {
  // file 原生 props
  accept?: string;
  capture?: boolean | 'user' | 'environment';
  multiple?: boolean;
  className?: string;
  style?: React.CSSProperties;
  // 已上传文件列表。
  fileList?: File[];
  // 默认上传方案
  uploadText?: string;
  // 最大上传文件大小。单位KB
  maxSize?: number;
  // 最大上传数量
  maxLength?: number;
  // before上传，返回false会终止后面动作。
  onBeforeUpload?: (fileList: File[]) => boolean | undefined;
  // 当文件进度发生变更、文件数量、上传状态等 发生变更
  onChange?: (fileList: File[]) => void;
  //
  renderAdd?: () => React.ReactElement;
}

const UploadList: React.FC<UploadListProps> = ({
  accept = 'image/png,image/jpeg,image/gif',
  className,
  name = 'file',
  data,
  style,
  fileList,
  capture,
  multiple,
  uploadText = '上传',
  maxSize = 10240,
  // 最大文件上传数量
  maxLength = 10,
  onBeforeUpload,
  onProgress,
  onChange,
  onSuccess,
  onError,
  renderAdd,
}) => {
  const [files, handleFiles] = useState<File[]>([]);
  const inputId = useRef<string>(`input${Math.random() * 10000000}`);

  useEffect(() => {
    handleFiles(fileList || []);
  }, [fileList]);

  const appendToList = (orginFiles: File[]) => {
    const newAry = [...files, ...orginFiles];
    handleFiles(newAry);
    onChange?.(newAry);
  };
  const update = (file: File) => {
    const idx = _findIndex(files, (f: File) => f.uid === file.uid);

    if (idx >= 0) {
      files.splice(idx, 1, { ...file });
      const newAry = [...files];
      handleFiles(newAry);
      onChange?.(newAry);
    }
  };

  const beforeUpload = (orginFileList: File[]): boolean => {
    // 文件格式非法
    const isNotAllowFile = _map(orginFileList, (file: File) =>
      inAccpetList(file.type, accept || ''),
    ).includes(false);
    if (isNotAllowFile) {
      message.error('不允许的文件格式');

      return false;
    }
    // 文件数量超出
    const isLenOut = files.length + orginFileList.length > maxLength;
    if (isLenOut) {
      message.error(`文件数量不能超过 ${maxLength} 个`);

      return false;
    }
    // 文件大小溢出
    const isSizeOut = _map(orginFileList, (file: File) =>
      checkIsSizeOut(file, maxSize || Infinity),
    ).indexOf(true);
    if (isSizeOut >= 0) {
      message.error(`文件大小不能超过 ${getMaxSize(orginFileList[isSizeOut] as File, maxSize)} KB`);
      return false;
    }

    if (onBeforeUpload) {
      return !(onBeforeUpload(orginFileList) === false);
    }

    return true;
  };

  const handleError = (file: File, msg?: string) => {
    const f = file;
    f.status = FileUploadStateEnums.Fail;
    update(f);
    if (onError) {
      onError(f, msg);
    }
  };
  const handleSuccess = (res: XMLHttpRequest, fileUrl: string, file: File) => {
    const f = file;
    f.url = fileUrl;
    f.status = FileUploadStateEnums.Done;
    update(f);
    if (onSuccess) {
      onSuccess(res, fileUrl, f);
    }
  };
  const handleProgress = (progress: number, file: File) => {
    const f = file;
    f.status = FileUploadStateEnums.Uploading;
    update(f);
    if (onProgress) {
      onProgress(progress, f);
    }
  };
  const handleRemove = (e, file: File) => {
    // 不判断是否正在上传中。
    const idx = files.indexOf(file);
    if (idx >= 0) {
      files.splice(idx, 1);
    }
    handleFiles([...files]);
  };

  const handleFileSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: orginFiles } = e.target;

    if (orginFiles && orginFiles?.length > 0) {
      const formatFiles = formatFileList(orginFiles);
      if (!beforeUpload(formatFiles)) {
        // 清空选择内容
        return false;
      }
      appendToList(formatFiles);
    }

    e.target.value = '';
    return true;
  };
  return (
    <div className={classNames(className, styles.uploadList, 'uc-uploadlist')} style={style}>
      {files.length < maxLength && (
        <div className={classNames(styles.listitem, styles.uploadAdd)}>
          <input
            id={inputId.current}
            type="file"
            accept={accept}
            capture={capture}
            multiple={multiple}
            onChange={handleFileSelectChange}
            style={{ display: 'none' }}
          />
          {renderAdd ? (
            renderAdd()
          ) : (
            <div className={styles.defaultAdd}>
              <PlusOutlined className={styles.uploadAddIcon} />
              <div className={classNames(styles.uploadAddText, 'uc-uploadlist-add-text')}>
                {uploadText}
                <br />
                (最多{maxLength}张)
              </div>
            </div>
          )}
          <label htmlFor={inputId.current} className={styles.label} />
        </div>
      )}

      {_map(files, (file: File) => (
        <div className={classNames(styles.listitem, 'uc-uploadlist-listitem')} key={file.uid}>
          <UploadItem
            className={styles.uploadItem}
            file={file}
            onRemove={handleRemove}
            name={name}
            data={data}
            onProgress={handleProgress}
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </div>
      ))}
    </div>
  );
};

export default UploadList;

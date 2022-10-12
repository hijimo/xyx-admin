import React from 'react';
import _isFunction from 'lodash/isFunction';
import { useMutation } from 'react-query';
import { Button, message } from 'antd';
import type { ButtonProps } from 'antd';
import request from 'umi-request';

export interface ExportButtonProps extends ButtonProps {
  name?: string;
  exportUrl: string | (() => string);
}

const ExportButton: React.FC<ExportButtonProps> = ({ name, exportUrl, ...otherProps }) => {
  const { isLoading, mutate } = useMutation(
    () => {
      const url = _isFunction(exportUrl) ? exportUrl() : exportUrl;
      return request.get(url, { responseType: 'blob' });
    },
    {
      onSuccess(blob, vari, context) {
        console.log('context: ', context);
        const fileUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = fileUrl;
        if (name !== undefined) {
          a.download = name;
        }

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(fileUrl);
        document.body.removeChild(a);
      },
      onError(error: Error) {
        message.error(error.message);
      },
    },
  );

  return (
    <Button
      {...otherProps}
      loading={isLoading}
      onClick={(e) => {
        mutate();
        otherProps.onClick?.(e);
      }}
    />
  );
};

export default ExportButton;

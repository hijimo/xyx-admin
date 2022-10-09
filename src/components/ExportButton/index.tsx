import React from 'react';
import { useMutation } from 'react-query';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

export interface ExportButtonProps extends Omit<ButtonProps, 'loading'> {
  timeout?: number;
}

const ExportButton: React.FC<ExportButtonProps> = ({ timeout = 5000, ...otherProps }) => {
  const { isLoading, mutate } = useMutation(
    () => new Promise((resolve) => setTimeout(() => resolve(true), timeout)),
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

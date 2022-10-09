import React, { useCallback } from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import { useQuery } from 'react-query';
import { getOtherInvalidDate } from '@/services/quote';

interface InvalidDateInputProps extends Omit<InputProps, 'onChange'> {
  gmtValid?: string;
  itemId?: number;
  otherId?: string | number;
  onChange?: (value: string | null) => void;
}

const InvalidDateInput: React.FC<InvalidDateInputProps> = ({
  gmtValid,
  itemId,
  otherId,
  onChange,
  ...otherProps
}) => {
  const queryParams = {
    gmtValid: gmtValid!,
    id: itemId!,
    otherId: otherId!,
  };
  useQuery(['otherInvalidDate', queryParams], () => getOtherInvalidDate(queryParams), {
    enabled: !!gmtValid,
    onSuccess(res) {
      onChange?.(res.data);
    },
  });

  const handleChange = useCallback(
    (e) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );

  return <Input disabled placeholder="--" onChange={handleChange} {...otherProps} />;
};

export default InvalidDateInput;

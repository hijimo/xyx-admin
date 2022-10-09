import React, { useCallback } from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import { useQuery } from 'react-query';
import _isNil from 'lodash/isNil';
import { getQuoteInvalidDate } from '@/services/quote';
import type { ChannelProductType } from '@/enum';
import { BooleanEnum } from '@/enum';

interface InvalidDateInputProps extends Omit<InputProps, 'onChange'> {
  gmtValid?: string;
  priceLevel?: number;
  showPrice?: boolean;
  isAdded?: boolean;
  offerId?: number;
  productId?: number;
  productType?: ChannelProductType;
  onChange?: (value: string | null) => void;
}

const InvalidDateInput: React.FC<InvalidDateInputProps> = ({
  showPrice = false,
  isAdded,
  priceLevel,
  gmtValid,
  offerId,
  productId,
  productType,
  onChange,
  ...otherProps
}) => {
  const queryParams = {
    gmtValid: gmtValid!,
    priceLevel,
    offerId: offerId!,
    productId: productId!,
    productType,
    isAdded: isAdded ? BooleanEnum.TRUE : BooleanEnum.FALSE,
  };

  useQuery(['quoteInvalidDate', queryParams], () => getQuoteInvalidDate(queryParams), {
    enabled: !!gmtValid && (!_isNil(priceLevel) || !showPrice),
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

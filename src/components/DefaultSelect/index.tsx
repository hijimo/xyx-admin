import React from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { OptionItemSSD } from '@/types';

interface DefaultSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  disabled?: boolean;
  data: OptionItemSSD[];
}

const DefaultSelect = <T extends SelectValue = SelectValue>({
  data,
  ...otherProps
}: DefaultSelectProps<T>) => {
  return (
    <Select placeholder="请选择" allowClear filterOption={false} {...otherProps} options={data} />
  );
};

export default React.memo(DefaultSelect);

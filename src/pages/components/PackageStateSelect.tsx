import React from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { PackageStateList } from '@/enum';

interface PackageStateSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  data?: {
    value: number;
    label: string;
  }[];
}

const PackageStateSelect = <T extends SelectValue = SelectValue>({
  data = PackageStateList,
  ...otherProps
}: PackageStateSelectProps<T>) => {
  return (
    <Select
      allowClear
      showSearch
      optionFilterProp="label"
      placeholder="请选择"
      {...otherProps}
      options={data}
    />
  );
};

export default React.memo(PackageStateSelect);

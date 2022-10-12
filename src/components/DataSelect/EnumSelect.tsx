import React, { useMemo } from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';

interface EnumSelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent'
  > {
  enumDesc: any;
}

const EnumSelect = <T extends SelectValue = SelectValue>({
  enumDesc,
  ...otherProps
}: EnumSelectProps<T>) => {
  const options = useMemo(
    () =>
      Object.keys(enumDesc).map((key) => ({
        value: parseInt(key, 10),
        label: enumDesc[key].text,
      })) || [],
    [enumDesc],
  );

  return (
    <Select
      placeholder="请选择"
      showSearch
      allowClear
      {...otherProps}
      filterOption={false}
      options={options}
    />
  );
};

export default React.memo(EnumSelect);

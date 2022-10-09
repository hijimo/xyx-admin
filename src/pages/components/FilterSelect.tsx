import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';

export interface FilterSelectProps<T> extends SelectProps<T> {}

const FilterSelect = <T extends SelectValue = SelectValue>(props: FilterSelectProps<T>) => {
  return (
    <Select
      placeholder="请输入或者选择"
      allowClear
      showSearch
      optionFilterProp="label"
      {...props}
    />
  );
};

export default FilterSelect;

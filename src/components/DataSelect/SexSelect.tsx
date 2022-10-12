import React from 'react';
import type { SelectValue } from 'antd/es/select';
import { SexDesc } from '@/enum';
import FilterSelect from './FilterSelect';
import type { FilterSelectProps } from './FilterSelect';

const options = Object.keys(SexDesc).map((key) => ({
  label: SexDesc[key].text,
  value: parseInt(key, 10),
}));

interface SexSelectProps extends Omit<FilterSelectProps<SelectValue>, 'loading' | 'options'> {}

const SexSelect = ({ ...otherProps }: SexSelectProps) => {
  return <FilterSelect {...otherProps} options={options} />;
};

export default React.memo(SexSelect);

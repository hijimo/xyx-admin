import React, { useMemo } from 'react';
import _map from 'lodash/map';
import type { SelectValue } from 'antd/es/select';
import { ProjectTypeDesc } from '@/enum';
import FilterSelect from './FilterSelect';
import type { FilterSelectProps } from './FilterSelect';

interface ProjectSelectProps extends Omit<FilterSelectProps<SelectValue>, 'loading' | 'options'> {}

const ProjectSelect = ({ ...otherProps }: ProjectSelectProps) => {
  const options = useMemo(() => {
    return _map(ProjectTypeDesc, (it, key) => ({
      label: it.text,
      value: parseInt(key, 10),
    }));
  }, []);

  return <FilterSelect {...otherProps} options={options} />;
};

export default React.memo(ProjectSelect);

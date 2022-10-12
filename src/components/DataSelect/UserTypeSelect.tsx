import React, { useMemo } from 'react';
import type { SelectValue } from 'antd/es/select';
import FilterSelect from './FilterSelect';
import type { FilterSelectProps } from './FilterSelect';

interface UserTypeSelectProps extends Omit<FilterSelectProps<SelectValue>, 'loading' | 'options'> {
  companyType: number;
}

const UserTypeSelect = ({ companyType, ...otherProps }: UserTypeSelectProps) => {
  const options = useMemo(() => {
    switch (companyType) {
      case 0:
        return [{ label: '平台运营商', value: 3 }];
      case 1:
        return [
          { label: 'OEM厂家', value: 2 },

          { label: '区域代理商', value: 4 },
        ];
      case 2:
        return [{ label: '普通用户', value: 1 }];
      default:
        return [{ label: '普通用户', value: 1 }];
    }
  }, [companyType]);

  return <FilterSelect {...otherProps} options={options} />;
};

export default React.memo(UserTypeSelect);

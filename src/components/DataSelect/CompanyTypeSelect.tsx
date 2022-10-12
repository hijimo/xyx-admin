import React, { useMemo } from 'react';
import type { SelectValue } from 'antd/es/select';
import FilterSelect from './FilterSelect';
import type { FilterSelectProps } from './FilterSelect';
import { CompanyTypeEnum, CompanyTypeEnumDesc } from '@/enum/company';
import { useModel } from 'umi';

interface CompanyTypeSelectProps
  extends Omit<FilterSelectProps<SelectValue>, 'loading' | 'options'> {}

const CompanyTypeSelect = ({ ...otherProps }: CompanyTypeSelectProps) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const options = useMemo(() => {
    if (currentUser?.userType === 3) {
      return [
        {
          label: CompanyTypeEnumDesc[CompanyTypeEnum.OEM].text,
          value: CompanyTypeEnum.OEM,
        },
        {
          label: CompanyTypeEnumDesc[CompanyTypeEnum.CUSTOMER].text,
          value: CompanyTypeEnum.CUSTOMER,
        },
      ];
    }
    return [
      {
        label: CompanyTypeEnumDesc[CompanyTypeEnum.CUSTOMER].text,
        value: CompanyTypeEnum.CUSTOMER,
      },
    ];
  }, [currentUser]);

  return <FilterSelect {...otherProps} options={options} />;
};

export default React.memo(CompanyTypeSelect);

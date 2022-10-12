import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import type { SelectValue } from 'antd/es/select';
import type { UserItemSSD } from '@/types';
import { getUserList } from '@/services/userManager';

import FilterSelect from './FilterSelect';
import type { FilterSelectProps } from './FilterSelect';

interface UserSelectProps extends Omit<FilterSelectProps<SelectValue>, 'loading' | 'options'> {
  companyNo: string;
}

const UserSelect = ({ companyNo, ...otherProps }: UserSelectProps) => {
  const { data, isFetching } = useQuery(
    ['getUserList', companyNo],
    () => getUserList({ companyNo, pageNo: 1, pageSize: 999 }),
    {
      select: (d) => d.data.records || [],
    },
  );

  const options = useMemo(() => {
    return (
      data?.map((item: UserItemSSD) => ({
        label: item.userName,
        value: item.userNo!,
      })) ?? []
    );
  }, [data]);

  return <FilterSelect {...otherProps} loading={isFetching} options={options} />;
};

export default React.memo(UserSelect);

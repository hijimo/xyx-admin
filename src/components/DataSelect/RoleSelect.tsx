import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import type { SelectValue } from 'antd/es/select';
import type { RoleListItemSSD } from '@/types';
import { getRoleList } from '@/services/role';

import FilterSelect from './FilterSelect';
import type { FilterSelectProps } from './FilterSelect';

interface RoleSelectProps extends Omit<FilterSelectProps<SelectValue>, 'loading' | 'options'> {
  freeze?: boolean;
  companyNo?: string;
}

const RoleSelect = ({ freeze = false, companyNo, ...otherProps }: RoleSelectProps) => {
  const { data, isFetching } = useQuery(
    ['roleList', companyNo],
    () => getRoleList({ freeze, companyNo, pageNo: 1, pageSize: 999 }),
    {
      select: (d) => d.data.records || [],
      enabled: !!companyNo,
    },
  );

  const options = useMemo(() => {
    return (
      data?.map((item: RoleListItemSSD) => ({
        label: item.roleName,
        value: item.roleNo!,
      })) ?? []
    );
  }, [data]);

  return <FilterSelect {...otherProps} loading={isFetching} options={options} />;
};

export default React.memo(RoleSelect);

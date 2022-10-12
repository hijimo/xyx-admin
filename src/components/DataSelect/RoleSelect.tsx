import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import type { SelectValue } from 'antd/es/select';
import type { RoleListItemSSD } from '@/types';
import { getRoleList } from '@/services/role';

import FilterSelect from './FilterSelect';
import type { FilterSelectProps } from './FilterSelect';

interface RoleSelectProps extends Omit<FilterSelectProps<SelectValue>, 'loading' | 'options'> {}

const RoleSelect = ({ ...otherProps }: RoleSelectProps) => {
  const { data, isFetching } = useQuery(
    ['roleList'],
    () => getRoleList({ pageNo: 1, pageSize: 999 }),
    {
      select: (d) => {
        return d.rows || [];
      },
    },
  );

  const options = useMemo(() => {
    return (
      data?.map((item: RoleListItemSSD) => ({
        label: item.roleName,
        value: item.roleId!,
      })) ?? []
    );
  }, [data]);

  return <FilterSelect {...otherProps} loading={isFetching} options={options} />;
};

export default React.memo(RoleSelect);

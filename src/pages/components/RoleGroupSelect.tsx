import _some from 'lodash/some';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { RoleGroupListItemSSD } from '@/types';
import { getRoleGroupList } from '@/services/common';

interface RoleGroupSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  disabledSelect?: string[];
}

const RoleGroupSelect = <T extends SelectValue = SelectValue>({
  disabledSelect,
  ...otherProps
}: RoleGroupSelectProps<T>) => {
  const { data, isLoading } = useQuery(
    ['roleGroupList'],
    () => getRoleGroupList({ pageSize: 9999 }),
    { select: (d) => d.data.records || [] },
  );

  const options = useMemo(() => {
    return (
      data?.map((item: RoleGroupListItemSSD) => ({
        value: item.groupCode,
        label: item.groupName,
        disabled: _some(disabledSelect, (it) => item.groupCode === it),
      })) || []
    );
  }, [data, disabledSelect]);

  return (
    <Select
      showSearch
      allowClear
      placeholder="请选择"
      {...otherProps}
      loading={isLoading}
      options={options}
    />
  );
};

export default React.memo(RoleGroupSelect);

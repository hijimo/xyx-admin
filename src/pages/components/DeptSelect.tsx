import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { DeptListItemSSD } from '@/types';
import { getDeptList } from '@/services/manifest';

interface DeptSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {}

const DeptSelect = <T extends SelectValue = SelectValue>(props: DeptSelectProps<T>) => {
  const { data, isLoading } = useQuery(['deptList'], () => getDeptList(), {
    select: (d) => d.data,
  });

  const options = useMemo(() => {
    return (
      data?.map((item: DeptListItemSSD) => ({
        value: item.deptNo,
        label: `${item.deptName} (${item.deptNo})`,
      })) || []
    );
  }, [data]);

  return (
    <Select
      placeholder="请选择"
      showSearch
      allowClear
      optionFilterProp="label"
      maxTagCount="responsive"
      {...props}
      loading={isLoading}
      options={options}
    />
  );
};

export default React.memo(DeptSelect);

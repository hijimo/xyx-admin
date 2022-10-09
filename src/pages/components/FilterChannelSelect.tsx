import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { RouteProductListItemSSD } from '@/types';
import { filterChannelList } from '@/services/manifest';

interface FilterChannelSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  queryType: number;
  deptNo: string;
}

const FilterChannelSelect = <T extends SelectValue = SelectValue>({
  queryType,
  deptNo,
  ...otherProps
}: FilterChannelSelectProps<T>) => {
  const { data, isLoading } = useQuery(
    ['filterChannelList', { queryType, deptNo }],
    () => filterChannelList({ queryType, deptNo }),
    { enabled: !!deptNo && !!queryType, select: (d) => d.data },
  );

  const options = useMemo(() => {
    return (
      data?.map((item: RouteProductListItemSSD) => ({
        value: item.cpCode,
        label: `${item.cpName} (${item.cpCode})`,
      })) || []
    );
  }, [data]);

  return (
    <Select
      placeholder="请选择"
      showSearch
      optionFilterProp="label"
      allowClear
      maxTagCount="responsive"
      mode="multiple"
      {...otherProps}
      loading={isLoading}
      options={options}
    />
  );
};

export default React.memo(FilterChannelSelect);

import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { ServiceChannelListItemSSD } from '@/types';
import { getServiceChannelList } from '@/services/serviceChannel';

interface ServiceChannelSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  resourceType: number;
  allState?: boolean;
  valueType?: string;
}

const ServiceChannelSelect = <T extends SelectValue = SelectValue>({
  resourceType,
  allState,
  valueType = 'id',
  ...otherProps
}: ServiceChannelSelectProps<T>) => {
  const { data, isLoading } = useQuery(
    ['serviceTypeList', { resourceType, allState }],
    () =>
      getServiceChannelList({
        resourceType,
        state: allState ? undefined : 1,
        pageSize: 999,
      }),
    { enabled: !!resourceType, select: (d) => d.data },
  );

  const options = useMemo(() => {
    return (
      data?.records?.map((item: ServiceChannelListItemSSD) => ({
        value: item[valueType],
        label: `${item.channelName} (${item.channelCode})`,
      })) || []
    );
  }, [data, valueType]);

  return (
    <Select
      placeholder="请选择"
      showSearch
      allowClear
      optionFilterProp="label"
      maxTagCount="responsive"
      {...otherProps}
      loading={isLoading}
      options={options}
    />
  );
};

export default React.memo(ServiceChannelSelect);

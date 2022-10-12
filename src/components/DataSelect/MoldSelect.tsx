import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select, Spin } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { DeviceSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import { BooleanEnum } from '@/enum';

import { getDeviceList } from '@/services/device';

interface MoldSelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent'
  > {
  valueType?: string;
  onDataReady?: (dt: DeviceSSD[]) => void;
}

const MoldSelect = <T extends SelectValue = SelectValue>({
  valueType = 'code',
  onDataReady,
  ...otherProps
}: MoldSelectProps<T>) => {
  const { data, isFetching } = useQuery(
    ['getDeviceList'],
    () =>
      getDeviceList({
        modelFlag: BooleanEnum.TRUE,
      }),
    {
      select: (d: ResponseData<PaginationData<DeviceSSD[]>>) => d.data,
      onSuccess: (d) => {
        onDataReady?.(d.records);
      },
    },
  );

  const options = useMemo(
    () =>
      data?.records.map((item) => ({
        label: item.name,
        value: item[valueType],
        key: item.id,
      })) || [],
    [data, valueType],
  );

  return (
    <Select
      allowClear
      placeholder="请选择物模型"
      {...otherProps}
      filterOption={false}
      notFoundContent={isFetching ? <Spin size="small" /> : undefined}
      options={options}
      loading={isFetching}
    />
  );
};

export default React.memo(MoldSelect);

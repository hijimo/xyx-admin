import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { AddressCityItemSSD } from '@/types';
import type { ResponseData } from '@/utils/request';
import { getCpCountryList } from '@/services/common';

interface CpCountrySelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  disabled?: boolean;
  lineId?: number;
  onDataReady?: (id: AddressCityItemSSD[]) => void;
}

const CpCountrySelect = <T extends SelectValue = SelectValue>({
  lineId,
  onDataReady,
  ...props
}: CpCountrySelectProps<T>) => {
  const { data, isLoading } = useQuery(
    ['cpCountryList', { lineId }],
    () => getCpCountryList(lineId as number),
    {
      select: (d: ResponseData<AddressCityItemSSD[]>) => d.data,
      enabled: !!lineId,
      onSuccess: (d) => {
        onDataReady?.(d);
      },
    },
  );

  const options = useMemo(() => {
    return data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [data]);

  return (
    <Select
      placeholder="请选择"
      allowClear
      showSearch
      optionFilterProp="label"
      {...props}
      options={options}
      loading={isLoading}
    />
  );
};

export default React.memo(CpCountrySelect);

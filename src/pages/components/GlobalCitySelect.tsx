import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import type { SelectValue } from 'antd/es/select';
import { getGolbalAddressList } from '@/services/common';
import FilterSelect from './FilterSelect';
import type { FilterSelectProps } from './FilterSelect';
import type { BooleanEnum } from '@/enum';

interface GlobalCitySelectProps
  extends Omit<FilterSelectProps<SelectValue>, 'loading' | 'options'> {
  valueType?: string;
  level?: number;
  transferFlag?: BooleanEnum;
  pid?: number | string;
}

const GlobalCitySelect = ({
  level,
  pid,
  valueType = 'id',
  transferFlag = 0,
  ...otherProps
}: GlobalCitySelectProps) => {
  const { data, isFetching } = useQuery(
    ['globalCityList', pid, level, transferFlag],
    () =>
      getGolbalAddressList({
        transferFlag,
        pid,
        level,
      }),
    {
      select: (d) => d.data,
      // 60秒就够了
      staleTime: 1000 * 60,
    },
  );

  const options = useMemo(
    () =>
      data?.map((item) => ({
        label: item.name,
        value: item[valueType],
        key: item.id,
        extra: item,
      })),
    [data, valueType],
  );

  return <FilterSelect {...otherProps} loading={isFetching} options={options} />;
};

export default React.memo(GlobalCitySelect);

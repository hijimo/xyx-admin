import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import type { SelectValue } from 'antd/es/select';
import { getFigureList } from '@/services/figure';
import FilterSelect from './FilterSelect';
import type { FilterSelectProps } from './FilterSelect';

interface FigureSelectProps extends Omit<FilterSelectProps<SelectValue>, 'loading' | 'options'> {}

const FigureSelect = ({ ...otherProps }: FigureSelectProps) => {
  const { data, isFetching } = useQuery(
    ['getFigureList'],
    () => getFigureList({ pageNo: 1, pageNum: 1, pageSize: 999 }),
    {
      select: (d) => {
        return d.data.records || [];
      },
    },
  );

  const options = useMemo(() => {
    return (
      data?.map((item) => ({
        label: item.gameRoleName,
        value: item.gameRoleId!,
      })) ?? []
    );
  }, [data]);

  return <FilterSelect {...otherProps} loading={isFetching} options={options} />;
};

export default React.memo(FigureSelect);

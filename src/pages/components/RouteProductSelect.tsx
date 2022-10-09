import _debounce from 'lodash/debounce';
import React, { useMemo, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Select, Spin } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { getRouteProductList } from '@/services/routeProduct';

interface RouteProductSelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent' | 'onClear'
  > {
  disabled?: boolean;
  selectByCpCode?: boolean;
  comboId?: number;
  cpType?: number;
  searchByComboId?: boolean;
}

const RouteProductSelect = <T extends SelectValue = SelectValue>({
  selectByCpCode,
  comboId,
  searchByComboId,
  cpType,
  ...otherProps
}: RouteProductSelectProps<T>) => {
  const [keyword, setKeyword] = useState<string>();

  const { data, isLoading } = useQuery(
    ['routeProductList', { keyword, comboId, searchByComboId, cpType }],
    () => getRouteProductList({ keyword, comboId, pageSize: 50, state: 1, cpType }),
    {
      staleTime: 60 * 1000,
      enabled: searchByComboId ? !!comboId : true,
      select: (d) => d.data.records,
    },
  );

  const options = useMemo(() => {
    return data?.map((item) => ({
      value: selectByCpCode ? item.cpCode : item.id,
      label: `${item.cpName} (${item.cpCode})`,
    }));
  }, [data, selectByCpCode]);

  const handleSearch = useCallback(
    _debounce((value: string) => {
      setKeyword(value);
    }, 800),
    [],
  );

  return (
    <Select
      allowClear
      showSearch
      labelInValue
      placeholder="请输入或选择"
      {...otherProps}
      filterOption={false}
      onSearch={handleSearch}
      notFoundContent={isLoading ? <Spin size="small" /> : undefined}
      options={options}
      loading={isLoading}
      onClear={() => setKeyword(undefined)}
      onSelect={() => setKeyword(undefined)}
    />
  );
};

export default React.memo(RouteProductSelect);

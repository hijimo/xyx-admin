import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { RouteProductListItemSSD } from '@/types';
import type { ResponseData } from '@/utils/request';
import { getCustomerRouteProductList } from '@/services/routeProduct';

interface CustomerRouteSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  selectByCpCode?: boolean;
  customerId?: number;
  countryId?: number;
  onDataReady?: (id: RouteProductListItemSSD[]) => void;
}

const CustomerRouteSelect = <T extends SelectValue = SelectValue>({
  selectByCpCode,
  customerId,
  countryId,
  onDataReady,
  ...otherProps
}: CustomerRouteSelectProps<T>) => {
  const { data, isLoading } = useQuery(
    ['customerRouteList', { customerId, countryId }],
    () =>
      getCustomerRouteProductList({
        id: customerId,
        countryId,
      }),
    {
      enabled: !!customerId,
      select: (d: ResponseData<RouteProductListItemSSD[]>) => d.data,
      onSuccess: (d) => {
        onDataReady?.(d);
      },
    },
  );

  const options = useMemo(() => {
    return data?.map((item) => ({
      value: selectByCpCode ? item.cpCode : item.id,
      label: `${item.cpName} (${item.cpCode})`,
    }));
  }, [data, selectByCpCode]);

  return (
    <Select
      allowClear
      placeholder="请选择"
      showSearch
      optionFilterProp="label"
      {...otherProps}
      options={options}
      loading={isLoading}
    />
  );
};

export default React.memo(CustomerRouteSelect);

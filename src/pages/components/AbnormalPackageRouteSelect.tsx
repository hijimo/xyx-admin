import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { AbnormalPackageRouteProductSSD } from '@/types';
import type { ResponseData } from '@/utils/request';
import { getAbnormalPackageRouteProductList } from '@/services/package';

interface AbnormalPackageRouteSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  uniqueNo?: string;
  onDataReady?: (id: AbnormalPackageRouteProductSSD[]) => void;
}

const AbnormalPackageRouteSelect = <T extends SelectValue = SelectValue>({
  uniqueNo,
  onDataReady,
  ...otherProps
}: AbnormalPackageRouteSelectProps<T>) => {
  const { data, isLoading } = useQuery(
    ['abnormalPackageRouteList', { uniqueNo }],
    () => getAbnormalPackageRouteProductList(uniqueNo),
    {
      enabled: !!uniqueNo,
      select: (d: ResponseData<AbnormalPackageRouteProductSSD[]>) => d.data,
      onSuccess: (d) => {
        onDataReady?.(d);
      },
    },
  );

  const options = useMemo(() => {
    return data?.map((item) => ({
      value: item.id,
      label: `${item.lineName} (${item.lineNo})`,
    }));
  }, [data]);

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

export default React.memo(AbnormalPackageRouteSelect);

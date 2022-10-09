import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { getBlendingSelectList } from '@/services/product';

interface TrunkSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  warehouseId?: string | number;
}

const TrunkSelect = <T extends SelectValue = SelectValue>({
  warehouseId,
  ...otherProps
}: TrunkSelectProps<T>) => {
  const hasWarehouseId = warehouseId !== undefined && warehouseId !== null;

  const { data, isFetching } = useQuery(
    ['trunks', { warehouseId }],
    () => getBlendingSelectList({ id: warehouseId! }),
    { enabled: hasWarehouseId, select: (d) => d.data },
  );

  const options = useMemo(() => {
    return hasWarehouseId
      ? data?.map((item: { id: number; resourceName: string }) => ({
          value: item.id,
          label: item.resourceName,
        })) ?? []
      : [];
  }, [data, hasWarehouseId]);

  return <Select showSearch allowClear {...otherProps} loading={isFetching} options={options} />;
};

export default React.memo(TrunkSelect);

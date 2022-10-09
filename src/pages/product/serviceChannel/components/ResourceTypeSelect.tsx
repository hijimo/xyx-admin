import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { ServiceTypeDesc } from '@/enum';
import { getProviderDetail } from '@/services/provider';

interface ResourceTypeSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  companyId?: number;
}

const ResourceTypeSelect = <T extends SelectValue = SelectValue>({
  companyId,
  ...otherProps
}: ResourceTypeSelectProps<T>) => {
  const { data, isLoading } = useQuery(
    ['companyDetail', { companyId }],
    () => getProviderDetail({ id: companyId }),
    {
      enabled: !!companyId,
      select: (d) => d.data,
    },
  );

  const options = useMemo(() => {
    return (
      data?.companyTypes?.map((item: any) => ({
        value: item,
        label: ServiceTypeDesc[item].text,
      })) || []
    );
  }, [data]);

  return (
    <Select
      placeholder="请选择资源类型"
      showSearch
      allowClear
      maxTagCount="responsive"
      {...otherProps}
      loading={isLoading}
      options={options}
    />
  );
};

export default React.memo(ResourceTypeSelect);

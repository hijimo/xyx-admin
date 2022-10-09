import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { getOperatingOrganizations } from '@/services/setting';

interface CompanySelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent' | 'onClear'
  > {}

const OperatingOrganizationsSelect = <T extends SelectValue = SelectValue>(
  props: CompanySelectProps<T>,
) => {
  const { data, isFetching } = useQuery(
    ['operatingOrganizations'],
    () => getOperatingOrganizations({ pageSize: 999 }),
    {
      select: (d) => d.data,
    },
  );

  const options = useMemo(() => {
    return data?.map((item) => ({
      label: item.companyName,
      value: item.id,
    }));
  }, [data]);

  return (
    <Select
      showSearch
      allowClear
      optionFilterProp="label"
      placeholder="请输入或选择"
      {...props}
      loading={isFetching}
      options={options}
    />
  );
};

export default React.memo(OperatingOrganizationsSelect);

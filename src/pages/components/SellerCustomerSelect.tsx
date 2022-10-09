import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { getSellerCustomerList } from '@/services/seller';

interface SellerCustomerSelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent' | 'onClear'
  > {
  userNo?: string;
}

const SellerCustomerSelect = <T extends SelectValue = SelectValue>({
  userNo,
  ...otherProps
}: SellerCustomerSelectProps<T>) => {
  const { data, isLoading } = useQuery(
    ['sellerCustomers', { userNo }],
    () =>
      getSellerCustomerList({
        userNo,
      }),
    {
      select: (d) => d.data,
      enabled: !!userNo,
    },
  );

  const options = useMemo(() => {
    return data?.map((company) => ({
      label: `${company.companyName} (${company.companyNo})`,
      value: company.companyNo,
    }));
  }, [data]);

  return (
    <Select
      allowClear
      showSearch
      optionFilterProp="label"
      placeholder="请输入或选择"
      {...otherProps}
      loading={isLoading}
      options={options}
    />
  );
};

export default React.memo(SellerCustomerSelect);

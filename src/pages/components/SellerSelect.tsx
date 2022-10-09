import React, { useState, useMemo } from 'react';
import { produce } from 'immer';
import { useDebounce } from 'ahooks';
import { useQuery } from 'react-query';
import { Select, Spin } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { SellerListParams } from '@/types';
import { getSellerList } from '@/services/seller';

interface SellersSelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent' | 'onClear'
  > {}

const SellersSelect = <T extends SelectValue = SelectValue>(props: SellersSelectProps<T>) => {
  const [userName, setUserName] = useState<string>();
  const debouncedKeyword = useDebounce(userName, { wait: 800 });

  const { data, isLoading } = useQuery(
    ['sellerList', { debouncedKeyword }],
    () =>
      getSellerList(
        produce(
          {
            pageSize: 50,
            state: 1,
          },
          (draft: SellerListParams) => {
            draft.userName = debouncedKeyword;
          },
        ),
      ),
    {
      select: (d) => d.data,
    },
  );

  const options = useMemo(() => {
    return data?.records.map((seller) => ({
      label: `${seller.userName} (${seller.userNo})`,
      value: seller.userNo,
    }));
  }, [data]);

  return (
    <Select
      showSearch
      allowClear
      placeholder="请输入或选择"
      {...props}
      filterOption={false}
      notFoundContent={isLoading ? <Spin size="small" /> : undefined}
      options={options}
      loading={isLoading}
      onSearch={setUserName}
      onClear={() => setUserName(undefined)}
    />
  );
};

export default React.memo(SellersSelect);

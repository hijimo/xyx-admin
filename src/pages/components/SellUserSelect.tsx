import React, { useState, useMemo } from 'react';
import { produce } from 'immer';
import { useDebounce } from 'ahooks';
import { useQuery } from 'react-query';
import { Select, Spin } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { SellUserListParams } from '@/types';
import { getSellUserList } from '@/services/seller';

interface SellUserSelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent' | 'onClear'
  > {}

const SellUserSelect = <T extends SelectValue = SelectValue>(props: SellUserSelectProps<T>) => {
  const [keyword, setKeyword] = useState<string>();
  const debouncedKeyword = useDebounce(keyword, { wait: 800 });

  const { data, isLoading } = useQuery(
    ['sellUserList', { debouncedKeyword }],
    () =>
      getSellUserList(
        produce(
          {
            pageSize: 50,
            userStatus: 1,
            opType: 1,
          },
          (draft: SellUserListParams) => {
            draft.userName = debouncedKeyword;
          },
        ),
      ),
    {
      select: (d) => d.data,
    },
  );

  const options = useMemo(() => {
    return data?.records.map((user) => ({
      label: user.userName,
      value: user.userNo,
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
      onSearch={setKeyword}
      onClear={() => setKeyword(undefined)}
    />
  );
};

export default React.memo(SellUserSelect);

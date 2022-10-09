import React, { useState, useMemo } from 'react';
import { produce } from 'immer';
import { useDebounce } from 'ahooks';
import { useQuery } from 'react-query';
import { Select, Spin } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { ProviderListParams } from '@/types';
import { getProviderList } from '@/services/provider';

interface CompanySelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent' | 'onClear'
  > {
  companyType: number;
  bizType?: number;
  valueType?: string;
  allState?: boolean;
}

const CompanySelect = <T extends SelectValue = SelectValue>({
  companyType,
  bizType,
  allState = true,
  valueType = 'id',
  ...otherProps
}: CompanySelectProps<T>) => {
  const [keyword, setKeyword] = useState<string>();
  const debouncedKeyword = useDebounce(keyword, { wait: 800 });

  const { data, isLoading } = useQuery(
    ['companies', { bizType, companyType, debouncedKeyword }],
    () =>
      getProviderList(
        produce(
          {
            pageSize: 50,
            tabType: companyType,
            bizType,
          },
          (draft: ProviderListParams) => {
            draft.keyword = debouncedKeyword;
          },
        ),
      ),
    {
      select: (d) => d.data,
    },
  );

  const options = useMemo(() => {
    return data?.records.map((company) => ({
      label: `${company.companyName} (${company.companyNo})`,
      value: company[valueType],
      key: company.companyNo,
      disabled: allState ? false : company.state === 0,
    }));
  }, [data, valueType, allState]);

  return (
    <Select
      showSearch
      allowClear
      placeholder="请输入或选择"
      {...otherProps}
      filterOption={false}
      notFoundContent={isLoading ? <Spin size="small" /> : undefined}
      options={options}
      loading={isLoading}
      onSearch={setKeyword}
      onClear={() => setKeyword(undefined)}
      onSelect={() => setKeyword(undefined)}
    />
  );
};

export default React.memo(CompanySelect);

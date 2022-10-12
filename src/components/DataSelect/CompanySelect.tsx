import React, { useState, useMemo } from 'react';
import { produce } from 'immer';
import { useDebounce } from 'ahooks';
import { useQuery } from 'react-query';
import { Select, Spin } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { CompanyListParams, CompanySSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import { getCompanyList } from '@/services/company';

interface CompanySelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent'
  > {
  valueType?: string;
  onDataReady?: (dt: CompanySSD[]) => void;
}

const CompanySelect = <T extends SelectValue = SelectValue>({
  valueType = 'companyNo',
  onDataReady,
  ...otherProps
}: CompanySelectProps<T>) => {
  const [keyword, setKeyword] = useState<string>();
  const debouncedKeyword = useDebounce(keyword, { wait: 800 });

  const { data, isFetching } = useQuery(
    ['companyList', { debouncedKeyword }],
    () =>
      getCompanyList(
        produce(
          {
            pageSize: 50,
          },
          (draft: CompanyListParams) => {
            draft.companyName = debouncedKeyword;
          },
        ),
      ),
    {
      select: (d: ResponseData<PaginationData<CompanySSD[]>>) => d.data,
      onSuccess: (d) => {
        onDataReady?.(d.records);
      },
    },
  );

  const options = useMemo(
    () =>
      data?.records.map((item) => ({
        label: item.companyName,
        value: item[valueType],
        key: item.id,
        extra: item,
      })) || [],
    [data, valueType],
  );

  return (
    <Select
      showSearch
      allowClear
      placeholder="请选择企业"
      {...otherProps}
      filterOption={false}
      notFoundContent={isFetching ? <Spin size="small" /> : undefined}
      options={options}
      loading={isFetching}
      onSearch={setKeyword}
    />
  );
};

export default React.memo(CompanySelect);

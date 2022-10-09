import React, { useState, useMemo } from 'react';
import { produce } from 'immer';
import { useDebounce } from 'ahooks';
import { useQuery } from 'react-query';
import { Select, Spin } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { ProviderListParams } from '@/types';
import { getComboSelectList } from '@/services/combo';

interface ProductComboSelectProps<T>
  extends Omit<
    SelectProps<T>,
    'options' | 'loading' | 'filterOption' | 'onSearch' | 'notFoundContent' | 'onClear'
  > {
  valueType?: string;
}

const ProductComboSelect = <T extends SelectValue = SelectValue>({
  valueType = 'id',
  ...otherProps
}: ProductComboSelectProps<T>) => {
  const [keyword, setKeyword] = useState<string>();
  const debouncedKeyword = useDebounce(keyword, { wait: 800 });

  const { data, isLoading } = useQuery(
    ['productComboList', { debouncedKeyword }],
    () =>
      getComboSelectList(
        produce({}, (draft: ProviderListParams) => {
          draft.keyword = debouncedKeyword;
        }),
      ),
    {
      select: (d) => d.data,
    },
  );

  const options = useMemo(() => {
    return data?.map((combo) => ({
      label: `${combo.comboName} (${combo.comboNo})`,
      value: combo[valueType],
    }));
  }, [data, valueType]);

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
    />
  );
};

export default React.memo(ProductComboSelect);

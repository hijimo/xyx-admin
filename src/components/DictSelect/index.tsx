import React, { useMemo } from 'react';
import _flatten from 'lodash/flatten';
import _values from 'lodash/values';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { getDictItemList } from '@/services/dict';

interface DictSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  enumKey: string;
  valueType?: string;
  style?: React.CSSProperties;
}

const DictSelect = <T extends SelectValue = SelectValue>({
  enumKey,
  style,
  valueType = 'dictValue',
  ...otherProps
}: DictSelectProps<T>) => {
  const { data, isFetching } = useQuery(
    ['getDictItemList', { key: enumKey }],
    () => getDictItemList(enumKey),
    { select: (d) => d.data.records },
  );

  const options = useMemo(() => {
    return data?.map((d) => ({
      label: d.dictLabel,
      value: d[valueType],
    }));
  }, [data, valueType]);

  return (
    <Select
      showSearch
      allowClear
      optionFilterProp="label"
      placeholder="请选择"
      {...otherProps}
      style={style}
      loading={isFetching}
      options={options}
    />
  );
};

export default React.memo(DictSelect);

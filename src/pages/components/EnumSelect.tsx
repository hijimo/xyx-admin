import React, { useMemo } from 'react';
import _flatten from 'lodash/flatten';
import _values from 'lodash/values';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { getDictionaryList } from '@/services/common';

interface EnumSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  enumKey: string | string[];
  style?: React.CSSProperties;
}

const EnumSelect = <T extends SelectValue = SelectValue>({
  enumKey,
  style,
  ...otherProps
}: EnumSelectProps<T>) => {
  const { data, isFetching } = useQuery(
    ['enum', { key: enumKey }],
    () => getDictionaryList({ keys: _flatten([enumKey]) }),
    { select: (d) => d.data },
  );

  const options = useMemo(() => {
    return _flatten(_values(data)).map((d) => ({
      label: d.text,
      value: d.value,
    }));
  }, [data]);

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

export default React.memo(EnumSelect);

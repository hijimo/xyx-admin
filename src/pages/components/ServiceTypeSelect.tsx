import _some from 'lodash/some';
import React, { useMemo } from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { ServiceTypeSelectList } from '@/enum';
import type { SelectItemSSD } from '@/types';

interface ServiceTypeSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  disabledSelect?: number[];
}

const ServiceTypeSelect = <T extends SelectValue = SelectValue>({
  disabledSelect = [],
  ...otherProps
}: ServiceTypeSelectProps<T>) => {
  const options = useMemo(
    () =>
      ServiceTypeSelectList.map((item: SelectItemSSD) => ({
        value: item.value,
        label: item.text,
        disabled: _some(disabledSelect, (it) => item.value === it),
      })),
    [disabledSelect],
  );

  return <Select placeholder="请选择服务商类型" allowClear {...otherProps} options={options} />;
};

export default React.memo(ServiceTypeSelect);

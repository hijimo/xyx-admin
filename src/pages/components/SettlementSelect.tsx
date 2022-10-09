import React from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { SettlementSelectList } from '@/enum';
import type { SelectItemSSD } from '@/types';

interface SettlementSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {}

const options = SettlementSelectList.map((item: SelectItemSSD) => ({
  value: item.value,
  label: item.text,
}));

const SettlementSelect = <T extends SelectValue = SelectValue>(props: SettlementSelectProps<T>) => {
  return <Select placeholder="请选择结算方式" allowClear {...props} options={options} />;
};

export default React.memo(SettlementSelect);

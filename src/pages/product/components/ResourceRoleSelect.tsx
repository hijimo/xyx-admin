import React from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import { ResourcesRoleSelectDesc } from '@/enum';
import type { IResourcesRole } from '@/types';

interface ResourceRoleSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  disabled?: boolean;
}

const ResourceRoleSelect = <T extends SelectValue = SelectValue>({
  disabled = false,
  ...otherProps
}: ResourceRoleSelectProps<T>) => {
  const options = ResourcesRoleSelectDesc.map((item: IResourcesRole) => ({
    value: item.value,
    label: item.label,
  }));

  return (
    <Select placeholder="请选择" {...otherProps} allowClear disabled={disabled} options={options} />
  );
};

export default React.memo(ResourceRoleSelect);

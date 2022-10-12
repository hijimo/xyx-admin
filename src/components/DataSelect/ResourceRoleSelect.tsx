import React from 'react';
import { useQuery } from 'react-query';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { getResourceList } from '@/services/role';

interface ResourceRoleSelectProps<T> extends Omit<TreeSelectProps<T>, 'treeData' | 'loading'> {}

const fieldNames = {
  label: 'label',
  value: 'id',
  children: 'children',
};

const ResourceRoleSelect = <T,>({ ...otherProps }: ResourceRoleSelectProps<T>) => {
  const { data, isLoading } = useQuery(['resourceRoleList'], () => getResourceList(), {
    select: (d) => d.data.records || [],
  });

  return (
    <TreeSelect
      dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
      allowClear
      multiple
      treeCheckable
      fieldNames={fieldNames}
      placeholder="请选择资源权限"
      maxTagCount="responsive"
      showCheckedStrategy="SHOW_ALL"
      {...otherProps}
      treeData={data}
      loading={isLoading}
    />
  );
};

export default React.memo(ResourceRoleSelect);

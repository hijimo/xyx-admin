import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Cascader } from 'antd';
import type { CascaderProps } from 'antd/es/cascader';
import { getDeptTree } from '@/services/dept';

export interface DeptCascaderProps<DataNodeType>
  extends Omit<CascaderProps<DataNodeType>, 'options' | 'loadData'> {
  valueType?: string;
}

const DeptCascader = <DataNodeType,>({
  valueType = 'id',
  ...props
}: DeptCascaderProps<DataNodeType>) => {
  console.log('props.value', props.value);
  const { data, isFetching } = useQuery(['deptCascader'], () => getDeptTree(), {
    select: (d) => d.data.records || [],
  });
  const fieldNames = useMemo(() => {
    return { label: 'label', value: valueType };
  }, [valueType]);

  return (
    <Cascader
      allowClear
      placeholder="请选择"
      fieldNames={fieldNames}
      options={data}
      loading={isFetching}
      {...props}
    />
  );
};

export default DeptCascader;

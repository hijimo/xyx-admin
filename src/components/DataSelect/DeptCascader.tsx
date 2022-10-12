import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Cascader } from 'antd';
import type { CascaderProps } from 'antd/es/cascader';
import { getDeptTreeByCompanyNo } from '@/services/dept';

export interface DeptCascaderProps<DataNodeType>
  extends Omit<CascaderProps<DataNodeType>, 'options' | 'loadData'> {
  companyNo?: string;
  valueType?: string;
}

const DeptCascader = <DataNodeType,>({
  companyNo,
  valueType = 'id',
  ...props
}: DeptCascaderProps<DataNodeType>) => {
  const { data, isFetching } = useQuery(
    ['deptCascader', companyNo],
    () => getDeptTreeByCompanyNo(companyNo!),
    {
      select: (d) => d.data || [],
      enabled: !!companyNo,
    },
  );
  const fieldNames = useMemo(() => {
    return { label: 'deptName', value: valueType };
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

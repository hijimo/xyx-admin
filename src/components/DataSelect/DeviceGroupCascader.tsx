import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Cascader } from 'antd';
import type { CascaderProps } from 'antd/es/cascader';
import { getDeviceGroupTree } from '@/services/deviceGroup';

export interface DeviceGroupCascaderProps<DataNodeType>
  extends Omit<CascaderProps<DataNodeType>, 'options' | 'loadData'> {
  companyNo?: string;
  valueType?: string;
}

const DeviceGroupCascader = <DataNodeType,>({
  companyNo,
  valueType = 'code',
  ...props
}: DeviceGroupCascaderProps<DataNodeType>) => {
  const { data, isFetching } = useQuery(
    ['deviceGroupCascader', companyNo],
    () => getDeviceGroupTree({ strVal: companyNo }),
    {
      select: (d) => d.data || [],
      enabled: !!companyNo,
    },
  );
  const fieldNames = useMemo(() => {
    return { label: 'name', value: valueType };
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

export default DeviceGroupCascader;

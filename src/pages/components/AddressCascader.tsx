import { useState, useCallback, useEffect } from 'react';
import _last from 'lodash/last';
import { Cascader } from 'antd';
import type { CascaderProps } from 'antd/es/cascader';
import { getGolbalAddressList } from '@/services/common';

export interface AddressCascaderProps<DataNodeType>
  extends Omit<CascaderProps<DataNodeType>, 'options' | 'loadData'> {
  valueType?: string;
}

const AddressCascader = <DataNodeType,>({
  valueType = 'id',
  ...props
}: AddressCascaderProps<DataNodeType>) => {
  const [options, setOptions] = useState<DataNodeType[]>([]);

  const fieldNames = { label: 'name', value: valueType };
  useEffect(() => {
    const getUnitByPid = async (pid: string | number) => {
      const response = await getGolbalAddressList({ pid });

      if (response.success) {
        return response.data.map((d: any) => ({ ...d, isLeaf: d.level === 4 }));
      }
      return undefined;
    };

    const getProvince = async () => {
      const pids = [1, ...(props.value || []).slice(0, -1)];
      const requests = pids.map((pid: any) => getUnitByPid(pid));
      // 可能调用失败 调用失败会中断后面的执行 是否try...catch...下，目前不catch也行
      const results = await Promise.all(requests);
      for (let i = 0; i < results.length - 1; i += 1) {
        const result = results[i]?.find((d: any) => d.id === pids[i + 1]);
        if (result != null) {
          result.children = results[i + 1];
        } else {
          break;
        }
      }
      setOptions(results[0] ?? []);
    };
    getProvince();
    return () => {};
  }, []);

  const loadData = useCallback(async (selectedOptions?: any[]) => {
    const targetOption: any = _last(selectedOptions);
    if (targetOption) {
      targetOption.loading = true;
      const response = await getGolbalAddressList({ pid: targetOption.id });
      if (response.success) {
        targetOption.loading = false;

        targetOption.children = response.data.map((d: any) => ({
          ...d,
          isLeaf: d.level === 4,
        }));
      }
    }
    setOptions((prev) => [...prev]);
  }, []);

  return (
    <Cascader
      allowClear
      placeholder="请选择"
      fieldNames={fieldNames}
      loadData={loadData}
      options={options}
      {...props}
    />
  );
};

export default AddressCascader;

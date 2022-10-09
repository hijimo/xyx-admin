import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/es/select';
import type { SettingTypeSSD } from '@/types';
import { getSettingTypeList } from '@/services/common';

interface SettingTypeSelectProps<T> extends Omit<SelectProps<T>, 'options' | 'loading'> {
  paramType: number | number[];
}

const SettingTypeSelect = <T extends SelectValue = SelectValue>({
  /**
   * 基础设置枚举：1费用项 2异常类型 3轨迹节点 5价格等级 6 杂项费用项
   */
  paramType,
  ...otherProps
}: SettingTypeSelectProps<T>) => {
  const { data, isLoading } = useQuery(
    ['settingTypeList', { paramType }],
    () => getSettingTypeList(paramType),
    { enabled: !!paramType, select: (d) => d.data },
  );

  const options = useMemo(() => {
    return (
      data?.map((item: SettingTypeSSD) => ({
        value: item.id,
        label: item.paramVal,
      })) || []
    );
  }, [data]);

  return (
    <Select
      allowClear
      showSearch
      optionFilterProp="label"
      placeholder="请选择"
      labelInValue
      {...otherProps}
      loading={isLoading}
      options={options}
    />
  );
};

export default React.memo(SettingTypeSelect);

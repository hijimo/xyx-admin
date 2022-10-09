import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Radio } from 'antd';
import type { SelectItemSSD } from '@/types';
import type { RadioProps } from 'antd/es/radio';
import { getDictionaryList } from '@/services/common';

interface EnumRadioGroupProps extends Omit<RadioProps, 'options' | 'loading'> {
  enumKey: string;
  dataTransform?: (data: SelectItemSSD[]) => SelectItemSSD[];
}

const EnumRadioGroup = ({ dataTransform, enumKey, ...otherProps }: EnumRadioGroupProps) => {
  const { data } = useQuery(
    ['enum', { key: enumKey }],
    () => getDictionaryList({ keys: [enumKey] }),
    { select: (d) => d.data },
  );

  const options = useMemo(() => {
    const datalist = dataTransform ? dataTransform(data?.[enumKey] || []) : data?.[enumKey];
    return (
      datalist?.map((item) => ({
        label: item.text,
        value: item.value,
      })) ?? []
    );
  }, [data, enumKey, dataTransform]);

  return <Radio.Group {...otherProps} options={options} />;
};

export default React.memo(EnumRadioGroup);

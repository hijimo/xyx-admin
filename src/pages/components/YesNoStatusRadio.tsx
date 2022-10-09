import React from 'react';
import { Radio } from 'antd';
import type { RadioGroupProps } from 'antd/es/radio';
import _map from 'lodash/map';
import { DefaultTypeDesc } from '@/enum';

const YesNoStatusRadio = (props: RadioGroupProps) => {
  return (
    <Radio.Group {...props}>
      {_map(DefaultTypeDesc, (value, key) => (
        <Radio value={parseInt(key, 10)} key={key}>
          {value.text}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default React.memo(YesNoStatusRadio);

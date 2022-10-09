import React from 'react';
import { Radio } from 'antd';
import type { RadioGroupProps } from 'antd/es/radio';

const DisableStatusRadio = (props: RadioGroupProps) => {
  return (
    <Radio.Group {...props}>
      <Radio value={0}>禁用</Radio>
      <Radio value={1}>启用</Radio>
    </Radio.Group>
  );
};

export default React.memo(DisableStatusRadio);

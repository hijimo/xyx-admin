import React from 'react';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _isBoolean from 'lodash/isBoolean';
import { Typography } from 'antd';
import type { BaseType } from 'antd/es/typography/Base';

const { Text } = Typography;

export interface EmptyWrapProps {
  value?: any;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  emptyContent?: React.ReactNode;
  type?: BaseType | undefined;
}

const EmptyWrap: React.FC<EmptyWrapProps> = ({
  value,
  prefix,
  suffix,
  emptyContent = '--',
  type,
}) => {
  if (
    value === undefined ||
    value === null ||
    (_isString(value) && value === '') ||
    (_isArray(value) && value.length === 0) ||
    (_isBoolean(value) && !value)
  ) {
    return <>{emptyContent}</>;
  }
  return (
    <>
      {prefix}
      <Text type={type}>{value}</Text>
      {suffix}
    </>
  );
};

export default React.memo(EmptyWrap);

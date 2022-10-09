import React from 'react';
import { Alert } from 'antd';
import type { AlertProps } from 'antd/es/alert';
interface BillNoInfoProps extends AlertProps {
  data: string[];
  isAlert?: boolean;
  suffix?: React.ReactNode;
}
const BillNoInfo = ({ data, isAlert = true, suffix, ...otherProps }: BillNoInfoProps) => {
  return isAlert ? (
    <>
      <div>已选{data.length}项</div>
      <Alert
        {...otherProps}
        type="info"
        message={data?.join('、')}
        style={{ marginTop: 8, marginBottom: 30 }}
      />
    </>
  ) : (
    <>
      {data?.join('、')}
      {suffix}
    </>
  );
};

export default React.memo(BillNoInfo);

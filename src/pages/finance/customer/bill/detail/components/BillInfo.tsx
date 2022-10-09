import React from 'react';
import { Descriptions } from 'antd';
import EmptyWrap from '@/components/EmptyWrap';
import type { CustomerBillListSSD } from '@/types';
import { UnitTypeDesc, UnitType } from '@/enum';

interface BillInfoProps {
  data?: CustomerBillListSSD;
  // 1 是修改金额， 2是修改费用项值
  type?: 1 | 2;
}
const BillInfo: React.FC<BillInfoProps> = ({ data, type = 1 }) => {
  return (
    <Descriptions column={2}>
      <Descriptions.Item label="业务号">
        <EmptyWrap value={data?.bizNo} />
      </Descriptions.Item>
      <Descriptions.Item label="客户产品">
        <EmptyWrap value={data?.cpName} />
      </Descriptions.Item>
      <Descriptions.Item label="费用项">
        <EmptyWrap value={data?.expenseItemName} />
      </Descriptions.Item>
      {type === 1 && (
        <Descriptions.Item label="金额">
          <EmptyWrap value={data?.amountText} suffix={data?.settleCurrencyText} />
        </Descriptions.Item>
      )}
      {type === 2 && (
        <Descriptions.Item label="计费值">
          <EmptyWrap
            value={data?.calVal}
            suffix={UnitTypeDesc[data?.offerType || UnitType.WEIGHT]}
          />
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default BillInfo;

import _values from 'lodash/values';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import { convertRangeToStartEnd } from '@/utils/helper';
import CommonTable from '@/components/CommonTable';
import { billingFailedListColumns } from '@/pages/configurify/columns';
import { getBillingFailedList } from '@/services/finance';

const columns = _values(billingFailedListColumns);

const BillingFailedIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const fetchData = useTableRequest(getBillingFailedList, (params) => {
    const { rangeTime } = params;
    return {
      ...convertRangeToStartEnd(rangeTime, 'rangeTime', 'gmt'),
    };
  });

  return (
    <PageContainer>
      <CommonTable actionRef={actionRef} request={fetchData} columns={columns} rowKey="id" />
    </PageContainer>
  );
};

export default BillingFailedIndex;

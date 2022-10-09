import _values from 'lodash/values';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { getOperationLogList } from '@/services/operationLog';
import { convertRangeToStartEnd } from '@/utils/helper';
import { operationLogColumns } from '@/pages/configurify/columns';

const columns = _values(operationLogColumns);

const OperationLogIndexIndex: React.FC = () => {
  const fetchData = useTableRequest(getOperationLogList, (params) => {
    const { rangeTime } = params;
    return {
      ...convertRangeToStartEnd(rangeTime, 'rangeTime', 'gmtCreate'),
    };
  });

  return (
    <PageContainer>
      <CommonTable request={fetchData} columns={columns} rowKey="id" />
    </PageContainer>
  );
};

export default OperationLogIndexIndex;

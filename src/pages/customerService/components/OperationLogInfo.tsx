import _values from 'lodash/values';
import CommonTable from '@/components/CommonTable';
import type { OperatorLogSSD } from '@/types';
import { operationLogInfoColumns } from '@/pages/configurify/columns';

interface OperationLogInfoProps {
  data?: OperatorLogSSD[];
  loading?: boolean;
}

const columns = _values(operationLogInfoColumns);

const OperationLogInfo = ({ data, loading }: OperationLogInfoProps) => {
  return (
    <CommonTable
      dataSource={data}
      columns={columns}
      rowKey="id"
      search={false}
      pagination={{ defaultPageSize: 10 }}
      toolBarRender={false}
      loading={loading}
    />
  );
};

export default OperationLogInfo;

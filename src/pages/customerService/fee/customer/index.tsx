import _values from 'lodash/values';
import React, { useRef, useCallback } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { getCustomerFeeList } from '@/services/fee';
import { convertRangeToStartEnd } from '@/utils/helper';
import { customerFeeColumns } from '@/pages/configurify/columns';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const columns = _values(customerFeeColumns);

const CustomerFeeIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefAddModalProps>(null);

  const handleAdd = useCallback(() => {
    addModalRef.current?.show();
  }, [addModalRef]);

  const toolBarRender = useCallback(
    () => [
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} key="add">
        新增
      </Button>,
    ],
    [handleAdd],
  );

  const fetchData = useTableRequest(getCustomerFeeList, (params) => {
    const { rangeTime } = params;
    return {
      ...convertRangeToStartEnd(rangeTime, 'rangeTime', 'gmtCreate'),
    };
  });

  return (
    <>
      <PageContainer>
        <CommonTable
          toolBarRender={toolBarRender}
          actionRef={actionRef}
          request={fetchData}
          columns={columns}
          rowKey="id"
        />
      </PageContainer>
      <AddModal
        ref={addModalRef}
        onSuccess={() => {
          actionRef?.current?.reload();
        }}
      />
    </>
  );
};

export default CustomerFeeIndex;

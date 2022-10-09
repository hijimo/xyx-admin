import _values from 'lodash/values';
import React, { useRef, useCallback } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { ExpressTraceType } from '@/enum';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { getExpressTraceList } from '@/services/expressTrace';
import { convertRangeToStartEnd } from '@/utils/helper';
import { expressTraceColumns } from '@/pages/configurify/columns';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const columns = _values(expressTraceColumns);

const ExpressTraceAddIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefAddModalProps>(null);

  const handleAdd = useCallback(
    (trackType: number) => {
      addModalRef.current?.show(trackType);
    },
    [addModalRef],
  );

  const toolBarRender = useCallback(
    () => [
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleAdd(ExpressTraceType.AIRLIFT)}
        key="add"
      >
        添加
      </Button>,
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleAdd(ExpressTraceType.CAINIAO)}
        key="addCainiao"
      >
        菜鸟干线轨迹
      </Button>,
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleAdd(ExpressTraceType.SHIPPING)}
        key="addShipping"
      >
        海运轨迹
      </Button>,
    ],
    [handleAdd],
  );

  const fetchData = useTableRequest(getExpressTraceList, (params) => {
    const { happenTime } = params;
    return {
      ...convertRangeToStartEnd(happenTime, 'happenTime'),
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

export default ExpressTraceAddIndex;

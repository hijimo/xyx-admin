import produce from 'immer';
import _values from 'lodash/values';
import React, { useRef, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import useTableRequest from '@/hooks/useTableRequest';
import type { ComboCommissionListItemSSD } from '@/types';
import CommonTable from '@/components/CommonTable';
import { comboCommissionColumns } from '@/pages/configurify/columns';
import { getComboCommissionList } from '@/services/seller';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const ComboCommissionsIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefAddModalProps>(null);

  const handleAdd = useCallback(
    (item?: ComboCommissionListItemSSD) => {
      addModalRef.current?.show(item);
    },
    [addModalRef],
  );

  const toolBarRender = useCallback(
    () => [
      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()} key="add">
        添加佣金设置
      </Button>,
    ],
    [handleAdd],
  );

  const fetchData = useTableRequest(getComboCommissionList, (params) => params);

  const columns = useMemo(() => {
    return _values(
      produce(comboCommissionColumns, (draft) => {
        draft.option!.render = (_, item) => <a onClick={() => handleAdd(item)}>编辑</a>;
      }),
    );
  }, [handleAdd]);

  const handleSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

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
      <AddModal ref={addModalRef} onSuccess={handleSuccess} />
    </>
  );
};

export default ComboCommissionsIndex;

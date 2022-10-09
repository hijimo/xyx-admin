import _values from 'lodash/values';
import { produce } from 'immer';
import React, { useMemo, useCallback, useRef } from 'react';
import { Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { getComboList } from '@/services/combo';
import { productComboColumns } from '@/pages/configurify/columns/routeProductColumns';
import InfoModal from './components/InfoModal';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';
import type { RefInfoModalProps } from './components/InfoModal';

const tableColumns = productComboColumns;
const ProductComboIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const infoModalRef = useRef<RefInfoModalProps>(null);
  const addModalRef = useRef<RefAddModalProps>(null);

  const fetchData = useTableRequest(getComboList);

  const handleAddOrEdit = useCallback((id?: number) => {
    addModalRef.current?.show(id);
  }, []);

  const handleShowInfo = useCallback(
    (id: number) => {
      infoModalRef.current?.show(id);
    },
    [infoModalRef],
  );

  const handleAddSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, []);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, item) => {
          return (
            <>
              <a onClick={() => handleShowInfo(item.id)}>查看</a>
              <Divider type="vertical" />
              <a onClick={() => handleAddOrEdit(item.id)}>编辑</a>
            </>
          );
        };
      }),
    );
  }, [handleAddOrEdit, handleShowInfo]);

  const toolBarRender = useCallback(
    () => [
      <Button
        type="primary"
        onClick={() => {
          handleAddOrEdit();
        }}
        key="add"
      >
        <PlusOutlined /> 新增
      </Button>,
    ],
    [handleAddOrEdit],
  );

  return (
    <PageContainer>
      <CommonTable
        actionRef={actionRef}
        request={fetchData}
        columns={columns}
        rowKey="id"
        toolBarRender={toolBarRender}
      />
      <InfoModal ref={infoModalRef} />
      <AddModal ref={addModalRef} onSuccess={handleAddSuccess} />
    </PageContainer>
  );
};

export default ProductComboIndex;

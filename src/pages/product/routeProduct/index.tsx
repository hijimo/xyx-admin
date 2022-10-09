import _values from 'lodash/values';
import { produce } from 'immer';
import { Link } from 'umi';
import React, { useRef, useMemo, useCallback } from 'react';
import { useMutation } from 'react-query';
import { Button, Divider, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import EnumSelect from '@/pages/components/EnumSelect';
import { getRouteProductList, updateRouteProductState } from '@/services/routeProduct';
import { routeProductColumns } from '@/pages/configurify/columns';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const RouteProductIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefAddModalProps>(null);

  const handleAddOrEdit = useCallback(() => {
    addModalRef.current?.show();
  }, [addModalRef]);

  const { mutate } = useMutation((params: { id: number }) => updateRouteProductState(params), {
    onSuccess: () => {
      message.success('修改成功');
      actionRef?.current?.reload();
    },
  });

  const handleConfirm = useCallback(
    (id: number) => {
      mutate({ id });
    },
    [mutate],
  );

  const fetchData = useTableRequest(getRouteProductList, (params) => params);

  const columns = useMemo(() => {
    return _values(
      produce(routeProductColumns, (draft) => {
        draft.logisticsMode!.renderFormItem = () => (
          <EnumSelect enumKey="logisticsModeEnum" placeholder="请选择" />
        );
        draft.option!.render = (_, item) => (
          <>
            <Popconfirm
              title={`确定${item.state === 1 ? '禁用' : '启用'}${item.cpName}？`}
              onConfirm={() => handleConfirm(item.id)}
            >
              <a>{item.state === 1 ? '禁用' : '启用'}</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Link to={`/product/routeProduct/${item.id}`} target="_blank">
              详情
            </Link>
          </>
        );
      }),
    );
  }, [handleConfirm]);

  const toolBarRender = useCallback(
    () => [
      <Button type="primary" onClick={() => handleAddOrEdit()} key="add">
        <PlusOutlined /> 新增
      </Button>,
    ],
    [handleAddOrEdit],
  );

  return (
    <>
      <PageContainer>
        <CommonTable
          actionRef={actionRef}
          toolBarRender={toolBarRender}
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

export default RouteProductIndex;

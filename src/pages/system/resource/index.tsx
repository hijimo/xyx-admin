import _values from 'lodash/values';
import { produce } from 'immer';
import React, { useRef, useMemo, useCallback } from 'react';
import { useMutation } from 'react-query';
import { Button, Divider, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { ResourceListItemSSD } from '@/types';
import { getResourceList, deleteResource, updateResourceStatus } from '@/services/resource';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { resourceColumns } from '@/pages/configurify/columns';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const tableColumns: Record<string, ProColumns<any>> = resourceColumns;

const ResourceManageIndex: React.FC = () => {
  const AddModalRef = useRef<RefAddModalProps>(null);
  const actionRef = useRef<ActionType>();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const addOrEditItem = useCallback(
    (parentId?: number, resourceId?: number) => {
      AddModalRef.current?.show(parentId, resourceId);
    },
    [AddModalRef],
  );

  const { mutate: deletetListItem } = useMutation(
    (record: ResourceListItemSSD) => deleteResource({ resourceId: record.resourceId! }),
    {
      onSuccess: () => {
        message.success('操作成功');
        submitSuccess?.();
      },
    },
  );

  const deleteItem = useCallback(
    (record: ResourceListItemSSD) => {
      Modal.confirm({
        title: '删除应用确认',
        content: '确认删除该应用？',
        okText: '确认',
        cancelText: '取消',
        okType: 'danger',
        onOk: () => {
          deletetListItem(record);
        },
      });
    },
    [deletetListItem],
  );

  const { mutate: updateStatus } = useMutation(
    (resourceId: number) => updateResourceStatus({ resourceId }),
    {
      onSuccess: () => {
        message.success('操作成功');
        submitSuccess?.();
      },
    },
  );

  const handleUpdateStatus = useCallback(
    (record: ResourceListItemSSD) => {
      Modal.confirm({
        title: record.resourceStatus ? '启用确认' : '禁用确认',
        content: record.resourceStatus ? '确认启用？' : '确认禁用？',
        okText: '确认',
        cancelText: '取消',
        okType: 'danger',
        onOk: () => {
          updateStatus(record.resourceId!);
        },
      });
    },
    [updateStatus],
  );

  const fetchDate = useTableRequest(getResourceList, undefined, false);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, record: ResourceListItemSSD) => {
          return (
            <>
              <a onClick={() => addOrEditItem(record?.parentId, record?.resourceId)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={() => handleUpdateStatus(record)}>
                {record.resourceStatus ? '启用' : '禁用'}
              </a>
              <Divider type="vertical" />
              <a onClick={() => deleteItem(record)}>删除</a>
              <Divider type="vertical" />
              <a onClick={() => addOrEditItem(record?.resourceId)}>添加</a>
            </>
          );
        };
      }),
    );
  }, [addOrEditItem, deleteItem, handleUpdateStatus]);

  return (
    <PageContainer>
      <CommonTable
        rowKey="id"
        actionRef={actionRef}
        request={fetchDate}
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" onClick={() => addOrEditItem(0)} key="add">
            <PlusOutlined /> 新增
          </Button>,
        ]}
      />
      <AddModal ref={AddModalRef} onSuccess={submitSuccess} />
    </PageContainer>
  );
};

export default ResourceManageIndex;

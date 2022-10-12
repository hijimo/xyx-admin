import React, { useRef, useMemo, useCallback } from 'react';
import _values from 'lodash/values';
import { produce } from 'immer';
import { useMutation } from 'react-query';
import { useParams } from 'umi';
import { Button, Divider, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { DictItemSSD } from '@/types';
import { getDictItemList, deleteDict } from '@/services/dict';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { dictItemColumns } from '@/pages/configurify/columns';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const tableColumns = dictItemColumns;

const UserManageIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const AddModalRef = useRef<RefAddModalProps>(null);

  const { type } = useParams() || {};

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleRouteAdd = useCallback(() => {
    AddModalRef.current?.show(undefined, type);
  }, [type]);

  const { mutate: deletetListItem } = useMutation((id: number) => deleteDict(id), {
    onSuccess: () => {
      message.success('操作成功');
      submitSuccess?.();
    },
  });

  const deleteItem = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '删除确认',
        content: '确认删除该字典项？',
        okText: '确认',
        cancelText: '取消',
        okType: 'danger',
        onOk: () => {
          deletetListItem(id);
        },
      });
    },
    [deletetListItem],
  );

  const fetchDate = useTableRequest(() => getDictItemList(type));

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, record: DictItemSSD) => {
          return (
            <>
              <a
                onClick={() => {
                  AddModalRef.current?.show(record.dictCode);
                }}
              >
                编辑
              </a>
              <Divider type="vertical" />
              <a onClick={() => deleteItem(record.dictCode)}>删除</a>
            </>
          );
        };
      }),
    );
  }, [deleteItem]);

  const toolBarRender = useCallback(() => {
    return [
      <Button type="primary" onClick={handleRouteAdd} key="add">
        <PlusOutlined /> 新增
      </Button>,
    ];
  }, [handleRouteAdd]);

  return (
    <PageContainer>
      <CommonTable
        rowKey="id"
        actionRef={actionRef}
        search={false}
        request={fetchDate}
        columns={columns}
        toolBarRender={toolBarRender}
      />
      <AddModal ref={AddModalRef} onSuccess={submitSuccess} />
    </PageContainer>
  );
};

export default UserManageIndex;

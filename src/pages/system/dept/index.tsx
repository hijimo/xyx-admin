import React, { useRef, useMemo, useCallback } from 'react';
import _values from 'lodash/values';
import { produce } from 'immer';
import { useMutation } from 'react-query';
import { Link } from 'umi';
import { useHistory } from 'umi';
import { Button, Divider, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { DeptSSD } from '@/types';
import { getDeptList, deleteDept } from '@/services/dept';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { deptColumns } from '@/pages/configurify/columns';

const tableColumns = deptColumns;

const DeptIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const history = useHistory();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleRouteAdd = useCallback(() => {
    history.push('/system/dept/add');
  }, []);

  const { mutate: deletetListItem } = useMutation((id: number) => deleteDept(id), {
    onSuccess: () => {
      message.success('操作成功');
      submitSuccess?.();
    },
  });

  const deleteItem = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '删除组织确认',
        content: '确认删除该组织？',
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

  const fetchDate = useTableRequest(getDeptList, undefined, (r) => r);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, record: DeptSSD) => {
          return (
            <>
              <Link to={`/system/dept/${record.id}/edit?isAddChild=1`}>下级</Link>
              <Divider type="vertical" />
              <Link to={`/system/dept/${record.id}/edit`}>编辑</Link>
              <Divider type="vertical" />
              <a onClick={() => deleteItem(record.id)}>删除</a>
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
        request={fetchDate}
        columns={columns}
        toolBarRender={toolBarRender}
      />
    </PageContainer>
  );
};

export default DeptIndex;

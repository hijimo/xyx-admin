import _values from 'lodash/values';
import { produce } from 'immer';
import React, { useRef, useMemo, useCallback } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'umi';
import { useHistory } from 'umi';
import { Button, Divider, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { RoleListItemSSD } from '@/types';
import { getRoleList, deleteRole, updateRoleStatus } from '@/services/role';
import { SwitchEnum } from '@/enum';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { roleColumns } from '@/pages/configurify/columns';

const tableColumns = roleColumns;

const RoleManageIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const history = useHistory();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleRouteAdd = useCallback(() => {
    history.push('/system/role/add');
  }, []);

  const { mutate: deletetListItem } = useMutation((id: number) => deleteRole(id), {
    onSuccess: () => {
      message.success('操作成功');
      submitSuccess?.();
    },
  });

  const deleteItem = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '删除角色确认',
        content: '确认删除该角色？',
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

  const { mutate: updateStatus } = useMutation((id: number) => updateRoleStatus(id), {
    onSuccess: () => {
      message.success('操作成功');
      submitSuccess?.();
    },
  });

  const handleUpdateStatus = useCallback(
    (id: number) => {
      updateStatus(id);
    },
    [updateStatus],
  );

  const fetchDate = useTableRequest(getRoleList);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, record: RoleListItemSSD) => {
          return (
            <>
              <Link to={`/system/role/${record.roleId}/edit`}>编辑</Link>
              <Divider type="vertical" />

              <Divider type="vertical" />
              <a onClick={() => deleteItem(record.roleId)}>删除</a>
            </>
          );
        };
      }),
    );
  }, [deleteItem, handleUpdateStatus]);

  return (
    <PageContainer>
      <CommonTable
        rowKey="roleId"
        actionRef={actionRef}
        request={fetchDate}
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" onClick={handleRouteAdd} key="add">
            <PlusOutlined /> 新增
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default RoleManageIndex;

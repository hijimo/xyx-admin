import React, { useRef, useMemo, useCallback } from 'react';
import _values from 'lodash/values';
import { produce } from 'immer';
import { useMutation } from 'react-query';
import { useModel } from 'umi';

import { Link } from 'umi';
import { useHistory } from 'umi';
import { Button, Divider, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { UserSSD } from '@/types';
import {
  getUserList,
  deleteUser,
  updateUserStatus,
  resetUserPassword,
} from '@/services/userManager';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { userColumns } from '@/pages/configurify/columns';
import { isAdmin } from '@/utils/user';

const tableColumns = userColumns;

const UserManageIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const history = useHistory();

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleRouteAdd = useCallback(() => {
    history.push('/system/user/add');
  }, []);

  const { mutate: deletetListItem } = useMutation((id: number) => deleteUser(id), {
    onSuccess: () => {
      message.success('操作成功');
      submitSuccess?.();
    },
  });
  const { mutate: resetPassword } = useMutation((id: number) => resetUserPassword(id), {
    onSuccess: () => {
      // message.success('重置密码成功');
      Modal.info({
        content:
          '重置密码成功，新密码为：123456，请提醒用户及时修改。修改方法：点击右上角用户昵称->修改密码',
      });
      submitSuccess?.();
    },
  });

  const deleteItem = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '删除用户确认',
        content: '确认删除该用户？',
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

  const { mutate: updateStatus } = useMutation((id: number) => updateUserStatus(id), {
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
  const handleResetPwd = useCallback(
    (id: number) => {
      resetPassword(id);
    },
    [resetPassword],
  );

  const fetchDate = useTableRequest(getUserList);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.companyNo!.hideInTable = true;
        draft.option!.render = (_, record: UserSSD) => {
          return (
            <>
              {isAdmin(currentUser) && (
                <>
                  <a onClick={() => handleResetPwd(record.id)}>重置密码</a>
                  <Divider type="vertical" />
                </>
              )}

              <Link to={`/system/user/${record.id}/edit`}>编辑</Link>
              <Divider type="vertical" />
              <a onClick={() => handleUpdateStatus(record.id)}>
                {record.userStatus === 0 ? '启用' : '禁用'}
              </a>
              <Divider type="vertical" />
              <a onClick={() => deleteItem(record.id)}>删除</a>
            </>
          );
        };
      }),
    );
  }, [deleteItem, handleUpdateStatus]);

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

export default UserManageIndex;

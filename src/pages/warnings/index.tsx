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
import type { WarningsSSD } from '@/types';
import { getDeviceWarnList, deleteDeviceWarn } from '@/services/warnings';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { warningsRuleColumns } from '@/pages/configurify/columns';

const tableColumns = warningsRuleColumns;

const WarningsIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const history = useHistory();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleRouteAdd = useCallback(() => {
    history.push('/system/user/add');
  }, []);

  const { mutate: deletetListItem } = useMutation((id: number) => deleteDeviceWarn(id), {
    onSuccess: () => {
      message.success('操作成功');
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

  const fetchDate = useTableRequest(getDeviceWarnList);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, record: WarningsSSD) => {
          return (
            <>
              <Link to={`/warnings/${record.id}/edit`}>编辑</Link>
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

export default WarningsIndex;

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
import { getFigureList, deleteFigure } from '@/services/figure';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { figureColumns } from '@/pages/configurify/columns';

const tableColumns = figureColumns;

const FigureIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const history = useHistory();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleRouteAdd = useCallback(() => {
    history.push('/figure/add');
  }, []);

  const { mutate: deletetListItem } = useMutation((id: number) => deleteFigure(id), {
    onSuccess: () => {
      message.success('操作成功');
      submitSuccess?.();
    },
  });

  const deleteItem = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '删除确认',
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

  const fetchDate = useTableRequest(getFigureList);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, record) => {
          return (
            <>
              <Link to={`/figure/${record.gameRoleId}/edit`}>编辑</Link>
              <Divider type="vertical" />
              <a onClick={() => deleteItem(record.gameRoleId)}>删除</a>
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
        rowKey="gameRoleId"
        search={false}
        actionRef={actionRef}
        request={fetchDate}
        columns={columns}
        toolBarRender={toolBarRender}
      />
    </PageContainer>
  );
};

export default FigureIndex;

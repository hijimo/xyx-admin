import React, { useRef, useMemo, useCallback } from 'react';
import _values from 'lodash/values';
import { produce } from 'immer';
import { useMutation } from 'react-query';
import { Link, useParams, useHistory } from 'umi';
import { Button, Divider, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { DictItemSSD } from '@/types';
import { getDictItemList, deleteDict } from '@/services/dict';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { configImageColumns } from '@/pages/configurify/columns';
import { ConfigTypeEnum } from '@/enum';

const tableColumns = configImageColumns;

const type = ConfigTypeEnum.IMAGE;

const UserManageIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const history = useHistory();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleRouteAdd = useCallback(() => {
    //
    history.push(`/config/image/${type}/add`);
  }, []);

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
        content: '确认删除该配置项？',
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
              <Link to={`/config/image/${type}/${record.dictCode}/edit`}>编辑</Link>
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
        rowKey="dictCode"
        actionRef={actionRef}
        search={false}
        request={fetchDate}
        columns={columns}
        toolBarRender={toolBarRender}
      />
    </PageContainer>
  );
};

export default UserManageIndex;

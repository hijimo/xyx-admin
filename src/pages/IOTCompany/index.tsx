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
import type { IOTCompanySSD } from '@/types';
import { getIOTCompanyList, deleteIOTCompany } from '@/services/iotc';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { iotcColumns } from '@/pages/configurify/columns';

const tableColumns = iotcColumns;

const IOTCompanyIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const history = useHistory();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleRouteAdd = useCallback(() => {
    history.push('/iotc/add');
  }, []);

  const { mutate: deletetListItem } = useMutation((id: number) => deleteIOTCompany(id), {
    onSuccess: () => {
      message.success('操作成功');
      submitSuccess?.();
    },
  });

  const deleteItem = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '删除实例确认',
        content: '确认删除该实例',
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

  const fetchDate = useTableRequest(getIOTCompanyList);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.companyNo!.hideInTable = true;
        draft.option!.render = (_, record: IOTCompanySSD) => {
          return (
            <>
              <Link to={`/iotc/config/${record.id}`}>配置文件</Link>
              <Divider type="vertical" />
              <Link to={`/iotc/detail/${record.id}`}>查看</Link>
              <Divider type="vertical" />
              <Link to={`/iotc/${record.id}/edit`}>编辑</Link>
              <Divider type="vertical" />
              <a onClick={() => deleteItem(record.id as number)}>删除</a>
            </>
          );
        };
      }),
    );
  }, [deleteItem]);

  return (
    <PageContainer>
      <CommonTable
        rowKey="id"
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

export default IOTCompanyIndex;

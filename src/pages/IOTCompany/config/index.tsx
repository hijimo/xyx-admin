import _values from 'lodash/values';
import { produce } from 'immer';
import React, { useRef, useMemo, useCallback } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'umi';
import { useHistory, useParams } from 'umi';
import { Button, Divider, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { IOTCompanyConfigSSD } from '@/types';
import { getIOTCompanyConfigList, deleteIOTCompanyConfig } from '@/services/iotc';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { iotcConfigColumns } from '@/pages/configurify/columns';

const tableColumns = iotcConfigColumns;

const IOTCompanyConfigIndex: React.FC = () => {
  const { instanceId }: { instanceId: string } = useParams();

  const actionRef = useRef<ActionType>();
  const history = useHistory();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleRouteAdd = useCallback(() => {
    history.push(`/iotc/config/${instanceId}/add`);
  }, [instanceId]);

  const { mutate: deletetListItem } = useMutation((id: number) => deleteIOTCompanyConfig(id), {
    onSuccess: () => {
      message.success('操作成功');
      submitSuccess?.();
    },
  });

  const deleteItem = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '删除实例确认',
        content: '确认删除该配置',
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

  const fetchDate = useTableRequest(getIOTCompanyConfigList, () => {
    return { instanceId };
  });

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.companyNo!.hideInTable = true;
        draft.option!.render = (_, record: IOTCompanyConfigSSD) => {
          return (
            <>
              <Link to={`/iotc/config/${record.instanceId}/edit/${record.id}`}>编辑</Link>
              <Divider type="vertical" />
              <a onClick={() => deleteItem(record.id)}>删除</a>
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

export default IOTCompanyConfigIndex;

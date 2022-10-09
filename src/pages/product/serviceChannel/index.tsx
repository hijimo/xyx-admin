import _values from 'lodash/values';
import { produce } from 'immer';
import { Link } from 'umi';
import React, { useRef, useMemo, useCallback } from 'react';
import { useMutation } from 'react-query';
import { Button, Divider, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import { CompanyType } from '@/enum';
import type { ServiceChannelListItemSSD } from '@/types';
import CommonTable from '@/components/CommonTable';
import CompanySelect from '@/pages/components/CompanySelect';
import { getServiceChannelList, updateServiceChannelState } from '@/services/serviceChannel';
import { serviceChannelColumns } from '@/pages/configurify/columns';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const ServiceChannelIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefAddModalProps>(null);

  const handleAddOrEdit = useCallback(() => {
    addModalRef.current?.show();
  }, [addModalRef]);

  const { mutate } = useMutation(
    (params: { id: number; state: number }) =>
      updateServiceChannelState({ ...params, state: params.state === 1 ? 0 : 1 }),
    {
      onSuccess: () => {
        message.success('修改成功');
        actionRef?.current?.reload();
      },
    },
  );

  const handleConfirm = useCallback(
    (id: number, state: number) => {
      mutate({ id, state });
    },
    [mutate],
  );

  const fetchData = useTableRequest(getServiceChannelList, (params) => params);

  const columns = useMemo(() => {
    return _values(
      produce(serviceChannelColumns, (draft) => {
        draft.companyId!.renderFormItem = () => (
          <CompanySelect companyType={CompanyType.COMPANY} placeholder="请输入或选择" />
        );
        draft.option!.render = (_, item: ServiceChannelListItemSSD) => (
          <>
            <Popconfirm
              title={`确定${item.state === 1 ? '禁用' : '启用'}${item.channelName}？`}
              onConfirm={() => handleConfirm(item.id, item.state)}
            >
              <a>{item.state === 1 ? '禁用' : '启用'}</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Link to={`/product/serviceChannel/${item.id}`} target="_blank">
              详情
            </Link>
          </>
        );
      }),
    );
  }, [handleConfirm]);

  const toolBarRender = useCallback(
    () => [
      <Button type="primary" onClick={() => handleAddOrEdit()} key="add">
        <PlusOutlined /> 新增
      </Button>,
    ],
    [handleAddOrEdit],
  );

  return (
    <>
      <PageContainer>
        <CommonTable
          actionRef={actionRef}
          toolBarRender={toolBarRender}
          request={fetchData}
          columns={columns}
          rowKey="id"
        />
      </PageContainer>
      <AddModal
        ref={addModalRef}
        onSuccess={() => {
          actionRef?.current?.reload();
        }}
      />
    </>
  );
};

export default ServiceChannelIndex;

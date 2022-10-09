import _values from 'lodash/values';
import React, { useMemo, useCallback, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { Button, Space, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import ExportButton from '@/components/ExportButton';
import { exportHelper, convertRangeToStartEnd } from '@/utils/helper';
import type { ShipmentManifestListItemSSD } from '@/types';
import { shipmentManifestColumns } from '@/pages/configurify/columns';
import {
  getShipmentManifestList,
  exportShipmentManifest,
  deleteShipmentManifest,
} from '@/services/manifest';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const columns = _values(shipmentManifestColumns);

const formatParams = (params: any) => {
  const { rangeTime } = params;
  return {
    ...convertRangeToStartEnd(rangeTime, 'rangeTime', 'gmt'),
  };
};

const ShipmentManifestIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefAddModalProps>(null);
  const formRef = useRef<FormInstance>();
  const [selectedRowList, setSelectedRowList] = useState<ShipmentManifestListItemSSD[]>([]);

  const clearSelected = useCallback(() => {
    actionRef?.current?.clearSelected?.();
  }, [actionRef]);

  const reloadList = useCallback(() => {
    clearSelected();
    actionRef?.current?.reload();
  }, [actionRef, clearSelected]);

  const onChange = useCallback((_, selectedList: any) => {
    setSelectedRowList(selectedList);
  }, []);

  const rowSelection = useMemo(() => {
    return { selectedRowList, preserveSelectedRowKeys: true, onChange };
  }, [selectedRowList, onChange]);

  const { mutate, isLoading: deleteLoading } = useMutation(
    (ids: number[]) => deleteShipmentManifest({ ids }),
    {
      onSuccess: () => {
        message.success('删除成功');
        reloadList();
      },
    },
  );

  const handleDelete = useCallback(
    (ids: number[]) => {
      Modal.confirm({
        title: '确定删除选中数据吗？',
        onOk: () => {
          mutate(ids);
        },
      });
    },
    [mutate],
  );

  const handleExport = useCallback(
    (ids: number[]) => {
      const params = { ...formRef.current?.getFieldsValue() };
      exportHelper(exportShipmentManifest, { ...params, ids, ...formatParams(params) });
    },
    [formRef],
  );

  const fetchData = useTableRequest(getShipmentManifestList, (params) => {
    return formatParams(params);
  });

  const handleAddOrEdit = useCallback(() => {
    addModalRef.current?.show();
  }, [addModalRef]);

  const toolBarRender = useCallback(
    () => [
      <Button type="primary" onClick={() => handleAddOrEdit()} key="add">
        <PlusOutlined /> 新增
      </Button>,
      <Button
        type="primary"
        onClick={() => handleDelete(selectedRowList?.map((item) => item.id) || [])}
        key="delete"
        disabled={selectedRowList?.length === 0}
        loading={deleteLoading}
      >
        批量删除
      </Button>,
      <ExportButton
        type="primary"
        onClick={() => handleExport(selectedRowList?.map((item) => item.id) || [])}
        icon={<ExportOutlined />}
        key="export"
        disabled={selectedRowList?.length === 0}
      >
        导出总单明细
      </ExportButton>,
    ],
    [handleAddOrEdit, handleExport, selectedRowList, handleDelete, deleteLoading],
  );

  const tableAlertRender = useCallback(({ selectedRows, onCleanSelected }) => {
    return (
      <Space size="large">
        <span>已选 {selectedRows?.length} 项</span>
        <a onClick={onCleanSelected}>取消选择</a>
      </Space>
    );
  }, []);

  return (
    <PageContainer>
      <CommonTable
        formRef={formRef}
        actionRef={actionRef}
        request={fetchData}
        columns={columns}
        toolBarRender={toolBarRender}
        rowSelection={rowSelection}
        tableAlertRender={tableAlertRender}
        tableAlertOptionRender={false}
        onReset={clearSelected}
        onSubmit={clearSelected}
      />
      <AddModal ref={addModalRef} onSuccess={reloadList} />
    </PageContainer>
  );
};

export default ShipmentManifestIndex;

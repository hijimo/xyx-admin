import _values from 'lodash/values';
import { produce } from 'immer';
import React, { useMemo, useRef, useCallback, useState } from 'react';
import { Button, Space } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { AuditType } from '@/enum';
import type { ProviderFeeListItemSSD } from '@/types';
import { getCustomerAuditList } from '@/services/finance';
import { convertRangeToStartEnd } from '@/utils/helper';
import { customerAuditColumns } from '@/pages/configurify/columns';
import AuditModal from '@/pages/finance/components/AuditModal';
import type { RefAuditModalProps } from '@/pages/finance/components/AuditModal';

export interface CustomerAuditTableProps {
  tabKey: string;
  refreshTabList: () => any;
}

const CustomerAuditTable: React.FC<CustomerAuditTableProps> = ({ tabKey, refreshTabList }) => {
  const modalRef = useRef<RefAuditModalProps>(null);
  const actionRef = useRef<ActionType>();
  const [selectedRowList, setSelectedRowList] = useState<ProviderFeeListItemSSD[]>([]);

  const onChange = useCallback((_, selectedList: any) => {
    setSelectedRowList(selectedList);
  }, []);

  const rowSelection = useMemo(() => {
    return {
      selectedRowList,
      preserveSelectedRowKeys: true,
      onChange,
      getCheckboxProps: (record: ProviderFeeListItemSSD) => {
        return { disabled: record?.auditState !== AuditType.TOAUDIT };
      },
    };
  }, [selectedRowList, onChange]);

  const handleAudit = useCallback(
    (ids: number[]) => {
      modalRef.current?.show(ids);
    },
    [modalRef],
  );

  const fetchData = useTableRequest(getCustomerAuditList, (params) => {
    const { rangeTime } = params;
    return {
      ...convertRangeToStartEnd(rangeTime, 'rangeTime', 'gmtCreate'),
    };
  });

  const columns = useMemo(() => {
    return _values(
      produce(customerAuditColumns, (draft) => {
        draft.auditState!.fieldProps = {
          disabled: tabKey === '0',
          value: tabKey !== '0' ? undefined : tabKey,
        };
        if (tabKey === '0') {
          delete draft.auditName;
          delete draft.gmtAudit;
          delete draft.failReason;
        }
        draft.option!.render = (_, item) =>
          item?.auditState === 0 && (
            <a
              onClick={() => {
                handleAudit([item.id]);
              }}
            >
              审核
            </a>
          );
      }),
    );
  }, [handleAudit, tabKey]);

  const clearSelected = useCallback(() => {
    actionRef?.current?.clearSelected?.();
    refreshTabList();
  }, [actionRef, refreshTabList]);

  const handleSuccess = useCallback(() => {
    clearSelected();
    actionRef?.current?.reload();
  }, [actionRef, clearSelected]);

  const toolBarRender: any = useCallback(() => {
    return (
      <>
        <Button
          type="primary"
          disabled={selectedRowList?.length === 0}
          onClick={() => handleAudit(selectedRowList.map((item) => item.id))}
          key="audit"
        >
          批量审核
        </Button>
      </>
    );
  }, [selectedRowList, handleAudit]);

  const tableAlertRender = useCallback(({ selectedRows, onCleanSelected }) => {
    return (
      <Space size="large">
        <span>已选 {selectedRows?.length} 项</span>
        <a onClick={onCleanSelected}>取消选择</a>
      </Space>
    );
  }, []);

  return (
    <>
      <CommonTable
        actionRef={actionRef}
        request={fetchData}
        columns={columns}
        params={{ tabKey: tabKey }}
        rowSelection={rowSelection}
        toolBarRender={toolBarRender}
        tableAlertRender={tableAlertRender}
        tableAlertOptionRender={false}
        onReset={clearSelected}
        onSubmit={clearSelected}
      />
      <AuditModal ref={modalRef} onSuccess={handleSuccess} />
    </>
  );
};

export default CustomerAuditTable;

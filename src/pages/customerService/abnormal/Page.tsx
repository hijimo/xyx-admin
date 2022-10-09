import _values from 'lodash/values';
import { produce } from 'immer';
import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { Button, Space, message, Divider } from 'antd';
import type { FormInstance } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { ExportOutlined } from '@ant-design/icons';
import type { PackageAbnormalListItemSSD, TabStatisticsItemSSD } from '@/types';
import { exportHelper } from '@/utils/helper';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import ExportButton from '@/components/ExportButton';
import { transportPackageAbnormalColumns } from '@/pages/configurify/columns';
import { getPackageAbnormalList, exportPackageAbnormal } from '@/services/package';
import { convertRangeToStartEnd } from '@/utils/helper';
import HandleAbnormalModal from './components/HandleAbnormalModal';
import type { RefHandleAbnormalModalProps } from './components/HandleAbnormalModal';
import HandleHistoryModal from './components/HandleHistoryModal';
import type { RefHandleHistoryModalProps } from './components/HandleHistoryModal';

export interface PackageAbnormalListPageProps {
  tab?: TabStatisticsItemSSD;
  refreshTabList: () => any;
}

const tableColumns: Record<
  string,
  ProColumns<PackageAbnormalListItemSSD>
> = transportPackageAbnormalColumns;

const PackageAbnormalListPage: React.FC<PackageAbnormalListPageProps> = ({
  tab,
  refreshTabList,
}) => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const handleAbnormalModalRef = useRef<RefHandleAbnormalModalProps>(null);
  const HandleHistoryModalRef = useRef<RefHandleHistoryModalProps>(null);
  const [selectedRowList, setSelectedRowList] = useState<PackageAbnormalListItemSSD[]>([]);

  const onChange = useCallback((_, selectedList: any) => {
    setSelectedRowList(selectedList);
  }, []);

  const rowSelection = useMemo(() => {
    return { selectedRowList, preserveSelectedRowKeys: true, onChange };
  }, [selectedRowList, onChange]);

  const formatParams = (params: any) => {
    const { rangeTime, gmtHandle } = params;
    return {
      ...convertRangeToStartEnd(rangeTime, 'rangeTime', 'gmtCreate'),
      ...convertRangeToStartEnd(gmtHandle, 'gmtHandle'),
    };
  };

  const fetchData = useTableRequest(getPackageAbnormalList, (params) => {
    return formatParams(params);
  });

  const handleAbnormal = useCallback(
    (items: PackageAbnormalListItemSSD[]) => {
      handleAbnormalModalRef.current?.show(items);
    },
    [handleAbnormalModalRef],
  );

  const checkHandleHistory = useCallback(
    (id: number) => {
      HandleHistoryModalRef.current?.show(id);
    },
    [HandleHistoryModalRef],
  );

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.cpCode!.search = false;
        draft.option!.render = (_, item) => {
          return (
            <>
              {tab?.value !== 2 && (
                <>
                  <a
                    onClick={() => {
                      handleAbnormal([item]);
                    }}
                  >
                    处理异常
                  </a>
                  <Divider type="vertical" />
                </>
              )}
              <a
                onClick={() => {
                  checkHandleHistory(item.id);
                }}
              >
                处理历史
              </a>
            </>
          );
        };
      }),
    );
  }, [handleAbnormal, checkHandleHistory, tab]);

  const clearSelected = useCallback(() => {
    actionRef?.current?.clearSelected?.();
    refreshTabList();
  }, [actionRef, refreshTabList]);

  const handleSuccess = useCallback(() => {
    clearSelected();
    actionRef?.current?.reload();
  }, [actionRef, clearSelected]);

  const handleExport = useCallback(() => {
    if (actionRef?.current?.pageInfo?.total === 0) {
      message.error('暂无数据');
    } else {
      const params = formRef?.current?.getFieldsValue();
      exportHelper(exportPackageAbnormal, {
        ...params,
        state: tab?.value,
        outFlag: tab?.outFlag,
        ...formatParams(params),
      });
    }
  }, [formRef, tab, actionRef]);

  const toolBarRender = useCallback(
    () => [
      <Button
        type="primary"
        onClick={() => handleAbnormal(selectedRowList || [])}
        key="handle"
        disabled={selectedRowList?.length === 0}
      >
        批量处理
      </Button>,
      <ExportButton type="primary" icon={<ExportOutlined />} onClick={handleExport} key="export">
        导出
      </ExportButton>,
    ],
    [handleExport, handleAbnormal, selectedRowList],
  );

  const tableAlertRender = useCallback(({ selectedRows, onCleanSelected }) => {
    return (
      <Space size="large">
        <span>已选 {selectedRows?.length} 项</span>
        <a onClick={onCleanSelected}>取消选择</a>
      </Space>
    );
  }, []);

  useEffect(() => {
    setSelectedRowList([]);
  }, [tab]);

  return (
    <>
      <CommonTable
        actionRef={actionRef}
        formRef={formRef}
        key={tab?.name}
        toolBarRender={toolBarRender}
        params={{
          state: tab?.value,
          outFlag: tab?.outFlag,
        }}
        request={fetchData}
        columns={columns}
        rowSelection={tab?.value === 2 ? false : rowSelection}
        tableAlertRender={tableAlertRender}
        tableAlertOptionRender={false}
        onReset={clearSelected}
        onSubmit={clearSelected}
      />
      <HandleAbnormalModal ref={handleAbnormalModalRef} onSuccess={handleSuccess} tab={tab} />
      <HandleHistoryModal ref={HandleHistoryModalRef} />
    </>
  );
};

export default PackageAbnormalListPage;

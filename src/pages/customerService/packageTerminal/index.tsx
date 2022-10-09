import _values from 'lodash/values';
import _flatten from 'lodash/flatten';
import { produce } from 'immer';
import { Link } from 'umi';
import React, { useRef, useMemo, useCallback, useState } from 'react';
import { Space } from 'antd';
import type { FormInstance } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { PackageState } from '@/enum';
import { PackageStateSearchMap } from '@/enum';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import type { PackageListItemSSD } from '@/types';
import { getPackageTerminalList } from '@/services/packageTerminal';
import { convertRangeToBeginEnd, convertRangeToStartEnd } from '@/utils/helper';
import { packageTerminalColumns } from '@/pages/configurify/columns';
import ButtonList from './components/ButtonList';

const PackageTerminal: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [selectedRowList, setSelectedRowList] = useState<PackageListItemSSD[]>([]);

  const onChange = useCallback((_, selectedList: any) => {
    setSelectedRowList(selectedList);
  }, []);

  const rowSelection = useMemo(() => {
    return { selectedRowList, preserveSelectedRowKeys: true, onChange };
  }, [selectedRowList, onChange]);

  const formatParams = (params: any) => {
    const { rangeTime, gmtOutbound, state } = params;
    return {
      ...convertRangeToBeginEnd(rangeTime, 'rangeTime', 'gmtCreate'),
      ...convertRangeToStartEnd(gmtOutbound, 'gmtOutbound'),
      stateList: _flatten(state?.map((item: PackageState) => PackageStateSearchMap[item])),

      state: undefined,
    };
  };

  const clearSelected = useCallback(() => {
    actionRef?.current?.clearSelected?.();
  }, [actionRef]);

  const reloadList = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const fetchData = useTableRequest(getPackageTerminalList, (params) => {
    return formatParams(params);
  });

  const columns = useMemo(() => {
    return _values(
      produce(packageTerminalColumns, (draft) => {
        draft.option!.width = 100;
        draft.uniqueNo!.search = false;
        draft.gmtInStore!.search = false;
        draft.option!.render = (_, item) => (
          <Link to={`/customerService/packageTerminal/${item.id}`} target="_blank">
            详情
          </Link>
        );
      }),
    );
  }, []);

  const toolBarRender: any = useCallback(() => {
    return <ButtonList selectedRowList={selectedRowList} onSuccess={reloadList} />;
  }, [selectedRowList, reloadList]);

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
      <PageContainer>
        <CommonTable
          actionRef={actionRef}
          formRef={formRef}
          request={fetchData}
          columns={columns}
          toolBarRender={toolBarRender}
          rowSelection={rowSelection}
          tableAlertRender={tableAlertRender}
          tableAlertOptionRender={false}
          onReset={clearSelected}
          onSubmit={clearSelected}
        />
      </PageContainer>
    </>
  );
};

export default PackageTerminal;

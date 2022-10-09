import _values from 'lodash/values';
import _some from 'lodash/some';
import _flatten from 'lodash/flatten';
import { produce } from 'immer';
import moment from 'moment';
import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Link } from 'umi';
import { useQueryClient } from 'react-query';
import { Space, Divider, Button, message } from 'antd';
import type { FormInstance } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { PackageListItemSSD } from '@/types';
import useTableRequest from '@/hooks/useTableRequest';
import type { PackageState } from '@/enum';
import { PackageStateSearchMap } from '@/enum';
import CommonTable from '@/components/CommonTable';
import { getPackageList } from '@/services/package';
import { convertRangeToBeginEnd, convertRangeToStartEnd } from '@/utils/helper';
import { packageColumns } from '@/pages/configurify/columns';
import LogInfoModal from '@/pages/customerService/components/LogInfoModal';
import type { RefLogInfoModalProps } from '@/pages/customerService/components/LogInfoModal';
import DownloadModal from './components/DownloadModal';
import type { RefDownloadModalProps } from './components/DownloadModal';
import ButtonList from './components/ButtonList';
import type { RefPackageFooterProps } from './components/PackageFooter';
import PackageFooter from './components/PackageFooter';

const formatParams = (params: any) => {
  const { rangeTime, gmtInStore, gmtOutbound, state } = params;
  return {
    ...convertRangeToBeginEnd(rangeTime, 'rangeTime', 'gmtCreate'),
    ...convertRangeToStartEnd(gmtInStore, 'gmtInStore'),
    ...convertRangeToStartEnd(gmtOutbound, 'gmtOutbound'),
    stateList: _flatten(state?.map((item: PackageState) => PackageStateSearchMap[item])),
    state: undefined,
  };
};

const validateParams = (params: any) => {
  const { oldShipNo, uniqueNo, waybillNo, batchNo, ladingNo, rangeTime, gmtInStore, gmtOutbound } =
    params;
  const hasNo = _some([oldShipNo, uniqueNo, waybillNo, batchNo, ladingNo]);
  if (!hasNo) {
    const hasTime = _some([rangeTime, gmtInStore, gmtOutbound], (item) => {
      return item && moment(item[1]).diff(moment(item[0]), 'days') <= 30;
    });
    if (!hasTime) {
      message.error('请选择入库时间/出库时间/创建时间，时间范围不能超出31天');
      throw new Error();
    }
  }
  return true;
};

const PackageIndex: React.FC = () => {
  const queryClient = useQueryClient();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const modalRef = useRef<RefLogInfoModalProps>(null);
  const downloadModalRef = useRef<RefDownloadModalProps>(null);
  const packageFooterRef = useRef<RefPackageFooterProps>(null);
  const [selectedRowList, setSelectedRowList] = useState<PackageListItemSSD[]>([]);

  const onChange = useCallback((_, selectedList: any) => {
    setSelectedRowList(selectedList);
  }, []);

  const rowSelection = useMemo(() => {
    return { selectedRowList, preserveSelectedRowKeys: true, onChange };
  }, [selectedRowList, onChange]);

  const handleExport = useCallback(() => {
    if (actionRef?.current?.pageInfo?.total === 0) {
      message.error('暂无数据');
    } else {
      const params = { ...formRef.current?.getFieldsValue() };
      try {
        if (!validateParams(params)) {
          throw new Error();
        }
        downloadModalRef.current?.show({
          ...params,
          ...formatParams({ ...params }),
        });
      } catch {}
    }
  }, [downloadModalRef, actionRef]);

  const fetchData = useTableRequest(getPackageList, (params) => {
    return formatParams(params);
  });

  const columns = useMemo(() => {
    return _values(
      produce(packageColumns, (draft) => {
        draft.option!.width = 100;
        draft.option!.render = (_, item) => (
          <>
            <Link to={`/customerService/package/${item.id}`} target="_blank">
              详情
            </Link>
            <Divider type="vertical" />
            <a
              onClick={() => {
                queryClient?.invalidateQueries('packageLogInfo');
                modalRef.current?.show(item.id);
              }}
            >
              日志
            </a>
          </>
        );
      }),
    );
  }, [queryClient]);

  const toolBarRender: any = useCallback(() => {
    return (
      <>
        <ButtonList
          onSuccess={() => {
            actionRef?.current?.clearSelected?.();
            actionRef?.current?.reload();
            queryClient?.invalidateQueries('packageLogInfo');
          }}
          selectedRows={selectedRowList || []}
          disabled={selectedRowList?.length === 0}
        />
        <Button type="primary" onClick={handleExport} key="export">
          清单导出
        </Button>
      </>
    );
  }, [handleExport, queryClient, selectedRowList, actionRef]);

  const tableAlertRender = useCallback(({ selectedRows, onCleanSelected }) => {
    return (
      <Space size="large">
        <span>已选 {selectedRows?.length} 项</span>
        <a onClick={onCleanSelected}>取消选择</a>
      </Space>
    );
  }, []);

  const handleSearchSubmit = useCallback(() => {
    actionRef?.current?.clearSelected?.();

    const params = formRef.current?.getFieldsValue();
    packageFooterRef.current?.getStatistics({
      ...params,
      ...formatParams(params),
    });
  }, [actionRef, packageFooterRef, formRef]);

  useEffect(() => {
    // 只在mount的时候执行一次 依赖数组里不用添加依赖
    handleSearchSubmit();
  }, []);

  return (
    <>
      <PageContainer>
        <CommonTable
          actionRef={actionRef}
          formRef={formRef}
          toolBarRender={toolBarRender}
          request={fetchData}
          columns={columns}
          rowSelection={rowSelection}
          tableAlertRender={tableAlertRender}
          tableAlertOptionRender={false}
          onReset={handleSearchSubmit}
          onSubmit={handleSearchSubmit}
        />
        <PackageFooter ref={packageFooterRef} />
        <LogInfoModal ref={modalRef} />
        <DownloadModal ref={downloadModalRef} />
      </PageContainer>
    </>
  );
};

export default PackageIndex;

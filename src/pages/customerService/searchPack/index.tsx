import _values from 'lodash/values';
import _some from 'lodash/some';
import moment from 'moment';
import produce from 'immer';
import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Button, Space, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import type { BatchListItemSSD } from '@/types';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { getBatchList } from '@/services/batch';
import { convertRangeToStartEnd } from '@/utils/helper';
import { searchPackColumns } from '@/pages/configurify/columns';
import GlobalCitySelect from '@/pages/components/GlobalCitySelect';
import { BooleanEnum } from '@/enum';
import UnBindModal from './components/UnBindModal';
import type { RefUnBindModalProps } from './components/UnBindModal';
import BindModal from './components/BindModal';
import type { RefBindModalProps } from './components/BindModal';
import PackageInfoModal from './components/PackageInfoModal';
import type { RefPackageInfoModalProps } from './components/PackageInfoModal';
import DownloadModal from './components/DownloadModal';
import type { RefDownloadModalProps } from './components/DownloadModal';
import type { RefBatchPackageFooterProps } from './components/BatchPackageFooter';
import BatchPackageFooter from './components/BatchPackageFooter';

const tableColumns = searchPackColumns;

const formatParams = ({ gmtBag, gmtOutbound }: any) => ({
  ...convertRangeToStartEnd(gmtBag, 'gmtBag'),
  ...convertRangeToStartEnd(gmtOutbound, 'gmtOutbound'),
});

const validateParams = (params: any) => {
  const { uniqueNo, batchNo, ladingNo, gmtOutbound, gmtBag } = params;
  const hasNo = _some([uniqueNo, batchNo, ladingNo]);
  if (!hasNo) {
    const hasTime = _some([gmtOutbound, gmtBag], (item) => {
      return item && moment(item[1]).diff(moment(item[0]), 'days') <= 30;
    });
    if (!hasTime) {
      message.error('请选择装袋时间/出库时间，时间范围不能超出31天');
      throw new Error();
    }
  }
  return true;
};

const SearchPackIndex: React.FC = () => {
  const unbindModalRef = useRef<RefUnBindModalProps>(null);
  const bindModalRef = useRef<RefBindModalProps>(null);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const downloadModalRef = useRef<RefDownloadModalProps>(null);
  const packageInfoModalRef = useRef<RefPackageInfoModalProps>(null);
  const batchPackageFooterRef = useRef<RefBatchPackageFooterProps>(null);
  const [selectedRowList, setSelectedRowList] = useState<BatchListItemSSD[]>([]);

  const queryClient = useQueryClient();

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
        downloadModalRef.current?.show({ ...params, ...formatParams(params) });
      } catch {}
    }
  }, [downloadModalRef, actionRef]);

  const fetchData = useTableRequest(getBatchList, (params) => {
    return formatParams(params);
  });

  const getPackageInfo = useCallback(
    (id: number) => {
      queryClient?.invalidateQueries('packageInfo');
      packageInfoModalRef.current?.show(id);
    },
    [packageInfoModalRef, queryClient],
  );

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.countryId!.renderFormItem = () => (
          <GlobalCitySelect
            valueType="code"
            transferFlag={BooleanEnum.TRUE}
            placeholder="请输入或选择"
          />
        );
        draft.countryId!.dataIndex = 'destinationCountry';
        draft.option!.render = (_, item) => {
          return <a onClick={() => getPackageInfo(item.id)}>查看</a>;
        };
      }),
    );
  }, [getPackageInfo]);

  const handleShowBindModal = useCallback((selectedList?: BatchListItemSSD[]) => {
    bindModalRef.current?.show(selectedList?.map((item) => item.batchNo) || []);
  }, []);

  const handleShowUnBindModal = useCallback((selectedList?: BatchListItemSSD[]) => {
    unbindModalRef.current?.show(selectedList?.map((item) => item.batchNo) || []);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    actionRef?.current?.clearSelected?.();
    const params = formRef.current?.getFieldsValue();
    batchPackageFooterRef.current?.getStatistics({
      ...params,
      ...formatParams(params),
    });
  }, [batchPackageFooterRef, formRef]);

  const reloadList = useCallback(() => {
    handleSearchSubmit();
    actionRef?.current?.reload();
  }, [actionRef, handleSearchSubmit]);

  const toolBarRender = useCallback(
    () => [
      <Button
        type="primary"
        onClick={() => handleShowBindModal(selectedRowList)}
        disabled={selectedRowList?.length === 0}
        key="link"
      >
        关联提单
      </Button>,
      <Button
        type="primary"
        onClick={() => handleShowUnBindModal(selectedRowList)}
        disabled={selectedRowList?.length === 0}
        key="unlink"
      >
        解绑提单
      </Button>,
      <Button type="primary" icon={<ExportOutlined />} onClick={handleExport} key="export">
        导出
      </Button>,
    ],
    [handleExport, handleShowUnBindModal, handleShowBindModal, selectedRowList],
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
    // 只在mount的时候执行一次 依赖数组里不用添加依赖
    handleSearchSubmit();
  }, []);

  return (
    <PageContainer>
      <CommonTable
        actionRef={actionRef}
        formRef={formRef}
        rowSelection={rowSelection}
        toolBarRender={toolBarRender}
        request={fetchData}
        columns={columns}
        tableAlertRender={tableAlertRender}
        tableAlertOptionRender={false}
        onReset={handleSearchSubmit}
        onSubmit={handleSearchSubmit}
      />
      <BatchPackageFooter ref={batchPackageFooterRef} />
      <UnBindModal ref={unbindModalRef} onSuccess={reloadList} />
      <BindModal ref={bindModalRef} onSuccess={reloadList} />
      <DownloadModal ref={downloadModalRef} />
      <PackageInfoModal ref={packageInfoModalRef} />
    </PageContainer>
  );
};

export default SearchPackIndex;

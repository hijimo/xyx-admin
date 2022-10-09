import _values from 'lodash/values';
import _isNil from 'lodash/isNil';
import _isNaN from 'lodash/isNaN';
import { produce } from 'immer';
import { useLocation } from 'umi';
import type { Location } from 'umi';
import React, { useMemo, useCallback, useRef, useState } from 'react';
import { message, Space, Button } from 'antd';
import type { FormInstance } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { BooleanEnum, BizType } from '@/enum';
import type { CompanyBillListSSD } from '@/types';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import ExportButton from '@/components/ExportButton';
import {
  getCompanyBillList,
  exportCompanyBillList,
  getCompanyFinanceOfferDetail,
  resetProviderBill,
} from '@/services/finance';
import { serviceChargeDetailColumns } from '@/pages/configurify/columns';
import QuoteModal from '@/pages/finance/components/QuoteModal';
import type { RefQuoteModalProps } from '@/pages/finance/components/QuoteModal';
import ResetBillModal from '@/pages/finance/components/ResetBillModal';
import type { RefResetBillModalProps } from '@/pages/finance/components/ResetBillModal';
import { exportHelper, convertRangeToStartEnd } from '@/utils/helper';

const maxLength = 1000;

const formatParams = (params: any) => {
  const { rangeTime } = params;
  return {
    ...convertRangeToStartEnd(rangeTime, 'rangeTime', 'gmtCreate'),
  };
};

const CompanyBillDetailIndex: React.FC = () => {
  const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const modalRef = useRef<RefQuoteModalProps>(null);
  const resetBillModalRef = useRef<RefResetBillModalProps>(null);
  const [selectedRowList, setSelectedRowList] = useState<CompanyBillListSSD[]>([]);

  const { query }: Location = useLocation();
  const initialCompanyId = query?.companyId;

  const onChange = useCallback((_, selectedList: any) => {
    if (selectedList?.length > maxLength) {
      message.error(`最多选择${maxLength}条`);
    }
    setSelectedRowList(selectedList);
  }, []);

  const rowSelection = useMemo(() => {
    return {
      selectedRowList,
      preserveSelectedRowKeys: true,
      onChange,
      getCheckboxProps: (record: CompanyBillListSSD) => {
        return { disabled: record?.offerChanged === BooleanEnum.FALSE };
      },
    };
  }, [selectedRowList, onChange]);

  const clearSelected = useCallback(() => {
    actionRef?.current?.clearSelected?.();
  }, [actionRef]);

  const handleSuccess = useCallback(() => {
    clearSelected();
    actionRef?.current?.reload();
  }, [actionRef, clearSelected]);

  const handleExport = useCallback(() => {
    if (actionRef?.current?.pageInfo?.total === 0) {
      message.error('暂无数据');
    } else {
      const params = formRef.current?.getFieldsValue();
      exportHelper(exportCompanyBillList, { ...params, ...formatParams(params) });
    }
  }, [formRef, actionRef]);

  const handleResetBill = useCallback(
    (ids: number[]) => {
      resetBillModalRef.current?.show(ids);
    },
    [resetBillModalRef],
  );

  const fetchData = useTableRequest(getCompanyBillList, (params) => formatParams(params));

  const handleDetail = useCallback(
    (record) => {
      modalRef.current?.show(record);
    },
    [modalRef],
  );

  const columns = useMemo(() => {
    return _values(
      produce(serviceChargeDetailColumns, (draft) => {
        draft.rangeTime!.title = '计费时间';
        draft.gmtCreate!.title = '计费时间';
        if (!_isNil(initialCompanyId) && !_isNaN(+initialCompanyId)) {
          draft.companyId!.initialValue = +initialCompanyId;
        }
        draft.option!.render = (_, item) =>
          (item?.offerVal || item?.otherFormula) && (
            <a onClick={() => handleDetail(item)}>报价快照</a>
          );
      }),
    );
  }, [handleDetail, initialCompanyId]);

  const toolBarRender = useCallback(
    () => [
      <Button
        type="primary"
        disabled={selectedRowList?.length === 0 || selectedRowList?.length > maxLength}
        onClick={() => handleResetBill(selectedRowList?.map((item) => item.id))}
        key="resetBill"
      >
        重新计费
      </Button>,
      <ExportButton type="primary" icon={<ExportOutlined />} onClick={handleExport} key="export">
        导出
      </ExportButton>,
    ],
    [handleExport, handleResetBill, selectedRowList],
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
        actionRef={actionRef}
        formRef={formRef}
        toolBarRender={toolBarRender}
        request={fetchData}
        columns={columns}
        rowSelection={rowSelection}
        tableAlertRender={tableAlertRender}
        tableAlertOptionRender={false}
        onReset={clearSelected}
        onSubmit={clearSelected}
      />
      <QuoteModal ref={modalRef} getOfferDetail={getCompanyFinanceOfferDetail} />
      <ResetBillModal
        ref={resetBillModalRef}
        api={resetProviderBill}
        onSuccess={handleSuccess}
        bizType={BizType.COMPANY}
      />
    </PageContainer>
  );
};

export default CompanyBillDetailIndex;

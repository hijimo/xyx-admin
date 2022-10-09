import _values from 'lodash/values';
import _isNil from 'lodash/isNil';
import _isNaN from 'lodash/isNaN';
import { produce } from 'immer';
import { useLocation } from 'umi';
import type { Location } from 'umi';
import React, { useMemo, useCallback, useRef, useState } from 'react';
import { Button, Space, message, Divider } from 'antd';
import type { FormInstance } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { BooleanEnum, UnitType, BizType } from '@/enum';
import type { CustomerBillListSSD } from '@/types';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import ExportButton from '@/components/ExportButton';
import { customerChargeDetailColumns } from '@/pages/configurify/columns';
import { exportHelper, convertRangeToStartEnd } from '@/utils/helper';
import QuoteModal from '@/pages/finance/components/QuoteModal';
import type { RefQuoteModalProps } from '@/pages/finance/components/QuoteModal';
import CreateBillModal from '@/pages/finance/components/CreateBillModal';
import type { RefCreateBillModalProps } from '@/pages/finance/components/CreateBillModal';
import ResetBillModal from '@/pages/finance/components/ResetBillModal';
import type { RefResetBillModalProps } from '@/pages/finance/components/ResetBillModal';
import {
  getCustomerBillDetailList,
  exportCustomerBillDetailList,
  getCustomerFinanceOfferDetail,
  createCustomerBill,
  resetCustomerBill,
} from '@/services/finance';
import EditAmoutModal from './components/EditAmoutModal';
import type { RefEditAmoutModalProps } from './components/EditAmoutModal';
import EditFeeModal from './components/EditFeeModal';
import type { RefEditFeeModalProps } from './components/EditFeeModal';

const tableColumns = customerChargeDetailColumns;

const formatParams = (params: any) => {
  const { rangeTime } = params;
  return {
    ...convertRangeToStartEnd(rangeTime, 'rangeTime', 'gmtCreate'),
  };
};

const maxLength = 1000;

const CustomerBillDetailIndex: React.FC = () => {
  const editAmoutModalRef = useRef<RefEditAmoutModalProps>(null);
  const editFeeModalRef = useRef<RefEditFeeModalProps>(null);
  const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const quoteModalRef = useRef<RefQuoteModalProps>(null);
  const createBillModalRef = useRef<RefCreateBillModalProps>(null);
  const resetBillModalRef = useRef<RefResetBillModalProps>(null);
  const [selectedRowList, setSelectedRowList] = useState<CustomerBillListSSD[]>([]);

  const { query }: Location = useLocation();
  const initialCompanyId = query?.companyId;
  const initialBillNo = query?.billNo;

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
      getCheckboxProps: (record: CustomerBillListSSD) => {
        return {
          disabled:
            record?.creditedFlag === BooleanEnum.TRUE || record?.offerChanged === BooleanEnum.FALSE,
        };
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

  const handleDetail = useCallback(
    (record) => {
      quoteModalRef.current?.show(record);
    },
    [quoteModalRef],
  );

  const handleCreate = useCallback(() => {
    createBillModalRef.current?.show();
  }, [createBillModalRef]);

  const handleExport = useCallback(() => {
    if (actionRef?.current?.pageInfo?.total === 0) {
      message.error('暂无数据');
    } else {
      const params = formRef.current?.getFieldsValue();
      exportHelper(exportCustomerBillDetailList, { ...params, ...formatParams(params) });
    }
  }, [formRef]);

  const handleResetBill = useCallback(
    (ids: number[]) => {
      resetBillModalRef.current?.show(ids);
    },
    [resetBillModalRef],
  );

  const fetchData = useTableRequest(getCustomerBillDetailList, (params) => formatParams(params));

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.rangeTime!.title = '计费时间';
        draft.gmtCreate!.title = '计费时间';
        if (!_isNil(initialCompanyId) && !_isNaN(+initialCompanyId)) {
          draft.customerId!.initialValue = +initialCompanyId;
        }
        draft.billNo!.initialValue = initialBillNo;
        draft.option!.render = (_, item) => (
          <>
            {item.creditedFlag === BooleanEnum.FALSE && (
              <>
                {item.calVal !== null && item.offerType !== UnitType.PIECES && (
                  <>
                    <a
                      onClick={() => {
                        editFeeModalRef.current?.show(item);
                      }}
                    >
                      修改计费值
                    </a>
                    <Divider type="vertical" />
                  </>
                )}

                <a
                  onClick={() => {
                    editAmoutModalRef.current?.show(item);
                  }}
                >
                  修改金额
                </a>
                {item?.offerVal && <Divider type="vertical" />}
              </>
            )}
            {item?.offerVal && <a onClick={() => handleDetail(item)}>报价快照</a>}
          </>
        );
      }),
    );
  }, [handleDetail, initialCompanyId, initialBillNo]);

  const toolBarRender = useCallback(
    () => [
      <Button
        disabled={selectedRowList?.length === 0 || selectedRowList?.length > maxLength}
        type="primary"
        onClick={() => handleResetBill(selectedRowList?.map((item) => item.id))}
        key="resetBill"
      >
        重新计费
      </Button>,
      <Button type="primary" onClick={handleCreate} key="create">
        生成客户账单
      </Button>,
      <ExportButton type="primary" icon={<ExportOutlined />} onClick={handleExport} key="export">
        导出
      </ExportButton>,
    ],
    [handleExport, handleCreate, handleResetBill, selectedRowList],
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
        tableAlertRender={tableAlertRender}
        tableAlertOptionRender={false}
        rowSelection={rowSelection}
        onReset={clearSelected}
        onSubmit={clearSelected}
      />
      <QuoteModal ref={quoteModalRef} getOfferDetail={getCustomerFinanceOfferDetail} />
      <CreateBillModal
        ref={createBillModalRef}
        onSuccess={handleSuccess}
        api={createCustomerBill}
      />
      <EditAmoutModal ref={editAmoutModalRef} onSuccess={handleSuccess} />
      <EditFeeModal ref={editFeeModalRef} onSuccess={handleSuccess} />
      <ResetBillModal
        ref={resetBillModalRef}
        api={resetCustomerBill}
        onSuccess={handleSuccess}
        bizType={BizType.CUSTOMER}
      />
    </PageContainer>
  );
};

export default CustomerBillDetailIndex;

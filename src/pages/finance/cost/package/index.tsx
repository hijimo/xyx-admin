import _values from 'lodash/values';
import { produce } from 'immer';
import moment from 'moment';
import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import { useLocation } from 'umi';
import type { Location } from 'umi';
import { ExportOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import ExportButton from '@/components/ExportButton';
import { getSettlementList } from '@/services/settlement';
import { financeCostAnalyzeColumns } from '@/pages/configurify/columns';
import CostTableModal from '@/pages/finance/components/CostTableModal';
import type { RefCostTableModalProps } from '@/pages/finance/components/CostTableModal';
import SaleTableModal from '@/pages/finance/components/SaleTableModal';
import type { RefSaleTableModalProps } from '@/pages/finance/components/SaleTableModal';
import { DATE_FORMAT_DATETIME_MINUTES } from '@/utils/variables';

const tableColumns = financeCostAnalyzeColumns;

const FinanceCostAnasyze: React.FC = () => {
  const { query }: Location = useLocation();
  const actionRef = useRef<ActionType>();
  const companyId = query?.companyId;

  const costModalRef = useRef<RefCostTableModalProps>(null);
  const saleModalRef = useRef<RefSaleTableModalProps>(null);

  useEffect(() => {
    saleModalRef.current?.show(29);
  }, []);

  const handleExport = useCallback(() => {}, []);

  const toolBarRender = useCallback(
    () => [
      <ExportButton type="primary" icon={<ExportOutlined />} onClick={handleExport} key="export">
        导出
      </ExportButton>,
    ],
    [handleExport],
  );

  const fetchData = useTableRequest(getSettlementList, (params) => {
    const { rangeTime, companyNo } = params;
    return {
      businessType: 2,
      companyId: companyId ?? companyNo,
      companyName: undefined,
      beginDate: rangeTime && moment(rangeTime[0]).format(DATE_FORMAT_DATETIME_MINUTES),
      endDate: rangeTime && moment(rangeTime[1]).format(DATE_FORMAT_DATETIME_MINUTES),
      rangeTime: undefined,
    };
  });

  const handleDetail = useCallback((id) => {
    console.log('id', id);
  }, []);
  const handleSend = useCallback((id) => {
    console.log('id', id);
  }, []);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        console.log(draft);
        // draft.companyNo!.initialValue = initialValueNo;
        // draft.option!.render = (_, item) => {
        //   return (
        //     <>
        //       <a onClick={() => handleDetail(item.id)}>成本明细</a>
        //       <Divider type="vertical" />
        //       <a onClick={() => handleSend(item.id)}>销售明细</a>
        //     </>
        //   );
        // };
      }),
    );
  }, [handleDetail, handleSend]);

  return (
    <PageContainer>
      <CommonTable
        actionRef={actionRef}
        toolBarRender={toolBarRender}
        request={fetchData}
        columns={columns}
        rowKey="id"
      />
      <CostTableModal ref={costModalRef} />
      <SaleTableModal ref={saleModalRef} />
    </PageContainer>
  );
};

export default FinanceCostAnasyze;

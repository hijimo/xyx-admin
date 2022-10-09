import _values from 'lodash/values';
import { produce } from 'immer';
import moment from 'moment';
import React, { useMemo, useCallback, useRef } from 'react';
import { useLocation } from 'umi';
import type { Location } from 'umi';
import { message } from 'antd';
import type { FormInstance } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import ExportButton from '@/components/ExportButton';
import { exportHelper } from '@/utils/helper';
import { getSettlementList, exportBill } from '@/services/settlement';
import { customerChargeDetailColumns } from '@/pages/configurify/columns';
import { DATE_FORMAT_DATETIME_MINUTES } from '@/utils/variables';

const tableColumns = customerChargeDetailColumns;

const ServiceBillIndex: React.FC = () => {
  const { query }: Location = useLocation();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const companyId = query?.companyId;

  const handleExport = useCallback(() => {
    if (actionRef?.current?.pageInfo?.total === 0) {
      message.error('暂无数据');
    } else {
      exportHelper(exportBill, formRef.current?.getFieldsValue());
    }
  }, [formRef, actionRef]);

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
        //       <a onClick={() => handleDetail(item.id)}>明细</a>
        //       <Divider type="vertical" />
        //       <a onClick={() => handleSend(item.id)}>发送</a>
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
        formRef={formRef}
        toolBarRender={toolBarRender}
        request={fetchData}
        columns={columns}
        rowKey="id"
      />
    </PageContainer>
  );
};

export default ServiceBillIndex;

import _values from 'lodash/values';
import { produce } from 'immer';
import { Link } from 'umi';
import React, { useMemo, useCallback, useRef } from 'react';
import { useMutation } from 'react-query';
import { ExportOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Divider, Modal, message } from 'antd';
import type { FormInstance } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { CustomerBillListSSD } from '@/types';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import ExportButton from '@/components/ExportButton';
import { customerBillColumns } from '@/pages/configurify/columns';
import { exportHelper, convertRangeToStartEnd } from '@/utils/helper';
import { getCustomerBillList, exportCustomerBillList, voidCustomerBill } from '@/services/finance';

const formatParams = (params: any) => {
  const { gmtCreate } = params;
  return {
    ...convertRangeToStartEnd(gmtCreate, 'gmtCreate', undefined, 'day'),
  };
};

const { confirm } = Modal;

const CustomerBillIndex: React.FC = () => {
  const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const { mutate } = useMutation((values: { id: number }) => voidCustomerBill(values), {
    onSuccess: () => {
      message.success('成功');
      onSuccess();
    },
  });

  const handleVoid = useCallback(
    (row: CustomerBillListSSD) => {
      confirm({
        title: `确认作废客户${row.customerName}的账单编号为${row.billNo}的账单吗，作废后，该账单将不在列表展示`,
        icon: <ExclamationCircleOutlined />,
        onOk() {
          mutate({ id: row.id });
        },
      });
    },
    [mutate],
  );

  const handleExport = useCallback(() => {
    if (actionRef?.current?.pageInfo?.total === 0) {
      message.error('暂无数据');
    } else {
      const params = formRef.current?.getFieldsValue();
      exportHelper(exportCustomerBillList, { ...params, ...formatParams(params) });
    }
  }, [formRef]);

  const toolBarRender = useCallback(
    () => [
      <ExportButton type="primary" icon={<ExportOutlined />} onClick={handleExport} key="export">
        导出
      </ExportButton>,
    ],
    [handleExport],
  );

  const fetchData = useTableRequest(getCustomerBillList, (params) => formatParams(params));

  const columns = useMemo(() => {
    return _values(
      produce(customerBillColumns, (draft) => {
        draft.option!.render = (_, item) => (
          <>
            <Link to={`/finance/customerBillDetail?billNo=${item.billNo}`} target="_blank">
              明细
            </Link>
            <Divider type="vertical" />
            <a onClick={() => handleVoid(item)}>作废</a>
          </>
        );
      }),
    );
  }, [handleVoid]);

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

export default CustomerBillIndex;

import produce from 'immer';
import _values from 'lodash/values';
import _some from 'lodash/some';
import moment from 'moment';
import { Access, useAccess } from 'umi';
import React, { useRef, useCallback, useMemo } from 'react';
import { Button, message } from 'antd';
import type { FormInstance } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { ExportOutlined } from '@ant-design/icons';
import useTableRequest from '@/hooks/useTableRequest';
import type { CommissionListItemSSD } from '@/types';
import CommonTable from '@/components/CommonTable';
import { convertRangeToStartEnd, exportHelper } from '@/utils/helper';
import { commissionColumns } from '@/pages/configurify/columns';
import { getCommissionList, exportCommissionList } from '@/services/seller';
import EditModal from './components/EditModal';
import type { RefEditModalProps } from './components/EditModal';

const formatParams = (params: any) => {
  const { gmtOutbound } = params;
  return {
    ...convertRangeToStartEnd(gmtOutbound, 'gmtOutbound'),
  };
};

const validateParams = (params: any) => {
  const { gmtOutbound, customerNo, userNo, waybillNo } = params;
  const hasNo = _some([customerNo, userNo, waybillNo]);
  if (!hasNo) {
    const hasTime = _some([gmtOutbound], (item) => {
      return item && moment(item[1]).diff(moment(item[0]), 'days') <= 30;
    });
    if (!hasTime) {
      message.error('请选择出库时间，时间范围不能超出31天');
      throw new Error();
    }
  }
  return true;
};

const CommissionsIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefEditModalProps>(null);
  const formRef = useRef<FormInstance>();

  const access: any = useAccess();

  const handleEdit = useCallback(
    (item: CommissionListItemSSD) => {
      addModalRef.current?.show(item);
    },
    [addModalRef],
  );

  const handleExport = useCallback(() => {
    if (actionRef?.current?.pageInfo?.total === 0) {
      message.error('暂无数据');
    } else {
      try {
        const params = formRef.current?.getFieldsValue();
        if (!validateParams(params)) {
          throw new Error();
        } else {
          exportHelper(exportCommissionList, { ...params, ...formatParams(params) });
        }
      } catch {}
    }
  }, [actionRef, formRef]);

  const toolBarRender = useCallback(
    () => [
      <Button type="primary" onClick={handleExport} key="export" icon={<ExportOutlined />}>
        导出
      </Button>,
    ],
    [handleExport],
  );

  const fetchData = useTableRequest(getCommissionList, (params) => {
    return {
      ...formatParams(params),
    };
  });

  const columns = useMemo(() => {
    return _values(
      produce(commissionColumns, (draft) => {
        draft.packageStatus!.search = false;
        draft.option!.render = (_, item) => (
          <>
            <Access key="edit" accessible={access?.EDIT_SELLER_COMMISSIONS}>
              <a onClick={() => handleEdit(item)}>修改佣金</a>
            </Access>
          </>
        );
      }),
    );
  }, [handleEdit, access?.EDIT_SELLER_COMMISSIONS]);

  const handleSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  return (
    <>
      <PageContainer>
        <CommonTable
          toolBarRender={toolBarRender}
          actionRef={actionRef}
          formRef={formRef}
          request={fetchData}
          columns={columns}
        />
      </PageContainer>
      <EditModal ref={addModalRef} onSuccess={handleSuccess} />
    </>
  );
};

export default CommissionsIndex;

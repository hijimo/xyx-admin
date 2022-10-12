import React, { useRef, useMemo, useCallback } from 'react';
import _values from 'lodash/values';
import { produce } from 'immer';
import { Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { LogSSD } from '@/types';
import { getLogList } from '@/services/common';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { logColumns } from '@/pages/configurify/columns';
import InfoModal from './components/InfoModal';
import type { RefInfoModalProps } from './components/InfoModal';

const tableColumns = logColumns;

const LogIndex: React.FC = () => {
  const infoModalRef = useRef<RefInfoModalProps>(null);
  const actionRef = useRef<ActionType>();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const addOrEditItem = useCallback(
    (record?: LogSSD) => {
      infoModalRef.current?.show(record);
    },
    [infoModalRef],
  );

  const fetchDate = useTableRequest(getLogList);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, record: LogSSD) => {
          return (
            <>
              <a onClick={() => addOrEditItem(record)}>查看</a>
              <Divider type="vertical" />
            </>
          );
        };
      }),
    );
  }, [addOrEditItem]);

  return (
    <PageContainer>
      <CommonTable rowKey="id" actionRef={actionRef} request={fetchDate} columns={columns} />
      <InfoModal ref={infoModalRef} onSuccess={submitSuccess} />
    </PageContainer>
  );
};

export default LogIndex;

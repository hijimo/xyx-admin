import _values from 'lodash/values';
import { produce } from 'immer';
import { Link } from 'umi';
import React, { useRef, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { getDeviceList } from '@/services/device';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { deviceModelColumns } from '@/pages/configurify/columns';
import type { DeviceSSD } from '@/types';
import { BooleanEnum } from '@/enum';

const tableColumns = deviceModelColumns;

const DeviceIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const fetchDate = useTableRequest(getDeviceList, () => ({
    modelFlag: BooleanEnum.TRUE,
  }));

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.companyNo!.hideInTable = true;
        draft.option!.render = (_, record: DeviceSSD) => {
          return (
            <>
              <Link to={`/deviceModel/${record.id}`}>查看</Link>
            </>
          );
        };
      }),
    );
  }, []);

  return (
    <PageContainer>
      <CommonTable rowKey="id" actionRef={actionRef} request={fetchDate} columns={columns} />
    </PageContainer>
  );
};

export default DeviceIndex;

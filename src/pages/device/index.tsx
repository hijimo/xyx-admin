import _values from 'lodash/values';
import { produce } from 'immer';
import React, { useRef, useMemo } from 'react';
import { Link } from 'umi';
import { Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { DeviceSSD } from '@/types';
import { getDeviceList } from '@/services/device';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { deviceColumns } from '@/pages/configurify/columns';
import { BooleanEnum } from '@/enum';

const tableColumns = deviceColumns;

const DeviceIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const fetchDate = useTableRequest(getDeviceList, (params) => {
    const p = { modelFlag: BooleanEnum.FALSE };
    if (params.areas && params.areas.length > 0) {
      p.provinceName = params.areas[0];
    }
    if (params.areas && params.areas.length > 1) {
      p.cityName = params.areas[1];
    }

    return p;
  });

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.companyNo!.hideInTable = true;
        draft.option!.render = (_, record: DeviceSSD) => {
          return (
            <>
              <Link to={`/device/${record.id}`}>查看</Link>
              <Divider type="vertical" />
              <Link to={`/device/${record.id}/edit`}>编辑</Link>
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

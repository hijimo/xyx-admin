import React, { useRef, useMemo } from 'react';
import { produce } from 'immer';
import _values from 'lodash/values';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { getDeviceDealDataList } from '@/services/deviceDealData';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { deviceDealDataColumns } from '@/pages/configurify/columns';

const tableColumns = deviceDealDataColumns;

const WarningsIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const fetchDate = useTableRequest(getDeviceDealDataList, (params) => {
    const p = {};
    if (params.areas && params.areas.length > 0) {
      p.provinceName = params.areas[0];
    }
    if (params.areas && params.areas.length > 1) {
      p.cityName = params.areas[1];
    }
    if (params.gmtCreate && params.gmtCreate.length > 0) {
      p.gmtCreateBegin = params.gmtCreate[0];
    }
    if (params.gmtCreate && params.gmtCreate.length > 1) {
      p.gmtCreateBegin = params.gmtCreate[1];
    }

    return p;
  });

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.rangeTime!.dataIndex = 'gmtCreate';
        draft.companyNo!.hideInTable = true;
        // draft.option!.render = (_, record: DeviceSSD) => {
        //   return (
        //     <>
        //       <Link to={`/deviceDealData/${record.id}`}>查看</Link>
        //     </>
        //   );
        // };
      }),
    );
  }, []);

  return (
    <PageContainer>
      <CommonTable rowKey="id" actionRef={actionRef} request={fetchDate} columns={columns} />
    </PageContainer>
  );
};

export default WarningsIndex;

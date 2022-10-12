import React, { useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import _last from 'lodash/last';
import { getDashboardDataOthers } from '@/services/dashboard';
import { getToken } from '@/utils/ls';
import StatisticsCard from './cards/StatisticsCard';
import ReconnectCard from './cards/ReconnectCard';
import DayMessageCard from './cards/DayMessageCard';
import MonthMessageCard from './cards/MonthMessageCard';
import WarningsTableCard from './cards/WarningsTableCard';
import DayActiveCard from './cards/DayActiveCard';
import CardList from './CardList';
import type { ResponseData } from '@/utils/request';
import type { DashboardSSD } from '@/types';

import styles from './ChartView.less';

export const REFETCH_TIME = 300; // 单位秒，轮询时间
export const OTHER_REFETCH_TIME = 10;

interface ChartViewProps {
  groupCode?: string;
}
const ChartView: React.FC<ChartViewProps> = ({ groupCode }) => {
  const token = getToken();

  useEffect(() => {
    const t1 = setInterval(() => {
      window.OTHER_REFETCH_TIME = window.OTHER_REFETCH_TIME - 1;
      if (window.OTHER_REFETCH_TIME <= 0) {
        window.OTHER_REFETCH_TIME = OTHER_REFETCH_TIME;
        refetchOthers();
      }
    }, 1000);

    return () => {
      clearInterval(t1);
    };
  }, []);

  const { data: othersData, refetch: refetchOthers } = useQuery(
    ['getDashboardDataOthers', _last(groupCode), token],
    () =>
      getDashboardDataOthers({
        groupCode: _last(groupCode),
        token,
      }),
    {
      staleTime: 8 * 1000,
      select: (d: ResponseData<DashboardSSD>) => d.data || [],
    },
  );

  //
  return (
    <>
      <CardList className={styles.leftCardList}>
        <StatisticsCard data={othersData?.deviceCountDto} />
        <ReconnectCard data={othersData?.groupRankDtos} />
        {/* <DeviceProductCard data={data?.productCountDtos} /> */}
        <WarningsTableCard data={othersData?.deviceWarnDtos} />
      </CardList>
      <CardList className={styles.rightCardList}>
        <DayActiveCard data={othersData?.activeRankDtos} />
        <DayMessageCard data={othersData?.rankDay} />
        <MonthMessageCard data={othersData?.rankMonth} />
      </CardList>
    </>
  );
};

export default ChartView;

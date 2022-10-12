import React, { useMemo } from 'react';
import Card from '../Card';
import AcensText from '@/pages/components/AcensText';
import type { DeviceCountData } from '@/types';
import OnlineRateGaugeChart from '../charts/OnlineRateGaugeChart';
import Statistics from '../Statistics';
import styles from './StatisticsCard.less';

interface StatisticsCardProps {
  data?: DeviceCountData;
}
const StatisticsCard: React.FC<StatisticsCardProps> = ({ data }) => {
  const dt = useMemo(() => {
    return [
      {
        label: '设备总数',
        value: data?.totalCount || 0,
      },
      // {
      //   label: '设备总类',
      //   value: 0,
      // },
      {
        label: '在线设备',
        value: data?.onlineCount || 0,
      },
      {
        label: '离线设备',
        value: data?.offlineCount || 0,
      },
    ];
  }, [data]);
  return (
    <Card
      className={styles.statisticsCard}
      bodyCls={styles.body}
      title="数据统计"
      enTitle="Statistical Data"
    >
      <Statistics className={styles.statisticsView} data={dt} />
      <div className={styles.box}>
        <div className={styles.charts}>
          <OnlineRateGaugeChart value={data?.onlineRatio ? data?.onlineRatio / 100 : 0} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>设备在线率</div>
          <AcensText className={styles.value}>{data?.onlineRatio || 0}%</AcensText>
        </div>
      </div>
    </Card>
  );
};

export default StatisticsCard;

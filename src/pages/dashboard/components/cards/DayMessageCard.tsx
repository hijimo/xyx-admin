import React, { useMemo } from 'react';
import type { RankDayData } from '@/types/dashboard';
import Card from '../Card';
import DayMessagePieChart from '../charts/DayMessagePieChart';
import styles from './DayMessageCard.less';

interface DayMessageCardProps {
  data: RankDayData[];
}
const DayMessageCard: React.FC<DayMessageCardProps> = ({ data }) => {
  const dt = useMemo(() => {
    return (
      data?.map((it) => ({
        name: it.deviceName,
        value: it.dataCount,
      })) || []
    );
  }, [data]);
  return (
    <Card className={styles.dayMessageCard} title="日消息量排名" enTitle="Daily Message Volume">
      <DayMessagePieChart data={dt} />
    </Card>
  );
};

export default DayMessageCard;

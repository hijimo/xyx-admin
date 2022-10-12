import React, { useMemo } from 'react';
import type { RankMontData } from '@/types/dashboard';
import Card from '../Card';
import MonthMessagePieChart from '../charts/MonthMessagePieChart';
import styles from './MonthMessageCard.less';

interface MonthMessageCardProps {
  data: RankMontData[];
}
const MonthMessageCard: React.FC<MonthMessageCardProps> = ({ data }) => {
  const dt = useMemo(() => {
    return (
      data?.map((it) => ({
        name: it.deviceName,
        value: it.dataCount,
      })) || []
    );
  }, [data]);
  return (
    <Card className={styles.monthMessageCard} title="月消息量排名" enTitle="Month Message Volume">
      <MonthMessagePieChart data={dt} />
    </Card>
  );
};

export default MonthMessageCard;

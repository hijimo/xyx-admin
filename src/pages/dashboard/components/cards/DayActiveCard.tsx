import React, { useMemo } from 'react';
import type { ActiveRankData } from '@/types';
import Card from '../Card';
import DayActiveChart from '../charts/DayActiveChart';
import styles from './ReconnectCard.less';

interface DayActiveCardProps {
  data?: ActiveRankData[];
}
const DayActiveCard: React.FC<DayActiveCardProps> = ({ data }) => {
  const dt = useMemo(() => {
    return (
      data?.map((it) => ({
        name: it.monthDay,
        value: it.totalCount,
      })) || []
    );
  }, [data]);

  return (
    <Card className={styles.reconnectCard} title="日激活趋势" enTitle="Daily Activation Trend">
      <DayActiveChart data={dt} />
    </Card>
  );
};

export default DayActiveCard;

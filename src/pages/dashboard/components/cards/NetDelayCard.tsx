import React from 'react';
import Card from '../Card';
import NetDelayBarChart from '../charts/NetDelayBarChart';
import styles from './NetDelayCard.less';

interface NetDelayCardProps {
  data: any;
}
const NetDelayCard: React.FC<NetDelayCardProps> = () => {
  return (
    <Card className={styles.netDelayCard} title="网络延迟排名" enTitle="Network Delay TOP">
      <NetDelayBarChart />
    </Card>
  );
};

export default NetDelayCard;

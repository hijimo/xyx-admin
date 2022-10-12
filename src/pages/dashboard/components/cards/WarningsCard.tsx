import React from 'react';
import Card from '../Card';
import WarningsSwiper from '../WarningsSwiper';
import Statistics from '../Statistics';
import WarningsLineChart from '../charts/WarningsLineChart';
import styles from './WarningsCard.less';

const data = [
  {
    label: '告警总数',
    value: 21,
  },
  {
    label: '未处理',
    value: 5,
  },
];
interface WarningsCardProps {
  data: any;
}
const WarningsCard: React.FC<WarningsCardProps> = () => {
  return (
    <Card
      className={styles.warningsCard}
      bodyCls={styles.body}
      title="设备告警"
      enTitle="Device Alarm"
    >
      <div className={styles.left}>
        <Statistics className={styles.statisticsView} data={data} />
        <div className={styles.title}>告警数趋势</div>
        <WarningsLineChart />
      </div>
      <WarningsSwiper className={styles.siwper} />
    </Card>
  );
};

export default WarningsCard;

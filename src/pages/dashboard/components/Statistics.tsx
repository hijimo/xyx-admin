import React from 'react';
import numeral from 'numeral';
import classNames from 'classnames';
import AcensText from '@/pages/components/AcensText';
import { OptionItemSSD } from '@/types';
import styles from './Statistics.less';

interface StatisticsProps {
  data: OptionItemSSD[];
  className?: string;
}
const Statistics: React.FC<StatisticsProps> = ({ data, className }) => {
  return (
    <div className={classNames(styles.statistics, className)}>
      {data.map((it, idx) => (
        <div className={styles.item} key={idx}>
          <div className={styles.text}>{it.label}</div>
          <AcensText className={styles.value}>{numeral(it.value).format('0,0')}</AcensText>
        </div>
      ))}
    </div>
  );
};

export default Statistics;

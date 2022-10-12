import React from 'react';
import classNames from 'classnames';
import AcensText from '@/pages/components/AcensText';
import cardHead from '@/assets/dashboard/card-head.png';
import borderLeft from '@/assets/dashboard/border-left.png';
import borderRight from '@/assets/dashboard/border-right.png';
import styles from './Card.less';

interface CardProps {
  className?: string;
  bodyCls?: string;
  title?: string;
  enTitle?: string;
}
const Card: React.FC<CardProps> = ({ className, bodyCls, title, enTitle, children }) => {
  return (
    <div className={classNames(styles.card, className)}>
      <div className={styles.mask} />
      <img className={styles.left} src={borderLeft} />
      <img className={styles.right} src={borderRight} />
      <div className={styles.cardHeader}>
        <span className={styles.icon} />
        <div className={styles.cn}>
          {title}
          <AcensText className={styles.en}>{enTitle}</AcensText>
        </div>
        <img src={cardHead} className={styles.img} />

        <div className={styles.hr} />
      </div>
      <div className={styles.hr} />
      <div className={classNames(styles.cardBody, bodyCls)}>{children}</div>
    </div>
  );
};

export default React.memo(Card) as Card;

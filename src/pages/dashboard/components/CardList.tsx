import React from 'react';
import classNames from 'classnames';
import styles from './CardList.less';

interface CardListProps {
  className?: string;
}
const CardList: React.FC<CardListProps> = ({ className, children }) => {
  return <div className={classNames(styles.cardList, className)}>{children}</div>;
};

export default CardList;

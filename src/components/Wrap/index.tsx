import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface WrapProps {
  className?: string;
  style?: React.CSSProperties;
}

const Wrap: React.FC<WrapProps> = ({ style, className, children }) => {
  return (
    <div className={classNames(styles.wrap, className)} style={style}>
      {children}
    </div>
  );
};

export default Wrap;

import React from 'react';
import classNames from 'classnames';
import styles from './AcensText.less';

interface AcensTextProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  className?: string;
}
const AcensText: React.FC<AcensTextProps> = ({ className, children }) => {
  return <span className={classNames(styles.acensText, className)}>{children}</span>;
};

export default React.memo(AcensText);

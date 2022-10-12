import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'umi';
import { getToken, getUserInfo, setToken, setUserInfo } from '@/utils/ls';
import Icon from '@/components/Icon';
import AcensText from '@/pages/components/AcensText';
// import { logout } from '@/services/user';

import styles from './index.less';

interface RightContentProps {
  className?: string;
}
const RightContent: React.FC<RightContentProps> = ({ className }) => {
  const userInfo = getUserInfo();
  const token = getToken();

  const [time, setTime] = useState<string>(moment().format('YYYY.MM.DD HH:MM:ss'));
  useEffect(() => {
    const t = setInterval(() => {
      setTime(moment().format('YYYY.MM.DD HH:MM:ss'));
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, []);

  const handleLogout = useCallback(async () => {
    // await logout();
    setToken('');
    setUserInfo('');
    window.location.href = '/dp';
  }, []);
  return (
    <div className={classNames(styles.rigthContent, className)}>
      <AcensText className={styles.date}>{time}</AcensText>

      {userInfo?.companyInfo?.companyName ? (
        <span className={styles.name}>{userInfo?.companyInfo?.companyName || ''}</span>
      ) : null}
      {token && token.length > 0 ? (
        <Icon type="exit" className={styles.icon} onClick={handleLogout} />
      ) : (
        <Link to="/user/login2" className={styles.link}>
          登录
        </Link>
      )}
    </div>
  );
};

export default React.memo(RightContent);

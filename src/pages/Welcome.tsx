import React from 'react';
import { Result, Image } from 'antd';
import styles from './Welcome.less';

const Welcome: React.FC = () => (
  <div className={styles.wrap}>
    <Result icon={<Image src="/welcome.svg" preview={false} />} title="欢迎进入通用设备管理系统" />
  </div>
);

export default Welcome;

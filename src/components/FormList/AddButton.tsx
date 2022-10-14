import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from 'antd';
import type { ButtonProps } from 'antd/es/button';
import React from 'react';
import styles from './AddButton.less';

const AddButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button {...props} type="dashed" icon={<PlusOutlined />} className={styles.addButton}>
    {children}
  </Button>
);

export default AddButton;

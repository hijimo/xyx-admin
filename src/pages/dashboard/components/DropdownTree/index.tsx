import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Tree } from 'antd';
import type { DeviceGroupSSD } from '@/types';
import Icon from '@/components/Icon';
import styles from './index.less';

interface DropdownTreeProps {
  className?: string;
  flex?: boolean;
  onSelect?: (selectedKeys?: React.Key[]) => void;
  data?: DeviceGroupSSD[];
}

const fieldNames = {
  title: 'name',
  key: 'code',
  children: 'children',
};
const DropdownTree: React.FC<DropdownTreeProps> = ({
  className,
  onSelect,
  data,
  ...otherProps
}) => {
  const [visible, setVisible] = useState<boolean>(true);

  // 防止没键盘，用鼠标操作。
  const handleClick: React.MouseEventHandler<HTMLSpanElement> = useCallback(() => {
    setVisible((v) => !v);
  }, []);

  return (
    <div className={classNames(styles.dropdownTree, className)}>
      <div className={styles.label} onClick={handleClick}>
        设备空间
        <Icon type="arrow-top-circle" className={styles.icon} />
      </div>
      <div className={classNames(styles.container, visible && styles.show)}>
        <Tree
          showLine
          selectable
          onSelect={onSelect}
          treeData={data || []}
          fieldNames={fieldNames}
          // selectedKeys={selectedKeys}
          icon={false}
          // defaultExpandAll
          className={styles.tree}
          {...otherProps}
        />
      </div>
    </div>
  );
};

export default React.memo(DropdownTree);

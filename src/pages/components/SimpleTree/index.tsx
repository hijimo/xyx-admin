import React from 'react';
import classNames from 'classnames';
import QuickList from './components/QuickList';
import { Radio } from 'antd';
import TreeItem from './components/TreeItem';
import type { DeviceGroupSSD } from '@/types';
import styles from './index.less';

interface SimpleTreeProps {
  className?: string;
  data: DeviceGroupSSD[];
  defaultExpandAll?: boolean;
  onNodeClick?: (data: DeviceGroupSSD, checked?: boolean) => void;
  onItemDelete?: (data: DeviceGroupSSD) => void;
  onItemAdd?: (data: DeviceGroupSSD) => void;
}

const SimpleTree: React.FC<SimpleTreeProps> = ({
  className,
  data,
  defaultExpandAll = false,
  onNodeClick,
  onItemDelete,
  onItemAdd,
  ...otherProps
}) => {
  return (
    <Radio.Group {...otherProps}>
      <QuickList
        className={classNames(styles.treeItem, className)}
        dataSource={data || []}
        gutter={0}
        column={1}
        renderItem={(it: DeviceGroupSSD) => (
          <TreeItem
            defaultExpand={defaultExpandAll}
            data={it}
            onAdd={onItemAdd}
            onDelete={onItemDelete}
            onNodeClick={onNodeClick}
          />
        )}
      />
    </Radio.Group>
  );
};

export default SimpleTree;

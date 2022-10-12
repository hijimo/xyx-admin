import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import Icon from '@/components/Icon';
import QuickList from './QuickList';
import { Radio } from 'antd';
import { BooleanEnum } from '@/enum';
import type { DeviceGroupSSD } from '@/types';
import styles from './TreeItem.less';

interface TreeItemProps {
  className?: string;
  data: DeviceGroupSSD;
  defaultExpand?: boolean;
  onNodeClick?: (data: DeviceGroupSSD, checked?: boolean) => void;
  onDelete?: (data: DeviceGroupSSD) => void;
  onAdd?: (data: DeviceGroupSSD) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
  className,
  data,
  defaultExpand = false,
  onNodeClick,
  onDelete,
  onAdd,
}) => {
  const [expand, setExpand] = useState<boolean>(defaultExpand);

  const handleToggle = useCallback(() => {
    if (data?.hasChildren) {
      setExpand((e) => !e);
    }
  }, [data]);
  const handleRadioChange = useCallback(
    (v) => {
      onNodeClick?.(data, v);
    },
    [data, onNodeClick],
  );
  const handleAdd = useCallback(
    (e) => {
      onAdd?.(data);
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    [data, onAdd],
  );
  const handleDelete = useCallback(
    (e) => {
      onDelete?.(data);
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    [data, onDelete],
  );
  return (
    <div className={classNames(styles.treeItem, className)}>
      <div className={styles.treeNode}>
        {/* 只要拥有children的才显示icon */}
        {data?.hasChildren === BooleanEnum.TRUE && data?.children?.length > 0 && (
          <Icon
            onClick={handleToggle}
            type={expand ? 'tree-expand' : 'tree-collapse'}
            className={styles.icon}
          />
        )}
        <Radio className={styles.title} value={data.code} onChange={handleRadioChange}>
          {data.name}
        </Radio>
        <PlusOutlined className={styles.add} onClick={handleAdd} />
        <DeleteOutlined className={styles.delete} onClick={handleDelete} />
      </div>
      {data?.hasChildren === BooleanEnum.TRUE && expand && (
        <QuickList
          className={styles.children}
          dataSource={data.children || []}
          gutter={0}
          column={1}
          renderItem={(it: any) => (
            <TreeItem
              defaultExpand={defaultExpand}
              data={it}
              onNodeClick={onNodeClick}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          )}
        />
      )}
    </div>
  );
};

export default TreeItem;

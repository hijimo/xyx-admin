import produce from 'immer';
import _values from 'lodash/values';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Modal } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import type { CustomerLevelSSD } from '@/types';
import defaultColumns from './columns';
import styles from './index.less';

interface CustomerLevelTableListProps {
  onChange?: (val: CustomerLevelSSD[]) => void;
  value?: CustomerLevelSSD[];
}

const CustomerLevelTableList: React.FC<CustomerLevelTableListProps> = ({ onChange, value }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<CustomerLevelSSD[]>();

  const columns = useMemo(() => {
    return _values(
      produce(defaultColumns, (draft) => {
        draft.option!.render = (_, record, index, action) => {
          return [
            <a
              key="editable"
              onClick={() => {
                action?.startEditable?.(record.id);
              }}
            >
              编辑
            </a>,
            <a
              key="delete"
              onClick={() => {
                Modal.confirm({
                  title: '确定删除该客户等级吗？',
                  onOk: () => {
                    onChange?.(dataSource!.filter((item, idx) => idx !== index));
                  },
                });
              }}
            >
              删除
            </a>,
          ];
        };
      }),
    );
  }, [dataSource, onChange]);

  const handleChange = useCallback(
    (records: CustomerLevelSSD[]) => {
      onChange?.(records);
    },
    [onChange],
  );

  useEffect(() => {
    setDataSource(value);
  }, [value]);

  return (
    <>
      <EditableProTable<any>
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
        }}
        recordCreatorProps={{
          record: () => ({
            id: Date.now(),
          }),
        }}
        onChange={handleChange}
        rowKey="id"
        maxLength={6}
        columns={columns}
        value={dataSource}
        className={styles.content}
      />
    </>
  );
};

export default React.memo(CustomerLevelTableList);

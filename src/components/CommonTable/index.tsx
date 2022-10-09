import React, { useState, useCallback } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import ProTable from '@ant-design/pro-table';
import type { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender';
import type { ProTableProps } from '@ant-design/pro-table';

export { default as ColumnEllipsisWrap } from './ColumnEllipsisWrap';

export interface CommonTableProps<T, U> extends ProTableProps<T, U> {}

const scroll: { x: true } = { x: true };

const search: SearchConfig = { labelWidth: 'auto', defaultCollapsed: false };

const CommonTable = <T, U extends Record<string, any> = Record<string, never>>(
  props: CommonTableProps<T, U>,
) => {
  const [size, setSize] = useState<SizeType>('large');

  const handleSizeChange = useCallback((s: SizeType) => setSize(s), []);

  return (
    <ProTable
      scroll={scroll}
      search={search}
      rowKey="id"
      tableAlertRender={false}
      rowSelection={false}
      columnEmptyText="--"
      revalidateOnFocus={false}
      size={size}
      onSizeChange={handleSizeChange}
      {...props}
    />
  );
};

const MemodCommonTable = React.memo(CommonTable) as typeof CommonTable;

export default MemodCommonTable;

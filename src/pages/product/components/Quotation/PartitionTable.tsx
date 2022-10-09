import React, { useMemo } from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import _values from 'lodash/values';
import { produce } from 'immer';
import type { ColumnProps } from 'antd/es/table';
import type { TableProps } from 'antd/es/table/index';
import type { PartitionCountryData } from '@/types';
import { ProjectType } from '@/enum';

interface PartitionTableProps extends TableProps<any> {
  onDelete?: (item: any) => void;
  onEdit?: (item: any) => void;
  readonly?: boolean;
}

export interface PartitionTableData extends PartitionCountryData {
  rowSpan?: boolean;
  partitionName?: string;
  /**
   * 前端生成的唯一id
   */
  partitionCode: string;
  countryList: PartitionCountryData[];
}

const tableColumns: Record<string, ColumnProps<PartitionTableData>> = {
  partitionName: {
    title: '分区名称',
    dataIndex: 'partitionName',
    key: 'partitionName',
    className: 'nowrap',
    onCell: (record) => {
      return {
        rowSpan: record.rowSpan ? record.countryList.length : 0,
      };
    },
  },
  countryName: {
    title: '国家名称',
    dataIndex: 'countryName',
    key: 'countryName',
    className: 'nowrap',
  },
  countryCode: {
    title: '国家代码',
    dataIndex: 'countryCode',
    key: 'countryCode',
    className: 'nowrap',
  },
  projectTypeText: {
    title: '方案类型',
    dataIndex: 'projectTypeText',
    key: 'projectTypeText',
    className: 'nowrap',
  },
  projectValText: {
    title: '城市/邮编',
    dataIndex: 'projectValText',
    key: 'projectValText',
    ellipsis: true,
    className: 'nowrap',
    render: (_, record) => {
      if (record.projectType === ProjectType.COUNTRY) return '--';
      return record.projectValText?.join?.('、') || record.projectVal?.join?.('、') || '--';
    },
  },
  option: {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    className: 'nowrap',
  },
};

const PartitionTable: React.FC<PartitionTableProps> = ({
  onDelete,
  onEdit,
  readonly,
  ...props
}) => {
  // 这个columns 会根据 传入的data 的改变而改变。
  // 因为会有很多的行合并

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.onCell = (record) => ({
          rowSpan: record.rowSpan ? record.countryList.length : 0,
        });

        draft.option!.render = (_, row) => {
          return (
            <>
              <a onClick={() => onEdit?.(row)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title={`确定要删除${row?.partitionName}吗`}
                onConfirm={() => onDelete?.(row)}
              >
                <a>删除</a>
              </Popconfirm>
            </>
          );
        };
        if (readonly === true) {
          delete draft.option;
        }
      }),
    );
  }, [onDelete, onEdit, readonly]);

  return <Table {...props} rowKey="rowKey" columns={columns} />;
};

export default PartitionTable;

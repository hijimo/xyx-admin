import type { ProColumns } from '@ant-design/pro-table';
import { InputNumber } from 'antd';

const defaultColumns: Record<string, ProColumns<any>> = {
  name: {
    title: '等级名称',
    dataIndex: 'name',
    className: 'nowrap',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入等级名称',
        },
      ],
    },
  },
  discountRate: {
    title: '折扣率',
    dataIndex: 'discountRate',
    className: 'nowrap',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入折扣率',
        },
      ],
    },
    renderFormItem: (_, row) => (
      <InputNumber defaultValue={row.value} precision={2} max={100} min={0.01} />
    ),
  },
  option: {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    className: 'nowrap',
  },
};

export default defaultColumns;

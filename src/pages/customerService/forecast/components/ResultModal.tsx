import React, { useState, useImperativeHandle, useMemo } from 'react';
import _unionBy from 'lodash/unionBy';
import { Modal } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import type { ModalProps } from 'antd/es/modal';
import CommonTable, { ColumnEllipsisWrap } from '@/components/CommonTable';
import type { ExcelImportSuccessSSD } from '@/types';
import { SuccessEnumDesc, SuccessEnum } from '@/enum';

interface ResultModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {}

export interface RefResultModalProps {
  show: (importSuccessData?: ExcelImportSuccessSSD) => void;
  hide: () => void;
}

const columns: ProColumns[] = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    search: false,
    render: (_) => <ColumnEllipsisWrap width={40}>{_}</ColumnEllipsisWrap>,
  },
  {
    title: '运单号',
    dataIndex: 'waybillNo',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'status',
    className: 'nowrap',
    valueEnum: SuccessEnumDesc,
    search: false,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    className: 'nowrap',
    search: false,
    ellipsis: true,
    width: 200,
    render: (_) => <ColumnEllipsisWrap>{_}</ColumnEllipsisWrap>,
  },
];

const InternalResultModal = (
  { onCancel, ...otherProps }: ResultModalProps,
  ref: React.Ref<RefResultModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<ExcelImportSuccessSSD>();

  const dataSource = useMemo(() => {
    if (record) {
      const result = [
        ...record.failDtoList?.map((it) => ({
          ...it,
          status: SuccessEnum.FAIL,
        })),
        ...record.successDtoList?.map((it) => ({
          ...it,
          status: SuccessEnum.SUCCESS,
        })),
      ];

      return _unionBy(result, 'waybillNo')?.map((it, idx) => ({
        ...it,
        id: idx + 1,
      }));
    }
    return [];
  }, [record]);

  useImperativeHandle(ref, () => ({
    show: (item) => {
      if (item) {
        setRecord(item);
      } else {
        setRecord(undefined);
      }

      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  return (
    <Modal
      title="导入结果"
      {...otherProps}
      maskClosable={false}
      visible={visible}
      cancelText="关闭"
      onCancel={() => {
        setVisible(false);
      }}
      okButtonProps={{
        style: {
          display: 'none',
        },
      }}
      width={780}
      destroyOnClose
    >
      <CommonTable
        search={false}
        toolBarRender={false}
        pagination={{ pageSize: 6 }}
        dataSource={dataSource}
        columns={columns}
      />
    </Modal>
  );
};

const ResultModal = React.forwardRef(InternalResultModal) as (
  props: ResultModalProps & { ref?: React.Ref<RefResultModalProps> },
) => React.ReactElement;

export default ResultModal;

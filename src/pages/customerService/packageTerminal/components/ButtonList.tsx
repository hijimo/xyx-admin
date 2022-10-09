import _every from 'lodash/every';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { Modal, Button, message, Space } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PackageState } from '@/enum';
import type { PackageListItemSSD } from '@/types';
import type { ResponseData } from '@/utils/request';
import {
  abandonPackageTerminal,
  outPackageTerminal,
  cancelOutPackageTerminal,
} from '@/services/packageTerminal';

interface OperationButtonType {
  name: string;
  key: string;
  api: (params: { idList: number[] }) => Promise<ResponseData<any>>;
}

const OperationButtonList: OperationButtonType[] = [
  { name: '废弃', key: 'abandon', api: abandonPackageTerminal },
  { name: '批量签出', key: 'checkOut', api: outPackageTerminal },
  { name: '批量撤销签出', key: 'undoCheckOut', api: cancelOutPackageTerminal },
];

interface ButtonListProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
  selectedRowList: PackageListItemSSD[];
}

const ButtonList = ({ onSuccess, selectedRowList }: ButtonListProps) => {
  const [operation, setOperation] = useState<OperationButtonType>();

  const { mutate } = useMutation((idList: number[]) => operation!.api({ idList }), {
    onSuccess: () => {
      message.success('操作成功');
      onSuccess?.();
    },
  });

  const handleSelected = useCallback(
    (item: OperationButtonType) => {
      setOperation(item);
      const isAllInStorage = _every(selectedRowList, (row) => row.state === PackageState.INSTORAGE);
      const isAllOutStorage = _every(
        selectedRowList,
        (row) => row.state === PackageState.OUTSTORAGE,
      );
      if (item.key === 'abandon' && !isAllInStorage) {
        message.error('仅已入库包裹才能废弃');
        return;
      }
      if (item.key === 'checkOut' && !isAllInStorage) {
        message.error('仅已入库包裹才能签出');
        return;
      }
      if (item.key === 'undoCheckOut' && !isAllOutStorage) {
        message.error('仅已出库包裹才能撤销签出');
        return;
      }
      Modal.confirm({
        title: item.name,
        icon: <ExclamationCircleOutlined />,
        content: `确认${item.name}选中包裹吗?`,
        onOk: () => mutate(selectedRowList.map((i) => i.id)),
      });
    },
    [selectedRowList, mutate],
  );

  return (
    <Space>
      {OperationButtonList.map((item) => (
        <Button
          onClick={() => handleSelected(item)}
          disabled={selectedRowList.length === 0}
          key={item.key}
          type="primary"
        >
          {item.name}
        </Button>
      ))}
    </Space>
  );
};

export default ButtonList;

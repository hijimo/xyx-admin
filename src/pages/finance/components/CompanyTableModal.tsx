import _values from 'lodash/values';
import _map from 'lodash/map';
import _includes from 'lodash/includes';
import React, { useRef, useCallback, useImperativeHandle, useState, useMemo } from 'react';
import { Modal, Space } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import type { Key } from 'antd/lib/table/interface';
import type { ModalProps } from 'antd/es/modal';
import type { ActionType } from '@ant-design/pro-table';
import { CompanyType } from '@/enum';
import type { PackageListItemSSD } from '@/types';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { customerFilterColumns } from '@/pages/configurify/columns';
import { getProviderList } from '@/services/provider';

interface CompanyTableModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSelect?: (rows: DefaultOptionType[]) => void;
}

export interface RefCompanyTableModalProps {
  show: (value: DefaultOptionType[]) => void;
  hide: () => void;
}

const columns = _values(customerFilterColumns);

const InternalCompanyTableModal = (
  { onCancel, onSelect, ...otherProps }: CompanyTableModalProps,
  ref: React.Ref<RefCompanyTableModalProps>,
) => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [selectedRowList, setSelectedRowList] = useState<PackageListItemSSD[]>([]);

  const fetchData = useTableRequest(getProviderList, () => {
    return {
      companyType: CompanyType.CUSTOMER,
    };
  });

  useImperativeHandle(ref, () => ({
    show: (value) => {
      const keys = value?.map((item: DefaultOptionType) => item.value!) || [];
      setSelectedKeys(keys);
      setSelectedRowList(selectedRowList.filter((item) => _includes(keys, item.id)));
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const clearSelected = useCallback(() => {
    actionRef?.current?.clearSelected?.();
  }, [actionRef]);

  const onChange = useCallback((selectedKeyList: Key[], selectedList: PackageListItemSSD[]) => {
    setSelectedKeys(selectedKeyList);
    setSelectedRowList(selectedList);
  }, []);

  const rowSelection = useMemo(() => {
    return {
      selectedRowList,
      selectedRowKeys: selectedKeys,
      preserveSelectedRowKeys: true,
      onChange,
    };
  }, [selectedRowList, selectedKeys, onChange]);

  const handleOk = useCallback(() => {
    onSelect?.(
      _map(selectedRowList, (item: PackageListItemSSD) => ({
        label: item.companyName,
        value: item.id,
      })),
    );
    setVisible(false);
  }, [selectedRowList, onSelect]);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const tableAlertRender = useCallback(({ selectedRowKeys, onCleanSelected }) => {
    return (
      <Space size="large">
        <span>已选 {selectedRowKeys?.length} 项</span>
        <a onClick={onCleanSelected}>取消选择</a>
      </Space>
    );
  }, []);

  return (
    <Modal
      title="选择客户"
      {...otherProps}
      onOk={handleOk}
      visible={visible}
      onCancel={handleCancel}
      width={900}
    >
      <CommonTable
        actionRef={actionRef}
        request={fetchData}
        pagination={{ pageSize: 10 }}
        columns={columns}
        rowSelection={rowSelection}
        tableAlertOptionRender={false}
        tableAlertRender={tableAlertRender}
        onReset={clearSelected}
        onSubmit={clearSelected}
      />
    </Modal>
  );
};
const CompanyTableModal = React.forwardRef(InternalCompanyTableModal) as (
  props: CompanyTableModalProps & { ref?: React.Ref<RefCompanyTableModalProps> },
) => React.ReactElement;

export default CompanyTableModal;

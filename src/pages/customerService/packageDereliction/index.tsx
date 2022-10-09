import _values from 'lodash/values';
import _flatten from 'lodash/flatten';
import { produce } from 'immer';
import { Link } from 'umi';
import React, { useRef, useMemo, useCallback } from 'react';
// import { useMutation } from 'react-query';
import { /*  Button,  */ Space /* message, Modal */ } from 'antd';
import type { FormInstance } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PackageStateSearchMap } from '@/enum';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
// import type { PackageListItemSSD } from '@/types';
import { getPackageDerelictionList /* , deletePackageDereliction */ } from '@/services/package';
import { convertRangeToBeginEnd } from '@/utils/helper';
import { packageDerelictionColumns } from '@/pages/configurify/columns';
import BindCustomerModal from './components/BindCustomerModal';
import type { RefBindCustomerModalProps } from './components/BindCustomerModal';

// const { confirm } = Modal;

const PackageDereliction: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const bindCustomerModalRef = useRef<RefBindCustomerModalProps>(null);

  /*   const [selectedRowList, setSelectedRowList] = useState<PackageListItemSSD[]>([]);

  const onChange = useCallback((_, selectedList: any) => {
    setSelectedRowList(selectedList);
  }, []);

  const rowSelection = useMemo(() => {
    return { selectedRowList, preserveSelectedRowKeys: true, onChange };
  }, [selectedRowList, onChange]); */

  const formatParams = (params: any) => {
    const { rangeTime, state } = params;
    return {
      ...convertRangeToBeginEnd(rangeTime, 'rangeTime', 'gmtCreate'),
      stateList: _flatten([PackageStateSearchMap[state]]),
      state: undefined,
    };
  };

  const clearSelected = useCallback(() => {
    actionRef?.current?.clearSelected?.();
  }, [actionRef]);

  const reloadList = useCallback(() => {
    clearSelected();
    actionRef?.current?.reload();
  }, [actionRef, clearSelected]);

  /*   const { mutate } = useMutation((values: { ids: number[] }) => deletePackageDereliction(values), {
    onSuccess: () => {
      message.success('删除成功');
      reloadList();
    },
  }); */

  /*   const handleDelete = useCallback(
    (rows: PackageListItemSSD[]) => {
      confirm({
        title: '确定删除选中的无主包裹吗？',
        icon: <ExclamationCircleOutlined />,
        onOk() {
          mutate({ ids: rows?.map((item) => item.id) });
        },
        onCancel() {
          clearSelected();
        },
      });
    },
    [mutate, clearSelected],
  ); */

  /*   const handleBind = useCallback(
    (rows?: PackageListItemSSD[]) => {
      bindCustomerModalRef.current?.show(rows);
    },
    [bindCustomerModalRef],
  ); */

  const fetchData = useTableRequest(getPackageDerelictionList, (params) => {
    return formatParams(params);
  });

  const columns = useMemo(() => {
    return _values(
      produce(packageDerelictionColumns, (draft) => {
        draft.option!.width = 100;
        draft.uniqueNo!.search = false;
        draft.option!.render = (_, item) => (
          <Link to={`/customerService/packageDereliction/${item.id}`} target="_blank">
            详情
          </Link>
        );
      }),
    );
  }, []);

  /* const toolBarRender: any = useCallback(() => {
    return (
      <>
        <Button
          onClick={() => handleDelete(selectedRowList || [])}
          disabled={selectedRowList?.length === 0}
          key="delete"
          type="primary"
        >
          删除
        </Button>
        <Button
          onClick={() => handleBind(selectedRowList)}
          disabled={selectedRowList?.length === 0}
          key="bind"
          type="primary"
        >
          关联客户和线路
        </Button>
      </>
    );
  }, [handleBind, selectedRowList, handleDelete]); */

  const tableAlertRender = useCallback(({ selectedRows, onCleanSelected }) => {
    return (
      <Space size="large">
        <span>已选 {selectedRows?.length} 项</span>
        <a onClick={onCleanSelected}>取消选择</a>
      </Space>
    );
  }, []);

  return (
    <>
      <PageContainer>
        <CommonTable
          actionRef={actionRef}
          formRef={formRef}
          request={fetchData}
          columns={columns}
          rowKey="id"
          // toolBarRender={toolBarRender}
          rowSelection={false}
          tableAlertRender={tableAlertRender}
          tableAlertOptionRender={false}
          onReset={clearSelected}
          onSubmit={clearSelected}
        />
      </PageContainer>
      <BindCustomerModal ref={bindCustomerModalRef} onSuccess={reloadList} />
    </>
  );
};

export default PackageDereliction;

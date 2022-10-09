import _values from 'lodash/values';
import { produce } from 'immer';
import { Link, useLocation, useAccess, Access } from 'umi';
import type { Location } from 'umi';
import React, { useMemo, useCallback, useRef } from 'react';
import { Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { CompanyType } from '@/enum';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { customerColumns } from '@/pages/configurify/columns';
import { getProviderList } from '@/services/provider';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const CustomerIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefAddModalProps>(null);
  const { query }: Location = useLocation();

  const access: any = useAccess();

  const initialBelongSaler = query?.belongSaler;

  const fetchData = useTableRequest(getProviderList, () => {
    return {
      companyType: CompanyType.CUSTOMER,
    };
  });

  const handleAddOrEdit = useCallback(
    (id?: number, check?: boolean) => {
      addModalRef.current?.show(id, check);
    },
    [addModalRef],
  );

  const columns = useMemo(() => {
    return _values(
      produce(customerColumns, (draft) => {
        draft.belongSaler!.initialValue = initialBelongSaler;
        draft.option!.render = (_, item) => {
          return (
            <>
              <a onClick={() => handleAddOrEdit(item.id, true)}>查看</a>
              <Access key="edit" accessible={access?.MODIFY_CUSTOMER}>
                <Divider type="vertical" />
                <a onClick={() => handleAddOrEdit(item.id)}>编辑</a>
                <Divider type="vertical" />
                <Link to={`/finance/customerBillDetail?companyId=${item.id}`} target="_blank">
                  结算明细
                </Link>
              </Access>
            </>
          );
        };
      }),
    );
  }, [handleAddOrEdit, initialBelongSaler, access?.MODIFY_CUSTOMER]);

  const toolBarRender = useCallback(
    () => [
      <Access key="add" accessible={access?.MODIFY_CUSTOMER}>
        <Button type="primary" onClick={() => handleAddOrEdit()} key="add">
          <PlusOutlined /> 新增
        </Button>
      </Access>,
    ],
    [handleAddOrEdit, access?.MODIFY_CUSTOMER],
  );

  return (
    <PageContainer>
      <CommonTable
        actionRef={actionRef}
        request={fetchData}
        columns={columns}
        rowKey="id"
        toolBarRender={toolBarRender}
      />
      <AddModal
        ref={addModalRef}
        onSuccess={() => {
          actionRef?.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default CustomerIndex;

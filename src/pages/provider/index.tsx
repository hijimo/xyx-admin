import _values from 'lodash/values';
import { produce } from 'immer';
import { Link, useAccess, Access } from 'umi';
import React, { useMemo, useCallback, useRef } from 'react';
import { Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import { CompanyType } from '@/enum';
import CommonTable from '@/components/CommonTable';
import { companyColumns } from '@/pages/configurify/columns';
import { getProviderList } from '@/services/provider';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const ProviderIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefAddModalProps>(null);

  const access: any = useAccess();

  const fetchData = useTableRequest(getProviderList, () => {
    return {
      tabType: CompanyType.COMPANY,
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
      produce(companyColumns, (draft) => {
        draft.option!.render = (_, item) => {
          return (
            <>
              <a onClick={() => handleAddOrEdit(item.id, true)}>查看</a>
              <Access key="edit" accessible={access?.MODIFY_COMPANY}>
                <Divider type="vertical" />
                <a onClick={() => handleAddOrEdit(item.id)}>编辑</a>
                <Divider type="vertical" />
                <Link to={`/finance/serviceBillDetail?companyId=${item.id}`} target="_blank">
                  结算明细
                </Link>
              </Access>
            </>
          );
        };
      }),
    );
  }, [handleAddOrEdit, access?.MODIFY_COMPANY]);

  const toolBarRender = useCallback(
    () => [
      <Access key="add" accessible={access?.MODIFY_COMPANY}>
        <Button type="primary" onClick={() => handleAddOrEdit()} key="add">
          <PlusOutlined /> 新增
        </Button>
      </Access>,
    ],
    [handleAddOrEdit, access?.MODIFY_COMPANY],
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

export default ProviderIndex;

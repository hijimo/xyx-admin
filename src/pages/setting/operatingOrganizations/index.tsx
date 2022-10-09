import _values from 'lodash/values';
import { produce } from 'immer';
import React, { useRef, useMemo, useCallback } from 'react';
import { Button } from 'antd';
import type { FormInstance } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import type { OperatingOrganizationsItemSSD } from '@/types';
import { getOperatingOrganizationList } from '@/services/setting';
import { operatingOrganizationsColumns } from '@/pages/configurify/columns';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const OperatingOrganizations: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const bindCustomerModalRef = useRef<RefAddModalProps>(null);

  const reloadList = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleAddOrEdit = useCallback(
    (item?: OperatingOrganizationsItemSSD) => {
      bindCustomerModalRef.current?.show(item);
    },
    [bindCustomerModalRef],
  );

  const fetchData = useTableRequest(getOperatingOrganizationList, (params) => params);

  const columns = useMemo(() => {
    return _values(
      produce(operatingOrganizationsColumns, (draft) => {
        draft.option!.width = 100;
        draft.option!.render = (_, item) => <a onClick={() => handleAddOrEdit(item)}>编辑</a>;
      }),
    );
  }, [handleAddOrEdit]);

  const toolBarRender: any = useCallback(() => {
    return (
      <>
        <Button onClick={() => handleAddOrEdit()} key="bind" type="primary">
          <PlusOutlined /> 新增
        </Button>
      </>
    );
  }, [handleAddOrEdit]);

  return (
    <>
      <PageContainer>
        <CommonTable
          actionRef={actionRef}
          formRef={formRef}
          request={fetchData}
          columns={columns}
          rowKey="id"
          toolBarRender={toolBarRender}
          tableAlertOptionRender={false}
          search={false}
        />
      </PageContainer>
      <AddModal ref={bindCustomerModalRef} onSuccess={reloadList} />
    </>
  );
};

export default OperatingOrganizations;

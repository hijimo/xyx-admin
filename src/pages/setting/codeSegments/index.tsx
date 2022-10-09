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
import { getCodeSegmentsList } from '@/services/codeSetting';
import { codeSegmentsColumns } from '@/pages/configurify/columns';
import AddCodeModal from './components/AddCodeModal';
import type { RefAddCodeModalProps } from './components/AddCodeModal';

const CodeSegments: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const bindCustomerModalRef = useRef<RefAddCodeModalProps>(null);

  const reloadList = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleAddOrEdit = useCallback(
    (id?: number) => {
      bindCustomerModalRef.current?.show(id);
    },
    [bindCustomerModalRef],
  );

  const fetchData = useTableRequest(getCodeSegmentsList);

  const columns = useMemo(() => {
    return _values(
      produce(codeSegmentsColumns, (draft) => {
        draft.option!.width = 100;
        draft.option!.render = (_, item) => <a onClick={() => handleAddOrEdit(item.id)}>编辑</a>;
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
        />
      </PageContainer>
      <AddCodeModal ref={bindCustomerModalRef} onSuccess={reloadList} />
    </>
  );
};

export default CodeSegments;

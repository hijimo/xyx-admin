import _values from 'lodash/values';
import React, { useRef, useCallback } from 'react';
import { Button } from 'antd';
import type { FormInstance } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { ImportOutlined } from '@ant-design/icons';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { getCodePoolList } from '@/services/codeSetting';
import { codePoolColumns } from '@/pages/configurify/columns';
import ImportModal from './components/ImportModal';
import type { RefImportModalProps } from './components/ImportModal';

const columns = _values(codePoolColumns);

const CodePool: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const importModalRef = useRef<RefImportModalProps>(null);

  const reloadList = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const handleImport = useCallback(() => {
    importModalRef.current?.show();
  }, [importModalRef]);

  const fetchData = useTableRequest(getCodePoolList);

  const toolBarRender: any = useCallback(() => {
    return (
      <>
        <Button icon={<ImportOutlined />} type="primary" onClick={() => handleImport()}>
          导入
        </Button>
      </>
    );
  }, [handleImport]);

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
      <ImportModal ref={importModalRef} onSuccess={reloadList} />
    </>
  );
};

export default CodePool;

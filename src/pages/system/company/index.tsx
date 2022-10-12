import _values from 'lodash/values';
import { produce } from 'immer';
import React, { useMemo, useCallback, useRef } from 'react';
import { Divider, Button, message } from 'antd';
import { Link } from 'umi';
import { useHistory } from 'umi';
import { useMutation } from 'react-query';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { SwitchEnum } from '@/enum';
import { getCompanyList, updateCompanyState } from '@/services/company';
import defaultColumns from './columns';

const tableColumns = defaultColumns;

const CompanyIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const history = useHistory();

  const fetchData = useTableRequest(getCompanyList);

  const { mutate } = useMutation((id: number) => updateCompanyState(id), {
    onSuccess: () => {
      message.success('操作成功');
      actionRef.current?.reload();
    },
  });

  const handleAdd = useCallback(() => {
    history.push('/system/company/add');
  }, []);
  const handleUpdateState = useCallback(
    (id: number) => {
      mutate(id);
    },
    [mutate],
  );

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, item) => {
          return (
            <>
              <Link to={`/system/company/${item.id}`}>查看</Link>
              <Divider type="vertical" />
              <Link to={`/system/company/${item.id}/edit`}>编辑</Link>
              <Divider type="vertical" />
              <a onClick={() => handleUpdateState(item.id)}>
                {item.state === SwitchEnum.DISABLED ? '启用' : '禁用'}
              </a>
            </>
          );
        };
      }),
    );
  }, [handleUpdateState]);

  const toolBarRender = useCallback(
    () => [
      <Button type="primary" onClick={handleAdd} key="add">
        <PlusOutlined /> 新增
      </Button>,
    ],
    [handleAdd],
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
    </PageContainer>
  );
};

export default CompanyIndex;

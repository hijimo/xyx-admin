import React, { useRef, useMemo, useCallback } from 'react';
import _values from 'lodash/values';
import { produce } from 'immer';
import { useMutation } from 'react-query';
import { Link } from 'umi';
import { Modal, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { DictSSD } from '@/types';
import { getDictList, deleteDict } from '@/services/dict';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { dictColumns } from '@/pages/configurify/columns';

const tableColumns = dictColumns;

const DictIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const submitSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  const { mutate: deletetListItem } = useMutation((id: number) => deleteDict(id), {
    onSuccess: () => {
      message.success('操作成功');
      submitSuccess?.();
    },
  });

  const deleteItem = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '删除用户确认',
        content: '确认删除该用户？',
        okText: '确认',
        cancelText: '取消',
        okType: 'danger',
        onOk: () => {
          deletetListItem(id);
        },
      });
    },
    [deletetListItem],
  );

  const fetchDate = useTableRequest(getDictList);

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        draft.option!.render = (_, record: DictSSD) => {
          return (
            <>
              <Link to={`/system/dict/${record.dictType}/edit`}>编辑</Link>
            </>
          );
        };
      }),
    );
  }, [deleteItem]);

  return (
    <PageContainer>
      <CommonTable rowKey="id" actionRef={actionRef} request={fetchDate} columns={columns} />
    </PageContainer>
  );
};

export default DictIndex;

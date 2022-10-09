import produce from 'immer';
import _values from 'lodash/values';
import { Link } from 'umi';
import React, { useCallback, useMemo, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { useMutation } from 'react-query';
import { Card, Divider, Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { FreightListItemSSD } from '@/types';
import CommonTable from '@/components/CommonTable';
import useTableRequest from '@/hooks/useTableRequest';
import { miscellaneousFeesColumns } from '@/pages/configurify/columns';
import { deleteMiscellaneousFees, getMiscellaneousFeesByProductId } from '@/services/freight';
import AddMiscellaneousFeesModal from '@/pages/product/components/AddMiscellaneousFeesModal';
import type { RefAddMiscellaneousFeesModalProps } from '@/pages/product/components/AddMiscellaneousFeesModal';

interface MiscellaneousFeesInfoProps {
  channelId: number | string;
}

const MiscellaneousFeesInfo: React.FC<MiscellaneousFeesInfoProps> = ({ channelId }) => {
  const addModalRef = useRef<RefAddMiscellaneousFeesModalProps>(null);
  const actionRef = useRef<ActionType>();

  const handleAddOrEdit = useCallback(
    (item?: FreightListItemSSD) => {
      addModalRef.current?.show(item);
    },
    [addModalRef],
  );

  const { mutate } = useMutation((id: number) => deleteMiscellaneousFees(id), {
    onSuccess: () => {
      message.success('操作成功');
      actionRef.current?.reload();
    },
  });

  const handleConfirm = useCallback(
    (id: number) => {
      mutate(id);
    },
    [mutate],
  );

  const fetchData = useTableRequest(getMiscellaneousFeesByProductId, () => ({
    id: channelId,
  }));

  const columns = useMemo(() => {
    return _values(
      produce(miscellaneousFeesColumns, (draft) => {
        draft.option!.render = (_, item) => {
          return (
            <>
              <a onClick={() => handleAddOrEdit(item)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title={`确定${item.enableFlag === 1 ? '禁用' : '启用'}${item.expenseItemName}？`}
                onConfirm={() => handleConfirm(item.id)}
              >
                <a>{item.enableFlag === 1 ? '禁用' : '启用'}</a>
              </Popconfirm>
              <Divider type="vertical" />
              <Link
                to={`/product/serviceChannel/${channelId}/offers/${item.id}/expenses/${item.expenseItem}/mfQuotes`}
              >
                报价设置
              </Link>
            </>
          );
        };
      }),
    );
  }, [handleAddOrEdit, handleConfirm, channelId]);

  return (
    <>
      <Card
        title="杂费报价"
        extra={
          <Button type="primary" onClick={() => handleAddOrEdit()}>
            <PlusOutlined />
            新增杂费
          </Button>
        }
      >
        <CommonTable
          search={false}
          actionRef={actionRef}
          toolBarRender={false}
          request={fetchData}
          columns={columns}
          rowKey="id"
        />
      </Card>
      <AddMiscellaneousFeesModal
        productId={channelId}
        ref={addModalRef}
        onSuccess={() => {
          actionRef.current?.reload();
        }}
      />
    </>
  );
};

export default React.memo(MiscellaneousFeesInfo);

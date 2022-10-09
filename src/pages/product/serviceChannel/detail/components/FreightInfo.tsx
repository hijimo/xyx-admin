import produce from 'immer';
import _values from 'lodash/values';
import { Link } from 'umi';
import React, { useCallback, useMemo, useRef } from 'react';
import { useMutation } from 'react-query';
import { Card, Divider, Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { FreightListItemSSD, ServiceChannelDetailSSD } from '@/types';
import CommonTable from '@/components/CommonTable';
import { freightColumns } from '@/pages/configurify/columns';
import { enableFreightItem } from '@/services/freight';
import AddFreightModal from '@/pages/product/components/AddFreightModal';
import type { RefAddFreightModalProps } from '@/pages/product/components/AddFreightModal';

interface FreightInfoProps {
  data?: ServiceChannelDetailSSD;
  channelId: number | string;
  onSuccess: () => void;
}

const FreightInfo: React.FC<FreightInfoProps> = ({ data, channelId, onSuccess }) => {
  const addModalRef = useRef<RefAddFreightModalProps>(null);

  const handleAddOrEdit = useCallback(
    (item?: FreightListItemSSD) => {
      addModalRef.current?.show(item);
    },
    [addModalRef],
  );

  const { mutate } = useMutation((id: number) => enableFreightItem({ id }), {
    onSuccess: () => {
      message.success('操作成功');
      onSuccess?.();
    },
  });

  const handleConfirm = useCallback(
    (id: number) => {
      mutate(id);
    },
    [mutate],
  );

  const columns = useMemo(() => {
    return _values(
      produce(freightColumns, (draft) => {
        draft.option!.render = (_, item) => {
          return (
            <>
              <a onClick={() => handleAddOrEdit(item)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title={`确定${item.state === 1 ? '禁用' : '启用'}${item.expenseItemName}？`}
                onConfirm={() => handleConfirm(item.id)}
              >
                <a>{item.state === 1 ? '禁用' : '启用'}</a>
              </Popconfirm>
              <Divider type="vertical" />
              <Link
                to={`/product/serviceChannel/${channelId}/offers/${item.id}/expenses/${item.expenseItem}/quotes`}
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
        title="费用项报价"
        extra={
          <Button type="primary" onClick={() => handleAddOrEdit()}>
            <PlusOutlined />
            新增费用项
          </Button>
        }
      >
        <CommonTable
          columns={columns}
          rowKey="id"
          search={false}
          pagination={false}
          options={false}
          dataSource={data?.billingOffers || []}
        />
      </Card>
      <AddFreightModal
        productId={data?.id}
        productType={1}
        ref={addModalRef}
        onSuccess={() => {
          onSuccess?.();
        }}
      />
    </>
  );
};

export default React.memo(FreightInfo);

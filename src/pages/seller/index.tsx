import produce from 'immer';
import _values from 'lodash/values';
import { Link, Access, useAccess } from 'umi';
import React, { useRef, useCallback, useMemo } from 'react';
import { Button, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import type { SellerListItemSSD } from '@/types';
import { sellerColumns } from '@/pages/configurify/columns';
import { getSellerList } from '@/services/seller';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const SellerListIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addModalRef = useRef<RefAddModalProps>(null);
  const access: any = useAccess();

  const handleAdd = useCallback(
    (item?: SellerListItemSSD) => {
      addModalRef.current?.show(item);
    },
    [addModalRef],
  );

  const toolBarRender = useCallback(
    () => [
      <Access key="add" accessible={access?.MODIFY_SELLER}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()}>
          添加销售员
        </Button>
      </Access>,
    ],
    [handleAdd, access?.MODIFY_SELLER],
  );

  const fetchData = useTableRequest(getSellerList, (params) => params);

  const columns = useMemo(() => {
    return _values(
      produce(sellerColumns, (draft) => {
        draft.userEmail!.search = false;
        draft.state!.search = false;
        draft.option!.render = (_, item) => (
          <>
            <Access key="edit" accessible={access?.MODIFY_SELLER}>
              <a onClick={() => handleAdd(item)}>编辑</a>
            </Access>
            {item.customerCount > 0 && (
              <>
                {access?.MODIFY_SELLER && <Divider type="vertical" />}
                <Link to={`/customer?belongSaler=${item.userNo}`} target="_blank">
                  查看客户
                </Link>
              </>
            )}
          </>
        );
      }),
    );
  }, [handleAdd, access?.MODIFY_SELLER]);

  const handleSuccess = useCallback(() => {
    actionRef?.current?.reload();
  }, [actionRef]);

  return (
    <>
      <PageContainer>
        <CommonTable
          toolBarRender={toolBarRender}
          actionRef={actionRef}
          request={fetchData}
          columns={columns}
        />
      </PageContainer>
      <AddModal ref={addModalRef} onSuccess={handleSuccess} />
    </>
  );
};

export default SellerListIndex;

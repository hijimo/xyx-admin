import _values from 'lodash/values';
import { produce } from 'immer';
import { useParams } from 'umi';
import moment from 'moment';
import React, { useMemo, useCallback, useRef } from 'react';
import { Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { getMiscellaneousFeesQuotes } from '@/services/quote';
import type { MiscellaneousFeesQuotesParams } from '@/types';
import { miscellaneousFeeChannelQuoteColumns } from '@/pages/configurify/columns/routeProductColumns';
import { convertRangeToStartEnd } from '@/utils/helper';
import { BooleanEnum } from '@/enum';
import AddModal from './components/AddModal';
import type { RefAddModalProps } from './components/AddModal';

const tableColumns = miscellaneousFeeChannelQuoteColumns;

const QuoteListIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const addModalRef = useRef<RefAddModalProps>(null);

  const { offerId, channelId }: { channelId: string; offerId: string; expenseId: string } =
    useParams();

  const reloadTableData = useCallback(() => {
    actionRef.current?.reload();
  }, []);

  const fetchData = useTableRequest(
    getMiscellaneousFeesQuotes,
    (params: MiscellaneousFeesQuotesParams & { gmtCreate?: undefined | [string, string] }) => {
      const { gmtCreate } = params;
      return {
        id: offerId,
        ...convertRangeToStartEnd(gmtCreate, 'gmtCreate'),
      };
    },
  );

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        (draft.gmtCreate.search as boolean) = true;

        draft.option!.render = (_, item) => {
          return (
            <>
              {item.validFlag !== BooleanEnum.TRUE && (
                <>
                  <a
                    onClick={() => {
                      addModalRef.current?.show({
                        ...item,
                        gmtValid: item.gmtValid ? moment(item.gmtValid) : undefined,
                      });
                    }}
                  >
                    编辑
                  </a>
                  <Divider type="vertical" />
                </>
              )}

              <a
                onClick={() => {
                  addModalRef.current?.show({
                    ...item,
                    id: undefined,
                    gmtValid: undefined,
                  });
                }}
              >
                复制
              </a>
            </>
          );
        };
      }),
    );
  }, []);

  const toolBarRender = useCallback(
    () => [
      <Button
        type="primary"
        onClick={() => {
          addModalRef.current?.show();
        }}
        key="add"
      >
        <PlusOutlined /> 新增
      </Button>,
    ],
    [],
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
        channelId={channelId}
        onSuccess={reloadTableData}
        miscellaneousFeesId={offerId}
        ref={addModalRef}
      />
    </PageContainer>
  );
};

export default QuoteListIndex;

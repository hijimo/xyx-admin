import _values from 'lodash/values';
import { produce } from 'immer';
import { useParams, useHistory } from 'umi';
import React, { useMemo, useCallback, useRef } from 'react';
import { Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import useTableRequest from '@/hooks/useTableRequest';
import CommonTable from '@/components/CommonTable';
import { getChannelOfferDetailList } from '@/services/quote';
import { BooleanEnum, ChannelProductType } from '@/enum';
import QuoteModal from '@/pages/finance/components/QuoteModal';
import type { RefQuoteModalProps } from '@/pages/finance/components/QuoteModal';
import { quoteColumns } from '@/pages/configurify/columns/routeProductColumns';
import { convertRangeToStartEnd } from '@/utils/helper';

const tableColumns = quoteColumns;

const QuoteListIndex: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const quoteModalRef = useRef<RefQuoteModalProps>(null);

  const {
    routeId,
    offerId,
    expenseId: expenseItem,
  }: { routeId: string; offerId: string; expenseId: string } = useParams();

  const history = useHistory();

  const fetchData = useTableRequest(getChannelOfferDetailList, (params) => {
    const { gmtCreate } = params;
    return {
      expenseItem: expenseItem,
      productId: routeId,
      productType: ChannelProductType.Line,
      ...convertRangeToStartEnd(gmtCreate, 'gmtCreate'),
    };
  });

  const columns = useMemo(() => {
    return _values(
      produce(tableColumns, (draft) => {
        (draft.gmtCreate.search as boolean) = true;
        draft.option!.render = (_, item) => {
          return (
            <>
              <a
                onClick={() => {
                  history.push(
                    `/product/routeProduct/${routeId}/offers/${item.id}/expenses/${expenseItem}/quotes/detail`,
                  );
                }}
              >
                查看
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  quoteModalRef.current?.show(item);
                }}
              >
                报价详情
              </a>
              {item.validFlag !== BooleanEnum.TRUE && (
                <>
                  <Divider type="vertical" />
                  <a
                    onClick={() => {
                      history.push(
                        `/product/routeProduct/${routeId}/offers/${item.id}/expenses/${expenseItem}/quotes/edit`,
                      );
                    }}
                  >
                    编辑
                  </a>
                </>
              )}

              <Divider type="vertical" />
              <a
                onClick={() => {
                  history.push(
                    `/product/routeProduct/${routeId}/offers/${item.id}/expenses/${expenseItem}/quotes/add?copyId=${offerId}`,
                  );
                }}
              >
                复制
              </a>
            </>
          );
        };
      }),
    );
  }, [history, routeId, expenseItem, offerId]);

  const toolBarRender = useCallback(
    () => [
      <Button
        type="primary"
        onClick={() => {
          history.push(
            `/product/routeProduct/${routeId}/offers/${offerId}/expenses/${expenseItem}/quotes/add`,
          );
        }}
        key="add"
      >
        <PlusOutlined /> 新增
      </Button>,
    ],
    [expenseItem, history, offerId, routeId],
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
      <QuoteModal ref={quoteModalRef} title="报价详情" />
    </PageContainer>
  );
};

export default QuoteListIndex;

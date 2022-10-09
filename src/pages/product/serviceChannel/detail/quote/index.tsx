import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { useParams, useLocation } from 'umi';
import Quotation from '@/pages/product/components/Quotation';
import type { Location } from 'umi';

const RouteProductQuote: React.FC = () => {
  const { offerId, quoteNo }: { offerId: string; quoteNo: string } = useParams();
  const { query }: Location = useLocation();

  const isAdded = quoteNo === 'add';
  const isReadonly = quoteNo === 'detail';

  return (
    <PageContainer>
      <Card>
        <Quotation
          id={offerId}
          copyId={query?.copyId as string | undefined}
          readonly={isReadonly}
          isAdded={isAdded}
        />
      </Card>
    </PageContainer>
  );
};

export default RouteProductQuote;

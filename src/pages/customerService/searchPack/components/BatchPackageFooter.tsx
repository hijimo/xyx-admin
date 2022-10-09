import React, { useImperativeHandle } from 'react';
import { useMutation } from 'react-query';
import { Space, Spin } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import type { BatchStatisticsParams } from '@/types';
import EmptyWrap from '@/components/EmptyWrap';
import { getBatchStatistics } from '@/services/batch';

export interface BatchPackageFooterProps {}

export interface RefBatchPackageFooterProps {
  getStatistics: (params?: BatchStatisticsParams) => void;
}

const InternalBatchPackageFooter = (
  props: BatchPackageFooterProps,
  ref: React.Ref<RefBatchPackageFooterProps>,
) => {
  const { isLoading, data, mutate } = useMutation((params?: BatchStatisticsParams) =>
    getBatchStatistics(params),
  );

  useImperativeHandle(ref, () => ({
    getStatistics: (params) => {
      mutate(params);
    },
  }));

  return (
    <FooterToolbar
      extra={
        <Spin spinning={isLoading}>
          <Space size="large">
            <span>
              包裹总数: <EmptyWrap value={data?.data.totalPiece} />
            </span>
            <span>
              包裹总重: <EmptyWrap value={data?.data.packageTotalWeight} />
            </span>
            <span>
              预报总重: <EmptyWrap value={data?.data.forecastWeight} />
            </span>
            <span>
              体积重: <EmptyWrap value={data?.data.volumeWeight} />
            </span>
          </Space>
        </Spin>
      }
    />
  );
};

const BatchPackageFooter = React.forwardRef(InternalBatchPackageFooter) as (
  props: BatchPackageFooterProps & { ref?: React.Ref<RefBatchPackageFooterProps> },
) => React.ReactElement;

export default BatchPackageFooter;

import React, { useImperativeHandle } from 'react';
import { useMutation } from 'react-query';
import { Space, Spin } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import type { PackageStatisticsParams } from '@/types';
import EmptyWrap from '@/components/EmptyWrap';
import { getTransportPackageStatistics } from '@/services/package';

export interface PackageFooterProps {}

export interface RefPackageFooterProps {
  getStatistics: (params?: PackageStatisticsParams) => void;
}

const InternalPackageFooter = (
  props: PackageFooterProps,
  ref: React.Ref<RefPackageFooterProps>,
) => {
  const { isLoading, data, mutate } = useMutation((params?: PackageStatisticsParams) =>
    getTransportPackageStatistics(params),
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

const PackageFooter = React.forwardRef(InternalPackageFooter) as (
  props: PackageFooterProps & { ref?: React.Ref<RefPackageFooterProps> },
) => React.ReactElement;

export default PackageFooter;

import _values from 'lodash/values';
import React, { useCallback, useMemo, useRef } from 'react';
import { Card, Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { EditOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import type {
  AddRouteProductCoverageParams,
  RouteProductDetailSSD,
  PartitionCountryData,
} from '@/types';
import { editRouteProductCoverage } from '@/services/routeProduct';
import { coverageColumns } from '@/pages/configurify/columns';
import PartitionModal from '@/pages/product/components/Quotation/PartitionModal';
import type { RefPartitionModalProps } from '@/pages/product/components/Quotation/PartitionModal';

const columns = _values(coverageColumns);

interface CoverageInfoProps {
  data?: RouteProductDetailSSD;
  onSuccess: () => void;
}

const CoverageInfo: React.FC<CoverageInfoProps> = ({ data, onSuccess }) => {
  const modalRef = useRef<RefPartitionModalProps>(null);

  const handleAddOrEdit = useCallback(() => {
    modalRef.current?.show({
      id: 11111,
      partitionName: '',
      rowKey: 11,
      countryList: data?.areaDtoList?.map((it) => ({
        ...it,
        countryId: it.caCountryId,
        projectVal: it.projectValList,

        rowKey: it.id,
      })),
    });
  }, [modalRef, data]);

  const { mutate } = useMutation(
    (values: AddRouteProductCoverageParams) => editRouteProductCoverage(values),
    {
      onSuccess: () => {
        message.success('修改成功');
        onSuccess?.();
      },
    },
  );

  const handleSubmit = useCallback(
    (values) => {
      mutate({
        areaVoList: values.countryList?.map((c: PartitionCountryData) => ({
          caCountryId: c.countryId,
          id: c.id,
          projectType: c.projectType,
          projectValList: c.projectVal,
        })),
        cpId: data?.id,
      });
    },
    [data, mutate],
  );

  const detail = useMemo(() => data?.areaDtoList || [], [data]);

  return (
    <>
      <Card
        title="覆盖区域"
        extra={
          <Button type="primary" onClick={() => handleAddOrEdit()}>
            <EditOutlined />
            编辑覆盖区域
          </Button>
        }
      >
        <ProTable
          columns={columns}
          rowKey="id"
          search={false}
          dateFormatter="string"
          options={false}
          dataSource={detail}
          pagination={false}
        />
      </Card>
      <PartitionModal
        ref={modalRef}
        onSubmit={handleSubmit}
        showPartition={false}
        title="编辑覆盖区域"
      />
    </>
  );
};

export default React.memo(CoverageInfo);

import React, { useImperativeHandle } from 'react';
import { useQuery } from 'react-query';
import SimpleTree from '@/pages/components/SimpleTree';
import type { DeviceGroupSSD } from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import { getDeviceGroupTree } from '@/services/deviceGroup';

interface DeviceGroupTreeProps {
  companyNo?: string;
  className?: string;
  defaultExpandAll?: boolean;
  onDataReady?: (data: DeviceGroupSSD[]) => void;
  onNodeClick?: (data: DeviceGroupSSD, checked?: boolean) => void;
  onItemDelete?: (data: DeviceGroupSSD) => void;
  onItemAdd?: (data: DeviceGroupSSD) => void;
}

export interface RefDeviceGroupTreeProps {
  refetch: () => void;
}

const InternalDeviceGroupTree = (
  { companyNo, onDataReady, onItemAdd, onItemDelete, ...props }: DeviceGroupTreeProps,
  ref: RefDeviceGroupTreeProps,
) => {
  const { data, refetch } = useQuery(
    ['getDeviceGroupTree', { companyNo }],
    () => getDeviceGroupTree({ strVal: companyNo! }),
    {
      select: (d: ResponseData<PaginationData<DeviceGroupSSD[]>>) => d.data,
      enabled: !!companyNo,
      onSuccess: (d) => {
        onDataReady?.(d);
      },
    },
  );
  useImperativeHandle(ref, () => ({
    refetch: () => {
      refetch();
    },
  }));

  return <SimpleTree data={data} onItemAdd={onItemAdd} onItemDelete={onItemDelete} {...props} />;
};

const DeviceGroupTree = React.forwardRef(InternalDeviceGroupTree) as (
  props: DeviceGroupTreeProps & { ref?: React.Ref<RefDeviceGroupTreeProps> },
) => React.ReactElement;

export default DeviceGroupTree;

import React, { useMemo } from 'react';
import type { ProductCountData } from '@/types';
import Card from '../Card';
import DeviceProductPieChart from '../charts/DeviceProductPieChart';
import styles from './DeviceProductCard.less';

interface DeviceProductCardProps {
  data: ProductCountData[];
}
const DeviceProductCard: React.FC<DeviceProductCardProps> = ({ data }) => {
  const dt = useMemo(() => {
    return (
      data?.map((it) => ({
        name: it.productName,
        value: it.totalCount,
      })) || []
    );
  }, [data]);

  return (
    <Card
      className={styles.deviceProductCard}
      title="产品设备数"
      enTitle="Number of Devices Per Product"
    >
      <DeviceProductPieChart data={dt} />
    </Card>
  );
};

export default DeviceProductCard;

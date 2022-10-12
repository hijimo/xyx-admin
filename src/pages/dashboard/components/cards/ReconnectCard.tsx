import React, { useMemo } from 'react';
import type { GroupRankData } from '@/types';
import Card from '../Card';
import NetReconnectBarChart from '../charts/NetReconnectBarChart';
import styles from './ReconnectCard.less';

interface ReconnectCardProps {
  data?: GroupRankData[];
}
const ReconnectCard: React.FC<ReconnectCardProps> = ({ data }) => {
  const dt = useMemo(() => {
    return (
      data?.map((it) => ({
        name: it.groupName,
        value: it.totalCount,
      })) || []
    );
  }, [data]);

  return (
    <Card className={styles.reconnectCard} title="设备分组排名" enTitle="Devices Grouping Ranking">
      <NetReconnectBarChart data={dt} />
    </Card>
  );
};

export default ReconnectCard;

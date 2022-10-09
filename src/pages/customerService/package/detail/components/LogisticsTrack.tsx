import { Timeline, Space, Empty } from 'antd';
import type { LogisticsTrackSSD } from '@/types';
import EmptyWrap from '@/components/EmptyWrap';
import styles from './LogisticsTrack.less';

interface LogisticsTrackProps {
  data: LogisticsTrackSSD[];
}

const LogisticsTrack = ({ data }: LogisticsTrackProps) => {
  return data?.length > 0 ? (
    <Timeline className={styles.timeline}>
      {data?.map((item, idx) => (
        <Timeline.Item key={idx}>
          <Space size={20}>
            <EmptyWrap value={item.trackComment} />
            <EmptyWrap value={item.happenPlace} />
            <EmptyWrap value={item.happenTime} />
            {item.remark ? (
              <div className={styles.wrap}>
                <EmptyWrap value={`轨迹描述：${item.remark}`} />
              </div>
            ) : null}
          </Space>
        </Timeline.Item>
      ))}
    </Timeline>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

export default LogisticsTrack;

import React from 'react';
import { Tag, Descriptions } from 'antd';
import EmptyWrap from '@/components/EmptyWrap';
import styles from './index.less';

interface TypeTagsProps {
  data: string[];
}

const TypeTags: React.FC<TypeTagsProps> = ({ data }) => {
  return (
    <Descriptions className={styles.content}>
      <Descriptions.Item>
        {data?.length > 0 ? (
          <div className={styles.tagContainer}>
            {data?.map((item, idx) => (
              <Tag key={idx} className={styles.tag}>
                {item}
              </Tag>
            ))}
          </div>
        ) : (
          <EmptyWrap />
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default React.memo(TypeTags);

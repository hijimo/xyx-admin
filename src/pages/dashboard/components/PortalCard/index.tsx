import React from 'react';
import { createPortal } from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import { Card, Descriptions, Button, Badge } from 'antd';
import type { DeviceSSD } from '@/types';
import styles from './index.less';

interface Position {
  left: number | string;
  top: number | string;
}
interface Data extends Position {
  device: DeviceSSD;
}
interface PortalCardProps {
  onCancel: () => void;
  data?: Data;
  style?: any;
}

const PortalCard: React.FC<PortalCardProps> = ({ data, onCancel, style }) => {
  console.log('data', data);
  return createPortal(
    <div
      className={styles.portalCard}
      style={{
        ...style,
        left: data?.left,
        top: data?.top,
      }}
    >
      <Card bordered={false}>
        <CloseOutlined onClick={() => onCancel()} className={styles.close} />
        <Descriptions
          title={
            <div>
              {data?.device?.aliasName}{' '}
              <Badge
                className={styles.badge}
                status={data?.device?.onlineStatus === 'online' ? 'success' : 'default'}
                text={data?.device?.onlineStatusText}
              />
            </div>
          }
          column={2}
        >
          <Descriptions.Item label="企业名称" span={2}>
            {data?.device?.companyName}
          </Descriptions.Item>
          <Descriptions.Item label="省" span={1}>
            {data?.device?.provinceName}
          </Descriptions.Item>
          <Descriptions.Item label="市" span={1}>
            {data?.device?.cityName}
          </Descriptions.Item>
          <Descriptions.Item label="设备编号" span={1}>
            {data?.device?.name}
          </Descriptions.Item>
          <Descriptions.Item label="状态" span={1}>
            {data?.device?.statusText}
          </Descriptions.Item>
        </Descriptions>
        <div className={styles.buttonBar}>
          <Button className={styles.button} type="primary" onClick={onCancel}>
            关闭
          </Button>
        </div>
      </Card>
    </div>,
    document.body,
  );
};

export default PortalCard;

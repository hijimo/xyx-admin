import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Switch, message } from 'antd';
import { useMutation } from 'react-query';
import { bulkUpdateShowFlag } from '@/services/device';
import type { DeviceMetaSSD, ShowFlagUpdateData } from '@/types';
import type { SwitchChangeEventHandler } from 'antd/es/switch';
import styles from './index.less';

interface MetaItemProps {
  className?: string;
  data?: DeviceMetaSSD;
  onSuccess?: () => void;
}

const MetaItem: React.FC<MetaItemProps> = ({ className, data, onSuccess }) => {
  const { isLoading, mutate } = useMutation((d: ShowFlagUpdateData) => bulkUpdateShowFlag(d), {
    onSuccess: () => {
      message.success('操作成功');
      onSuccess?.();
    },
  });
  const handleChange: SwitchChangeEventHandler = useCallback(
    (checked) => {
      mutate({
        deviceCode: data?.deviceCode || '',
        showFlagVos: [
          {
            metaKey: data!.metaKey,
            showFlag: checked ? 1 : 0,
          },
        ],
      });
    },
    [data],
  );
  //
  return (
    <div className={classNames(styles.metaItem, className)}>
      <div className={styles.label}>{data?.metaName}</div>
      <div className={styles.text}>
        {data?.metaValue || '--'}
        {data?.metaUnit || ''}
      </div>
      <Switch
        className={styles.switch}
        loading={isLoading}
        checkedChildren="显示"
        onChange={handleChange}
        unCheckedChildren="隐藏"
        defaultChecked={data?.showFlag}
      />
    </div>
  );
};

export default React.memo(MetaItem) as typeof MetaItem;

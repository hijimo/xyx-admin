import React, { useState, useImperativeHandle, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Modal, List, Image, Space } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import { EyeOutlined } from '@ant-design/icons';
import { ossImageProcess } from '@/utils/imageProcess';
import defaultImg from '@/assets/default.png';
import EmptyWrap from '@/components/EmptyWrap';
import { PackageResultTypeDesc } from '@/enum';
import { getHandleAbnormalHistory } from '@/services/package';
import styles from './HandleHistoryModal.less';

interface HandleHistoryModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {}

export interface RefHandleHistoryModalProps {
  show: (item: number) => void;
  hide: () => void;
}

const InternalHandleHistoryModal = (
  { onCancel, ...otherProps }: HandleHistoryModalProps,
  ref: React.Ref<RefHandleHistoryModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<number>();

  const queryClient = useQueryClient();

  useImperativeHandle(ref, () => ({
    show: (item) => {
      queryClient.invalidateQueries(['handleAbnormalHistory', id]);
      setId(item);
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const { data, isLoading } = useQuery(
    ['handleAbnormalHistory', id],
    () => getHandleAbnormalHistory(id),
    {
      enabled: !!id,
      select: (d) => d.data,
    },
  );

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  return (
    <Modal
      title="处理历史"
      {...otherProps}
      visible={visible}
      destroyOnClose
      onCancel={handleCancel}
      footer={false}
      className={styles.modal}
    >
      <List
        size="large"
        bordered
        dataSource={data}
        loading={isLoading}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={item.creator}
              description={
                <>
                  <div>
                    处理结果：
                    <EmptyWrap
                      value={PackageResultTypeDesc[item?.resultType]?.text}
                      type="secondary"
                    />
                  </div>
                  {item.remark && (
                    <div>
                      备注：
                      <EmptyWrap value={item.remark} type="secondary" />
                    </div>
                  )}
                  {item?.handleFileList?.length > 0 && (
                    <div>
                      附件：
                      <Image.PreviewGroup>
                        <Space>
                          {item?.handleFileList?.map((i, index) => (
                            <Image
                              key={index}
                              src={ossImageProcess(i.url || '')}
                              fallback={defaultImg}
                              preview={{ src: i.url, mask: <EyeOutlined /> }}
                            />
                          ))}
                        </Space>
                      </Image.PreviewGroup>
                    </div>
                  )}
                  <div>{item.gmtCreate}</div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

const HandleHistoryModal = React.forwardRef(InternalHandleHistoryModal) as (
  props: HandleHistoryModalProps & { ref?: React.Ref<RefHandleHistoryModalProps> },
) => React.ReactElement;

export default HandleHistoryModal;

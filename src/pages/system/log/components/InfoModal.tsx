import React, { useCallback, useState, useImperativeHandle } from 'react';
import { Modal, Button, Descriptions } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { LogSSD } from '@/types';
import { NormalStatusDesc, BusinessTypeDesc } from '@/enum';
import EmptyWrap from '@/components/EmptyWrap';

interface InfoModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {
  onSuccess: () => void;
}

export interface RefInfoModalProps {
  show: (item?: LogSSD) => void;
  hide: () => void;
}

const InternalInfoModal = (
  { onCancel, onSuccess, ...otherProps }: InfoModalProps,
  ref: React.Ref<RefInfoModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<LogSSD>();

  useImperativeHandle(ref, () => ({
    show: (item) => {
      if (item) {
        setRecord(item);
      } else {
        setRecord(undefined);
      }
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  return (
    <Modal
      title="操作信息"
      {...otherProps}
      visible={visible}
      width={900}
      onCancel={handleCancel}
      destroyOnClose
      footer={
        <>
          <Button type="default" onClick={handleCancel}>
            关闭
          </Button>
        </>
      }
    >
      <Descriptions column={3}>
        <Descriptions.Item label="操作模块">
          <EmptyWrap value={record?.title} />
        </Descriptions.Item>
        <Descriptions.Item label="发生时间">
          <EmptyWrap value={record?.gmtCreate} />
        </Descriptions.Item>
        <Descriptions.Item label="业务类型">
          <EmptyWrap value={BusinessTypeDesc[record?.businessType]?.text} />
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          {record?.status ? NormalStatusDesc[record?.status].text : '--'}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="操作者信息">
        <Descriptions.Item label="企业名称">
          <EmptyWrap value={record?.companyName} />
        </Descriptions.Item>
        <Descriptions.Item label="组织名称">
          <EmptyWrap value={record?.deptName} />
        </Descriptions.Item>
        <Descriptions.Item label="操作人类别">
          <EmptyWrap value={record?.operatorTypeText} />
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="请求信息">
        <Descriptions.Item label="请求IP">
          <EmptyWrap value={record?.operIp} />
        </Descriptions.Item>
        <Descriptions.Item label="请求方法" span={2}>
          <EmptyWrap value={record?.method} />
        </Descriptions.Item>
        <Descriptions.Item label="请求方式">
          <EmptyWrap value={record?.requestMethod} />
        </Descriptions.Item>
        <Descriptions.Item label="请求地址" span={2}>
          <EmptyWrap value={record?.operUrl} />
        </Descriptions.Item>
        <Descriptions.Item label="请求参数" span={3}>
          <EmptyWrap value={record?.operParam} />
        </Descriptions.Item>

        <Descriptions.Item label="返回参数" span={3}>
          <EmptyWrap value={record?.jsonResult} />
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="错误信息">
        <Descriptions.Item label="JSON" span={3}>
          <EmptyWrap value={record?.errorMsg} />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

const InfoModal = React.forwardRef(InternalInfoModal) as (
  props: InfoModalProps & { ref?: React.Ref<RefInfoModalProps> },
) => React.ReactElement;

export default InfoModal;

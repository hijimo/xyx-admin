import _some from 'lodash/some';
import React, { useState, useImperativeHandle, useCallback } from 'react';
import { useQuery } from 'react-query';
import { Modal, Image } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import type { ProColumns } from '@ant-design/pro-table';
import { PackageStateDesc } from '@/enum';
import { ossImageProcess } from '@/utils/imageProcess';
import CommonTable from '@/components/CommonTable';
import EmptyWrap from '@/components/EmptyWrap';
import type { PackageInfoSSD } from '@/types';
import { getPackageInfo } from '@/services/package';
import defaultImg from '@/assets/default.png';

const columns: ProColumns<any>[] = [
  {
    title: '包裹唯一号',
    dataIndex: 'uniqueNo',
  },
  {
    title: '包裹状态',
    dataIndex: 'stateText',
    className: 'nowrap',
    render: (_, record) => (
      <EmptyWrap
        value={
          _some([2, 4, 6], (item) => item === record?.state)
            ? PackageStateDesc[2].text
            : record?.stateText
        }
      />
    ),
  },
  {
    title: '预报重量(KG)',
    dataIndex: 'forecastWeight',
  },
  {
    title: '入库重量(KG)',
    dataIndex: 'weight',
  },
  {
    title: '长*宽*高(cm)',
    dataIndex: 'volume',
  },
  {
    title: '入库图片',
    dataIndex: 'packagePic',
    render: (_, record: PackageInfoSSD) =>
      record?.packagePic ? (
        <Image
          key={record?.packagePic}
          src={ossImageProcess(record?.packagePic)}
          fallback={defaultImg}
          preview={{ src: record?.packagePic }}
          width={60}
          height={60}
        />
      ) : (
        '--'
      ),
  },
];

export interface PackageInfoModalProps
  extends Omit<ModalProps, 'visible' | 'onOk' | 'confirmLoading' | 'destroyOnClose'> {}

export interface RefPackageInfoModalProps {
  show: (id: number) => void;
  hide: () => void;
}

const InternalPackageInfoModal = (
  { onCancel }: PackageInfoModalProps,
  ref: React.Ref<RefPackageInfoModalProps>,
) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<number>();

  useImperativeHandle(ref, () => ({
    show: (recordId: number) => {
      setId(recordId);
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const { data, isFetching } = useQuery(['packageInfo', id], () => getPackageInfo({ id: id! }), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const handleCancel = useCallback(
    (e) => {
      setVisible(false);
      onCancel?.(e);
    },
    [onCancel],
  );

  return (
    <Modal title="包裹详情" footer={null} visible={visible} onCancel={handleCancel} width={800}>
      <CommonTable
        rowKey="id"
        bordered
        dataSource={data || []}
        columns={columns}
        pagination={false}
        loading={isFetching}
        search={false}
        toolBarRender={false}
      />
    </Modal>
  );
};

const PackageInfoModal = React.forwardRef(InternalPackageInfoModal) as (
  props: PackageInfoModalProps & { ref?: React.Ref<RefPackageInfoModalProps> },
) => React.ReactElement;

export default PackageInfoModal;

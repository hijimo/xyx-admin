import { useMemo } from 'react';
import { Image, Space } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import type { PackageDetailSSD, GoodsInfoSSD } from '@/types';
import { ossImageProcess } from '@/utils/imageProcess';
import CommonTable from '@/components/CommonTable';
import EmptyWrap from '@/components/EmptyWrap';
import defaultImg from '@/assets/default.png';

const columns: ProColumns<any>[] = [
  {
    title: '中文品名',
    dataIndex: 'goodsNameCn',
    className: 'nowrap',
  },
  {
    title: '英文品名',
    dataIndex: 'goodsNameEn',
    className: 'nowrap',
  },
  {
    title: '件数',
    dataIndex: 'goodsNum',
    className: 'nowrap',
  },
  {
    title: '申报价值',
    dataIndex: 'goodsPriceText',
    className: 'nowrap',
    render: (_, record) => <EmptyWrap value={record?.goodsPrice} suffix={record?.goodsCurrency} />,
  },
  {
    title: '商品图片',
    dataIndex: 'goodsPic',
    className: 'nowrap',
    width: 100,
    render: (_, record: GoodsInfoSSD) =>
      record?.goodsPic ? (
        <Image
          src={ossImageProcess(record?.goodsPic)}
          width={60}
          height={60}
          fallback={defaultImg}
          preview={{ src: record?.goodsPic }}
        />
      ) : (
        <EmptyWrap />
      ),
  },
];

interface GoodsInfoProps {
  data?: PackageDetailSSD;
}

const GoodsInfo = ({ data }: GoodsInfoProps) => {
  const goodsInfo = useMemo(() => {
    return data?.itemDtos;
  }, [data]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <CommonTable
        rowKey="id"
        bordered
        dataSource={goodsInfo || []}
        columns={columns}
        pagination={false}
        toolBarRender={false}
        search={false}
      />
      {data?.packagePic && (
        <>
          入库图片:
          <Image
            src={ossImageProcess(data?.packagePic)}
            width={100}
            height={100}
            fallback={defaultImg}
            preview={{ src: data?.packagePic }}
          />
        </>
      )}
    </Space>
  );
};

export default GoodsInfo;

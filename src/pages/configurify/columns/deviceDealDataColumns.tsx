import type { ProColumns } from '@ant-design/pro-table';
import type { DeviceDealDataSSD, DeviceMetaSSD } from '@/types';
import { Popover, Descriptions } from 'antd';
import AddressCascader from '@/pages/components/AddressCascader';
import { key, companyNo, companyName, rangeTime, gmtCreate } from './baseColumns';

const cityName: ProColumns = {
  title: '城市',
  dataIndex: 'cityName',
  hideInTable: true,
  className: 'nowrap',
  search: false,
};

// 设备编号取deviceName的值，
const deviceCode: ProColumns = {
  title: '设备编号',
  dataIndex: 'deviceName',
  className: 'nowrap',
};
// 设备名称改为设备别名，取aliasName的值。
const deviceName: ProColumns = {
  title: '设备别名',
  dataIndex: 'aliasName',
  className: 'nowrap',
};
const metaData: ProColumns = {
  title: '协议传输数据',
  dataIndex: 'metaData',
  className: 'nowrap',
  width: 200,
  // ellipsis: true,
  render: (_) => {
    try {
      const dt: DeviceMetaSSD[] = JSON.parse(_);

      return (
        <Popover
          trigger="click"
          content={
            <Descriptions style={{ width: 600 }} title="运行状态">
              {dt.map((it) => (
                <Descriptions.Item label={it.metaName}>
                  {it.metaValue}
                  {it.metaUnit}
                </Descriptions.Item>
              ))}
            </Descriptions>
          }
        >
          <a style={{ width: 200, wordWrap: 'break-word', wordBreak: 'break-word' }}>查看</a>
        </Popover>
      );
    } catch (e) {
      return (
        <div style={{ width: 200, wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {_ || '--'}
        </div>
      );
    }
  },
  search: false,
  tooltip: false,
};
const address: ProColumns = {
  title: '区域',
  dataIndex: 'areas',
  className: 'nowrap',
  hideInTable: true,
  search: false,
  renderFormItem: () => <AddressCascader valueType="name" placeholder="省市区" changeOnSelect />,
};
const productKey: ProColumns = {
  title: '产品唯一标识',
  dataIndex: 'productKey',
  className: 'nowrap',
};
const provinceName: ProColumns = {
  title: '省份',
  dataIndex: 'provinceName',
  hideInTable: true,
  className: 'nowrap',
  search: false,
};
export const deviceDealDataColumns: Record<string, ProColumns<DeviceDealDataSSD>> = {
  key,
  companyNo,
  companyName,
  productKey,
  deviceCode,
  deviceName,
  address,
  provinceName,
  cityName,
  rangeTime: {
    ...rangeTime,
    title: '产生时间起止',
  },
  metaData,
  gmtCreate: {
    ...gmtCreate,
    title: '产生时间',
  },
  // option,
};

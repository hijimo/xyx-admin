import type { ProColumns } from '@ant-design/pro-table';
import type { DeviceSSD } from '@/types';
import AddressCascader from '@/pages/components/AddressCascader';
import { DeviceStatusDesc } from '@/enum';
import { key, option, companyNo, companyName, gmtCreate, deviceModal } from './baseColumns';

// 对于设备
// code 字段是阿里云 id
// name才是设备编号
const code: ProColumns = {
  title: '设备名称',
  dataIndex: 'name',
  className: 'nowrap',
};
const aliasName: ProColumns = {
  title: '设备别名',
  dataIndex: 'aliasName',
  className: 'nowrap',
};
// 对于物模型，name 是名称
const name: ProColumns = {
  title: '名称',
  dataIndex: 'name',
  className: 'nowrap',
};

// 对于物模型，code就是编号
const modelCode: ProColumns = {
  title: '编号',
  dataIndex: 'code',
  className: 'nowrap',
};

const address: ProColumns = {
  title: '区域',
  dataIndex: 'areas',
  className: 'nowrap',
  hideInTable: true,
  renderFormItem: () => <AddressCascader valueType="name" placeholder="省市区" changeOnSelect />,
};

const provinceName: ProColumns = {
  title: '省/市',
  dataIndex: 'provinceName',
  className: 'nowrap',
  search: false,
  renderText: (_, record) => [record.provinceName || '--', record.cityName || '--'].join('/'),
};
const cityName: ProColumns = {
  title: '城市',
  dataIndex: 'cityName',
  className: 'nowrap',
  hideInTable: true,
  search: false,
};
const latitude: ProColumns = {
  title: '坐标',
  dataIndex: 'latitude',
  className: 'nowrap',
  search: false,
  render: (_, record) => {
    if (record.latitude && record.longitude) {
      return (
        <a
          target="_blank"
          rel="noreferrer"
          href={`http://api.map.baidu.com/marker?location=${[
            record?.latitude || '--',
            record?.longitude || '--',
          ].join(',')}&output=html&src=webapp.baidu.openAPIdemo   
    `}
        >
          {[record.latitude || '--', record.longitude || '--'].join(',')}
        </a>
      );
    } else {
      return [record.latitude || '--', record.longitude || '--'].join(',');
    }
  },
};
const longitude: ProColumns = {
  title: '经度',
  dataIndex: 'longitude',
  className: 'nowrap',
  hideInTable: true,
  search: false,
};

const instanceName: ProColumns = {
  title: '实例名称',
  dataIndex: 'instanceName',
  className: 'nowrap',
  search: false,
};

const onlineStatusText: ProColumns = {
  title: '在线状态',
  dataIndex: 'onlineStatusText',
  className: 'nowrap',
  search: false,
};

const status: ProColumns<any> = {
  title: '生效状态',
  dataIndex: 'status',
  className: 'nowrap',
  valueEnum: DeviceStatusDesc,
};

export const deviceColumns: Record<string, ProColumns<DeviceSSD>> = {
  key,
  companyNo,
  companyName,
  instanceName,
  code,
  aliasName,
  deviceModal,
  address,
  provinceName,
  cityName,
  longitude,
  latitude,
  status,
  onlineStatusText,
  gmtCreate,
  option,
};

export const deviceModelColumns: Record<string, ProColumns<DeviceSSD>> = {
  key,
  companyNo,
  companyName,
  instanceName,
  modelCode,
  name,
  status,
  gmtCreate,
  option,
};

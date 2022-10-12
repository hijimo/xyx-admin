import type { ProColumns } from '@ant-design/pro-table';

import type { IOTCompanySSD, IOTCompanyConfigSSD } from '@/types';
import { BooleanDesc } from '@/enum';
import { key, option, companyNo, gmtCreate, companyName } from './baseColumns';

const productName: ProColumns = {
  title: '产品名称',
  dataIndex: 'productName',
  className: 'nowrap',
};

const productKey: ProColumns = {
  title: '产品唯一标识',
  dataIndex: 'productKey',
  className: 'nowrap',
};

export const instanceName: ProColumns = {
  title: '实例名称',
  dataIndex: 'instanceName',
  className: 'nowrap',
};
export const iotInstanceId: ProColumns = {
  title: '实例ID',
  dataIndex: 'iotInstanceId',
  className: 'nowrap',
  search: false,
};
export const iotHost: ProColumns = {
  title: 'IOT连接域名	',
  dataIndex: 'iotHost',
  className: 'nowrap',
  search: false,
};

export const iotcColumns: Record<string, ProColumns<IOTCompanySSD>> = {
  key,
  companyNo,
  companyName,
  iotInstanceId,
  instanceName,
  productKey,
  productName,
  iotHost,
  gmtCreate,
  option,
};

const defaultFlag: ProColumns = {
  title: '是否默认',
  dataIndex: 'defaultFlag',
  className: 'nowrap',
  valueEnum: BooleanDesc,
  search: false,
};
const forceFlag: ProColumns = {
  title: '是否强制升级',
  dataIndex: 'forceFlag',
  className: 'nowrap',
  valueEnum: BooleanDesc,
  search: false,
};
const restartFlag: ProColumns = {
  title: '是否重启',
  dataIndex: 'restartFlag',
  className: 'nowrap',
  valueEnum: BooleanDesc,
  search: false,
};

const fileName: ProColumns = {
  title: '文件名',
  dataIndex: 'fileName',
  className: 'nowrap',
};
const filePath: ProColumns = {
  title: '路径',
  dataIndex: 'filePath',
  className: 'nowrap',
  render: (_) => (
    <a rel="noreferrer" href={_} target="_blank" download>
      {_}
    </a>
  ),
  search: false,
};

const packageName: ProColumns = {
  title: '包名',
  dataIndex: 'packageName',
  className: 'nowrap',
  search: false,
};
const packageVersion: ProColumns = {
  title: '包版本号',
  dataIndex: 'packageVersion',
  className: 'nowrap',
  search: false,
};
export const iotcConfigColumns: Record<string, ProColumns<IOTCompanyConfigSSD>> = {
  key,
  companyNo,
  companyName,
  fileName,
  filePath,
  packageName,
  packageVersion,
  productKey: {
    ...productKey,
    search: false,
  },
  productName: {
    ...productName,
    search: false,
  },
  defaultFlag,
  restartFlag,
  forceFlag,
  gmtCreate,
  option,
};

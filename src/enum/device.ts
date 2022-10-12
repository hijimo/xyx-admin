export enum DeviceStatusEnum {
  DISABLED = 0,
  ENABLED,
  UN_ACTIVE,
}
// 禁用状态
export const DeviceStatusDesc = {
  [DeviceStatusEnum.DISABLED]: { text: '禁用', status: 'Error' },
  [DeviceStatusEnum.ENABLED]: { text: '启用', status: 'Success' },
  [DeviceStatusEnum.UN_ACTIVE]: { text: '未激活', status: 'Default' },
};
export enum InstructionTypeEnum {
  BOOL = 'BOOL',
  INT = 'INT',
  FLOAT = 'FLOAT',
  STRING = 'STRING',
  STR = 'STR',
}

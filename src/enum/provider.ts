// 费用项类型
export enum ServiceType {
  BASE = 1,
  POD,
  CLEARANCE,
  COD,
}

export const ServiceTypeDesc = {
  [ServiceType.BASE]: { text: '仓储' },
  [ServiceType.POD]: { text: '头程' },
  [ServiceType.CLEARANCE]: { text: '清关' },
  [ServiceType.COD]: { text: '落地配' },
};

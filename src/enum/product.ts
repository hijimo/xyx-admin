// 核算单位
export enum UnitType {
  WEIGHT = 1,
  PIECES,
}

export const UnitTypeDesc = {
  [UnitType.WEIGHT]: 'KG',
  [UnitType.PIECES]: '件',
};

/**
 * 	产品类型
 */
export enum ChannelProductType {
  Service = 1,
  Line = 2,
}
export const ChannelProductTypeDesc = {
  [ChannelProductType.Service]: { text: '服务渠道' },
  [ChannelProductType.Line]: { text: '线路产品' },
};
/**
 * 	方案类型
 */
export enum ProjectType {
  COUNTRY = 1,
  CITY = 2,
  POSTALCODE = 3,
}
export const ProjectTypeDesc = {
  [ProjectType.COUNTRY]: { text: '国家方案' },
  [ProjectType.CITY]: { text: '城市方案' },
  [ProjectType.POSTALCODE]: { text: '邮编方案' },
};

/**
 * 	线路产品类型
 */
export enum ProductType {
  ALL = 1,
  TRACK = 2,
  TERMINAL = 3,
}
export const ProductTypeDesc = {
  [ProductType.ALL]: { text: '全程产品' },
  [ProductType.TRACK]: { text: '干线产品' },
  [ProductType.TERMINAL]: { text: '尾程产品' },
};

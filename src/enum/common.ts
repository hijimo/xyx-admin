export enum BooleanEnum {
  FALSE = 0,
  TRUE,
}

export enum SequenceEnum {
  FIRST = 1,
  SECOND,
}

export enum SuccessEnum {
  SUCCESS = 1,
  FAIL = 0,
}
export const SuccessEnumDesc = {
  [SuccessEnum.FAIL]: { text: '失败', status: 'Error' },
  [SuccessEnum.SUCCESS]: { text: '成功', status: 'Success' },
};

// 默认状态
export const DefaultTypeDesc = {
  [BooleanEnum.FALSE]: { text: '否' },
  [BooleanEnum.TRUE]: { text: '是' },
};

// 启用状态
export const EnableTypeDesc = {
  [BooleanEnum.FALSE]: { text: '禁用', status: 'Error' },
  [BooleanEnum.TRUE]: { text: '启用', status: 'Success' },
};

// 是否正确
export const CorrectStatusDesc = {
  [BooleanEnum.FALSE]: { text: '错误', status: 'Error' },
  [BooleanEnum.TRUE]: { text: '正确', status: 'Success' },
};

// 商家类型
export enum CompanyType {
  COMPANY = 1,
  CUSTOMER = 8,
}

// 结算方式
export enum SettlementType {
  DAY = 1,
  MONTH,
  WEEK,
  HALF_MONTH,
  QUARTER,
}

export const SettlementTypeDesc = {
  [SettlementType.DAY]: { text: '现结' },
  [SettlementType.MONTH]: { text: '月结' },
  [SettlementType.WEEK]: { text: '周结' },
  [SettlementType.HALF_MONTH]: { text: '半月结' },
  [SettlementType.QUARTER]: { text: '季度结' },
};

export enum WeightValueType {
  ROUNDED,
  UP,
  FLOOR,
  ACTUAL,
}

export const WeightValueTypeDesc = {
  [WeightValueType.ROUNDED]: '四舍五入',
  [WeightValueType.UP]: '向上',
  [WeightValueType.FLOOR]: '向下',
  [WeightValueType.ACTUAL]: '实取',
} as const;

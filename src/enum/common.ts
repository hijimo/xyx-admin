export enum ConfigTypeEnum {
  /**
   * 背景音乐
   */
  AUDIO = 'background_audio',
  /**
   * 背景图片
   */
  IMAGE = 'background_image',
  /**
   * 终极宝箱
   */
  FIANL_REWARD = 'final_reward',
  /**
   * 礼物
   */
  REWARD = 'reward',
  /**
   * 将项策略
   */
  REWARD_STRATEGY = 'reward_strategy',
  /**
   * 时效
   */
  TIME_LIMIT = 'strategy_time_limit',
}
export enum BooleanEnum {
  FALSE = 0,
  TRUE,
}
export enum NormalStatusEnum {
  ABNORMAL = 0,
  NORMAL,
}

export enum LoginTypeEnum {
  WEB = 1,
  APP = 2,
}
export enum SexEnum {
  MALE = '1',
  FEMALE = '2',
}
export enum BusinessTypeEnum {
  LOGIN = 0,
  ADD = 1,
  EDIT = 2,
  DELETE = 3,
  LOGOUT = 4,
  OTHER = 5,
}

export enum ReadWriteFlag {
  READ_ONLY = 'READ_ONLY',
  READ_WRITE = 'READ_WRITE',
}
// 默认状态
export const BooleanDesc = {
  [BooleanEnum.FALSE]: { text: '否', status: 'Error' },
  [BooleanEnum.TRUE]: { text: '是', status: 'Success' },
};
export const NormalStatusDesc = {
  [NormalStatusEnum.ABNORMAL]: { text: '异常', status: 'Error' },
  [NormalStatusEnum.NORMAL]: { text: '正常', status: 'Success' },
};
export enum SwitchEnum {
  DISABLED = '1',
  ENABLED = '0',
}
// 禁用状态
export const SwitchDesc = {
  [SwitchEnum.DISABLED]: { text: '禁用', status: 'Error' },
  [SwitchEnum.ENABLED]: { text: '启用', status: 'Success' },
};

export const SexDesc = {
  [SexEnum.MALE]: { text: '男' },
  [SexEnum.FEMALE]: { text: '女' },
};
export const BusinessTypeDesc = {
  [BusinessTypeEnum.OTHER]: { text: '其他' },
  [BusinessTypeEnum.ADD]: { text: '新增' },
  [BusinessTypeEnum.EDIT]: { text: '修改' },
  [BusinessTypeEnum.DELETE]: { text: '删除' },
  [BusinessTypeEnum.LOGIN]: { text: '登录' },
  [BusinessTypeEnum.LOGOUT]: { text: '登出' },
};
// 资源类型
export enum ResourceType {
  MENU,
  BUTTON,
}

export const ResourceTypeDesc = {
  [ResourceType.MENU]: '菜单',
  [ResourceType.BUTTON]: '按钮',
} as const;

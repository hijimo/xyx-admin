import _pick from 'lodash/pick';
import { BooleanEnum } from './common';

export enum ResultType {
  REJECT = 1,
  CONTINUE,
  CUSTOMER = 5,
  PLATFORM = 6,
}

// 转运异常包裹处理结果
export const PackageResultTypeDesc = {
  [ResultType.REJECT]: { text: '退回' },
  [ResultType.CONTINUE]: { text: '放行' },
  [ResultType.CUSTOMER]: { text: '需客户确认' },
  [ResultType.PLATFORM]: { text: '需平台确认' },
} as const;

// 包裹状态
export enum PackageState {
  TOSTORAGE = 1,
  INSTORAGE,
  OUTSTORAGE,
  REJECT,
  SENDBACK,
  TOREPLACE,
  FLIGHTTAKESOFF = 8,
  FLIGHTARRIVE,
  CLEARANCE,
  PROPERCASTSUCCESS,
  PROPERCASTFAIL,
  VOIDED = 14,
  LOSTFAULT,
  CANCEL,
}

export const PackageStateDesc = {
  [PackageState.TOSTORAGE]: { text: '待入库', status: 'Processing' },
  [PackageState.INSTORAGE]: { text: '已入库', status: 'Warning' },
  [PackageState.OUTSTORAGE]: { text: '已出库', status: 'Processing' },
  // 拒收
  [PackageState.REJECT]: { text: '已入库', status: 'Warning' },
  [PackageState.SENDBACK]: { text: '已退回客户', status: 'Default' },
  // 待更换面单
  [PackageState.TOREPLACE]: { text: '已入库', status: 'Warning' },
  // 航班起飞
  [PackageState.FLIGHTTAKESOFF]: { text: '已出库', status: 'Processing' },
  // 航班到达
  [PackageState.FLIGHTARRIVE]: { text: '已出库', status: 'Processing' },
  // 清关完成
  [PackageState.CLEARANCE]: { text: '已出库', status: 'Processing' },
  [PackageState.PROPERCASTSUCCESS]: { text: '派送妥投', status: 'Success' },
  // 妥投失败
  [PackageState.PROPERCASTFAIL]: { text: '已出库', status: 'Processing' },
  [PackageState.VOIDED]: { text: '已作废', status: 'Default' },
  [PackageState.LOSTFAULT]: { text: '丢损件', status: 'Error' },
  [PackageState.CANCEL]: { text: '已取消', status: 'Default' },
};

export const PackageDerelictionStateDesc = _pick(PackageStateDesc, [
  PackageState.TOSTORAGE,
  PackageState.INSTORAGE,
  PackageState.SENDBACK,
  PackageState.CANCEL,
]);

export const PackageTerminalStateDesc = _pick(PackageStateDesc, [
  PackageState.INSTORAGE,
  PackageState.OUTSTORAGE,
  PackageState.PROPERCASTSUCCESS,
  PackageState.LOSTFAULT,
  PackageState.CANCEL,
]);

export const PackageStateFilterDesc = _pick(PackageStateDesc, [
  PackageState.TOSTORAGE,
  PackageState.INSTORAGE,
  PackageState.OUTSTORAGE,
  PackageState.SENDBACK,
  PackageState.PROPERCASTSUCCESS,
  PackageState.LOSTFAULT,
  PackageState.VOIDED,
  PackageState.CANCEL,
]);

export const PackageStateSearchMap = {
  [PackageState.TOSTORAGE]: PackageState.TOSTORAGE,
  [PackageState.INSTORAGE]: [PackageState.INSTORAGE, PackageState.REJECT, PackageState.TOREPLACE],
  [PackageState.OUTSTORAGE]: [
    PackageState.OUTSTORAGE,
    PackageState.FLIGHTTAKESOFF,
    PackageState.FLIGHTARRIVE,
    PackageState.CLEARANCE,
    PackageState.PROPERCASTFAIL,
  ],
  [PackageState.SENDBACK]: PackageState.SENDBACK,
  [PackageState.PROPERCASTSUCCESS]: PackageState.PROPERCASTSUCCESS,
  [PackageState.VOIDED]: PackageState.VOIDED,
  [PackageState.LOSTFAULT]: PackageState.LOSTFAULT,
  [PackageState.CANCEL]: PackageState.CANCEL,
} as const;

// 是否异常状态
export const AbnormalTypeDesc = {
  [BooleanEnum.FALSE]: { text: '正常', status: 'Default' },
  [BooleanEnum.TRUE]: { text: '异常', status: 'Error' },
};

// 电子面单类型
export enum ElectronicLabelType {
  LINK = 1,
  BASE64 = 2,
}

// 面单类型
export const ElectFlagTypeDesc = {
  [BooleanEnum.FALSE]: '纸质',
  [BooleanEnum.TRUE]: '电子',
};

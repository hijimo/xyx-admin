export enum ExpressTraceType {
  AIRLIFT = 1,
  CAINIAO,
  SHIPPING,
}

// 轨迹录入添加类型
export const ExpressTraceTypeDesc = {
  [ExpressTraceType.AIRLIFT]: { text: '空运', enumKey: 'trackNodeEnum' },
  [ExpressTraceType.CAINIAO]: { text: '菜鸟干线', enumKey: 'rookieTrackNodeEnum' },
  [ExpressTraceType.SHIPPING]: { text: '海运', enumKey: 'seaNodeEnum' },
};

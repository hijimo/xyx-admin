export enum BatchState {
  /**
   * 待出库
   */
  INSTORAGE = 1,
  /**
   * 已出库
   */
  OUTSTORAGE = 2,
}

export const BatchStateDesc = {
  [BatchState.INSTORAGE]: { text: '待出库', status: 'Processing' },
  [BatchState.OUTSTORAGE]: { text: '已出库', status: 'Success' },
} as const;

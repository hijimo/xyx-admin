import type { PaginationParams } from './common';

export interface ExpressTraceListParams extends PaginationParams {
  happenTimeEnd?: string;
  happenTimeStart?: string;
  ladingNo?: string;
  shipmentNo?: string;
  waybillNo?: string;
  trackNode?: number;
}

export interface ExpressTraceListItemSSD {
  gmtCreate: string;
  happenPlace: string;
  happenTime: string;
  id: number;
  ladingNo: string;
  shipmentNo: string;
  trackNode: number;
  trackNodeText: string;
  waybillNo: string;
  batchNo: string;
}

export interface AddExpressTraceParams {
  happenPlace: string;
  happenTime: string;
  ladingNo?: string;
  shipmentNo?: string;
  waybillNo?: string;
  trackType: number;
  /**
   * 轨迹描述
   */
  remark?: string;
  batchNo?: string;
}

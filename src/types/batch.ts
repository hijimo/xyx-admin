import type { BatchState } from '@/enum';
import type { PaginationParams } from './common';

export interface BatchStatisticsParams {
  /**
   * 袋牌号
   */
  batchNo?: string;
  /**
   * 线路
   */
  cpCode?: string;
  /**
   * 装袋结束日期
   */
  gmtBagEnd: string;
  /**
   * 装袋开始日期
   */
  gmtBagStart?: string;
  /**
   * 出库结束日期
   */
  gmtOutboundEnd?: string;
  /**
   * 出库开始日期
   */
  gmtOutboundStart?: string;
  /**
   * 提单号
   */
  ladingNo?: string;
  uniqueNo?: string;
  deliveryCode?: string;
}

export interface BatchListParams extends BatchStatisticsParams, PaginationParams {}

export interface BatchListItemSSD {
  /**
   * 袋牌号
   */
  batchNo: string;
  /**
   * 线路产品编号
   */
  cpCode: string;
  /**
   * 线路产品名称
   */
  cpName: string;
  /**
   * 目的国代码
   */
  destinationCountry: string;
  /**
   * 装袋时间
   */
  gmtBag: string;
  /**
   * 出库时间
   */
  gmtOutbound: string;
  /**
   * 主键id
   */
  id?: number;
  /**
   * 提单号
   */
  ladingNo: string;
  /**
   * 包裹数量
   */
  packageNum: string;
  /**
   * 包裹总重
   */
  packageWeight: number;
  /**
   * 	批次状态 number待出库 1出库
   */
  state: BatchState;
  /**
   * 航班号
   */
  tripNo: string;
  uniqueNo: string;
  deliveryCode: string;
}

export interface BatchBindData {
  /**
   * 袋牌号
   */
  batchNos: string[];
  /**
   * 航班号
   */
  flightNo: string;
  /**
   * 提单号
   */
  ladingNo: string;
}

export interface BatchStatisticsSSD {
  forecastWeight: string;
  packageTotalWeight: string;
  totalPiece: string;
  volumeWeight: string;
}

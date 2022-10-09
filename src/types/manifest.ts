import type { PaginationParams } from './common';

export interface ShipmentManifestListParams extends PaginationParams {
  bizNo?: string[];
  gmtEnd?: string;
  gmtStart?: string;
  ldpChannelCode?: string;
  ldpChannelName?: string;
  tcChannelCode?: string;
  tcChannelName?: string;
}

export interface ShipmentManifestListItemSSD {
  bizNo: string;
  createName: string;
  gmtCreate: string;
  gmtEnd: string;
  gmtStart: string;
  id: number;
  ldpChannelCode: string;
  ldpChannelName: string;
  limit: number;
  offset: number;
  pageNo: number;
  pageSize: number;
  tcChannelCode: string;
  tcChannelName: string;
  totalNum: number;
  totalTicket: number;
  totalWeight: number;
}

export interface AddShipmentManifestParams {
  deptNo: string;
  gmtEnd: string;
  gmtStart: string;
  ldpChannelCode: string[];
  tcChannelCode: string[];
}

export interface FilterChannelListParams {
  deptNo: string;
  queryType: number;
}

export interface DeptListItemSSD {
  deptName: string;
  deptNo: string;
  id: number;
}

import type { PaginationParams } from './common';
import type { FreightListItemSSD } from './freight';

export interface ServiceChannelListParams extends PaginationParams {
  channelCode?: string;
  channelName?: string;
  companyId?: string;
  state?: number;
  resourceType?: number;
}

export interface ServiceChannelListItemSSD {
  channelCode: string;
  channelName: string;
  companyName: string;
  resourceType: number;
  resourceTypeText: string;
  state: number;
  id: number;
}

export interface ServiceChannelDetailSSD {
  billingOffers: FreightListItemSSD[];
  addressDetail: string;
  addressPathText: string;
  channelCode: string;
  companyName: string;
  consigneeName: string;
  consigneePhone: string;
  id: number;
  postcode: string;
  resourceTypeText: string;
  resourceTypes: number[];
  channelName: string;
  addressPaths?: number[];
  statisticsArea: number;
  sensitiveFlag: number;
  statisticsAreaText: string;
  sensitiveFlagText: string;
}

export interface AddServiceChannelParams {
  addressDetail: string;
  addressPaths: number[];
  channelCode: string;
  channelName: string;
  companyId: number;
  consigneeName: string;
  consigneePhone: string;
  id: number;
  postcode: string;
  resourceTypes: number[];
  state: number;
  statisticsArea: number;
  sensitiveFlag: number;
}

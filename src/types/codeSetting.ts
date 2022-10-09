import type { PaginationParams } from './common';

export interface CodeSegmentsListParams extends PaginationParams {
  waybillNo?: string;
  companyNo?: string;
  customerNo?: string;
}

export interface CodeSegmentsListItemSSD {
  electScope?: number;
  codeLength: number;
  codeMiddle: string;
  codePrefix: string;
  companyNo: string;
  electCurrentCode: number;
  electEnd: number;
  electStart: number;
  id?: number;
}

export interface AddCodeSegmentsParams extends CodeSegmentsListItemSSD {}

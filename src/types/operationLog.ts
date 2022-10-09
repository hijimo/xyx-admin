import type { PaginationParams } from './common';

export interface OperationLogListParams extends PaginationParams {
  businessNo?: string;
  gmtCreateStart?: string;
  gmtCreateEnd?: string;
  operateType?: number;
  objectType?: number;
}

export interface OperationLogListItemSSD {
  businessNo: string;
  gmtCreate: string;
  id: number;
  operatorFlag: number;
  operatorFlagText: string;
  operatorName: string;
  operatorNode: string;
  operatorData: string;
  operateTypeText: string;
  objectTypeText: string;
}

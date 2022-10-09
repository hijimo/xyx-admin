import type { ElectronicLabelType } from '@/enum';

export interface ElectronicLabelParams {
  uniqueNoList?: string[];
  waybillNo?: string[];
}

export interface ElectronicLabelSSD {
  type: ElectronicLabelType;
  data: string;
}

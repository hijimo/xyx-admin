import type { ElectronicLabelSSD, ElectronicLabelParams } from '@/types';
import type { ResponseData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 更换面单
 * @param waybillNo
 * @returns
 */
export async function replacePackageWaybill(waybillNo: string) {
  return request<ResponseData<string>>('/api/kp/transfer/change/elect', {
    data: { waybillNo },
    method: 'POST',
  });
}

/**
 * 获取面单数据
 * @param PackageListParams
 * @returns
 */
export async function getElectronicLabel(params?: ElectronicLabelParams) {
  return request<ResponseData<ElectronicLabelSSD[]>>('/api/kp/transfer/change/print', {
    params,
  });
}

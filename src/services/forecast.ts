import type { ResponseData } from '@/utils/request';
import request from '@/utils/request';
import type { ExcelImportSuccessSSD } from '@/types';

/**
 * 包裹预报--导入excel
 * @param data
 * @returns
 */
export async function packageForecastExcel(data: FormData) {
  return request<ResponseData<ExcelImportSuccessSSD>>('/api/kpost/back/trans/all/excel', {
    method: 'POST',
    data,
  });
}

/**
 * 纸转电--导入excel
 * @param data
 * @returns
 */
export async function paperToElectricityExcel(data: FormData) {
  return request<ResponseData<ExcelImportSuccessSSD>>('/api/kp/transfer/order/excel', {
    method: 'POST',
    data,
  });
}

/**
 * 菜鸟干线--导入excel
 * @param data
 * @returns
 */
export async function cainiaoForecastExcel(data: FormData) {
  return request<ResponseData<ExcelImportSuccessSSD>>('/api/kp/rookie/pack/excel', {
    method: 'POST',
    data,
  });
}

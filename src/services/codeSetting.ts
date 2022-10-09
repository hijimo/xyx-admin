import type {
  CodeSegmentsListParams,
  CodeSegmentsListItemSSD,
  AddCodeSegmentsParams,
} from '@/types';
import type { ResponseData, PaginationData } from '@/utils/request';
import request from '@/utils/request';

/**
 * 获取号码段列表
 * @param CodeSegmentsListParams
 * @returns
 */
export async function getCodeSegmentsList(params: CodeSegmentsListParams) {
  return request<ResponseData<PaginationData<CodeSegmentsListItemSSD[]>>>(
    '/api/kp/waybill/config/page',
    {
      params,
    },
  );
}

/**
 * 获取号码池列表
 * @param CodeSegmentsListParams
 * @returns
 */
export async function getCodePoolList(params: CodeSegmentsListParams) {
  return request<ResponseData<PaginationData<CodeSegmentsListItemSSD[]>>>(
    '/api/kp/waybill/pool/page',
    {
      params,
    },
  );
}

/**
 * 获取号码段详情
 * @returns
 */
export async function getCodeSegmentsDetail(params: { id?: number }) {
  return request<ResponseData<PaginationData<CodeSegmentsListItemSSD>>>(
    '/api/kp/waybill/config/detail',
    {
      params,
    },
  );
}
/**
 * 获取号码池列表
 * @param CodeSegmentsListParams
 * @returns
 */
export async function getCodePollList(params: CodeSegmentsListParams) {
  return request<ResponseData<PaginationData<CodeSegmentsListItemSSD[]>>>(
    '/api/kp/waybill/pool/page',
    {
      params,
    },
  );
}

/**
 * 新增号码段
 * @param AddCodeSegmentsParams
 * @returns
 */
export async function addCodeSegments(data: AddCodeSegmentsParams) {
  return request<ResponseData>('/api/kp/waybill/config/edit', {
    method: 'post',
    data,
  });
}

/**
 * 号码池导入excel
 * @param data
 * @returns
 */
export async function importCodePoolExcel(data: FormData) {
  return request<ResponseData>('/api/kp/waybill/pool/excel', {
    method: 'POST',
    data,
  });
}

import request from '@/utils/request';
import type { ResponseData, PaginationData } from '@/utils/request';
import type {
  QuoteResponseData,
  ChannelOfferDetailListParams,
  ChannelOfferDetailListItemSSD,
  MiscellaneousFeesQuoteSSD,
  AddMiscellaneousFeesQuoteParams,
  MiscellaneousFeesQuotesParams,
  QuoteInvalidDateParams,
  OtherInvalidDateParams,
} from '@/types';

/**
 * 服务渠道-报价设置查询
 */
export async function getChannelOfferDetail(id: number | string) {
  return request<ResponseData<QuoteResponseData>>('/api/kpost/serviceChannel/offer/detail', {
    params: {
      id,
    },
  });
}

/**
 * 费用报价-列表查询
 * @param params
 * @returns
 */
export async function getChannelOfferDetailList(params: ChannelOfferDetailListParams) {
  return request<ResponseData<PaginationData<ChannelOfferDetailListItemSSD[]>>>(
    '/api/kpost/bo/page',
    {
      params,
    },
  );
}

/**
 * 费用项报价信息-新增编辑
 * @param data
 * @returns
 */
export async function addOrEditChannelOffer(data: QuoteResponseData) {
  return request<ResponseData<QuoteResponseData>>('/api/kpost/serviceChannel/info/edit', {
    data,
    method: 'POST',
  });
}

/**
 * 费用项-新增或编辑杂项费用明细
 * @param params
 * @returns
 */
export async function addOrEditMiscellaneousFeesQuote(params?: AddMiscellaneousFeesQuoteParams) {
  return request<ResponseData>('/api/kpost/serviceChannel/otheritems/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 报价费用项-通过当前生效时间获取失效时间
 * @param params QuoteInvalidDateParams
 * @returns
 */
export async function getQuoteInvalidDate(params: QuoteInvalidDateParams) {
  return request<ResponseData<string>>('/api/kpost/serviceChannel/gmtunvalid/get', {
    params,
  });
}

/**
 * 杂费费用项-通过当前生效时间获取失效时间
 * @param params QuoteInvalidDateParams
 * @returns
 */
export async function getOtherInvalidDate(params: OtherInvalidDateParams) {
  return request<ResponseData<string>>('/api/kpost/serviceChannel/gmtOtherUnvalid/get', {
    params,
  });
}

/**
 * 费用项-根据报价id分页查询杂项报价明细
 * @param params
 * @returns
 */
export async function getMiscellaneousFeesQuotes(params?: MiscellaneousFeesQuotesParams) {
  return request<ResponseData<PaginationData<MiscellaneousFeesQuoteSSD>>>(
    '/api/kpost/serviceChannel/otheritems/page',
    {
      params,
    },
  );
}

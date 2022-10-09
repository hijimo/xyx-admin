import { getLocale, history } from 'umi';
import { extend } from 'umi-request';
import type { Context } from 'umi-request';
import { message, notification } from 'antd';
import runtimeConfig from 'runtimeConfig';

export enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 4,
  REDIRECT = 9,
}

export interface ResponseData<T = any> {
  data: T;
  success: boolean;
  retCode: string;
  retMsg: string;
  showType?: ErrorShowType;
}
export interface PaginationData<T = any> {
  limit: number;
  offset: number;
  pageNo: number;
  pageSize: number;
  pages: number;
  records: T;
  totalCount: number;
}

export interface ErrorInfoStructure extends ResponseData {
  traceId?: string;
  [key: string]: any;
}

export interface RequestError extends Error {
  data?: any;
  info?: ErrorInfoStructure;
  request?: Context['req'];
  response?: Context['res'];
}

const DEFAULT_ERROR_PAGE = '/exception';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const request = extend({
  errorHandler: (error: RequestError) => {
    // @ts-ignore
    if (error?.request?.options?.skipErrorHandler) {
      throw error;
    }

    if (error.name === 'BizError') {
      const errorInfo: ErrorInfoStructure | undefined = error.info;

      if (errorInfo) {
        const errorMessage = errorInfo?.retMsg;
        const errorCode = errorInfo?.retCode;
        const errorPage = DEFAULT_ERROR_PAGE;

        switch (errorInfo?.showType) {
          case ErrorShowType.SILENT:
            // do nothing
            break;
          case ErrorShowType.WARN_MESSAGE:
            message.warn(errorMessage);
            break;
          case ErrorShowType.ERROR_MESSAGE:
            message.error(errorMessage);
            break;
          case ErrorShowType.NOTIFICATION:
            notification.error({
              message: errorMessage,
            });
            break;
          case ErrorShowType.REDIRECT:
            // @ts-ignore
            history.push({
              pathname: errorPage,
              query: { errorCode, errorMessage },
            });
            // redirect to error page
            break;
          default:
            message.error(errorMessage);
            break;
        }
      } else {
        message.error(error.message || 'Request error, please retry.');
      }
    } else {
      const { response } = error;
      if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;

        notification.error({
          message: `请求错误 ${status}: ${url}`,
          description: errorText,
        });
      } else if (!response) {
        notification.error({
          description: '您的网络发生异常，无法连接服务器',
          message: '网络异常',
        });
      }
    }
    throw error;
  },
});

// 中间件统一错误处理
// 后端返回格式 { success: boolean, data: any }
// 按照项目具体情况修改该部分逻辑
request.use(async (ctx, next) => {
  await next();
  const { req, res } = ctx;
  // @ts-ignore
  if (req.options?.skipErrorHandler) {
    return;
  }
  const { options } = req;
  const { getResponse } = options;
  const resData = getResponse ? res.data : res;
  const errorInfo: ErrorInfoStructure = { ...resData, showType: ErrorShowType.ERROR_MESSAGE };
  if (errorInfo.success === false) {
    // 抛出错误到 errorHandler 中处理
    const error: RequestError = new Error(errorInfo.retMsg);
    error.name = 'BizError';
    error.data = resData;
    error.info = errorInfo;
    throw error;
  }
});

request.interceptors.request.use(
  (url, options) => {
    return {
      options: {
        ...options,
        headers: {
          'Accept-Language': getLocale(),
          AppNo: runtimeConfig.appNo,
        },
      },
    };
  },
  { global: false },
);

request.interceptors.response.use(
  async (response) => {
    const data = await response.clone().json();
    if (data.retCode === '0001007') {
      const { loginUri, appNo } = data.data;
      // 登录过期后，重新登录回到当前页面。
      window.location.href = `${loginUri}?appNo=${appNo}&redirectUrl=${window.location.href}`;
    }
    return response;
  },
  { global: false },
);

export default request;

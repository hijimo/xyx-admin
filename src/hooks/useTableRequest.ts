import { useCallback } from 'react';
import type { PaginationData, ResponseData } from '@/utils/request';

const transformDataToProTable = (result: ResponseData<PaginationData>) => {
  return {
    data: result?.data?.records,
    total: result?.data?.totalCount,
    success: result?.success,
    pageSize: result?.data?.pageSize,
    current: result?.data?.pageNo,
  };
};

const useTableRequest = (
  dataLoader?: (params: any) => Promise<any>,
  getParams?: (params: any) => any,
) => {
  const request = useCallback(
    async (params: any) => {
      const newParams = {
        ...params,
        current: undefined,
        pageNo: params.current,
        ...getParams?.(params),
      };
      const result: any = await dataLoader?.(newParams);
      const transformedResult = transformDataToProTable(result);
      return Promise.resolve(transformedResult);
    },
    [dataLoader],
  );
  return request;
};

export default useTableRequest;

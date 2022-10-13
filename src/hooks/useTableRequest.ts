import { useCallback } from 'react';
import { ResponseData } from '@/utils/request';
const transformDataToProTable = (result: any) => {
  return {
    data: result?.data?.records || result?.rows,
    total: result?.total,
    success: result?.code === 200,
    pageSize: result?.pageSize,
    pageNum: result?.pageNo,
    current: result?.pageNo,
  };
};

const useTableRequest = (
  dataLoader?: (params: any) => Promise<any>,
  getParams?: (params: any) => any,
  transform?: (result: ResponseData) => any,
) => {
  const request = useCallback(
    async (params: any) => {
      const newParams = {
        ...params,
        current: undefined,
        pageNo: params.current,
        pageNum: params.current,
        ...getParams?.(params),
      };
      const result: any = await dataLoader?.(newParams);
      const transformedResult =
        transform?.(result) || transformDataToProTable({ ...result, ...newParams });
      return Promise.resolve(transformedResult);
    },
    [dataLoader],
  );
  return request;
};

export default useTableRequest;

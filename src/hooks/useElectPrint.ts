import { useMutation } from 'react-query';
import request from 'umi-request';
import { message } from 'antd';
import { ElectronicBillType } from '@/enum';
import { paperToElectricityPrint } from '@/services/operation';
import { printPDF } from '@/utils/helper';

const useElectPrint = (printSuccess?: () => void) => {
  const mutation = useMutation((bizNoList: string[]) => paperToElectricityPrint(bizNoList), {
    onSuccess: async ({ data: electronicBillData }, bizNoList) => {
      if (electronicBillData && electronicBillData.length > 0) {
        const electronicBills = electronicBillData.map((d, index) => {
          if (d.type === ElectronicBillType.BASE64) {
            return d.data;
          }
          if (d.type === ElectronicBillType.LINK) {
            return request
              .get(d.data, { responseType: 'arrayBuffer' })
              .catch(() =>
                Promise.reject(new Error(`原纸质面单号为${bizNoList[index]}的电子面单获取失败!`)),
              );
          }
          return Promise.reject(
            new Error(`原纸质面单号为${bizNoList[index]}的电子面单不支持打印!`),
          );
        });

        try {
          const result = await Promise.all(electronicBills);
          printPDF(result);
          printSuccess?.();
        } catch (error: any) {
          message.error(error?.message);
        }
      } else {
        message.error('接口未返回可打印数据');
      }
    },
  });

  return mutation;
};

export default useElectPrint;

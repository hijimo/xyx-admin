import mockjs from 'mockjs';
import { Request, Response } from 'express';
const Random = mockjs.Random;

const getBalanceList = (req: Request, res: Response) => {
  const { pageNo, pageSize } = req.query;
  const result = mockjs.mock({
    data: {
      pageNo: Number(pageNo),
      pageSize: Number(pageSize),
      totalCount: 30,
      'records|20': [
        {
          'id|+1': 1,
          orderNo: '@integer(10000)',
          costMethods: '重量',
          costNo: '1件',
          'costType|1-6': 1,
          costSum: '100',
          domesticNo: '@integer(10000)',
          warehouseNo: '@integer(10000)',
          costTime: Random.now('yyyy-MM-dd HH:mm:ss'),
          costResource: '@csentence(5, 20)',
          customer: 'LY服务商测试',
          company: 'LY公司测试',
        },
      ],
    },
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  });
  return res.json(result);
};

const defaultResponse = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: null,
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  });
  return res.json(result);
};

export default {
  'GET /api/balance/provider': getBalanceList,
  'GET /api/balance/customer': getBalanceList,
};

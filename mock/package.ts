import mockjs from 'mockjs';
import { Request, Response } from 'express';
const Random = mockjs.Random;

const getPackageList = (req: Request, res: Response) => {
  const { pageNo, pageSize } = req.query;
  const result = mockjs.mock({
    data: {
      pageNo: Number(pageNo),
      pageSize: Number(pageSize),
      totalCount: 30,
      'records|30': [
        {
          'id|+1': 1,
          orderNo: '@integer(10000)',
          waybillNo: '@integer(10000)',
          oldWaybillNo: '@integer(10000)',
          businessNo: '@integer(10000)',
          customerNo: '客户pg1',
          oldPackage: '@integer(10000)',
          warehouseNo: '@integer(10000)',
          expressNo: '@integer(10000)',
          userId: '@integer(10000)',
          country: Random.county(true),
          serviceProject: '@csentence(5, 20)',
          'result|0-1': 1,
          note: '@csentence(5, 20)',
          sendNo: '@integer(10000)',
          batchNo: '@integer(10000)',
          'state|0-11': 1,
          'refuseState|0-1': 1,
          'businessType|0-1': 1,
          'customerType|0-1': 1,
          'payType|0-1': 1,
          'settlementType|0-1': 1,
          'packageType|1-7': 1,
          'mergeFlag|0-1': 0,
          'resultType|1-2': 1,
          'chargeType|1-2': 1,
          'lineFlag|0-1': 0,
          'itemType|1-2': 0,
          refuseReason: '@csentence(5, 20)',
          otherReason: '@csentence(5, 20)',
          address: '@csentence(5, 20)',
          unnormalReason: '@csentence(5, 20)',
          packageWeight: 23,
          surcharge: 23,
          packageNo: 'RE3344',
          serviceCapabilityText: '仓内操作',
          spaceNo: 'RE5645',
          oldWeight: '@integer(10000)',
          oldVolume: '@integer(10000)',
          forecastVolume: '10*10*10',
          forecastWeight: 10.5,
          packageVolume: '10*10*10',
          packageNum: '@integer(10000)',
          payWeight: '78',
          totalCost: '135',
          locationNo: '@integer(10000)',
          oldLineNo: 'LN88899900991',
          lineNo: 'LN88899900998',
          consigneeName: '@cname',
          contactTel: '17898790890',
          destinationCountry: '中国大陆',
          shengShiQu: '浙江省杭州市西湖区',
          fullAddress: '浙江省杭州市西湖区五联西苑',
          postCode: '111000',
          goodsState: '@csentence(5, 20)',
          remark: '@csentence(5, 20)',
          newRoute: '@csentence(5, 20)',
          receiver: '@csentence(5, 20)',
          gmtCreate: Random.now('yyyy-MM-dd HH:mm:ss'),
          createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
          payTime: Random.now('yyyy-MM-dd HH:mm:ss'),
          'packagePic|1': [Random.image(), ''],
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

const getGoodInfo = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: [
      {
        'id|+1': 1,
        goodsPrice: Random.increment(20),
        goodsPriceText: '￥15',
        forecastCount: Random.increment(20),
        goodsNum: Random.increment(20),
        goodsName: '@csentence(5, 20)',
        'goodsPic|1': [Random.image(), ''],
      },
    ],
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  });
  return res.json(result);
};

const getCollectionPickList = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: {
      'records|30': [
        {
          'id|+1': 1,
          pickNo: 'PICK1234',
          containerNo: 'DDFS1234',
          'state|1-4': 1,
          gmtCreate: Random.now('yyyy-MM-dd HH:mm:ss'),
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

const getPickInfo = (req: Request, res: Response) => {
  const result = mockjs.mock({
    'data|1-6': [
      {
        'id|+1': 1,
        orderNo: '@integer(10000)',
        packageNo: 'RE2345',
        spaceNo: 'RE1768',
      },
    ],
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  });
  return res.json(result);
};

const getOrderPackageInfo = (req: Request, res: Response) => {
  let data = [];
  for (let i = 0; i < 4; i += 1) {
    data.push(
      mockjs.mock({
        tabText: `国际包裹${i + 1}`,
        'boxName|1': ['箱一', '箱二', '三', '箱四'],
        id: i,
        waybillNo: Random.increment(20),
        packageLength: Random.increment(20),
        packageWidth: Random.increment(20),
        packageHeight: Random.increment(20),
        payWeight: Random.increment(20),
        volumeWeight: Random.increment(20),
        packageWeight: Random.increment(20),
        'boxType|0-4': 0,
        'packageItems|1-5': [
          {
            'id|+1': 1,
            goodsName: '商品名',
            goodsPrice: Random.increment(20),
            productNameEn: '英文名',
            productNameCn: '中文名',
            declarePrice: Random.increment(20),
            'type|0-4': 1,
            hsCode: Random.increment(20),
            qtyNum: Random.increment(20),
          },
        ],
      }),
    );
  }

  const result = {
    data: data,
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  };

  return res.json(result);
};

const getRouteList = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: {
      'records|30': [
        {
          'id|+1': 1,
          name: '@name',
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

const getCount = (req: Request, res: Response) => {
  let data = [
    { count: 39, name: '全部', value: -1, version: null },
    { count: 3, name: '待处理', value: 0, version: null },
  ];
  const result = {
    data: data,
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  };

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
  'GET /api/getPackageList': getPackageList,
  'GET /api/abnormalPackage': getPackageList,
  'GET /api/customerList': getPackageList,
  'GET /api/packageReject': getPackageList,
  'GET /api/orderPackageList': getPackageList,
  'GET /api/goodInfo': getGoodInfo,
  'GET /api/pickInfo': getPickInfo,
  'GET /api/orderPackageInfo': getOrderPackageInfo,
  'GET /api/getCount': getCount,
  'POST /api/handlePackageUnnormal': defaultResponse,
  'GET /api/routeList': getRouteList,
  'GET /api/getCollectionPickList': getCollectionPickList,
};

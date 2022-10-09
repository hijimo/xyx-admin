import mockjs from 'mockjs';
import { Request, Response } from 'express';
const Random = mockjs.Random;

const getCustomerList = (req: Request, res: Response) => {
  const { pageNo, pageSize } = req.query;
  const result = mockjs.mock({
    data: {
      pageNo: Number(pageNo),
      pageSize: Number(pageSize),
      totalCount: 30,
      'records|20': [
        {
          'id|+1': 1,
          billNo: '@integer(10000)',
          companyNo: '@integer(10000)',
          costNo: '1件',
          'costType|0-1': 1,
          'state|0-1': 1,
          'companyType|1-6': 1,
          gmtCreate: Random.now('yyyy-MM-dd HH:mm:ss'),
          phoneNo: '17666668888',
          companyPhone: '17666668888',
          username: '龙大仙',
          companyName: '服务商',
          contactTel: '17666668888',
          contactPerson: '龙大仙',
          contactAddress: '@csentence(20,30)',
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

const getCustomerDetail = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: {
      id: 1,
      billNo: '@integer(10000)',
      companyNo: '@integer(10000)',
      costNo: '1件',
      'costType|0-1': 1,
      'state|0-1': 1,
      'companyType|1-6': 1,
      gmtCreate: Random.now('yyyy-MM-dd HH:mm:ss'),
      phoneNo: '17666668888',
      companyPhone: '17666668888',
      username: '龙大仙',
      companyName: '服务商',
      stateText: '待审批',
      abnormalText: '否',
      contactTel: '17666668888',
      contactPerson: '龙大仙',
      contactAddress: '@csentence(20,30)',
      processNodeList: [
        { name: '预报' },
        { name: '入库', time: Random.now('yyyy-MM-dd HH:mm:ss') },
        { name: '出库', time: Random.now('yyyy-MM-dd HH:mm:ss') },
        { name: '航班起飞' },
        { name: '妥投' },
        { name: '完成' },
      ],
      current: 2,
      receiverInfo: {
        name: '@cname',
        phone: '17624203889',
        postcode: '123456',
        city: '杭州',
        address: '浙江省杭州市西湖区西溪天堂109室',
      },
      'operationLogList|7': [
        {
          'id|+1': 1,
          billNo: '@integer(10000)',
          name: '@cname',
          gmtCreate: Random.now('yyyy-MM-dd HH:mm:ss'),
          operatorNode: '@csentence(8,30)',
          operatorName: '@cname',
        },
      ],
      goodsInfo: {
        cName: '@csentence(3,5)',
        eName: '@csentence(3,5)',
        count: 13,
        declare: '$1500.00',
        'goodPic|1': [Random.image(), ''],
        'packagePic|1': [Random.image(), ''],
      },
      'logisticsTrack|8': [
        {
          'id|+1': 1,
          name: '@cname',
          time: Random.now('yyyy-MM-dd HH:mm:ss'),
          point: '@csentence(8,30)',
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
  'GET /api/customer': getCustomerList,
  'GET /api/provider': getCustomerList,
  'GET /api/customer/detail': getCustomerDetail,
  'GET /api/provider/detail': getCustomerDetail,
  'POST /api/customer/edit': defaultResponse,
};

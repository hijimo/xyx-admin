import mockjs from 'mockjs';
import { Request, Response } from 'express';

const getWarehouseList = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: {
      'records|30': [
        {
          'id|+1': 1,
          'chargeType|1': [1, 2, null],
          'status|0-1': 1,
          'whType|1-2': 1,
          whNo: '@integer(10000)',
          whName: '@cname',
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

const getWarehouseAreaList = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: {
      'records|30': [
        {
          'id|+1': 1,
          'whId|+1': 1,
          'status|0-1': 1,
          areaNo: '@integer(10000)',
          areaName: '@cname',
          warehouseName: '@cname',
          'areaPurpose|1': [1, 2, 3, null],
          childFlag: '@boolean',
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

const getFreightList = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: {
      'records|30': [
        {
          'id|+1': 1,
          freightNo: '@integer(10000)',
          areaName: '@cname',
          'whId|+1': 1,
          'areaId|+1': 1,
          warehouseName: '@cname',
          'sortType|1': [1, 2, 3, null],
          'mixType|0-1': 1,
          'status|0-1': 1,
          packageFlag: '@boolean',
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

const getRecordInfo = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: {
      'id|+1': 1,
      codeNo: '@integer(10000)',
      name: '@cname',
      warehouseName: '@cname',
      'warehouseId|1-20': 1,
      'WarehouseAreaId|1-20': 1,
      purpose: '暂存区',
      'type|0-1': 1,
    },
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  });
  return res.json(result);
};

const deleteRecord = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: null,
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  });
  return res.json(result);
};

const addRecord = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: null,
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  });
  return res.json(result);
};

const HasChildren = (req: Request, res: Response) => {
  const result = mockjs.mock({
    'data|1': [true, false],
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  });
  return res.json(result);
};

const getSystemInfo = (req: Request, res: Response) => {
  const result = mockjs.mock({
    data: {
      'storageTag|1-5': ['@cname'],
      'boxList|2-5': [{ name: '@cname', 'id|+1': 1, width: 10, wide: 10, height: 10 }],
      packageMax: 100,
      orderMax: 100,
    },
    retCode: '200',
    retMsg: '',
    success: true,
    timestamp: 1573127612292,
  });
  return res.json(result);
};

const setSystemInfo = (req: Request, res: Response) => {
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
  'GET /api/getWarehouseList': getWarehouseList,
  'GET /api/deleteWarehouse': deleteRecord,
  'GET /api/addWarehouse': addRecord,
  'GET /api/warehouseInfo': getRecordInfo,
  'GET /api/warehouseAreaList': getWarehouseAreaList,
  'POST /api/deleteWarehouseArea': deleteRecord,
  'POST /api/addWarehouseArea': addRecord,
  'GET /api/warehouseAreaInfo': getRecordInfo,
  'GET /api/freightList': getFreightList,
  'GET /api/deleteFreight': deleteRecord,
  'GET /api/addFreight': addRecord,
  'GET /api/FreightInfo': getRecordInfo,
  'POST /api/setSystemInfo': setSystemInfo,
  'GET /api/systemInfo': getSystemInfo,
  'GET /api/HasChildren': HasChildren,
};

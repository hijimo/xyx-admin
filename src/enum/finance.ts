import { BooleanEnum } from './common';
// 审核状态
export enum AuditType {
  TOAUDIT = 0,
  APPROVED,
  AUDITFAILED,
}

export const AuditTypeDesc = {
  [AuditType.TOAUDIT]: { text: '待审核', status: 'Processing' },
  [AuditType.APPROVED]: { text: '审核通过', status: 'Success' },
  [AuditType.AUDITFAILED]: { text: '审核不通过', status: 'Error' },
};

// 入账状态
export const CreditedTypeDesc = {
  [BooleanEnum.FALSE]: { text: '未入账', status: 'Processing' },
  [BooleanEnum.TRUE]: { text: '已入账', status: 'Success' },
};

// 账单状态
export enum BillState {
  PENDINGCONFIRM = 1,
  PENDINGPAYMENT,
  PENDINGPAYMENTCONFIRM,
  PARTPAYMENTCONFIRM,
  PAID,
}

export const BillStateDesc = {
  [BillState.PENDINGCONFIRM]: { text: '待客户确认', status: 'Processing' },
  [BillState.PENDINGPAYMENT]: { text: '待付款', status: 'Processing' },
  [BillState.PENDINGPAYMENTCONFIRM]: { text: '待付款确认', status: 'Processing' },
  [BillState.PARTPAYMENTCONFIRM]: { text: '部分付款', status: 'Default' },
  [BillState.PAID]: { text: '已付款', status: 'Success' },
};

// 计费类型
export enum BizType {
  COMPANY = 1,
  CUSTOMER,
}

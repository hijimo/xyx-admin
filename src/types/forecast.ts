export interface TransAllExcelData {
  //   bgjs	包裹件数	integer
  // hwzl	货物重量	number
  // sbbz	申报币种	string
  // sjrcs	收件人城市	string
  // sjrdh	收件人电话	string
  // sjrdz	收件人地址1	string
  // sjrgj	收件人国家	string
  // sjrxm	收件人姓名	string
  // sjryb	收件人邮编	string
  // sjryx	收件人邮箱	string
  // spjz	商品净重(KG)1	number
  // spsbjz	商品申报价值	number
  // spsl	商品数量1	integer
  // spywm	商品英文品名1	string
  // xlbh	线路编号	string
  /**
   * 运单号
   */
  ydh: string;
  // ysdh	原始单号	string
}
interface ExcelImportSuccessItemData {
  remark?: string;
  waybillNo: string;
}
export interface ExcelImportSuccessSSD {
  successDtoList: ExcelImportSuccessItemData[];
  failDtoList: ExcelImportSuccessItemData[];
}

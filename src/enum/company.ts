export enum CompanyCardType {
  ID = 1,
  PASSPORT,
}

// 1三证非合一 2三证合一
export enum CompanyLicenseType {
  NOT_THREE_IN_ONE = 1,
  THREE_IN_ONE = 2,
}

export const CompanyCardTypeDesc = {
  [CompanyCardType.ID]: { text: '身份证' },
  [CompanyCardType.PASSPORT]: { text: '护照' },
};

export const CompanyLicenseTypeDesc = {
  [CompanyLicenseType.NOT_THREE_IN_ONE]: { text: '三证非合一' },
  [CompanyLicenseType.THREE_IN_ONE]: { text: '三证合一' },
};

export enum CompanyTypeEnum {
  PLATFORM = 0,
  OEM = 1,
  CUSTOMER = 2,
}
export const CompanyTypeEnumDesc = {
  // [CompanyTypeEnum.PLATFORM]: { text: '平台运营商' },
  [CompanyTypeEnum.OEM]: { text: 'OEM厂家' },
  [CompanyTypeEnum.CUSTOMER]: { text: '普通用户' },
};

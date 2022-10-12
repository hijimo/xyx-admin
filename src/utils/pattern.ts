/**
 * 包含小数的数字
 */
export const numeric = /^-?\d*(\.\d*)?$/;

/**
 * 包含小数正数
 */
export const positiveNumber = /^\d*(\.\d{0,4})?$/;

/**
 * 电话，支持+86xxxxxxxxx 、 0571-xxxxxxx
 */
export const regAllPhone = /^\+?\d+-?\d+$/;

/**
 * 大陆手机，支持+86xxxxxxxxx
 */
export const regPhone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;

/**
 * 货位编号
 */
export const regSpaceNo = /^([A-Za-z0-9]{1,3}(\u002d)){3}[A-Za-z0-9]{1,4}$/;

/**
 * 合法的单号
 */
export const legalBusinessNo = /[^A-Za-z0-9_-]+/;

/**
 * 只能输入字母
 */
export const letter = /^[A-Za-z]{1,}$/;

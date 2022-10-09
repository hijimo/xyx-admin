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
 * 只能输入字母
 */
export const letter = /^[A-Za-z]{1,}$/;

/**
 * 只能输入数字、字母
 */
export const regNumber = /^[a-zA-Z0-9_]{1,}$/;

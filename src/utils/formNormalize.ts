import { positiveNumber } from './pattern';

export const positiveNumberNormalize = (value: any, prevValue: any) =>
  positiveNumber.test(value) ? value : prevValue ?? '';
